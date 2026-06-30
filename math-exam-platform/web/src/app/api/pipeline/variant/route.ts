/**
 * 题目变体生成 API
 *
 * POST /api/pipeline/variant
 * 输入一道题 → 生成同知识点、同难度的变体题（改情境或改数值）
 */

import { NextRequest, NextResponse } from "next/server";

// POST: 生成变体题
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      questionId,
      questionType,
      stem,
      answer,
      analysis,
      kpCode,
      variantType = "numerical",
    } = body;

    if (!stem) {
      return NextResponse.json(
        { success: false, error: "缺少题干" },
        { status: 400 }
      );
    }

    const variant = await generateVariant({
      questionType,
      stem,
      answer,
      analysis,
      kpCode,
      variantType,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...variant,
        id: `variant-${questionId || Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sourceDataset: "llm-variant",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

// ── 变体生成核心 ──

interface VariantInput {
  questionType: string;
  stem: string;
  answer: unknown;
  analysis: string;
  kpCode: string;
  variantType: "context" | "numerical";
}

interface VariantOutput {
  stem: string;
  answer: unknown;
  analysis: string;
  options?: Array<{ label: string; content: string }>;
}

async function generateVariant(input: VariantInput): Promise<VariantOutput> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    // 无 API Key 时生成简单数值变体
    return generateLocalVariant(input);
  }

  const typeLabel =
    input.variantType === "context"
      ? "更换题目情境（保持数学结构不变，换一个完全不同的生活场景）"
      : "更换数值（保持题目结构和情境不变，只换数字）";

  const optionsHint =
    input.questionType === "MC" || input.questionType === "选择题"
      ? "请同时生成新的4个选项（A/B/C/D），其中1个为正确答案，其余为常见错误答案。"
      : "";

  const prompt = `你是一位资深数学教研员。请对以下题目生成一道变体题。

## 变体要求
${typeLabel}

## 原始题目
- 题型：${input.questionType}
- 题干：${input.stem}
- 答案：${JSON.stringify(input.answer)}
- 解析：${input.analysis || "无"}
- 知识点：${input.kpCode || "通用"}

${optionsHint}

## 输出格式（JSON）
{
  "stem": "新题干（LaTeX公式用 $...$ 或 $$...$$）",
  "answer": { "value": "新答案" },
  "analysis": "新解析（含完整解题步骤）",
  "options": [{"label":"A","content":"选项A"},...]
}

## 重要约束
- 必须返回纯 JSON，不要包裹在 markdown 代码块中
- 难度与原题保持一致
- 数值必须是真实可计算的
- 知识点覆盖必须相同`;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是一位资深数学教研员，专门生成数学题变体。请直接返回 JSON，不要任何额外文字。",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!response.ok) {
      throw new Error(`API 返回 ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // 尝试解析 JSON
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch {
      // 尝试提取 JSON 代码块
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : {};
    }

    return {
      stem: String(parsed.stem || input.stem + " [变体生成失败，请重试]"),
      answer: parsed.answer || { value: "请重试" },
      analysis: String(parsed.analysis || ""),
      options: Array.isArray(parsed.options)
        ? (parsed.options as Array<Record<string, unknown>>).map((o) => ({
            label: String(o.label || o.aoVal || "A"),
            content: String(o.content || ""),
          }))
        : undefined,
    };
  } catch {
    return generateLocalVariant(input);
  }
}

// ── 本地简单变体（无 API 时的降级方案） ──

function generateLocalVariant(input: VariantInput): VariantOutput {
  // 简单替换题干中的数字
  const numberRegex = /(\d+)(\.\d+)?/g;
  const newStem = input.stem.replace(numberRegex, (_match, intPart, decPart) => {
    const num = parseInt(intPart, 10);
    if (num <= 1 || num > 999) return _match; // 跳过单位数字
    const offset = Math.floor(Math.random() * Math.min(num, 20)) - Math.floor(Math.random() * 5);
    const newNum = Math.max(1, num + offset);
    return decPart ? `${newNum}${decPart}` : String(newNum);
  });

  return {
    stem: `[变体] ${newStem}`,
    answer: { value: "数值已变更，请重新计算" },
    analysis: `原题知识点：${input.kpCode || "通用"}。数值已随机调整，请重新求解。`,
  };
}
