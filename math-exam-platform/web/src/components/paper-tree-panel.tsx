"use client";

import { useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FolderFiles } from "@/components/winter-icons";
import { BookOpen, GraduationCap, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaperFilterSelection {
  tab: "sync" | "exam" | "all";
  version?: string;
  grade?: string;
  examType?: string;
}

const VERSIONS = ["人教版", "北师大版", "苏教版", "华师大版", "浙教版", "沪教版"];

const GRADES = [
  { label: "一年级", value: "一年级" },
  { label: "二年级", value: "二年级" },
  { label: "三年级", value: "三年级" },
  { label: "四年级", value: "四年级" },
  { label: "五年级", value: "五年级" },
  { label: "六年级", value: "六年级" },
  { label: "七年级", value: "七年级" },
  { label: "八年级", value: "八年级" },
  { label: "九年级", value: "九年级" },
];

const EXAM_TYPES = [
  { label: "期中考试", value: "期中" },
  { label: "期末考试", value: "期末" },
  { label: "单元测试", value: "单元" },
  { label: "模拟考试", value: "模拟" },
  { label: "中考真题", value: "中考" },
  { label: "课时练习", value: "课时练习" },
  { label: "专题练习", value: "专题练习" },
  { label: "竞赛", value: "竞赛" },
];

export interface PaperTreePanelProps {
  selection: PaperFilterSelection | null;
  onSelectionChange: (selection: PaperFilterSelection | null) => void;
  className?: string;
}

export function PaperTreePanel({
  selection,
  onSelectionChange,
  className,
}: PaperTreePanelProps) {
  const currentTab = selection?.tab || "all";

  const handleTabChange = useCallback(
    (tab: string) => {
      const t = tab as PaperFilterSelection["tab"];
      if (t === "all") {
        onSelectionChange({ tab: "all" });
      } else if (t === "sync") {
        onSelectionChange({ tab: "sync", version: "人教版" });
      } else if (t === "exam") {
        onSelectionChange({ tab: "exam", examType: "中考" });
      }
    },
    [onSelectionChange]
  );

  const handleVersionChange = useCallback(
    (version: string) => {
      onSelectionChange({ ...selection!, tab: "sync", version });
    },
    [selection, onSelectionChange]
  );

  const handleGradeChange = useCallback(
    (grade: string) => {
      onSelectionChange({
        ...selection!,
        grade: selection?.grade === grade ? undefined : grade,
      });
    },
    [selection, onSelectionChange]
  );

  const handleExamTypeChange = useCallback(
    (examType: string) => {
      onSelectionChange({ ...selection!, examType });
    },
    [selection, onSelectionChange]
  );

  const clearFilters = useCallback(() => {
    onSelectionChange({ tab: currentTab });
  }, [currentTab, onSelectionChange]);

  const hasActiveFilters = selection?.grade || selection?.version || selection?.examType;

  return (
    <Card
      className={cn(
        "flex flex-col h-full overflow-hidden",
        "border-border/30 shadow-sm",
        "bg-card/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex-shrink-0 px-5 pt-5 pb-3 space-y-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FolderFiles size={16} className="text-muted-foreground/50" />
            <h3 className="text-sm font-medium text-foreground tracking-wide">试卷筛选</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-[10px] text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              清除筛选
            </button>
          )}
        </div>

        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="h-8 bg-muted/40 w-full">
            <TabsTrigger
              value="sync"
              className="h-7 px-3 text-xs flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <BookOpen size={12} className="mr-1" />
              同步试题
            </TabsTrigger>
            <TabsTrigger
              value="exam"
              className="h-7 px-3 text-xs flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <GraduationCap size={12} className="mr-1" />
              中考真题
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="h-7 px-3 text-xs flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <FileText size={12} className="mr-1" />
              全部
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 py-3 space-y-4">
          {currentTab === "sync" && (
            <>
              <FilterSection title="教材版本">
                <div className="flex flex-wrap gap-1">
                  {VERSIONS.map((v) => (
                    <FilterChip
                      key={v}
                      label={v}
                      active={selection?.version === v}
                      onClick={() => handleVersionChange(v)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="年级">
                <div className="flex flex-wrap gap-1">
                  {GRADES.map((g) => (
                    <FilterChip
                      key={g.value}
                      label={g.label}
                      active={selection?.grade === g.value}
                      onClick={() => handleGradeChange(g.value)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="考试类型">
                <div className="flex flex-wrap gap-1">
                  {EXAM_TYPES.filter((e) => e.value !== "中考").map((et) => (
                    <FilterChip
                      key={et.value}
                      label={et.label}
                      active={selection?.examType === et.value}
                      onClick={() => handleExamTypeChange(et.value)}
                    />
                  ))}
                </div>
              </FilterSection>
            </>
          )}

          {currentTab === "exam" && (
            <>
              <FilterSection title="年份">
                <div className="flex flex-wrap gap-1">
                  {["2025", "2024", "2023", "2022", "2021", "2020"].map((y) => (
                    <FilterChip
                      key={y}
                      label={y + "年"}
                      active={selection?.grade === y}
                      onClick={() => handleGradeChange(y)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="地区">
                <p className="text-[11px] text-muted-foreground/40">
                  试卷库中自动展示所有地区的中考真题
                </p>
              </FilterSection>
            </>
          )}

          {currentTab === "all" && (
            <>
              <FilterSection title="年级">
                <div className="flex flex-wrap gap-1">
                  {GRADES.map((g) => (
                    <FilterChip
                      key={g.value}
                      label={g.label}
                      active={selection?.grade === g.value}
                      onClick={() => handleGradeChange(g.value)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="考试类型">
                <div className="flex flex-wrap gap-1">
                  {EXAM_TYPES.map((et) => (
                    <FilterChip
                      key={et.value}
                      label={et.label}
                      active={selection?.examType === et.value}
                      onClick={() => handleExamTypeChange(et.value)}
                    />
                  ))}
                </div>
              </FilterSection>
            </>
          )}

          {hasActiveFilters && (
            <div className="pt-2 border-t border-border/10">
              <p className="text-[10px] text-muted-foreground/40 mb-1.5">当前筛选</p>
              <div className="flex flex-wrap gap-1">
                {selection?.version && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
                    {selection.version}
                  </Badge>
                )}
                {selection?.grade && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
                    {selection.grade}
                  </Badge>
                )}
                {selection?.examType && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
                    {selection.examType}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 border-t border-border/20 bg-background/90 px-4 py-2.5">
        <p className="text-[10px] text-muted-foreground/40 text-center">
          选择筛选条件以浏览试卷库
        </p>
      </div>
    </Card>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground/40 mb-1.5 font-medium tracking-wide">{title}</p>
      {children}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 rounded-md text-[11px] transition-all duration-150 border",
        active
          ? "bg-primary/10 text-primary border-primary/20 font-medium"
          : "bg-transparent text-muted-foreground/60 border-transparent hover:bg-muted/50 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

export default PaperTreePanel;
