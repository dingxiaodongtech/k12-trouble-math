"use client";

/**
 * AI 对话组件 — 极简悬浮式
 *
 * 交互模式:
 * - 未激活: 右下角圆形按钮 (渐变光晕)
 * - 已激活: 右下角弹出面板，320×480px
 * - 支持快捷指令 (chips)
 * - 流式/模拟流式输出
 * - 深色模式完整适配
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ── 消息类型 ──

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  isError?: boolean;
}

// ── 快捷指令 ──

interface QuickAction {
  label: string;
  prompt: string;
  icon: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: "组一份期中卷", prompt: "帮我组一份初一下学期数学期中考试卷，人教版，满分100分", icon: "📝" },
  { label: "出单元测试", prompt: "出一份八年级上册三角形全等单元测试卷", icon: "📐" },
  { label: "出10道选择题", prompt: "生成10道关于一元二次方程的选择题，难度中等", icon: "🎯" },
  { label: "分析试卷", prompt: "帮我分析这份试卷的难度分布和知识点覆盖情况", icon: "📊" },
  { label: "验证答案", prompt: "帮我验证这道题的答案是否正确", icon: "✓" },
  { label: "生成变体题", prompt: "基于这道题生成3道难度递增的变体题", icon: "🔄" },
];

// ── Props ──

export interface AIChatBoxProps {
  /** 发送消息回调 (返回 AI 回复) */
  onSend?: (message: string) => Promise<string>;
  /** 自定义类名 */
  className?: string;
  /** 面板位置 */
  position?: "bottom-right" | "bottom-left";
  /** 初始是否展开 */
  defaultExpanded?: boolean;
  /** 占位文本 */
  placeholder?: string;
  /** 标题 */
  title?: string;
}

// ── 组件 ──

export function AIChatBox({
  onSend,
  className,
  position = "bottom-right",
  defaultExpanded = false,
  placeholder = "输入你的需求，例如：帮我组一份初一期中数学卷...",
  title = "AI 助手",
}: AIChatBoxProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 展开时自动聚焦
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isExpanded]);

  // ── 发送消息 ──

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const trimmed = content.trim();
      setInput("");
      setShowQuickActions(false);
      setIsLoading(true);

      // 添加用户消息
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // 添加 AI 占位消息 (流式效果)
      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, aiMsg]);

      try {
        if (onSend) {
          // 使用提供的回调
          const reply = await onSend(trimmed);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId
                ? { ...m, content: reply, isStreaming: false }
                : m
            )
          );
        } else {
          // 模拟流式输出
          await simulateStream(aiMsgId, trimmed, setMessages);
        }
      } catch (err) {
        const errorText = err instanceof Error ? err.message : "发生错误，请重试";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? { ...m, content: errorText, isStreaming: false, isError: true }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, onSend]
  );

  // ── 键盘处理 ──

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ── 快捷指令 ──

  const handleQuickAction = (action: QuickAction) => {
    if (isExpanded) {
      sendMessage(action.prompt);
    } else {
      setIsExpanded(true);
      setTimeout(() => sendMessage(action.prompt), 300);
    }
  };

  // ── 位置样式 ──

  const positionClasses =
    position === "bottom-right"
      ? "right-4 sm:right-6 bottom-4 sm:bottom-6"
      : "left-4 sm:left-6 bottom-4 sm:bottom-6";

  // ── 渲染 ──

  return (
    <div className={cn("fixed z-50", positionClasses, className)}>
      {/* ── 展开面板 ── */}
      {isExpanded && (
        <Card
          className={cn(
            "w-[calc(100vw-2rem)] sm:w-[380px] h-[520px]",
            "flex flex-col overflow-hidden",
            "shadow-2xl shadow-black/10 dark:shadow-black/40",
            "border-border/60",
            "animate-in slide-in-from-bottom-4 fade-in duration-200",
            "bg-card/95 backdrop-blur-xl"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                )}
              />
              <span className="text-sm font-medium text-foreground">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setMessages([])}
                title="清空对话"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsExpanded(false)}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1" ref={scrollRef as React.RefObject<HTMLDivElement>}>
            <div className="p-4 space-y-4">
              {messages.length === 0 && showQuickActions && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground/60 text-center">
                    你可以直接输入需求，或选择快捷指令：
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.slice(0, 4).map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleQuickAction(action)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full",
                          "text-xs border border-border/60",
                          "bg-background hover:bg-muted/50",
                          "transition-colors duration-150",
                          "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span>{action.icon}</span>
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {isLoading && messages.length === 0 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse px-1">
                  <span>AI 正在思考</span>
                  <span className="flex gap-0.5">
                    <span className="animate-bounce delay-0">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-border/40 bg-muted/20">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={1}
                disabled={isLoading}
                className={cn(
                  "min-h-[40px] max-h-[120px] resize-none text-sm",
                  "bg-background border-border/60",
                  "placeholder:text-muted-foreground/50"
                )}
              />
              <Button
                size="icon"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 flex-shrink-0"
              >
                {isLoading ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground/40 mt-1.5 text-center">
              回车发送 · Shift+回车换行
            </p>
          </div>
        </Card>
      )}

      {/* ── 折叠按钮 ── */}
      {!isExpanded && (
        <div className="relative group">
          {/* 光晕 */}
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-xl opacity-60",
              "bg-gradient-to-tr from-primary/30 via-primary/20 to-transparent",
              "group-hover:opacity-80 transition-opacity duration-300",
              "animate-pulse"
            )}
            style={{ transform: "scale(1.4)" }}
          />

          {/* 按钮主体 */}
          <Button
            onClick={() => setIsExpanded(true)}
            size="icon"
            className={cn(
              "relative h-14 w-14 rounded-full",
              "shadow-lg shadow-black/20 dark:shadow-black/40",
              "bg-card hover:bg-card/90",
              "border border-border/40",
              "transition-all duration-200",
              "hover:scale-105 active:scale-95"
            )}
          >
            <svg
              className="h-6 w-6 text-foreground/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
              />
            </svg>
          </Button>

          {/* 提示文字 */}
          <div
            className={cn(
              "absolute bottom-full mb-3 right-0",
              "px-3 py-1.5 rounded-lg text-xs",
              "bg-foreground text-background",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "whitespace-nowrap pointer-events-none"
            )}
          >
            AI 助手 · 输入出卷指令
          </div>
        </div>
      )}

      {/* ── 快捷指令浮层 (折叠态悬浮) ── */}
      {!isExpanded && (
        <div className="absolute bottom-20 right-0 w-56 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {QUICK_ACTIONS.slice(0, 3).map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-xs",
                "bg-card/90 backdrop-blur border border-border/40",
                "text-muted-foreground hover:text-foreground",
                "shadow-lg shadow-black/10",
                "transition-all duration-150 pointer-events-auto"
              )}
            >
              <span className="mr-2">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 消息气泡子组件 ──

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : message.isError
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-muted text-foreground/90 rounded-bl-md"
        )}
      >
        {message.isStreaming && !message.content ? (
          <span className="flex gap-1 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        )}
      </div>
      <span className="text-[10px] text-muted-foreground/40 px-1">
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}

// ── 模拟流式输出 ──

const SIMULATED_REPLIES: Record<string, string> = {
  default:
    "好的，我已收到你的需求。\n\n正在为你进行以下操作：\n\n🔍 1. 解析出卷要求（年级、题型、知识点范围）\n📋 2. 设计双向细目表，确保难度分布合理\n🔎 3. 从题库检索或生成匹配的题目\n📦 4. 组装成结构化的试卷 JSON\n\n预计需要 30-60 秒，请稍候...",
  "组卷":
    "好的，我来为你设计一份试卷。\n\n**📝 试卷方案：**\n- 选择题 10题 × 3分 = 30分\n- 填空题 5题 × 4分 = 20分\n- 解答题 5题 × 10分 = 50分\n\n📊 总分：100分 | ⏱ 时长：90分钟\n📚 知识点覆盖：15+ 个核心知识点\n\n正在启动出卷流水线...",
  "分析":
    "**📊 试卷分析结果：**\n\n| 指标 | 数值 | 评价 |\n|------|------|------|\n| 总题数 | 25 | ✅ |\n| 知识点覆盖 | 18/20 | ✅ 90% |\n| 难度分布 | 易50% 中30% 难20% | ✅ 合理 |\n| 认知层级 | L1-L5 全覆盖 | ✅ |\n\n整体评价：知识点覆盖较为全面，难度分布合理。",
};

async function simulateStream(
  msgId: string,
  userInput: string,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
): Promise<void> {
  // 选择回复
  let reply = SIMULATED_REPLIES.default;
  if (userInput.includes("组卷") || userInput.includes("出卷") || userInput.includes("生成")) {
    reply = SIMULATED_REPLIES["组卷"];
  } else if (userInput.includes("分析")) {
    reply = SIMULATED_REPLIES["分析"];
  }

  // 逐字输出
  for (let i = 0; i <= reply.length; i++) {
    const partial = reply.slice(0, i);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, content: partial } : m
      )
    );
    await new Promise((r) => setTimeout(r, 15 + Math.random() * 25));
  }

  // 标记完成
  setMessages((prev) =>
    prev.map((m) =>
      m.id === msgId ? { ...m, isStreaming: false } : m
    )
  );
}

export default AIChatBox;
