"use client";

/**
 * 组卷工作台
 *
 * 布局: 左侧知识树 (1/3) + 右侧试卷预览主区域 (2/3)
 * 支持: AI 出卷 + 手动选题 + PDF 下载
 */

import { useState, useCallback } from "react";
import { QuestionTreePanel } from "@/components/question-tree-panel";
import { PaperPreview } from "@/components/paper-preview";
import { CenteredSearch } from "@/components/centered-search";
import { AIChatBox } from "@/components/ai-chat-box";
import { SnowflakeSmall } from "@/components/winter-icons";
import type { KnowledgePoint } from "@/types/knowledge";
import type { IPaper } from "@/types";

export default function BuilderPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [paper, setPaper] = useState<IPaper | null>(null);
  const [rightPanelMode, setRightPanelMode] = useState<"empty" | "search" | "paper">("search");
  const [downloading, setDownloading] = useState(false);

  // 点击"用这些知识点出卷" — 切换到 AI 搜索模式
  const handleGenerateExam = useCallback((points: KnowledgePoint[]) => {
    setRightPanelMode("search");
  }, []);

  // AI 发送 → 生成试卷
  const handleAISend = useCallback(async (message: string): Promise<string> => {
    try {
      const res = await fetch("/api/pipeline/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: message }),
      });

      const json = await res.json();

      if (json.success && json.data?.taskId) {
        const poll = async (): Promise<IPaper | null> => {
          for (let i = 0; i < 60; i++) {
            await new Promise((r) => setTimeout(r, 1000));
            const r2 = await fetch(`/api/pipeline/generate-exam?taskId=${json.data.taskId}`);
            const j2 = await r2.json();
            if (j2.success && j2.data?.result?.paper) {
              return j2.data.result.paper as IPaper;
            }
            if (j2.data?.status === "failed") return null;
          }
          return null;
        };

        const paperData = await poll();
        if (paperData) {
          setPaper(paperData);
          setRightPanelMode("paper");
          return `✅ 试卷生成完成！共 ${paperData.modules.length} 个模块。`;
        }
        return "❌ 生成超时，请重试";
      }
      return `❌ ${json.error || "启动失败"}`;
    } catch (err) {
      return `❌ 网络错误：${err instanceof Error ? err.message : "未知"}`;
    }
  }, []);

  const [pdfError, setPdfError] = useState<string | null>(null);

  // 下载 PDF
  const handleDownloadPDF = useCallback(async () => {
    if (!paper) return;
    setDownloading(true);
    setPdfError(null);
    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper, mode: "end" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || err.error || `服务器错误 (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${paper.header?.examTitle || "数学试卷"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : "下载失败，请重试");
    } finally {
      setDownloading(false);
    }
  }, [paper]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* ═══ 顶栏 ═══ */}
      <header className="flex-shrink-0 h-12 border-b border-border/30 flex items-center px-5 gap-4 bg-background/80 backdrop-blur-sm">
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <SnowflakeSmall size={14} className="text-primary/50" />
          <span className="font-medium tracking-wide">K12 智能组卷</span>
        </a>
        <span className="text-muted-foreground/20">|</span>
        <span className="text-xs text-muted-foreground/50">工作台</span>
        {paper && (
          <>
            <span className="text-muted-foreground/20">|</span>
            <span className="text-xs text-muted-foreground/60 truncate max-w-sm">
              {paper.header.examTitle}
            </span>
          </>
        )}
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground/30">
          选中 {selectedIds.length} 个知识点
        </span>
        {paper && rightPanelMode === "paper" && (
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {downloading ? "生成中..." : "下载 PDF"}
          </button>
        )}
        {pdfError && (
          <span className="text-xs text-destructive/70 ml-2">{pdfError}
            <button onClick={() => setPdfError(null)} className="ml-1 text-destructive/40 hover:text-destructive/70">✕</button>
          </span>
        )}
      </header>

      {/* ═══ 主体: 左右两栏 ═══ */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── 左侧: 知识树面板 (约 30%) ── */}
        <aside className="w-[340px] lg:w-[380px] flex-shrink-0 border-r border-border/20 p-4">
          <QuestionTreePanel
            selectedIds={selectedIds}
            onSelectionChange={(ids, _names) => setSelectedIds(ids)}
            onGenerateExam={handleGenerateExam}
            onPointClick={() => {}}
            className="h-full border-0 shadow-none bg-transparent"
          />
        </aside>

        {/* ── 右侧: 主区域 ── */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {rightPanelMode === "empty" && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted-foreground/40">
                在左侧选择知识点，然后出卷
              </p>
            </div>
          )}

          {rightPanelMode === "search" && (
            <div className="flex-1 flex items-center justify-center px-8">
              <CenteredSearch
                onSend={(msg) => {
                  handleAISend(msg);
                  setRightPanelMode("paper");
                }}
                isLoading={false}
              />
            </div>
          )}

          {rightPanelMode === "paper" && paper && (
            <div className="flex-1 overflow-y-auto py-6 px-6">
              <PaperPreview paper={paper} showHeader />
            </div>
          )}

          {rightPanelMode === "paper" && !paper && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-8 h-8 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                <p className="text-xs text-muted-foreground/50">
                  正在生成试卷...
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* AI 浮动助手 */}
      <AIChatBox
        onSend={handleAISend}
        title="AI 出卷助手"
      />
    </div>
  );
}
