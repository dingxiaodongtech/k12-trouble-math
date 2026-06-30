"use client";

/**
 * 数学考试智能平台 — 主页
 *
 * 布局: 居中搜索框 (百度风格) + 三个功能入口 + AI 出卷流水线
 */

import { useState, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { PaperPreview } from "@/components/paper-preview";
import { CenteredSearch } from "@/components/centered-search";
import { PipelineProgress } from "@/components/pipeline-progress";
import { DiagramDisplay } from "@/components/diagram-display";
import { SnowflakeSmall, SnowflakeLogo, BackArrow } from "@/components/winter-icons";
import type { IPaper, IQuestion } from "@/types";

// ── 视图状态 ──

type ViewState =
  | { phase: "home" }
  | { phase: "generating"; taskId: string; userInput: string }
  | { phase: "paper"; paper: IPaper };

export default function Home() {
  const [view, setView] = useState<ViewState>({ phase: "home" });
  const [error, setError] = useState<string | null>(null);
  const [swappingIds, setSwappingIds] = useState<Set<string>>(new Set());

  // ── 搜索框发送 → 启动出卷 ──

  const handleSearch = useCallback(async (message: string) => {
    setError(null);

    try {
      const res = await fetch("/api/pipeline/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: message }),
      });

      const json = await res.json();

      if (json.success && json.data?.taskId) {
        setView({
          phase: "generating",
          taskId: json.data.taskId,
          userInput: message,
        });
      } else {
        setError(json.error || "启动失败，请重试");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "网络错误，请重试");
    }
  }, []);

  // ── 流水线完成 ──

  const handlePipelineComplete = useCallback((paperData: unknown) => {
    const paper = paperData as IPaper;
    setTimeout(() => setView({ phase: "paper", paper }), 600);
  }, []);

  const handlePipelineError = useCallback((errMsg: string) => {
    setError(errMsg);
    setView({ phase: "home" });
  }, []);

  // ── 换一题 ──

  const paper = view.phase === "paper" ? view.paper : null;

  const handleSwapQuestion = useCallback(async (questionId: string) => {
    if (!paper) return;
    setSwappingIds((prev) => new Set(prev).add(questionId));

    let originalQ: IQuestion | null = null;
    for (const mod of paper.modules) {
      const found = mod.questions.find((q) => q.id === questionId);
      if (found) { originalQ = found; break; }
    }
    if (!originalQ) return;

    try {
      const res = await fetch("/api/pipeline/variant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: originalQ.id,
          questionType: originalQ.questionType,
          stem: originalQ.stem,
          answer: originalQ.answer,
          analysis: originalQ.analysis,
          kpCode: originalQ.knowledgePoints[0],
          variantType: Math.random() > 0.5 ? "context" : "numerical",
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const variant = json.data as Partial<IQuestion>;
        // 由于 paper 是 state 快照，需要用函数式更新
        setView((prev) => {
          if (prev.phase !== "paper") return prev;
          return {
            ...prev,
            paper: {
              ...prev.paper,
              modules: prev.paper.modules.map((mod) => ({
                ...mod,
                questions: mod.questions.map((q) =>
                  q.id === questionId
                    ? { ...q, ...variant, id: q.id, score: q.score }
                    : q
                ),
              })),
            },
          };
        });
      }
    } catch (err) {
      console.error("换题失败:", err);
    } finally {
      setSwappingIds((prev) => {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
    }
  }, [paper]);

  // ═══════════════════════════════════════════
  // 首页：居中搜索
  // ═══════════════════════════════════════════

  // 雪花背景粒子 — useEffect 避免 hydration mismatch
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number; left: string; delay: string; duration: string; size: number; opacity: number;
  }>>([]);

  useEffect(() => {
    setSnowflakes(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${15 + Math.random() * 20}s`,
        size: 8 + Math.random() * 14,
        opacity: 0.06 + Math.random() * 0.1,
      }))
    );
  }, []);

  if (view.phase === "home") {
    return (
      <div className="min-h-screen bg-winter-gradient flex flex-col items-center justify-center px-4 py-16">
        {snowflakes.length > 0 && (
          <div className="snowflake-bg" aria-hidden="true">
            {snowflakes.map((sf) => (
              <div key={sf.id} className="snowflake-particle" style={{ left: sf.left, animationDelay: sf.delay, animationDuration: sf.duration, opacity: sf.opacity }}>
                <SnowflakeSmall size={sf.size} />
              </div>
            ))}
          </div>
        )}
        <div className="z-10">
          <CenteredSearch onSend={handleSearch} isLoading={false} />
        </div>

        {error && (
          <div className="relative z-10 mt-6 w-full max-w-2xl p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive text-center">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 underline text-xs"
            >
              关闭
            </button>
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // 生成中：进度面板
  // ═══════════════════════════════════════════

  if (view.phase === "generating") {
    return (
      <div className="min-h-screen bg-winter-gradient flex flex-col items-center justify-center px-4 py-16">
        {snowflakes.length > 0 && (
          <div className="snowflake-bg" aria-hidden="true">
            {snowflakes.map((sf) => (
              <div key={sf.id} className="snowflake-particle" style={{ left: sf.left, animationDelay: sf.delay, animationDuration: sf.duration, opacity: sf.opacity * 0.5 }}>
                <SnowflakeSmall size={sf.size} />
              </div>
            ))}
          </div>
        )}
        <div className="w-full max-w-lg space-y-8 z-10">
          <div className="text-center space-y-3">
            <SnowflakeLogo size={28} className="mx-auto text-primary/30" />
            <h2 className="text-xl font-semibold text-foreground">正在生成试卷</h2>
            <p className="text-sm text-muted-foreground/70 truncate max-w-md mx-auto">
              &ldquo;{view.userInput}&rdquo;
            </p>
          </div>

          <PipelineProgress
            taskId={view.taskId}
            onComplete={handlePipelineComplete}
            onError={handlePipelineError}
          />

          <div className="text-center">
            <button
              onClick={() => setView({ phase: "home" })}
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              取消并返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // 试卷查看
  // ═══════════════════════════════════════════

  return (
    <div className="min-h-screen bg-background">
      {/* 顶栏 */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView({ phase: "home" })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BackArrow size={12} />
              返回首页
            </button>
            <span className="text-muted-foreground/20">|</span>
            <SnowflakeSmall size={14} className="text-primary/40 flex-shrink-0" />
            <h1 className="text-sm font-medium text-foreground truncate max-w-md">
              {paper?.header?.examTitle || "数学试卷"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {paper?.stats?.estimatedTime && (
              <span className="text-[11px] text-muted-foreground/60">
                参考用时 {paper.stats.estimatedTime} 分钟
              </span>
            )}
            <Badge variant="outline" className="text-[10px]">
              v{paper?.version || "1.0"}
            </Badge>
          </div>
        </div>
      </header>

      <div className="py-8 px-4 sm:px-6">
        {paper && (
          <PaperPreview
            paper={paper}
            showHeader
            onSwapQuestion={handleSwapQuestion}
            swappingIds={swappingIds}
          />
        )}

        <DiagramGallery paper={paper} />
        <PaperStatsBar paper={paper} />
      </div>
    </div>
  );
}

// ── 子组件 ──

function PaperStatsBar({ paper }: { paper: IPaper | null }) {
  if (!paper) return null;
  const totalQ = paper.modules.reduce((s, m) => s + m.questions.length, 0);
  const kps = new Set<string>();
  paper.modules.forEach((m) =>
    m.questions.forEach((q) => q.knowledgePoints.forEach((kp) => kps.add(kp)))
  );

  return (
    <div className="max-w-7xl mx-auto mt-8 px-1">
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/60">
        <span>📊 共 <strong className="text-foreground/80">{totalQ}</strong> 题</span>
        <span>📚 <strong className="text-foreground/80">{kps.size}</strong> 个知识点</span>
        <span>📝 <strong className="text-foreground/80">{paper.modules.length}</strong> 个题型模块</span>
        <span>💯 满分 <strong className="text-foreground/80">{paper.header.totalScore}</strong> 分</span>
      </div>
    </div>
  );
}

function DiagramGallery({ paper }: { paper: IPaper | null }) {
  if (!paper) return null;

  const diagrams: Array<{ qId: string; tikz: string; caption: string }> = [];
  paper.modules.forEach((mod) =>
    mod.questions.forEach((q) => {
      q.images?.forEach((img) => {
        if (img.tikz) {
          diagrams.push({ qId: q.id, tikz: img.tikz, caption: img.caption || q.stem.slice(0, 60) });
        }
      });
    })
  );

  if (diagrams.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">📐 题目配图</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {diagrams.map((d, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-center min-h-[180px]"
          >
            <DiagramDisplay tikz={d.tikz} caption={d.caption} />
          </div>
        ))}
      </div>
    </div>
  );
}
