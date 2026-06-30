"use client";

/**
 * 试题树面板 — Apple/Notion 极简风格
 *
 * 层级: 学段 Tabs → 年级切换 → 搜索框 → Accordion 章节列表 → Checkbox 多选 → 底部操作栏
 */

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { Stage, Grade, Chapter, ChapterSection, KnowledgePoint } from "@/types/knowledge";
import { Search, ChevronRight, Hash, BookOpen, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
} from "@/types/knowledge";

// ── 辅助函数 ──

function flattenKps(stages: Stage[]) {
  const result: Array<{ point: KnowledgePoint; sectionName: string; chapterName: string; gradeName: string; stageName: string }> = [];
  for (const s of stages) for (const g of s.grades) for (const ch of g.chapters) for (const sec of ch.sections) for (const kp of sec.knowledgePoints) result.push({ point: kp, sectionName: sec.name, chapterName: ch.name, gradeName: g.name, stageName: s.name });
  return result;
}

/** 从选中的 ID 集合中提取对应的知识点名称（原始名称，未经过 safeId 破坏） */
function idsToNames(allStages: Stage[], ids: string[]): string[] {
  const idSet = new Set(ids);
  const names: string[] = [];
  for (const s of allStages) for (const g of s.grades) for (const ch of g.chapters) for (const sec of ch.sections) for (const kp of sec.knowledgePoints) {
    if (idSet.has(kp.id)) names.push(kp.name);
  }
  return names;
}

/** 从选中的 ID 集合中提取所有 dbTags（数据库匹配标签），用于筛选 */
function idsToDbTags(allStages: Stage[], ids: string[]): string[] {
  const idSet = new Set(ids);
  const tags: string[] = [];
  for (const s of allStages) for (const g of s.grades) for (const ch of g.chapters) for (const sec of ch.sections) for (const kp of sec.knowledgePoints) {
    if (idSet.has(kp.id) && kp.dbTags) tags.push(...kp.dbTags);
  }
  return [...new Set(tags)];
}

// ═══════════════════════════════════════════
// Props
// ═══════════════════════════════════════════

export interface QuestionTreePanelProps {
  className?: string;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[], names: string[], dbTags: string[]) => void;
  onPointClick?: (point: KnowledgePoint, path: string[]) => void;
  onGenerateExam?: (selectedPoints: KnowledgePoint[]) => void;
  /** 展示模式: full=完整知识点树, grade-only=仅年级/章节概要 */
  mode?: "full" | "grade-only";
  /** 隐藏底部操作栏（组卷按钮等），用于纯刷题联动场景 */
  hideActions?: boolean;
}

// ═══════════════════════════════════════════
// 组件
// ═══════════════════════════════════════════

export function QuestionTreePanel({
  className,
  selectedIds: externalSelected,
  onSelectionChange,
  onPointClick,
  onGenerateExam,
  mode = "full",
  hideActions = false,
}: QuestionTreePanelProps) {
  // --- API 数据 ---
  const [allStages, setAllStages] = useState<Stage[]>([]);
  const [treeLoading, setTreeLoading] = useState(true);
  const [treeError, setTreeError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setTreeLoading(true);
    setTreeError(null);
    fetch("/api/knowledge-tree", { signal: ac.signal })
      .then((r) => r.json())
      .then((res) => { if (res.success) setAllStages(res.data); else setTreeError(res.error || "数据格式错误"); })
      .catch((err) => { if (err.name !== "AbortError") setTreeError("知识树加载失败，请检查网络"); })
      .finally(() => setTreeLoading(false));
    return () => ac.abort();
  }, []);

  // --- 筛选状态 ---
  const [stageId, setStageId] = useState<string>("");
  const [gradeId, setGradeId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  const selectedIds = externalSelected ?? internalSelected;
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  // — 防抖搜索 —
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 200);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  // — 当前学段 —
  // 数据加载后设默认学段
  useEffect(() => {
    if (allStages.length > 0 && !stageId) {
      // 默认选中"初中"→"中考"→第一个学段
      const preferred = allStages.find((s) => s.name === "初中")
        || allStages.find((s) => s.name === "中考")
        || allStages[0];
      setStageId(preferred?.id || "");
    }
  }, [allStages, stageId]);

  const stage = useMemo(() => allStages.find((s) => s.id === stageId), [allStages, stageId]);

  // — 当前年级 —
  const grade = useMemo(() => {
    if (!stage) return undefined;
    if (gradeId) return stage.grades.find((g) => g.id === gradeId);
    return stage.grades[0];
  }, [stage, gradeId]);

  useEffect(() => {
    if (stage && !gradeId) {
      const first = stage.grades[0];
      if (first) setGradeId(first.id);
    }
  }, [stage, gradeId]);

  // — 搜索结果 —
  const searchResults = useMemo(() => {
    if (!debouncedSearch.trim()) return null;
    const q = debouncedSearch.toLowerCase();
    const all = flattenKps(stage ? [stage] : allStages);
    return all.filter(
      (p) =>
        p.point.name.toLowerCase().includes(q) ||
        p.sectionName.toLowerCase().includes(q) ||
        p.chapterName.toLowerCase().includes(q) ||
        (p.point.description || "").toLowerCase().includes(q)
    );
  }, [debouncedSearch, stage]);

  // — 当前选中知识点详情 (用于底部Tag展示) —
  const selectedPointsDetail = useMemo(() => {
    const all = flattenKps(stage ? [stage] : allStages);
    return all
      .filter((p) => selectedSet.has(p.point.id))
      .map((p) => p.point);
  }, [selectedSet, stage]);

  // — 辅助: 获取某章节/小节下所有知识点 ID —
  const getChapterPointIds = useCallback(
    (chapterId: string): string[] => {
      if (!grade) return [];
      const ch = grade.chapters.find((c) => c.id === chapterId);
      if (!ch) return [];
      return ch.sections.flatMap((sec) => sec.knowledgePoints.map((kp) => kp.id));
    },
    [grade]
  );

  const getSectionPointIds = useCallback(
    (sectionId: string): string[] => {
      if (!grade) return [];
      for (const ch of grade.chapters) {
        const sec = ch.sections.find((s) => s.id === sectionId);
        if (sec) return sec.knowledgePoints.map((kp) => kp.id);
      }
      return [];
    },
    [grade]
  );

  // — 批量更新选中 —
  const bulkUpdate = useCallback(
    (ids: string[], mode: "select" | "deselect") => {
      const next =
        mode === "select"
          ? [...new Set([...selectedIds, ...ids])]
          : selectedIds.filter((i) => !ids.includes(i));
      if (onSelectionChange) onSelectionChange(next, idsToNames(allStages, next), idsToDbTags(allStages, next));
      else setInternalSelected(next);
    },
    [selectedIds, onSelectionChange, allStages]
  );

  // — 切换单个知识点 —
  const toggleId = useCallback(
    (id: string) => {
      const next = selectedSet.has(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id];
      if (onSelectionChange) onSelectionChange(next, idsToNames(allStages, next), idsToDbTags(allStages, next));
      else setInternalSelected(next);
    },
    [selectedIds, selectedSet, onSelectionChange, allStages]
  );

  // — 切换章节 (级联全选/全不选) —
  const toggleChapter = useCallback(
    (chapterId: string) => {
      const ids = getChapterPointIds(chapterId);
      const allSelected = ids.every((id) => selectedSet.has(id));
      bulkUpdate(ids, allSelected ? "deselect" : "select");
    },
    [getChapterPointIds, selectedSet, bulkUpdate]
  );

  // — 切换小节 (级联) —
  const toggleSection = useCallback(
    (sectionId: string) => {
      const ids = getSectionPointIds(sectionId);
      const allSelected = ids.every((id) => selectedSet.has(id));
      bulkUpdate(ids, allSelected ? "deselect" : "select");
    },
    [getSectionPointIds, selectedSet, bulkUpdate]
  );

  // — 章/节的选中统计 —
  const getSelectionState = useCallback(
    (ids: string[]): "all" | "partial" | "none" => {
      if (ids.length === 0) return "none";
      const selected = ids.filter((id) => selectedSet.has(id)).length;
      if (selected === ids.length) return "all";
      if (selected === 0) return "none";
      return "partial";
    },
    [selectedSet]
  );

  const clearAll = useCallback(() => {
    if (onSelectionChange) onSelectionChange([], [], []);
    else setInternalSelected([]);
  }, [onSelectionChange]);

  const removeId = useCallback(
    (id: string) => {
      const next = selectedIds.filter((i) => i !== id);
      if (onSelectionChange) onSelectionChange(next, idsToNames(allStages, next), idsToDbTags(allStages, next));
      else setInternalSelected(next);
    },
    [selectedIds, onSelectionChange]
  );

  // — 统计 —
  const stats = useMemo(() => {
    const stagesToCount = stage ? [stage] : allStages;
    let totalKps = 0, totalQs = 0, totalChs = 0;
    for (const s of stagesToCount) for (const g of s.grades) { totalChs += g.chapters.length; for (const ch of g.chapters) for (const sec of ch.sections) { totalKps += sec.knowledgePoints.length; totalQs += ch.totalQuestions; } }
    return { totalChapters: totalChs, totalKnowledgePoints: totalKps, totalQuestions: totalQs };
  }, [stage, allStages]);

  // ═══════════════════════════════════════
  // Render
  // ═══════════════════════════════════════

  return (
    <Card
      className={cn(
        "flex flex-col h-full overflow-hidden",
        "border-border/30 shadow-sm",
        "bg-card/80 backdrop-blur-sm",
        className
      )}
    >
      {/* ═══ 头部固定区 ═══ */}
      <div className="flex-shrink-0 px-5 pt-5 pb-3 space-y-4 border-b border-border/20">
        {/* 标题 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen size={16} className="text-muted-foreground/50" />
            <h3 className="text-sm font-medium text-foreground tracking-wide">试题树</h3>
          </div>
          <span className="text-[11px] text-muted-foreground/40 tabular-nums">
            {stats.totalChapters}章 · {stats.totalKnowledgePoints}知识点 · {stats.totalQuestions}题
          </span>
        </div>

        {/* 学段 + 年级 — 垂直排列 */}
        <div className="flex flex-col gap-3">
          {/* 第一行: 学段切换 */}
          <Tabs value={stageId} onValueChange={setStageId}>
            <TabsList className="h-8 bg-muted/40 w-full">
              {allStages
                .filter((s) => s.grades.length > 0)
                .map((s) => (
                  <TabsTrigger
                    key={s.id}
                    value={s.id}
                    className="h-7 px-3 text-xs flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    {s.name}
                  </TabsTrigger>
                ))}
            </TabsList>
          </Tabs>

          {/* 第二行: 年级分册 — flex-wrap */}
          {stage && stage.grades.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {stage.grades.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGradeId(g.id)}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] transition-colors duration-150 inline-flex items-center gap-1",
                    gradeId === g.id
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {g.shortName}
                  {g.tags?.includes("旧版") && (
                    <span className={cn(
                      "text-[8px] px-1 py-px rounded-sm font-normal",
                      gradeId === g.id
                        ? "bg-primary-foreground/20 text-primary-foreground/70"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>旧版</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/35" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索知识点..."
            className={cn(
              "h-8 pl-8 pr-3 text-xs rounded-lg",
              "bg-muted/20 border-transparent",
              "focus-visible:ring-1 focus-visible:ring-border focus-visible:bg-background",
              "placeholder:text-muted-foreground/35"
            )}
          />
        </div>
      </div>

      {/* ═══ 中间可滚动区域 ═══ */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-3">
          {/* — 搜索结果模式 — */}
          {searchResults !== null && (
            <div className="space-y-0.5">
              {searchResults.length === 0 && (
                <p className="text-xs text-muted-foreground/40 text-center py-16">
                  未找到匹配的知识点
                </p>
              )}
              {searchResults.map(({ point, chapterName, sectionName }) => (
                <SearchResultRow
                  key={point.id}
                  point={point}
                  chapterName={chapterName}
                  sectionName={sectionName}
                  checked={selectedSet.has(point.id)}
                  onToggle={() => {
                    toggleId(point.id);
                    onPointClick?.(point, [chapterName, sectionName, point.name]);
                  }}
                />
              ))}
            </div>
          )}

          {/* — grade-only 模式: 仅年级/章节概要 — */}
          {searchResults === null && grade && mode === "grade-only" && (
            <div className="space-y-2">
              {grade.chapters.map((chapter) => {
                let c = 0;
                chapter.sections.forEach((sec) =>
                  sec.knowledgePoints.forEach((kp) => { if (selectedSet.has(kp.id)) c++; })
                );
                return (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      const ids = chapter.sections.flatMap((sec) =>
                        sec.knowledgePoints.map((kp) => kp.id)
                      );
                      const allSelected = ids.every((id) => selectedSet.has(id));
                      if (allSelected) {
                        bulkUpdate(ids, "deselect");
                      } else {
                        bulkUpdate(ids, "select");
                      }
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl transition-all duration-150 border",
                      c > 0
                        ? "border-primary/20 bg-primary/[0.04]"
                        : "border-transparent hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Checkbox
                          checked={c > 0 && c === chapter.totalPoints}
                          data-state={c > 0 && c < chapter.totalPoints ? "indeterminate" : undefined}
                          className="h-4 w-4 flex-shrink-0 pointer-events-none"
                        />
                        <span className="text-[13px] font-medium text-foreground/80 truncate">
                          {chapter.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] text-muted-foreground/40">
                          {chapter.totalPoints}知识点
                        </span>
                        <span className="text-[10px] text-muted-foreground/30 tabular-nums">
                          {chapter.totalQuestions}题
                        </span>
                        {c > 0 && (
                          <Badge variant="secondary" className="h-4 px-1.5 text-[9px] bg-primary/10 text-primary">
                            {c}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {chapter.description && (
                      <p className="text-[10px] text-muted-foreground/35 mt-1.5 ml-7 line-clamp-1">
                        {chapter.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* — 正常树模式 — */}
          {searchResults === null && grade && mode === "full" && (
            <Accordion className="space-y-0.5">
              {grade.chapters.map((chapter) => (
                <AccordionItem
                  key={chapter.id}
                  value={chapter.id}
                  className="border-0"
                >
                  {/* 章节头部 */}
                  <div className="flex items-center gap-1.5 group/chapter">
                    {/* 级联 Checkbox */}
                    {(() => {
                      const ids = chapter.sections.flatMap((sec) =>
                        sec.knowledgePoints.map((kp) => kp.id)
                      );
                      const state = getSelectionState(ids);
                      return (
                        <Checkbox
                          checked={state === "all"}
                          data-state={
                            state === "partial" ? "indeterminate" : undefined
                          }
                          onCheckedChange={() => toggleChapter(chapter.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 flex-shrink-0 data-[state=indeterminate]:bg-primary/50 data-[state=indeterminate]:text-primary-foreground"
                        />
                      );
                    })()}

                    <AccordionTrigger
                      className={cn(
                        "flex-1 py-2.5 px-2 rounded-lg",
                        "hover:bg-muted/30 hover:no-underline",
                        "group"
                      )}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <Hash size={12} className="text-muted-foreground/30 flex-shrink-0" />
                        <span className="text-[13px] font-medium text-foreground/80 truncate">
                          {chapter.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground/35 tabular-nums flex-shrink-0 ml-auto">
                          {chapter.totalPoints}知识点 · {chapter.totalQuestions}题
                        </span>
                        {(() => {
                          let c = 0;
                          chapter.sections.forEach((sec) =>
                            sec.knowledgePoints.forEach((kp) => {
                              if (selectedSet.has(kp.id)) c++;
                            })
                          );
                          return c > 0 ? (
                            <Badge
                              variant="secondary"
                              className="h-4 px-1.5 text-[9px] font-normal bg-primary/10 text-primary"
                            >
                              {c}
                            </Badge>
                          ) : null;
                        })()}
                      </div>
                    </AccordionTrigger>
                  </div>

                  {/* 章节内容 */}
                  <AccordionContent className="pb-1 pt-0">
                    {chapter.description && (
                      <p className="text-[11px] text-muted-foreground/35 leading-relaxed px-4 py-2 ml-1 border-l border-border/15">
                        {chapter.description}
                      </p>
                    )}

                    {chapter.sections.length > 0 && (
                      <div className="ml-4 space-y-0">
                        {chapter.sections.map((section) => {
                          const hasKPs = section.knowledgePoints.length > 0;

                          // 无子级KP：平铺为叶子节点
                          if (!hasKPs) {
                            return (
                              <label
                                key={section.id}
                                className={cn(
                                  "flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer ml-4",
                                  "transition-all duration-150",
                                  "hover:bg-muted/20"
                                )}
                              >
                                <span className="text-[12px] text-foreground/50 font-normal truncate flex-1 text-left">
                                  {section.name}
                                </span>
                              </label>
                            );
                          }

                          // 有子级KP：可展开的Accordion
                          return (
                          <AccordionItem
                            key={section.id}
                            value={section.id}
                            className="border-0"
                          >
                            <div className="flex items-center gap-1.5 group/section">
                              {/* 级联 Checkbox */}
                              {(() => {
                                const ids = section.knowledgePoints.map((kp) => kp.id);
                                const state = getSelectionState(ids);
                                return (
                                  <Checkbox
                                    checked={state === "all"}
                                    data-state={
                                      state === "partial" ? "indeterminate" : undefined
                                    }
                                    onCheckedChange={() => toggleSection(section.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-3.5 w-3.5 flex-shrink-0 data-[state=indeterminate]:bg-primary/50 data-[state=indeterminate]:text-primary-foreground"
                                  />
                                );
                              })()}
                              <AccordionTrigger
                                className={cn(
                                  "flex-1 py-1.5 px-2 rounded-md",
                                  "hover:bg-muted/20 hover:no-underline"
                                )}
                              >
                                <span className="text-[12px] text-foreground/60 font-normal truncate flex-1 text-left">
                                  {section.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground/30 tabular-nums mr-2">
                                  {section.knowledgePoints.length}
                                </span>
                              </AccordionTrigger>
                            </div>
                            <AccordionContent className="pb-0.5 pt-0">
                              <div className="ml-2 border-l border-border/10 pl-3 space-y-0">
                                {section.knowledgePoints.map((point) => (
                                  <KnowledgePointRow
                                    key={point.id}
                                    point={point}
                                    checked={selectedSet.has(point.id)}
                                    onToggle={() => {
                                      toggleId(point.id);
                                      onPointClick?.(point, [
                                        chapter.name,
                                        section.name,
                                        point.name,
                                      ]);
                                    }}
                                  />
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {/* 空态 / 加载态 / 错误态 */}
          {treeLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <p className="text-xs text-muted-foreground/50">加载知识树…</p>
            </div>
          )}
          {!treeLoading && treeError && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 px-4">
              <p className="text-xs text-destructive/70 text-center">{treeError}</p>
              <button
                onClick={() => { setTreeLoading(true); setTreeError(null); fetch("/api/knowledge-tree").then(r => r.json()).then(res => { if (res.success) setAllStages(res.data); else setTreeError(res.error || "加载失败"); }).catch(() => setTreeError("网络错误")).finally(() => setTreeLoading(false)); }}
                className="text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                重试
              </button>
            </div>
          )}
          {!treeLoading && !treeError && !grade && searchResults === null && (
            <p className="text-xs text-muted-foreground/40 text-center py-16">
              暂无数据
            </p>
          )}
        </div>
      </ScrollArea>

      {/* ═══ 底部操作悬浮窗 ═══ */}
      {!hideActions && mode === "grade-only" && selectedIds.length > 0 && (
        <div className="flex-shrink-0 border-t border-border/20 bg-background/90 px-4 py-2.5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground/70">
            已选 <span className="text-foreground font-semibold tabular-nums">{selectedIds.length}</span> 项
          </span>
          <button onClick={clearAll} className="text-[10px] text-muted-foreground/40 hover:text-muted-foreground">
            清除全部
          </button>
        </div>
      )}
      {!hideActions && mode === "full" && (
      <div
        className={cn(
          "flex-shrink-0 border-t border-border/20 bg-background/90 backdrop-blur-sm",
          "px-4 py-3"
        )}
      >
        {/* 已选计数 + 快捷操作 */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground/70">
            已选{" "}
            <span className="text-foreground font-semibold tabular-nums">
              {selectedIds.length}
            </span>{" "}
            项
          </span>
          {selectedIds.length > 0 && (
            <button
              onClick={clearAll}
              className="text-[10px] text-muted-foreground/40 hover:text-muted-foreground transition-colors ml-auto"
            >
              清除全部
            </button>
          )}
        </div>

        {/* 标签 + 按钮 */}
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            {selectedPointsDetail.length === 0 ? (
              <p className="text-[11px] text-muted-foreground/30 pt-0.5">
                勾选章节或知识点，右侧列表将自动过滤
              </p>
            ) : (
              <div className="flex flex-wrap gap-1 max-h-[56px] overflow-y-auto">
                {selectedPointsDetail.slice(0, 8).map((point) => (
                  <Badge
                    key={point.id}
                    variant="secondary"
                    className={cn(
                      "h-5 px-1.5 gap-0.5 cursor-default text-[10px] font-normal",
                      "bg-primary/8 text-primary/80 border border-primary/10"
                    )}
                  >
                    <span className="max-w-[80px] truncate">{point.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeId(point.id);
                      }}
                      className="rounded-full hover:bg-primary/20 p-0.5 -mr-0.5"
                    >
                      <X size={9} />
                    </button>
                  </Badge>
                ))}
                {selectedPointsDetail.length > 8 && (
                  <span className="text-[10px] text-muted-foreground/40 self-center">
                    +{selectedPointsDetail.length - 8}
                  </span>
                )}
              </div>
            )}
          </div>

          <Button
            size="sm"
            disabled={selectedPointsDetail.length === 0}
            onClick={() => onGenerateExam?.(selectedPointsDetail)}
            className="h-7 px-3 text-[11px] flex-shrink-0"
          >
            基于选中项组卷
            {selectedIds.length > 0 && (
              <span className="ml-1 tabular-nums opacity-70">({selectedIds.length})</span>
            )}
          </Button>
        </div>
      </div>
      )}
    </Card>
  );
}

// ═══════════════════════════════════════════
// 知识点行 (含 Checkbox)
// ═══════════════════════════════════════════

function KnowledgePointRow({
  point,
  checked,
  onToggle,
}: {
  point: KnowledgePoint;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer",
        "transition-all duration-150",
        checked
          ? "bg-primary/[0.06]"
          : "hover:bg-muted/20"
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onToggle}
        className="h-4 w-4 flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[12px] leading-tight truncate transition-colors",
              checked ? "text-foreground font-medium" : "text-foreground/65"
            )}
          >
            {point.name}
          </span>
          {point.cognitiveLevel && (
            <span
              className={cn(
                "text-[9px] px-1.5 py-px rounded-full font-normal flex-shrink-0",
                checked
                  ? "bg-primary/10 text-primary/70"
                  : "bg-muted/50 text-muted-foreground/45"
              )}
            >
              {point.cognitiveLevel}
            </span>
          )}
        </div>
        {point.description && (
          <p className="text-[10px] text-muted-foreground/30 mt-0.5 leading-relaxed line-clamp-1">
            {point.description}
          </p>
        )}
      </div>

      {/* 题目数量 */}
      <span className="text-[10px] text-muted-foreground/30 tabular-nums flex-shrink-0">
        [{point.questionCount}题]
      </span>
    </label>
  );
}

// ═══════════════════════════════════════════
// 搜索结果行
// ═══════════════════════════════════════════

function SearchResultRow({
  point,
  chapterName,
  sectionName,
  checked,
  onToggle,
}: {
  point: KnowledgePoint;
  chapterName: string;
  sectionName: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer",
        "transition-all duration-150",
        checked
          ? "bg-primary/[0.06]"
          : "hover:bg-muted/20"
      )}
    >
      <Checkbox checked={checked} onCheckedChange={onToggle} className="h-4 w-4 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "text-[12px] block truncate",
            checked ? "text-foreground font-medium" : "text-foreground/70"
          )}
        >
          {point.name}
        </span>
        <p className="text-[10px] text-muted-foreground/30 truncate">
          {chapterName} · {sectionName}
        </p>
      </div>
      <span className="text-[10px] text-muted-foreground/30 tabular-nums flex-shrink-0">
        [{point.questionCount}题]
      </span>
    </label>
  );
}

export default QuestionTreePanel;
