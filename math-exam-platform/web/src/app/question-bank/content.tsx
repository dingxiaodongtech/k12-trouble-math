"use client";

/**
 * 试题库 — 左树右表
 * 左侧: QuestionTreePanel (独立滚动)
 * 右侧: 搜索 + 题目卡片 (独立滚动)
 */

import { useState, useMemo, useEffect, useRef } from "react";
import { QuestionTreePanel } from "@/components/question-tree-panel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MathRenderer } from "@/components/math-renderer";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  MC: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  FB: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  SA: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  PR: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
};

const TYPE_LABELS: Record<string, string> = {
  "单选题": "选择题", "多选题": "选择题", "选择题": "选择题",
  "填空题": "填空题", "判断题": "判断题",
  "解答题": "解答题", "计算题": "解答题", "应用题": "解答题",
  "证明题": "证明题", "作图题": "作图题",
  MC: "选择题", FB: "填空题", TF: "判断题", SA: "解答题", PR: "证明题", AP: "作图题",
};

// 筛选选项 — key 用中文标签值，与 TYPE_LABELS 映射后匹配
const TYPE_FILTERS = [
  { key: "", label: "全部题型" },
  { key: "选择题", label: "选择题" },
  { key: "填空题", label: "填空题" },
  { key: "判断题", label: "判断题" },
  { key: "解答题", label: "解答题" },
  { key: "证明题", label: "证明题" },
];

// 特征筛选 — 基于数据中的 feature 字段（非 cognitive_level，该字段为空）
const COG_FILTERS = [
  { key: "", label: "全部特征" },
  { key: "应用", label: "应用" },
  { key: "性质", label: "性质" },
  { key: "算法", label: "算法" },
  { key: "定义", label: "定义" },
  { key: "数形结合", label: "数形结合" },
  { key: "证明", label: "证明" },
];

const PAGE_SIZE = 30;

export default function QuestionBankContent({ initialQuestions }: { initialQuestions: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [questions] = useState<any[]>(initialQuestions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [cogFilter, setCogFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // 知识树点击时记录选中知识点名称用于筛选
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());
  // DB 标签：从知识树 API 交叉查询得到的实际题目标签名
  const [dbTags, setDbTags] = useState<Set<string>>(new Set());

  // 选中知识点名称集合
  const selectedNameSet = useMemo(() => selectedNames, [selectedNames]);
  const dbTagSet = useMemo(() => dbTags, [dbTags]);

  const filtered = useMemo(() => {
    let list = questions;
    // 优先用 dbTags（数据库真实标签），其次用 selectedNames（KP 名称）
    const tagsToMatch = dbTags.size > 0 ? [...dbTags] : [...selectedNames];
    if (tagsToMatch.length > 0) {
      list = list.filter((q) => {
        const kpName = q.kp_name || "";
        const kpPath: string[] = Array.isArray(q.kp_path) ? q.kp_path : [];
        const secKps: Array<{kp_name?: string; kp_path?: string[]}> = Array.isArray(q.secondary_kps) ? q.secondary_kps : [];
        const textbookKpName = q.textbook_kp_name || "";
        const textbookKpPath: string[] = Array.isArray(q.textbook_kp_path) ? q.textbook_kp_path : [];

        for (const tag of tagsToMatch) {
          // 1. 精确匹配：主知识点名称
          if (kpName === tag) return true;
          // 2. 主知识点路径中的任意层级
          if (kpPath.some((p: string) => p === tag)) return true;
          // 3. 课内知识点名称
          if (textbookKpName === tag) return true;
          // 4. 课内知识点路径中的任意层级
          if (textbookKpPath.some((p: string) => p === tag)) return true;
          // 5. 次知识点名称或路径
          if (secKps.some((s: {kp_name?: string; kp_path?: string[]}) =>
            s.kp_name === tag || (Array.isArray(s.kp_path) && s.kp_path.some((p: string) => p === tag))
          )) return true;
        }

        // 回退：全文搜索 stem + analysis（仅对无 kp_name 的题目）
        if (!kpName && !textbookKpName) {
          const text = ((q.stem || "") + " " + (q.analysis || "")).toLowerCase();
          for (const tag of tagsToMatch) {
            if (text.includes(tag.toLowerCase())) return true;
          }
        }

        return false;
      });
    }
    // 按题型过滤 — 数据中 subject_type 是中文（如"单选题"），需用 TYPE_LABELS 映射后匹配
    if (typeFilter) {
      list = list.filter((q) => {
        const st = q.subject_type || q.question_type || "";
        const displayType = TYPE_LABELS[st] || st;
        return displayType === typeFilter;
      });
    }
    // 按特征过滤 — 数据中 feature 字段（如"应用"、"性质"、"算法"）
    if (cogFilter) {
      list = list.filter((q) => {
        const feature = q.feature || "";
        return feature === cogFilter || feature.includes(cogFilter);
      });
    }
    // 按搜索词过滤
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
    }
    return list;
  }, [questions, search, selectedIds, selectedNames, typeFilter, cogFilter]);

  // 分页
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // 筛选条件变化时回到第1页
  const filterKey = `${selectedIds.join(",")}|${search}|${typeFilter}|${cogFilter}`;
  const prevFilterKey = useRef(filterKey);
  useEffect(() => {
    if (prevFilterKey.current !== filterKey) {
      prevFilterKey.current = filterKey;
      setCurrentPage(1);
    }
  }, [filterKey]);

  return (
    <div className="h-full flex">
      {/* ═══ 左侧: 知识树 ═══ */}
      <aside className="w-72 lg:w-80 flex-shrink-0 border-r border-border/20">
        <QuestionTreePanel
          mode="full"
          hideActions
          selectedIds={selectedIds}
          onSelectionChange={(ids, names, tags) => {
            setSelectedIds(ids);
            setSelectedNames(new Set(names));
            setDbTags(new Set(tags));
          }}
          onPointClick={(point) => {
            // onPointClick 已由 onSelectionChange 覆盖，保留接口兼容
          }}
          className="h-full border-0 shadow-none rounded-none bg-transparent"
        />
      </aside>

      {/* ═══ 右侧: 题目列表 ═══ */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-shrink-0 px-6 py-4 border-b border-border/20 bg-background">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/35" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索题目内容..."
                className="h-9 pl-9 text-sm rounded-xl bg-muted/20 border-transparent focus-visible:ring-1"
              />
            </div>
            <span className="text-[11px] text-muted-foreground/50 flex-shrink-0">
              {`${filtered.length} 道题 · 第 ${safePage}/${totalPages} 页`}
            </span>
          </div>
        </div>

        {/* 筛选条 */}
        <div className="flex-shrink-0 px-6 py-2.5 border-b border-border/10 bg-background/50 space-y-2">
          {/* 题型 */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground/40 w-10 flex-shrink-0">题型</span>
            <div className="flex gap-1 flex-wrap">
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(typeFilter === f.key ? "" : f.key)}
                  className={cn(
                    "px-2.5 py-0.5 rounded-md text-[11px] transition-all duration-150 border",
                    typeFilter === f.key
                      ? "bg-primary/10 text-primary border-primary/20 font-medium"
                      : "bg-transparent text-muted-foreground/60 border-transparent hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          {/* 特征 */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground/40 w-10 flex-shrink-0">特征</span>
            <div className="flex gap-1 flex-wrap">
              {COG_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setCogFilter(cogFilter === f.key ? "" : f.key)}
                  className={cn(
                    "px-2.5 py-0.5 rounded-md text-[11px] transition-all duration-150 border",
                    cogFilter === f.key
                      ? "bg-primary/10 text-primary border-primary/20 font-medium"
                      : "bg-transparent text-muted-foreground/60 border-transparent hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-sm text-muted-foreground/35">
                  {selectedIds.length > 0 ? "当前知识点下暂无题目" : "请在左侧勾选知识点以筛选题目"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {paginated.map((q) => (
                  <QuestionCard key={`${q._file}-${q.id}`} q={q} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ═══ 底部页数选择器 ═══ */}
        <div className="flex-shrink-0 border-t border-border/20 bg-background/90 backdrop-blur-sm px-4 py-3 flex items-center justify-center gap-1">
          <PageSelector
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}

function QuestionCard({ q }: { q: any }) {
  const [showAnswer, setShowAnswer] = useState(false);

  // 提取 image_urls（JSON 原始字段）
  const imageUrls: Record<string, string> | undefined = q.image_urls || undefined;

  // JSON 数据字段: stem / answer / analysis / subject_type / options / kp_code / kp_name
  // 防御：stem 可能是对象/数组而非字符串
  let stem = typeof q.stem === "string" ? q.stem : (typeof q.question_text === "string" ? q.question_text : "");
  let analysis = typeof q.analysis === "string" ? q.analysis : (typeof q.solution === "string" ? q.solution : "");
  let answerText = "";

  // answer 可能是字符串、对象、数组（填空）
  if (typeof q.answer === "string") {
    answerText = q.answer;
  } else if (Array.isArray(q.answer)) {
    // 填空答案数组 → 拼接 display_answer
    answerText = q.answer.map((a: any) => a.display_answer || a.value || "").join("；");
  } else if (q.answer && typeof q.answer === "object") {
    answerText = q.answer.value || q.answer.text || "";
  }

  // options 可能是字符串数组或对象数组
  let optionLabels: string[] = [];
  if (Array.isArray(q.options)) {
    optionLabels = q.options.map((o: any) => {
      if (typeof o === "string") return o;
      if (o && typeof o === "object") return o.content || o.label || String(o);
      return String(o);
    }).filter(Boolean);
  }

  // 如果 stem 本身是 JSON 字符串（部分旧数据），尝试解析
  if (stem.startsWith("{") && stem.endsWith("}")) {
    try {
      const parsed = JSON.parse(stem);
      if (parsed.stem) stem = parsed.stem;
      if (parsed.analysis && !analysis) analysis = parsed.analysis;
      if (parsed.options && Array.isArray(parsed.options) && optionLabels.length === 0) {
        optionLabels = parsed.options.filter(Boolean).map((o: any) =>
          typeof o === "string" ? o : (o.content || o.label || String(o))
        );
      }
    } catch {}
  }

  const subjectType = q.subject_type || q.question_type || "";
  const displayType = TYPE_LABELS[subjectType] || subjectType || "题目";
  const hasAnswer = !!answerText || !!analysis;
  const typeColor = TYPE_COLORS[subjectType] || TYPE_COLORS.SA;

  return (
    <Card
      className={cn(
        "border-border/20 bg-card/50 transition-colors group/qcard cursor-pointer",
        showAnswer && "ring-1 ring-blue-200 dark:ring-blue-800"
      )}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <span className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-[11px] text-muted-foreground/60 font-mono flex-shrink-0 mt-0.5">
            {q.id}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="outline" className={`h-4 px-1.5 text-[9px] font-normal ${typeColor}`}>
                {displayType}
              </Badge>
              {(q._source || q._paper) && (
                <span className="text-[10px] text-muted-foreground/40 font-medium">
                  {q._source || q._paper}
                </span>
              )}
              {(q.kp_name || q.textbook_kp_name) && (
                <span className="text-[10px] text-muted-foreground/30">
                  {q.kp_name || q.textbook_kp_name}
                </span>
              )}
            </div>

            <div className="text-[14px] text-foreground leading-relaxed mt-1 stem-text">
              <MathRenderer content={stem} imageUrls={imageUrls} imgContext="stem" />
            </div>

            {/* 选项展示 */}
            {optionLabels.length > 0 && (
              <div className="mt-2 space-y-0.5">
                {optionLabels.map((opt: string, i: number) => (
                  <div key={i} className="flex items-start gap-1.5 text-[13px] text-foreground/80 pl-1 option-content">
                    <span className="font-medium flex-shrink-0 w-5">{String.fromCharCode(65 + i)}.</span>
                    <MathRenderer content={opt} imageUrls={imageUrls} imgContext={`option_${String.fromCharCode(65 + i)}`} />
                  </div>
                ))}
              </div>
            )}

            {/* 可折叠答案 & 解析 */}
            {hasAnswer && showAnswer && (
              <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {answerText && (
                  <div className="rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-[9px] font-bold text-emerald-700 dark:text-emerald-300">✓</span>
                      <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-200">答案</span>
                    </div>
                    <div className="text-[12px] leading-relaxed text-emerald-900/80 dark:text-emerald-100/80 pl-6">
                      <MathRenderer content={answerText} imageUrls={imageUrls} imgContext="answer" />
                    </div>
                  </div>
                )}
                {analysis && (
                  <div className="rounded-lg bg-muted/30 dark:bg-muted/10 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-medium text-muted-foreground">解析</span>
                    </div>
                    <div className="text-[12px] leading-relaxed text-muted-foreground">
                      <MathRenderer content={analysis} imageUrls={imageUrls} imgContext="analysis" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ═══════════════════════════════════════
// 页数选择器 — 冬季主题
// ═══════════════════════════════════════

function PageSelector({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  // 计算可见页码: 当前页 ± 2
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center gap-1">
      <PageBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} label="‹" />
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dot-${i}`} className="w-8 h-8 flex items-center justify-center text-[11px] text-muted-foreground/30">…</span>
        ) : (
          <PageBtn
            key={p}
            onClick={() => onPageChange(p as number)}
            active={currentPage === p}
            label={String(p)}
          />
        )
      )}
      <PageBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} label="›" />
    </div>
  );
}

function PageBtn({
  onClick,
  disabled,
  active,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-8 h-8 rounded-lg text-[12px] font-medium transition-all duration-150",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {label}
    </button>
  );
}
