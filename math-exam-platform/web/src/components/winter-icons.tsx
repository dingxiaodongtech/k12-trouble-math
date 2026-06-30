/**
 * 晓冬 · 冬季主题图标系统
 *
 * 极简几何风格，冷感高级美学。
 * 全部为纯 SVG，支持深色/浅色模式通过 currentColor 继承。
 */

import { cn } from "@/lib/utils";

// ── 基础 Props ──

interface IconProps {
  className?: string;
  size?: number;
}

// ═══════════════════════════════════════════
// 品牌标识
// ═══════════════════════════════════════════

/** 六角雪花 — 主品牌 Logo */
export function SnowflakeLogo({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-foreground", className)}
    >
      {/* 六角主干 */}
      <path d="M12 2v20M2 12h20" />
      <path d="M12 2L7.5 4.5 12 7 16.5 4.5z" />
      <path d="M12 17l-4.5 2.5L12 22l4.5-2.5z" />
      <path d="M2 12l2.5-4.5L7 12l-2.5 4.5z" />
      <path d="M17 12l2.5-4.5L22 12l-2.5 4.5z" />
      {/* 对角分支 */}
      <path d="M12 7L5.5 4l4 6.5M12 17l-6.5 3 4-6.5" />
      <path d="M12 7l6.5-3-4 6.5M12 17l6.5 3-4-6.5" />
    </svg>
  );
}

/** 小雪花 — 装饰用 */
export function SnowflakeSmall({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-foreground/40", className)}
    >
      <path d="M8 1v14M1 8h14" />
      <path d="M8 1L5 3l3 2 3-2zM8 11l-3 2 3 2 3-2z" />
      <path d="M1 8l2-3 2 3-2 3zM11 8l2-3 2 3-2 3z" />
    </svg>
  );
}

/** 冰晶 — AI/智能标识 */
export function FrostCrystal({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
    >
      <path d="M12 2l2 4-2 4-2-4z" />
      <path d="M12 14l2 4-2 4-2-4z" />
      <path d="M2 12l4-2 4 2-4 2z" />
      <path d="M14 12l4-2 4 2-4 2z" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2" />
    </svg>
  );
}

// ═══════════════════════════════════════════
// 导航/功能图标
// ═══════════════════════════════════════════

/** 菱形 — 选择题 */
export function DiamondChoice({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-blue-500 dark:text-blue-400", className)}
    >
      <rect x="5" y="1" width="6" height="6" rx="1" transform="rotate(45 8 4)" />
    </svg>
  );
}

/** 方框 — 填空题 */
export function SquareFill({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-emerald-500 dark:text-emerald-400", className)}
    >
      <rect x="3" y="3" width="10" height="10" rx="1.5" />
      <path d="M5.5 8h5" />
    </svg>
  );
}

/** 笔锋 — 解答题 */
export function PenStroke({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-violet-500 dark:text-violet-400", className)}
    >
      <path d="M11 2l3 3-9 9H2v-3z" />
      <path d="M10 3l3 3" />
    </svg>
  );
}

/** 三角 — 证明题 */
export function TriangleProof({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-amber-500 dark:text-amber-400", className)}
    >
      <path d="M8 2l7 12H1z" />
      <path d="M5 12h6" />
    </svg>
  );
}

/** 星形 — 应用题 */
export function StarApp({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-rose-500 dark:text-rose-400", className)}
    >
      <path d="M8 1.5l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5L3 6h4.5z" />
    </svg>
  );
}

/** 题型图标映射 */
export const QuestionTypeIcon: Record<string, typeof DiamondChoice> = {
  MC: DiamondChoice,
  FB: SquareFill,
  SA: PenStroke,
  PR: TriangleProof,
  AP: StarApp,
};

// ═══════════════════════════════════════════
// 功能入口图标
// ═══════════════════════════════════════════

/** 编辑笔 — 人工组卷 */
export function EditQuill({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-blue-600 dark:text-blue-400", className)}
    >
      <path d="M13.5 3.5l3 3L7 16H4v-3z" />
      <path d="M12 5l3 3" />
      <path d="M5 12l-2 5 5-2" />
    </svg>
  );
}

/** 层叠卡片 — 试题库 */
export function StackCards({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-emerald-600 dark:text-emerald-400", className)}
    >
      <rect x="2" y="2" width="12" height="15" rx="1.5" />
      <rect x="6" y="4" width="12" height="15" rx="1.5" />
      <path d="M8 8h8M8 11h8M8 14h5" />
    </svg>
  );
}

/** 文件夹 — 试卷库 */
export function FolderFiles({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-violet-600 dark:text-violet-400", className)}
    >
      <path d="M2 4.5V15a2 2 0 002 2h12a2 2 0 002-2V6a1 1 0 00-1-1h-7L8 3H3a1 1 0 00-1 1v.5z" />
    </svg>
  );
}

// ═══════════════════════════════════════════
// 状态/装饰图标
// ═══════════════════════════════════════════

/** 山脉 — 知识点 */
export function MountainPeak({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-muted-foreground", className)}
    >
      <path d="M1 12l4-7 3 4 3-6 2 9z" />
      <path d="M7 5l1.5-1.5" />
    </svg>
  );
}

/** 寒风线条 — 进度/加载 */
export function WindLines({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      className={cn("text-muted-foreground animate-pulse", className)}
    >
      <path d="M2 6h10a2 2 0 002-2" />
      <path d="M4 10h12" />
      <path d="M2 14h8a2 2 0 012 2" />
    </svg>
  );
}

/** 霜花 — 分隔/点缀 */
export function FrostDot({ className, size = 6 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6 6"
      fill="currentColor"
      className={cn("text-primary/30", className)}
    >
      <circle cx="1" cy="3" r="0.7" />
      <circle cx="5" cy="3" r="0.7" />
      <circle cx="3" cy="1" r="0.7" />
      <circle cx="3" cy="5" r="0.7" />
    </svg>
  );
}

/** 冰柱分割线 */
export function IceDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <FrostCrystal size={12} className="text-border/50" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/40 to-transparent" />
    </div>
  );
}

/** 搜索/发送箭头 */
export function SendArrow({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
    >
      <path d="M1 8h12M9 4l4 4-4 4" />
    </svg>
  );
}

/** 返回箭头 */
export function BackArrow({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
    >
      <path d="M13 7H3M6 2l-5 5 5 5" />
    </svg>
  );
}

/** 刷新/换一题 */
export function RefreshCircle({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
    >
      <path d="M1.5 5.5A5 5 0 0111.5 3l2-1.5" />
      <path d="M12.5 8.5A5 5 0 012.5 11l-2 1.5" />
    </svg>
  );
}

/** 展开/折叠箭头 */
export function ChevronRight({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
    >
      <path d="M5 2l5 5-5 5" />
    </svg>
  );
}
