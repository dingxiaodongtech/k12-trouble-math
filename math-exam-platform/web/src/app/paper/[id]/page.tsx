"use client";

/**
 * 试卷详情页 — 展示完整试卷内容
 */

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BackArrow } from "@/components/winter-icons";
import { MathRenderer } from "@/components/math-renderer";
import { cn } from "@/lib/utils";

interface PaperData {
  paper: Record<string, unknown>;
  modules: Array<{
    name: string;
    description: string;
    questions: Array<Record<string, unknown>>;
  }>;
}

export default function PaperDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<PaperData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const loadPaper = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/exams?id=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((res) => { if (res.success) setData(res.data); else setError(res.error || "试卷不存在"); })
      .catch(() => setError("网络错误，请检查连接"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { loadPaper(); }, [loadPaper]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    setPdfError(null);
    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper: data, mode: "end" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setPdfError(err.error || `服务器错误 (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${((data?.paper?.name as string) || "试卷").replace(/[/\\?%*:|"<>]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setPdfError(err.message || "下载失败");
    } finally {
      setDownloading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-sm text-muted-foreground/50">加载试卷…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-6">
          <p className="text-sm text-destructive/70">{error || "试卷未找到"}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={loadPaper} className="px-4 py-2 text-xs rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">重试</button>
            <Link href="/paper-bank" className="px-4 py-2 text-xs rounded-lg border border-border/30 text-muted-foreground hover:text-foreground transition-colors">返回试卷库</Link>
          </div>
        </div>
      </div>
    );
  }

  const p = data.paper || {};
  const totalQ = data.modules.reduce((s, m) => s + (m.questions?.length || 0), 0);

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* 顶栏 — 返回箭头 + PDF导出 */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
        <Link
          href="/paper-bank"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 border border-border/30 text-muted-foreground/40 hover:text-foreground hover:border-border transition-colors"
          title="返回试卷库"
        >
          <BackArrow size={14} />
        </Link>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-1.5 px-3 h-8 rounded-full bg-white/80 border border-border/30 text-xs text-muted-foreground/50 hover:text-foreground hover:border-border transition-colors disabled:opacity-40"
          title="导出 PDF"
        >
          {downloading ? (
            <>生成中...</>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              导出 PDF
            </>
          )}
        </button>
        {pdfError && (
          <span className="text-xs text-destructive/70 bg-white/90 px-2 py-1 rounded">{pdfError}
            <button onClick={() => setPdfError(null)} className="ml-1 text-destructive/40 hover:text-destructive/70">✕</button>
          </span>
        )}
      </div>

      {/* 试卷内容 — 全宽试卷风格，无侧栏 */}
      <div className="pt-4 pb-16 px-4 sm:px-8 md:px-12 max-w-3xl mx-auto">
        {/* 试卷头 */}
        <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
          <h1 className="text-xl font-bold tracking-wide">
            {String(p.name || id)}
          </h1>
          <div className="flex items-center justify-center gap-6 mt-3 text-sm text-muted-foreground">
            {p.region ? <span>{String(p.region)}</span> : null}
            {p.grade ? <span>{String(p.grade)}</span> : null}
            {p.total_score ? <span>满分 {String(p.total_score)} 分</span> : null}
            <span>{totalQ} 题</span>
          </div>
        </div>

        {/* 题目列表 — 按模块组织 */}
        {data.modules.map((m, mi) => (
          <div key={mi} className="mb-8">
            {/* 模块标题 */}
            <div className="mb-4">
              <h2 className="text-base font-bold">{m.name || `第${mi + 1}部分`}</h2>
              {m.description && (
                <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
              )}
            </div>

            {/* 题目卡片 */}
            <div className="space-y-5">
              {(m.questions || []).map((q: Record<string, unknown>, qi: number) => {
                const stem = (q.stem as string) || "";
                const options = (q.options as string[]) || [];
                const answer = q.answer;
                const analysis = (q.analysis as string) || "";
                const imageUrls = (q.image_urls as Record<string, string>) || {};
                const qType = mapSubjectType(q.subject_type as string);

                return (
                  <PaperQuestion
                    key={qi}
                    index={qi + 1}
                    stem={stem}
                    options={options}
                    answer={answer}
                    analysis={analysis}
                    imageUrls={imageUrls}
                    qType={qType}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function mapSubjectType(type: string): "MC" | "FB" | "SA" | "PR" | "AP" {
  const map: Record<string, "MC" | "FB" | "SA" | "PR" | "AP"> = {
    "单选题": "MC", "多选题": "MC", "选择题": "MC",
    "填空题": "FB",
    "解答题": "SA", "计算题": "SA", "应用题": "SA",
    "证明题": "PR",
    "作图题": "AP",
  };
  return map[type] || "SA";
}

// ── 试卷题目组件 — 试卷风格排版 ──

function PaperQuestion({
  index,
  stem,
  options,
  answer,
  analysis,
  imageUrls,
  qType,
}: {
  index: number;
  stem: string;
  options: string[];
  answer: unknown;
  analysis: string;
  imageUrls: Record<string, string>;
  qType: "MC" | "FB" | "SA" | "PR" | "AP";
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="group">
      {/* 题干 */}
      <div className="flex items-start gap-2">
        <span className="font-bold text-sm flex-shrink-0 mt-0.5">{index}.</span>
        <div className="flex-1 min-w-0 text-sm leading-relaxed">
          <MathRenderer content={stem} imageUrls={imageUrls} imgContext="stem" />
        </div>
      </div>

      {/* 选择题选项 — A/B/C/D 竖排 */}
      {qType === "MC" && options.length > 0 && (
        <div className="mt-2 ml-6 space-y-0.5">
          {options.map((opt, oi) => (
            <div key={oi} className="flex items-start gap-2 text-sm leading-relaxed">
              <span className="font-medium flex-shrink-0 w-5">{String.fromCharCode(65 + oi)}.</span>
              <MathRenderer content={opt} imageUrls={imageUrls} imgContext={`option_${String.fromCharCode(65 + oi)}`} />
            </div>
          ))}
        </div>
      )}

      {/* 填空题留白 */}
      {qType === "FB" && (
        <div className="ml-6 mt-2 h-8 border-b border-dashed border-border/40" />
      )}

      {/* 可折叠答案 & 解析 */}
      <div className="ml-6 mt-2">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="text-[11px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
        >
          {showAnswer ? "▲ 收起" : "▼ 展开答案与解析"}
        </button>

        {showAnswer && (
          <div className="mt-2 space-y-3 animate-in fade-in duration-150">
            {/* 答案 */}
            <div className="rounded bg-emerald-50/50 dark:bg-emerald-950/15 px-3 py-2">
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">答案 </span>
              <AnswerInline answer={answer} imageUrls={imageUrls} />
            </div>

            {/* 解析 */}
            {analysis && (
              <div className="rounded bg-muted/30 px-3 py-2">
                <span className="text-[11px] font-medium text-muted-foreground">解析 </span>
                <span className="text-sm leading-relaxed">
                  <MathRenderer content={analysis} imageUrls={imageUrls} imgContext="analysis" />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── 答案行内渲染 ──

function AnswerInline({ answer, imageUrls }: { answer: unknown; imageUrls: Record<string, string> }) {
  if (typeof answer === "string") {
    return <MathRenderer content={answer} imageUrls={imageUrls} imgContext="answer" />;
  }
  if (Array.isArray(answer)) {
    return (
      <span className="space-x-3">
        {answer.map((a: any, i: number) => (
          <span key={i}>
            <span className="text-[10px] text-emerald-600 font-bold">({a.blank_index || i + 1})</span>
            {" "}
            <MathRenderer content={a.display_answer || a.value || ""} imageUrls={imageUrls} imgContext="answer" />
          </span>
        ))}
      </span>
    );
  }
  return <span className="text-muted-foreground/50">—</span>;
}
