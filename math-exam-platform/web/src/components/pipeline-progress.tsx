"use client";

/**
 * 出卷流水线进度面板
 *
 * 实时展示：阶段指示器 + 进度条 + 已用时间 + 预估剩余时间
 */

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ── 阶段配置 ──

const PHASES = [
  { key: "parsing", label: "解析需求", icon: "🔍", progressEnd: 20 },
  { key: "syllabus", label: "设计细目表", icon: "📋", progressEnd: 40 },
  { key: "retrieving", label: "检索题目", icon: "🔎", progressEnd: 75 },
  { key: "assembling", label: "组装试卷", icon: "📦", progressEnd: 95 },
  { key: "completed", label: "完成", icon: "✅", progressEnd: 100 },
];

// ── 类型 ──

interface TaskState {
  taskId: string;
  status: string;
  phase: string;
  phaseLabel: string;
  progress: number;
  message: string;
  logs: string[];
  startedAt: number;
  elapsedMs: number;
  estimatedTotalMs: number;
  error?: string;
  paper?: unknown;
}

// ── Props ──

export interface PipelineProgressProps {
  taskId: string;
  onComplete?: (paper: unknown) => void;
  onError?: (error: string) => void;
  className?: string;
}

// ── 组件 ──

export function PipelineProgress({
  taskId,
  onComplete,
  onError,
  className,
}: PipelineProgressProps) {
  const [state, setState] = useState<TaskState | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const completedRef = useRef(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // 轮询
  useEffect(() => {
    let active = true;

    const poll = async () => {
      try {
        const res = await fetch(`/api/pipeline/generate-exam?taskId=${taskId}`);
        const json = await res.json();

        if (!active) return;

        if (json.success && json.data) {
          setState(json.data);

          if (json.data.status === "completed") {
            if (!completedRef.current && json.data.paper) {
              completedRef.current = true;
              onComplete?.(json.data.paper);
            }
            if (pollRef.current) {
              clearInterval(pollRef.current);
            }
          }

          if (json.data.status === "failed") {
            onError?.(json.data.error || "生成失败");
            if (pollRef.current) {
              clearInterval(pollRef.current);
            }
          }
        }
      } catch {
        // 轮询失败静默处理
      }
    };

    // 先立即查一次
    poll();
    pollRef.current = setInterval(poll, 800);

    return () => {
      active = false;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [taskId, onComplete, onError]);

  // 计时器
  useEffect(() => {
    const timer = setInterval(() => {
      if (state?.startedAt) {
        setElapsed(Date.now() - state.startedAt);
      }
    }, 200);
    return () => clearInterval(timer);
  }, [state?.startedAt]);

  // ── 格式化时间 ──

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}毫秒`;
    const sec = (ms / 1000).toFixed(1);
    if (ms < 60000) return `${sec}秒`;
    const min = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${min}分${s}秒`;
  };

  const estimatedRemaining = state
    ? Math.max(0, state.estimatedTotalMs - elapsed)
    : 0;

  const currentPhaseIdx = PHASES.findIndex((p) => p.key === state?.phase);

  return (
    <Card className={cn("border-border/40 bg-card/80 backdrop-blur-sm", className)}>
      <CardContent className="p-5 space-y-4">
        {/* 标题行 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                state?.status === "completed"
                  ? "bg-emerald-400"
                  : state?.status === "failed"
                    ? "bg-red-400"
                    : "bg-amber-400 animate-pulse"
              )}
            />
            <span className="text-sm font-medium text-foreground">
              {state?.status === "completed"
                ? "出卷完成"
                : state?.status === "failed"
                  ? "出卷失败"
                  : "正在出卷..."}
            </span>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            已用 {formatTime(elapsed)}
          </span>
        </div>

        {/* 当前阶段说明 */}
        {state?.phaseLabel && (
          <p className="text-sm text-muted-foreground">{state.phaseLabel}</p>
        )}

        {/* 进度条 */}
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                state?.status === "failed"
                  ? "bg-red-400"
                  : state?.status === "completed"
                    ? "bg-emerald-400"
                    : "bg-primary"
              )}
              style={{ width: `${state?.progress || 0}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground/60">
            <span>{state?.progress || 0}%</span>
            <span>
              预估还需 {formatTime(estimatedRemaining)}
            </span>
          </div>
        </div>

        {/* 阶段步骤指示器 */}
        <div className="flex items-center gap-1 pt-1">
          {PHASES.map((phase, i) => {
            const isDone = currentPhaseIdx > i || state?.status === "completed";
            const isCurrent = currentPhaseIdx === i;
            const isPending = currentPhaseIdx < i;

            return (
              <div key={phase.key} className="flex items-center flex-1 last:flex-none">
                <div
                  className={cn(
                    "flex flex-col items-center gap-0.5",
                    isPending && "opacity-30"
                  )}
                  title={phase.label}
                >
                  <span
                    className={cn(
                      "text-sm transition-all duration-300",
                      isCurrent && "scale-125"
                    )}
                  >
                    {isDone ? "✅" : isCurrent ? phase.icon : "○"}
                  </span>
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">
                    {phase.label}
                  </span>
                </div>
                {i < PHASES.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-1",
                      isDone ? "bg-emerald-300 dark:bg-emerald-700" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* 消息 */}
        {state?.message && (
          <>
            <Separator />
            <p className="text-xs text-muted-foreground/70 font-mono leading-relaxed">
              {state.message}
            </p>
          </>
        )}

        {/* 错误 */}
        {state?.error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-xs text-destructive">{state.error}</p>
          </div>
        )}

        {/* 日志 */}
        {state?.logs && state.logs.length > 0 && (
          <details className="mt-2">
            <summary className="text-[10px] text-muted-foreground/40 cursor-pointer hover:text-muted-foreground">
              详细日志 ({state.logs.length} 条)
            </summary>
            <div className="mt-1.5 max-h-24 overflow-y-auto space-y-0.5">
              {state.logs.map((log, i) => (
                <p
                  key={i}
                  className="text-[10px] text-muted-foreground/50 font-mono leading-relaxed"
                >
                  {log}
                </p>
              ))}
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
}
