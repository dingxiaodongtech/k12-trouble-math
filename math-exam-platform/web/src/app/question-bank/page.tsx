"use client";

/**
 * 试题库 — 客户端渲染，避免 SSR 加载全部 1193 题导致卡顿
 * 数据通过 /api/questions 异步获取
 */

import { useState, useEffect } from "react";
import QuestionBankContent from "./content";

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/questions?limit=2000")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setQuestions(res.data || []);
        } else {
          setError(res.error || "加载失败");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-sm text-muted-foreground/50">加载题库中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-sm text-destructive/70">加载失败: {error}</p>
          <button
            onClick={() => { setError(null); setLoading(true); fetch("/api/questions?limit=2000").then(r => r.json()).then(res => { if (res.success) setQuestions(res.data || []); else setError(res.error || "加载失败"); }).catch(err => setError(err.message)).finally(() => setLoading(false)); }}
            className="px-4 py-2 text-xs rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return <QuestionBankContent initialQuestions={questions} />;
}
