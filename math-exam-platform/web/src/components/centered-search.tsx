"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SnowflakeLogo, FrostCrystal, SendArrow } from "@/components/winter-icons";

const QUICK_PROMPTS = [
  "出一份七年级数学期中卷",
  "八年级上册三角形全等单元测试",
  "小学三年级趣味数学题",
  "初一下学期期末考试卷",
];

export interface CenteredSearchProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  className?: string;
}

export function CenteredSearch({ onSend, isLoading, className }: CenteredSearchProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-5">
          <SnowflakeLogo size={36} className="text-primary/80" />
          <div className="text-left">
            <h1 className="text-2xl font-light tracking-[0.15em] text-foreground">
              K12 智能组卷
            </h1>
            <p className="text-[11px] text-muted-foreground/50 tracking-[0.2em] uppercase">
              AI-Powered Exam Generator
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/70 max-w-sm mx-auto leading-relaxed">
          用自然语言描述需求，AI 即刻为你生成数学试卷
        </p>
      </div>

      <div
        className={cn(
          "relative rounded-2xl border shadow-sm transition-all duration-500",
          "card-frost",
          isFocused
            ? "border-primary/30 shadow-xl shadow-primary/5 ring-1 ring-primary/10"
            : "border-border/40 hover:border-border/60 hover:shadow-md"
        )}
      >
        <div className="flex items-start gap-3 p-5">
          <div className="flex-shrink-0 mt-1.5">
            <FrostCrystal size={22} />
          </div>
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="输入出卷指令，例如：帮我出一份七年级人教版数学期中试卷..."
            rows={2}
            disabled={isLoading}
            className={cn(
              "flex-1 border-0 bg-transparent resize-none p-0",
              "text-[15px] leading-relaxed placeholder:text-muted-foreground/40",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "min-h-[48px]"
            )}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="flex-shrink-0 h-10 w-10 rounded-xl mt-0.5"
          >
            {isLoading ? (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <SendArrow size={16} />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between px-5 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => { setInput(prompt); setTimeout(() => onSend(prompt), 100); }}
                disabled={isLoading}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[11px]",
                  "bg-muted/40 text-muted-foreground/70 hover:text-foreground",
                  "hover:bg-muted/80 transition-colors duration-200",
                  "disabled:opacity-50 border border-transparent hover:border-border/30"
                )}
              >
                {prompt}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground/30 flex-shrink-0 ml-3">回车发送</span>
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/30 mt-8 tracking-wider">
        K12 智能组卷 · AI 出卷 · 题库管理 · 试卷库 · 全学段多版本
      </p>
    </div>
  );
}

export default CenteredSearch;
