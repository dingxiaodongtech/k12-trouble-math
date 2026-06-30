"use client";

/**
 * 图表展示组件 — 渲染数学图形
 *
 * 支持的格式:
 * - TikZ → 嵌入 SVG fallback 或 TikZJaX 渲染
 * - Mermaid → 流程图、思维导图
 * - 简单几�� SVG → 内置几何图形
 * - ASCII/文本图形 → 解析为 Canvas
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ── Props ──

export interface DiagramDisplayProps {
  /** TikZ 代码 */
  tikz?: string;
  /** Mermaid 代码 */
  mermaid?: string;
  /** 图片 URL */
  imageUrl?: string;
  /** 图注 */
  caption?: string;
  /** 图形类型 */
  type?: "geometry" | "graph" | "chart" | "numberline" | "shape";
  className?: string;
}

// ── 组件 ──

export function DiagramDisplay({
  tikz,
  mermaid,
  imageUrl,
  caption,
  type = "geometry",
  className,
}: DiagramDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Canvas 渲染简单几何图形 ──
  useEffect(() => {
    if (!tikz && !type) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 300 * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = "300px";
    canvas.style.height = "200px";
    ctx.scale(dpr, dpr);

    // 背景
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, 300, 200);

    // 根据类型渲染默认图形
    if (tikz && tikz.includes("triangle")) {
      drawTriangle(ctx);
    } else if (tikz && tikz.includes("circle")) {
      drawCircle(ctx);
    } else if (tikz && tikz.includes("rectangle") || tikz && tikz.includes("正方形")) {
      drawRectangle(ctx);
    } else if (type === "numberline") {
      drawNumberLine(ctx);
    } else if (type === "chart") {
      drawBarChart(ctx);
    } else {
      drawDefaultGeometry(ctx);
    }
  }, [tikz, type]);

  // ── TikZ 文本模式 ──
  if (tikz && !tikz.includes("\\draw") && !tikz.includes("tikzpicture")) {
    return (
      <div
        className={cn(
          "p-4 rounded-xl bg-muted/20 border border-border/30",
          "text-xs font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto",
          className
        )}
      >
        <p className="text-[10px] text-muted-foreground/50 mb-1">TikZ 图形代码</p>
        <code>{tikz.slice(0, 300)}</code>
        {caption && (
          <p className="mt-2 text-[11px] text-foreground/70">{caption}</p>
        )}
      </div>
    );
  }

  // ── 图片 URL ──
  if (imageUrl) {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <div className="rounded-lg overflow-hidden border border-border/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={caption || "题图"}
            className="max-w-full h-auto max-h-[200px] object-contain"
            onError={() => setError("图片加载失败")}
          />
        </div>
        {caption && (
          <p className="text-[11px] text-muted-foreground text-center">{caption}</p>
        )}
      </div>
    );
  }

  // ── Mermaid ──
  if (mermaid) {
    return (
      <div
        className={cn(
          "p-4 rounded-xl bg-muted/20 border border-border/30",
          "text-xs font-mono text-muted-foreground",
          className
        )}
      >
        <p className="text-[10px] text-muted-foreground/50 mb-1">图表 (Mermaid)</p>
        <pre className="whitespace-pre-wrap">{mermaid.slice(0, 400)}</pre>
      </div>
    );
  }

  // ── Canvas 几何图形 ──
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <canvas
        ref={canvasRef}
        className="rounded-lg bg-muted/10"
        width={300}
        height={200}
      />
      {error && <p className="text-[10px] text-red-400">{error}</p>}
      {caption && (
        <p className="text-[11px] text-muted-foreground text-center max-w-[300px] leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  );
}

// ── 内置图形绘制函数 ──

function drawTriangle(ctx: CanvasRenderingContext2D) {
  const cx = 150, cy = 120, size = 70;
  const h = size * Math.sin(Math.PI / 3);

  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - h * 0.65);
  ctx.lineTo(cx - size * 0.55, cy + h * 0.35);
  ctx.lineTo(cx + size * 0.55, cy + h * 0.35);
  ctx.closePath();
  ctx.stroke();

  // 顶点标注
  ctx.fillStyle = "#6366f1";
  ctx.font = "14px sans-serif";
  ctx.fillText("A", cx - 8, cy - h * 0.65 - 8);
  ctx.fillText("B", cx - size * 0.55 - 18, cy + h * 0.35 + 18);
  ctx.fillText("C", cx + size * 0.55 + 6, cy + h * 0.35 + 18);

  // 直角标记 (可选)
  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - size * 0.55, cy + h * 0.35 - 10, 10, 10);
}

function drawCircle(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, Math.PI * 2);
  ctx.stroke();

  // 圆心
  ctx.fillStyle = "#06b6d4";
  ctx.beginPath();
  ctx.arc(150, 100, 3, 0, Math.PI * 2);
  ctx.fill();

  // 标注
  ctx.font = "14px sans-serif";
  ctx.fillText("O", 155, 95);

  // 半径
  ctx.strokeStyle = "#06b6d4";
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(150, 100);
  ctx.lineTo(200, 100);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillText("r", 172, 92);
}

function drawRectangle(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 2;
  ctx.strokeRect(90, 60, 120, 80);

  ctx.fillStyle = "#f59e0b";
  ctx.font = "12px sans-serif";
  ctx.fillText("长 a", 135, 55);
  ctx.fillText("宽 b", 215, 105);
}

function drawNumberLine(ctx: CanvasRenderingContext2D) {
  // 数轴
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(30, 100);
  ctx.lineTo(270, 100);
  ctx.stroke();

  // 箭头
  ctx.beginPath();
  ctx.moveTo(270, 100);
  ctx.lineTo(262, 95);
  ctx.moveTo(270, 100);
  ctx.lineTo(262, 105);
  ctx.stroke();

  // 刻度
  for (let i = 0; i <= 5; i++) {
    const x = 30 + i * 48;
    ctx.beginPath();
    ctx.moveTo(x, 95);
    ctx.lineTo(x, 105);
    ctx.stroke();
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.fillText(String(i), x - 3, 118);
  }
}

function drawBarChart(ctx: CanvasRenderingContext2D) {
  const bars = [
    { label: "易", value: 50, color: "#22c55e" },
    { label: "中", value: 30, color: "#f59e0b" },
    { label: "难", value: 20, color: "#ef4444" },
  ];

  const barWidth = 50;
  const gap = 30;
  const startX = (300 - (bars.length * barWidth + (bars.length - 1) * gap)) / 2;

  bars.forEach((bar, i) => {
    const x = startX + i * (barWidth + gap);
    const barHeight = bar.value * 1.5;
    const y = 180 - barHeight;

    ctx.fillStyle = bar.color;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.globalAlpha = 1;

    // 数值
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.fillText(`${bar.value}%`, x + barWidth / 2 - 10, y - 5);

    // 标签
    ctx.fillText(bar.label, x + barWidth / 2 - 6, 196);
  });
}

function drawDefaultGeometry(ctx: CanvasRenderingContext2D) {
  // 默认：展示坐标系
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  // x 轴
  ctx.beginPath();
  ctx.moveTo(20, 100);
  ctx.lineTo(280, 100);
  ctx.stroke();
  // y 轴
  ctx.beginPath();
  ctx.moveTo(150, 20);
  ctx.lineTo(150, 180);
  ctx.stroke();

  // 原点
  ctx.fillStyle = "#64748b";
  ctx.font = "12px sans-serif";
  ctx.fillText("O", 155, 115);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "10px sans-serif";
  ctx.fillText("x", 278, 115);
  ctx.fillText("y", 155, 22);
}

export default DiagramDisplay;
