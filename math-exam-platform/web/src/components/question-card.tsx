"use client";

/**
 * 题目卡片组件 — 极简主义设计
 *
 * 特性:
 * - 题号标注 + 题型标签
 * - 题干 (支持 LaTeX 公式渲染)
 * - 选项列表 (选择题) 或 填空区域 (填空题)
 * - 可折叠的解析 & 答案面板
 * - 深色模式适配
 * - 大面积留白
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { MathRenderer } from "@/components/math-renderer";
import { RefreshCircle, ChevronRight } from "@/components/winter-icons";
import { cn } from "@/lib/utils";
import type { IQuestion, IOption, IAnswer } from "@/types/question";
import type { QuestionType } from "@/types/common";
import { QuestionTypeLabel } from "@/types/common";

// ── 题型颜色映射 (极简配色) ──
const typeColorMap: Record<QuestionType, string> = {
  MC: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  FB: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  SA: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  PR: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  AP: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
};

// ── 选项标签 (A-Z) ──
const OPTION_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ── Props ──

export interface QuestionCardProps {
  /** 题目数据 */
  question: IQuestion;
  /** 题号 (全局序号) */
  index: number;
  /** 是否默认展开解析 */
  defaultExpanded?: boolean;
  /** 是否显示题型标签 */
  showTypeBadge?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 选中答案回调 (交互模式) */
  onSelectOption?: (questionId: string, optionLabel: string) => void;
  /** 当前选中的选项 */
  selectedOption?: string;
  /** "换一题"回调 — 点击后触发变体生成 */
  onSwapQuestion?: (questionId: string) => void;
  /** 是否正在换题中 */
  isSwapping?: boolean;
}

// ── 组件 ──

export function QuestionCard({
  question,
  index,
  defaultExpanded = false,
  showTypeBadge = true,
  className,
  onSelectOption,
  selectedOption,
  onSwapQuestion,
  isSwapping,
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const qType = question.questionType;
  const hasOptions = qType === "MC" && question.options.length > 0;

  // 从原始数据中提取 image_urls（兼容 JSON 直通数据和 IQuestion 类型）
  const rawData = question as unknown as Record<string, unknown>;
  const imageUrls: Record<string, string> | undefined =
    (rawData.image_urls as Record<string, string>) || undefined;

  return (
    <Card
      className={cn(
        "group border-border/60 bg-card/50 backdrop-blur-sm",
        "transition-all duration-200",
        "hover:border-border hover:bg-card/80",
        "dark:border-border/40 dark:bg-card/30 dark:hover:bg-card/50",
        className
      )}
    >
      <CardContent className="p-6 sm:p-8">
        {/* ── 题号行 ── */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className={cn(
              "flex-shrink-0 inline-flex items-center justify-center",
              "w-8 h-8 rounded-full text-sm font-mono font-medium",
              "bg-muted text-muted-foreground",
              "dark:bg-muted/50"
            )}
          >
            {index}
          </span>

          {showTypeBadge && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-normal border",
                typeColorMap[qType]
              )}
            >
              {QuestionTypeLabel[qType]}
            </Badge>
          )}

          <span className="text-xs text-muted-foreground/60 tabular-nums">
            {question.score}分
          </span>

          {/* "换一题" 按钮 */}
          {onSwapQuestion && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwapQuestion(question.id);
              }}
              disabled={isSwapping}
              className={cn(
                "ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-md",
                "text-xs text-muted-foreground/50 hover:text-foreground",
                "hover:bg-muted/50 transition-all duration-150",
                "opacity-0 group-hover:opacity-100",
                isSwapping && "animate-pulse"
              )}
              title="换一道同知识点同难度的题"
            >
              {isSwapping ? (
                <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <RefreshCircle size={14} />
              )}
              <span className="hidden sm:inline">换一题</span>
            </button>
          )}
        </div>

        {/* ── 题干 ── */}
        <div className="mb-6 leading-relaxed text-[15px] text-foreground">
          <MathRenderer content={question.stem} imageUrls={imageUrls} imgContext="stem" />
        </div>

        {/* ── 选项 (选择题) ── */}
        {hasOptions && (
          <div className="space-y-2.5 mb-2">
            {question.options.map((option, i) => {
              const label = option.label || OPTION_LABELS[i];
              const optCtx = `option_${label}`;
              return (
              <OptionRow
                key={label}
                option={option}
                label={label}
                imageUrls={imageUrls}
                isSelected={selectedOption === (option.label || OPTION_LABELS[i])}
                isCorrect={option.isCorrect}
                onClick={
                  onSelectOption
                    ? () =>
                        onSelectOption(
                          question.id,
                          option.label || OPTION_LABELS[i]
                        )
                    : undefined
                }
              />
              );
            })}
          </div>
        )}

        {/* ── 填空题留白区域 ── */}
        {qType === "FB" && (
          <div
            className={cn(
              "mt-3 mb-2 h-10 rounded-md border border-dashed border-border/60",
              "bg-muted/30 dark:bg-muted/10",
              "flex items-center justify-center text-xs text-muted-foreground/40"
            )}
          >
            作答区域
          </div>
        )}

        {/* ── 知识点标签 ── */}
        {question.knowledgePointNames && question.knowledgePointNames.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5">
            {question.knowledgePointNames.map((name) => (
              <span
                key={name}
                className={cn(
                  "inline-block px-2 py-0.5 text-[11px] rounded-sm",
                  "bg-muted/60 text-muted-foreground/70",
                  "dark:bg-muted/30"
                )}
              >
                {name}
              </span>
            ))}
          </div>
        )}

        <Separator className="my-4" />

        {/* ── 可折叠：解析 & 答案 ── */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "inline-flex items-center h-8 px-2 rounded-md cursor-pointer",
              "text-xs text-muted-foreground hover:text-foreground",
              "transition-colors duration-200 select-none"
            )}
          >
            <span
              className={cn(
                "mr-1.5 transition-transform duration-200 inline-block",
                isExpanded && "rotate-90"
              )}
            >
              <ChevronRight size={14} />
            </span>
            {isExpanded ? "收起" : "查看解析与答案"}
          </div>

          <CollapsibleContent className="mt-4 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* 答案 */}
            <div className="rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-5 h-5 rounded-full",
                    "bg-emerald-100 dark:bg-emerald-900",
                    "text-[11px] font-bold text-emerald-700 dark:text-emerald-300"
                  )}
                >
                  ✓
                </span>
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-200">
                  答案
                </span>
              </div>
              <div className="text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/80 pl-7">
                <AnswerContent answer={question.answer} imageUrls={imageUrls} />
              </div>
            </div>

            {/* 解析 */}
            {question.analysis && (
              <div className="rounded-lg bg-muted/30 dark:bg-muted/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    解析
                  </span>
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  <MathRenderer content={question.analysis} imageUrls={imageUrls} imgContext="analysis" />
                </div>
              </div>
            )}

            {/* 解题步骤 */}
            {question.solutionSteps && question.solutionSteps.length > 0 && (
              <div className="rounded-lg bg-muted/20 dark:bg-muted/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    解题步骤
                  </span>
                </div>
                <ol className="space-y-2 list-decimal list-inside">
                  {question.solutionSteps.map((step, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      <MathRenderer content={step.content} imageUrls={imageUrls} imgContext="analysis" />
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

// ── 选项行子组件 ──

function OptionRow({
  option,
  label,
  isSelected,
  isCorrect,
  onClick,
  imageUrls,
}: {
  option: IOption;
  label: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  onClick?: () => void;
  imageUrls?: Record<string, string>;
}) {
  const optCtx = `option_${label}`;
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg cursor-default",
        "transition-all duration-150",
        "border border-transparent",
        onClick && "cursor-pointer hover:bg-muted/50",
        isSelected &&
          "border-primary/30 bg-primary/5 dark:bg-primary/10",
        isCorrect &&
          "border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 inline-flex items-center justify-center",
          "w-6 h-6 rounded-full text-xs font-mono font-medium",
          "bg-muted text-muted-foreground",
          isSelected && "bg-primary text-primary-foreground",
          isCorrect && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
        )}
      >
        {label}
      </span>
      <span className="text-sm leading-relaxed pt-0.5">
        <MathRenderer content={option.content} imageUrls={imageUrls} imgContext={optCtx} />
      </span>
    </div>
  );
}

// ── 答案渲染：处理字符串、数组（填空）、对象三种格式 ──

function AnswerContent({
  answer,
  imageUrls,
}: {
  answer: IAnswer | string | Array<{blank_index?: number; value?: string; display_answer?: string}>;
  imageUrls?: Record<string, string>;
}) {
  // 字符串 → 直接渲染
  if (typeof answer === "string") {
    return <MathRenderer content={answer} imageUrls={imageUrls} imgContext="answer" />;
  }

  // 数组 → 填空题答案列表
  if (Array.isArray(answer)) {
    return (
      <div className="space-y-1.5">
        {answer.map((a, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded flex-shrink-0 leading-none mt-0.5">
              {a.blank_index || i + 1}
            </span>
            <span>
              <MathRenderer
                content={a.display_answer || a.value || ""}
                imageUrls={imageUrls}
                imgContext="answer"
              />
            </span>
          </div>
        ))}
      </div>
    );
  }

  // IAnswer 对象 → value + unit
  if (answer && typeof answer === "object") {
    const ansObj = answer as IAnswer;
    return (
      <>
        <MathRenderer content={ansObj.value || ""} imageUrls={imageUrls} imgContext="answer" />
        {ansObj.unit && (
          <span className="text-xs ml-1 text-muted-foreground">({ansObj.unit})</span>
        )}
      </>
    );
  }

  return <span className="text-muted-foreground/50 italic text-xs">（空）</span>;
}

export default QuestionCard;
