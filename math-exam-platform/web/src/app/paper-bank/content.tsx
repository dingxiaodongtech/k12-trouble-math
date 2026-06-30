"use client";

/**
 * 试卷库 — 左筛选右列表
 */

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PaperTreePanel, type PaperFilterSelection } from "@/components/paper-tree-panel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FolderFiles } from "@/components/winter-icons";
import { Search, Clock, Hash, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Paper {
  id: string; title: string; version: string; grade: string;
  examType: string; questions: number; score?: number; duration?: number;
  tags: string[]; status: "已发布" | "草稿";
  year?: string; region?: string;
}

export default function PaperBankContent({ initialPapers }: { initialPapers: Paper[] }) {
  const router = useRouter();
  const [selection, setSelection] = useState<PaperFilterSelection | null>(null);
  const [search, setSearch] = useState("");
  const [papers] = useState<Paper[]>(initialPapers);

  const filtered = useMemo(() => {
    let list = papers;
    if (selection) {
      // 按年级过滤（全部 tab / 同步试题 tab 共用）
      if (selection.grade && selection.tab !== "exam") {
        list = list.filter((p) => p.grade && p.grade.includes(selection.grade!));
      }
      // 按考试类型过滤
      if (selection.examType && selection.tab !== "exam") {
        list = list.filter((p) => p.examType && p.examType.includes(selection.examType!));
      }
      // 中考真题 tab：单独逻辑
      if (selection.tab === "exam") {
        list = list.filter((p) => p.examType === "中考");
        if (selection.grade) {
          list = list.filter((p) => p.year && p.year.includes(selection.grade!));
        }
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    return list;
  }, [papers, selection, search]);

  const publishedCount = papers.filter((p) => p.status === "已发布").length;

  return (
    <div className="h-full flex">
      {/* ═══ 左侧: 试卷筛选树 ═══ */}
      <aside className="w-72 lg:w-[300px] flex-shrink-0 border-r border-border/20 bg-muted/10">
        <PaperTreePanel
          selection={selection}
          onSelectionChange={setSelection}
          className="h-full border-0 shadow-none rounded-none bg-transparent"
        />
      </aside>

      {/* ═══ 右侧: 试卷列表 ═══ */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-shrink-0 px-6 py-4 border-b border-border/20 bg-background">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/35" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索试卷标题..."
                className="h-9 pl-9 text-sm rounded-xl bg-muted/20 border-transparent focus-visible:ring-1"
              />
            </div>
            <span className="text-[11px] text-muted-foreground/40 flex-shrink-0 tabular-nums">
              {filtered.length} 份试卷
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <FolderFiles size={40} className="text-muted-foreground/15 mb-4" />
                <p className="text-sm text-muted-foreground/35">
                  {selection ? "当前筛选条件无匹配试卷" : "暂无试卷数据"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filtered.map((paper) => (
                  <PaperCard key={paper.id} paper={paper} onClick={() => router.push(`/paper/${encodeURIComponent(paper.id)}`)} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 px-6 py-2.5 border-t border-border/20 bg-muted/10 text-[11px] text-muted-foreground/40 flex items-center justify-between">
          <span>共 {filtered.length} 份试卷</span>
          <span>{publishedCount} 已发布</span>
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════
// 试卷卡片
// ═══════════════════════════════════════

function PaperCard({ paper, onClick }: { paper: Paper; onClick?: () => void }) {
  return (
    <Card onClick={onClick} className="border-border/20 bg-card/50 hover:bg-card/80 hover:-translate-y-0.5 transition-all cursor-pointer group">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <FolderFiles size={18} className="text-muted-foreground/25 flex-shrink-0 mt-0.5" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium text-foreground/80 truncate">{paper.title}</p>
              <Badge
                variant="outline"
                className={cn(
                  "h-4 px-1.5 text-[9px] font-normal flex-shrink-0",
                  paper.status === "已发布"
                    ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-950"
                    : "text-amber-600 border-amber-200 bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-950"
                )}
              >
                {paper.status}
              </Badge>
            </div>

            {/* 元数据行 */}
            <div className="flex items-center gap-3 mt-2.5 text-[11px] text-muted-foreground/45 flex-wrap">
              <span className="flex items-center gap-1"><Clock size={10} />{paper.duration || 90}分钟</span>
              <span className="flex items-center gap-1"><Hash size={10} />{paper.questions}题</span>
              <span className="flex items-center gap-1"><Target size={10} />{paper.score || 100}分</span>
              <span>{paper.grade}</span>
              <span>{paper.examType}</span>
            </div>

            {/* 标签 */}
            {paper.tags.some(t => t) && (
              <div className="flex flex-wrap gap-1 mt-2.5">
                {paper.tags.filter(Boolean).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] bg-muted/40 text-muted-foreground/50">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
