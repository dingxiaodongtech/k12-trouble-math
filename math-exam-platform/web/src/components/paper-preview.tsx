"use client";

/**
 * 试卷预览组件 — 极简主义 · 侧边导航 + 瀑布流
 *
 * 布局:
 * ┌──────────┬──────────────────────┐
 * │ 模块导航  │   题目瀑布流          │
 * │ (sticky) │   QuestionCard × N   │
 * │          │                      │
 * │ 选择题   │                      │
 * │ 填空题   │                      │
 * │ 解答题   │                      │
 * │          │                      │
 * └──────────┴──────────────────────┘
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { QuestionCard } from "@/components/question-card";
import { cn } from "@/lib/utils";
import type { IPaper, IModule, QuestionType } from "@/types";
import { QuestionTypeLabel } from "@/types";
import {
  DiamondChoice,
  SquareFill,
  PenStroke,
  TriangleProof,
  StarApp,
  BackArrow,
  SnowflakeSmall,
  IceDivider,
} from "@/components/winter-icons";

// ── 题型图标映射 ──
const typeIcons: Record<QuestionType, React.ComponentType<{ size?: number; className?: string }>> = {
  MC: DiamondChoice,
  FB: SquareFill,
  SA: PenStroke,
  PR: TriangleProof,
  AP: StarApp,
};

// ── Props ──

export interface PaperPreviewProps {
  /** 试卷数据 */
  paper: IPaper;
  /** 自定义类名 */
  className?: string;
  /** 是否显示试卷头信息 */
  showHeader?: boolean;
  /** 紧凑模式 (更少留白) */
  compact?: boolean;
  /** 模块切换回调 */
  onModuleChange?: (moduleIndex: number) => void;
  /** "换一题"回调 */
  onSwapQuestion?: (questionId: string) => void;
  /** 正在换题的题目 ID 集合 */
  swappingIds?: Set<string>;
}

// ── 组件 ──

export function PaperPreview({
  paper,
  className,
  showHeader = true,
  compact = false,
  onSwapQuestion,
  swappingIds,
  onModuleChange,
}: PaperPreviewProps) {
  const [activeModule, setActiveModule] = useState(0);
  const questionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // 滚动到指定模块
  const scrollToModule = useCallback(
    (index: number) => {
      setActiveModule(index);
      onModuleChange?.(index);

      const module = paper.modules[index];
      if (!module) return;

      const firstQId = module.questions[0]?.id;
      if (firstQId) {
        const el = questionRefs.current.get(firstQId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [paper.modules, onModuleChange]
  );

  // 计算全局题号
  let globalIndex = 0;
  const indexMap = new Map<string, number>();
  for (const mod of paper.modules) {
    for (const q of mod.questions) {
      globalIndex++;
      indexMap.set(q.id, globalIndex);
    }
  }

  return (
    <div
      className={cn(
        "flex gap-8 w-full max-w-7xl mx-auto",
        compact ? "gap-4" : "gap-8",
        className
      )}
    >
      {/* ── 左侧：模块导航 (Desktop) ── */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-8">
          {/* 试卷标题 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground leading-tight">
              {paper.config?.title || paper.header?.examTitle || "数学试卷"}
            </h2>
            {showHeader && (
              <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                {paper.header && (
                  <>
                    <p>
                      满分 {paper.header.totalScore}分 ·{" "}
                      {paper.header.durationMinutes}分钟
                    </p>
                    <p>
                      {paper.header.grade} · {paper.header.textbookVersion}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <Separator className="mb-4" />

          {/* 模块导航列表 */}
          <nav className="space-y-0.5">
            {paper.modules.map((mod, i) => (
              <ModuleNavItem
                key={mod.id || i}
                module={mod}
                isActive={activeModule === i}
                onClick={() => scrollToModule(i)}
              />
            ))}
          </nav>

          {/* 统计信息 */}
          <Separator className="my-4" />
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <StatRow label="总题数" value={paper.stats?.totalQuestions ?? paper.modules.reduce((s, m) => s + m.questionCount, 0)} />
            <StatRow label="总分" value={paper.stats?.totalScore ?? paper.modules.reduce((s, m) => s + m.totalScore, 0)} />
            {paper.stats?.estimatedTime && (
              <StatRow label="预估用时" value={`${paper.stats.estimatedTime}分钟`} />
            )}
          </div>
        </div>
      </aside>

      {/* ── 右侧：题目瀑布流 ── */}
      <main className="flex-1 min-w-0">
        {/* 移动端模块选择器 */}
        <div className="lg:hidden mb-2 overflow-x-auto">
          <div className="flex gap-1 pb-1">
            {paper.modules.map((mod, i) => (
              <Button
                key={mod.id || i}
                variant={activeModule === i ? "default" : "outline"}
                size="sm"
                onClick={() => scrollToModule(i)}
                className="flex-shrink-0 h-7 text-xs"
              >
                {(() => { const Icon = typeIcons[mod.questionType]; return <span className="mr-1"><Icon size={11} /></span>; })()}
                {mod.title}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className={cn("pr-4 pb-16", compact ? "space-y-3" : "space-y-8")}>
            {paper.modules.map((mod, modIdx) => (
              <div
                key={mod.id || modIdx}
                id={`module-${modIdx}`}
                className={cn(modIdx !== activeModule && "opacity-60")}
              >
                {/* 模块标题 */}
                <ModuleHeader
                  module={mod}
                  compact={compact}
                  startIndex={
                    paper.modules
                      .slice(0, modIdx)
                      .reduce((s, m) => s + m.questionCount, 0) + 1
                  }
                />

                {/* 题目列表 */}
                <div className="space-y-4">
                  {mod.questions.map((q, qIdx) => {
                    const gIdx =
                      (indexMap.get(q.id) ??
                        paper.modules
                          .slice(0, modIdx)
                          .reduce((s, m) => s + m.questionCount, 0) +
                          qIdx +
                          1);

                    return (
                      <div
                        key={q.id || qIdx}
                        ref={(el) => {
                          if (el && q.id) questionRefs.current.set(q.id, el);
                        }}
                      >
                        <QuestionCard
                          question={q}
                          index={gIdx}
                          showTypeBadge={false}
                          onSwapQuestion={onSwapQuestion}
                          isSwapping={swappingIds?.has(q.id)}
                        />
                      </div>
                    );
                  })}
                </div>

                {modIdx < paper.modules.length - 1 && (
                  <Separator className={compact ? "mt-4" : "mt-8"} />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

// ── 子组件 ──

/** 模块导航项 */
function ModuleNavItem({
  module: mod,
  isActive,
  onClick,
}: {
  module: IModule;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150",
        "text-sm leading-none",
        isActive
          ? "bg-muted font-medium text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="flex-shrink-0">
            {(() => {
              const Icon = typeIcons[mod.questionType];
              return <Icon size={14} className="opacity-60" />;
            })()}
          </span>
          <span className="truncate">{mod.title}</span>
        </span>
        <Badge
          variant="secondary"
          className={cn(
            "text-[10px] h-5 px-1.5 font-normal",
            isActive
              ? "bg-background/80"
              : "bg-transparent"
          )}
        >
          {mod.questionCount}题
        </Badge>
      </div>
      {mod.subtitle && (
        <p className="text-[11px] text-muted-foreground/60 mt-1 truncate">
          {mod.subtitle}
        </p>
      )}
    </button>
  );
}

/** 模块头部 */
function ModuleHeader({
  module: mod,
  compact,
  startIndex,
}: {
  module: IModule;
  compact: boolean;
  startIndex: number;
}) {
  return (
    <div className={cn("mb-6", compact ? "mb-4" : "mb-6")}>
      <div className="flex items-baseline gap-3">
        <h3
          className={cn(
            "font-semibold tracking-tight text-foreground",
            compact ? "text-base" : "text-lg"
          )}
        >
          {mod.title}
        </h3>
        <span className="text-xs text-muted-foreground">
          {mod.subtitle || `共${mod.questionCount}题 · ${mod.totalScore}分`}
        </span>
      </div>
      {mod.instructions && (
        <p className="text-xs text-muted-foreground/70 mt-1.5 leading-relaxed">
          {mod.instructions}
        </p>
      )}
    </div>
  );
}

/** 统计行 */
function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground/70">{label}</span>
      <span className="tabular-nums font-medium text-foreground/80">{value}</span>
    </div>
  );
}

export default PaperPreview;
