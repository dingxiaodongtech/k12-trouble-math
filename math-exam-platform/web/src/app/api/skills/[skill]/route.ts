/**
 * 数学技能 API 路由 — 动态路由处理器
 *
 * POST /api/skills/[skill]
 *
 * 支持的技能: math-classifier | math-exam-composer | math-exam-report-writer |
 *             math-latex-renderer | math-question-auditor | math-solution-verifier
 *
 * 每个技能接收与其 SKILL.md 定义一致的 JSON body，
 * 调用 DeepSeek LLM 执行推理并返回结构化结果。
 */

import { NextRequest, NextResponse } from "next/server";
import { executeSkill, getAvailableSkills } from "@/lib/skill-executor";

// 允许的技能名称
const VALID_SKILLS = new Set([
  "math-classifier",
  "math-exam-composer",
  "math-exam-report-writer",
  "math-latex-renderer",
  "math-question-auditor",
  "math-solution-verifier",
]);

// ── GET: 获取技能信息 ──

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ skill: string }> }
) {
  const { skill } = await params;

  if (skill === "_list") {
    return NextResponse.json({
      success: true,
      data: {
        skills: getAvailableSkills(),
        validSkills: Array.from(VALID_SKILLS),
      },
      timestamp: new Date().toISOString(),
    });
  }

  if (!VALID_SKILLS.has(skill)) {
    return NextResponse.json(
      {
        success: false,
        error: `Unknown skill: "${skill}". Valid skills: ${Array.from(VALID_SKILLS).join(", ")}`,
        timestamp: new Date().toISOString(),
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      name: skill,
      description: getSkillDescription(skill),
      model: getSkillModel(skill),
    },
    timestamp: new Date().toISOString(),
  });
}

// ── POST: 执行技能 ──

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ skill: string }> }
) {
  const { skill } = await params;
  const startTime = Date.now();

  // 1. 验证技能名称
  if (!VALID_SKILLS.has(skill)) {
    return NextResponse.json(
      {
        success: false,
        error: `Unknown skill: "${skill}". Valid skills: ${Array.from(VALID_SKILLS).join(", ")}`,
        timestamp: new Date().toISOString(),
      },
      { status: 404 }
    );
  }

  // 2. 解析请求体
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON body",
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }

  // 3. 执行技能
  try {
    const result = await executeSkill(skill, {
      params: body,
      responseFormat: getSkillResponseFormat(skill),
      temperature: getSkillTemperature(skill),
      maxRetries: 2,
    });

    const elapsed = Date.now() - startTime;

    return NextResponse.json(
      {
        success: result.success,
        data: result.parsed || result.data,
        raw: result.data, // 始终附带原始回复，方便调试
        error: result.error || undefined,
        meta: {
          skill: result.skillName,
          model: result.model,
          elapsedMs: elapsed,
          usage: result.usage,
        },
        timestamp: new Date().toISOString(),
      },
      { status: result.success ? 200 : 500 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ── 技能元信息 ──

function getSkillDescription(skill: string): string {
  const descriptions: Record<string, string> = {
    "math-classifier":
      "数学题分类挂载器——基于知识点-特征字典和能力水平标准，对任意题目做知识点定位、特征判定、年级推定、教材章节挂载",
    "math-exam-composer":
      "数学试卷组卷编排器——基于双向细目表的选题+组卷。CoT推理+约束满足+结构化JSON输出",
    "math-exam-report-writer":
      "试卷分析报告撰写器——基于细目表+审校结果生成结构化报告",
    "math-latex-renderer":
      "数学试卷LaTeX渲染器——Standard Exam JSON→编译PDF+Word。答案位置可配，图形代码驱动",
    "math-question-auditor":
      "数学试卷审校器——42条规则自动审校+LaTeX修复+SymPy数学验证",
    "math-solution-verifier":
      "数学解答验证器——Python代码执行+LLM推理双重验证",
  };
  return descriptions[skill] || "";
}

function getSkillModel(skill: string): string {
  const models: Record<string, string> = {
    "math-classifier": "deepseek-v4-flash",
    "math-exam-composer": "deepseek-v4-pro",
    "math-exam-report-writer": "deepseek-v4-flash",
    "math-latex-renderer": "deepseek-v4-flash",
    "math-question-auditor": "deepseek-v4-pro",
    "math-solution-verifier": "deepseek-v4-pro",
  };
  return models[skill] || "deepseek-v4-flash";
}

function getSkillResponseFormat(skill: string): "json" | "text" {
  // 报告撰写输出 Markdown，其余输出 JSON
  if (skill === "math-exam-report-writer" || skill === "math-latex-renderer") {
    return "text";
  }
  return "json";
}

function getSkillTemperature(skill: string): number {
  const temps: Record<string, number> = {
    "math-classifier": 0.0,
    "math-exam-composer": 0.2,
    "math-exam-report-writer": 0.3,
    "math-latex-renderer": 0.0,
    "math-question-auditor": 0.0,
    "math-solution-verifier": 0.0,
  };
  return temps[skill] ?? 0.0;
}
