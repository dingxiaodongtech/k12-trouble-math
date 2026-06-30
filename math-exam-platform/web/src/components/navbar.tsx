"use client";

/**
 * 浮岛式导航栏 — 顶部居中的毛玻璃胶囊
 */

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SnowflakeSmall } from "@/components/winter-icons";

const NAV_ITEMS = [
  { href: "/question-bank", label: "试题库" },
  { href: "/builder", label: "智能组卷" },
  { href: "/paper-bank", label: "试卷库" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1.5 rounded-full",
          "bg-white/70 dark:bg-slate-900/70",
          "backdrop-blur-md",
          "border border-slate-200/60 dark:border-slate-700/50",
          "shadow-lg shadow-slate-200/40 dark:shadow-black/30"
        )}
      >
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm",
            "transition-colors duration-200",
            pathname === "/"
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-foreground"
          )}
        >
          <SnowflakeSmall size={14} className="text-primary/60" />
          <span className="font-medium tracking-wide hidden sm:inline">K12</span>
        </button>

        {/* 分隔线 */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* 导航项 */}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-all duration-200",
                isActive
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
