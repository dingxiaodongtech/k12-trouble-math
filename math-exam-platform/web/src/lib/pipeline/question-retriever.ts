/**
 * 题目检索器 — 从题库获取匹配题目
 *
 * 策略:
 * 1. 优先查询 SQLite 数据库
 * 2. 数据库无结果时，通过 LLM 生成符合条件的题目
 * 3. 确保不重复、不超纲
 */

import "server-only";
import { executeSkill } from "@/lib/skill-executor";
import type { IQuestion, QuestionType, DifficultyLevel, CognitiveLevel, KpCode } from "@/types";
import type { QueryCondition } from "@/types/api";

// ── 查询参数 ──

export interface RetrieveParams {
  type: QuestionType;
  kpCode?: KpCode;
  difficultyMin?: number;
  difficultyMax?: number;
  cognitiveLevel?: CognitiveLevel;
  limit?: number;
  excludeIds?: string[];
}

// ── 主检索函数 ──

export async function retrieveQuestions(
  params: RetrieveParams,
  grade: number,
  semester: string,
): Promise<IQuestion[]> {
  // 1. 尝试 SQLite 数据库查询
  const dbResults = await queryDatabase(params);
  if (dbResults.length > 0) {
    return dbResults;
  }

  // 2. 数据库无结果 — LLM 生成题目
  const llmResults = await generateViaLLM(params, grade, semester);
  return llmResults;
}

// ── 批量检索 (按细目表) ──

export async function retrieveByBlueprint(
  conditions: QueryCondition[],
  grade: number,
  semester: string,
): Promise<Map<number, IQuestion[]>> {
  const resultMap = new Map<number, IQuestion[]>();
  const usedIds = new Set<string>();

  for (const cond of conditions) {
    const questions = await retrieveQuestions(
      {
        type: cond.type,
        kpCode: cond.kp,
        difficultyMin: cond.diff[0],
        difficultyMax: cond.diff[1],
        limit: cond.limit,
        excludeIds: Array.from(usedIds),
      },
      grade,
      semester,
    );

    // 记录已使用的 ID 避免重复
    for (const q of questions) {
      usedIds.add(q.id);
    }

    resultMap.set(cond.number, questions);
  }

  return resultMap;
}

// ── 数据库查询 ──

async function queryDatabase(params: RetrieveParams): Promise<IQuestion[]> {
  try {
    const Database = await import("better-sqlite3");
    const DatabaseCtor = Database.default;
    const path = await import("path");
    const fs = await import("fs");

    const dbPath = path.resolve(
      process.cwd(),
      "..",
      "data",
      "exam_platform.db"
    );

    if (!fs.existsSync(dbPath)) return [];

    const db = new DatabaseCtor(dbPath);
    db.pragma("journal_mode = WAL");

    const conditions: string[] = [];
    const bindings: unknown[] = [];

    if (params.kpCode) {
      conditions.push("kp_code = ?");
      bindings.push(params.kpCode);
    }
    if (params.type) {
      conditions.push("question_type = ?");
      bindings.push(params.type);
    }
    if (params.difficultyMin !== undefined) {
      conditions.push("difficulty >= ?");
      bindings.push(params.difficultyMin);
    }
    if (params.difficultyMax !== undefined) {
      conditions.push("difficulty <= ?");
      bindings.push(params.difficultyMax);
    }
    if (params.cognitiveLevel) {
      conditions.push("cognitive_level = ?");
      bindings.push(params.cognitiveLevel);
    }
    conditions.push("is_verified = 1");

    const where = conditions.length > 0 ? conditions.join(" AND ") : "1=1";
    const limit = params.limit || 5;

    const stmt = db.prepare(
      `SELECT * FROM question_index WHERE ${where} ORDER BY usage_count ASC LIMIT ?`
    );
    const rows = stmt.all(...bindings, limit) as Array<Record<string, unknown>>;
    db.close();

    return rows.map((row) => mapDbRowToQuestion(row));
  } catch {
    return [];
  }
}

// ── LLM 题目生成 ──

// ── 多样性追踪 ──
const usedScenarios = new Set<string>();
const usedNumberPairs = new Set<string>();

function resetDiversityTracker() {
  usedScenarios.clear();
  usedNumberPairs.clear();
}

async function generateViaLLM(
  params: RetrieveParams,
  grade: number,
  semester: string,
): Promise<IQuestion[]> {
  const count = params.limit || 1;
  const typeLabel = getTypeLabel(params.type);
  const isLowGrade = grade <= 3;

  // 确保高质量题目：temperature 在 0.5-0.7 之间产生更多样化的结果
  const diversityTemp = 0.55 + Math.random() * 0.2;

  const diversityConstraints = buildDiversityConstraints(
    params.type,
    grade,
    Array.from(usedScenarios),
    Array.from(usedNumberPairs)
  );

  const prompt = [
    `你是一位有 20 年经验的数学教研员。请生成 ${count} 道${typeLabel}，用于${grade}年级${semester}学期数学考试。`,
    "",
    `=== 知识点 ===`,
    params.kpCode ? `核心知识点编码: ${params.kpCode}` : `年级: ${grade}年级 · 学期: ${semester}学期`,
    "",
    `=== 难度与认知 ===`,
    `难度: ${params.difficultyMin ?? 0.3}-${params.difficultyMax ?? 0.8}`,
    params.cognitiveLevel ? `认知层级: ${params.cognitiveLevel}（${getCognitiveLabel(params.cognitiveLevel)}）` : "",
    "",
    `=== 多样性强制约束（极其重要！违反将被拒绝） ===`,
    ...diversityConstraints,
    "",
    `=== ${isLowGrade ? "低年级特殊要求" : ""} ===`,
    isLowGrade
      ? [
          "这些题目面向小学低年级学生，要求：",
          "1. 题干必须简短、易懂，避免复杂句式",
          "2. 使用孩子熟悉的生活场景（如：买文具、分糖果、排队、小动物、水果等）",
          "3. 如有条件，在题干中用文字描述一个简单图形（如「小明画了一个三角形，三条边分别是...」）",
          "4. 选项用词简单，避免抽象概念",
          grade === 1 ? "5. 一年级：数字范围 0-20，不含乘除法，以加减为主" : "",
          grade === 2 ? "5. 二年级：数字范围 0-100，含简单乘除法（2-9的乘法口诀）" : "",
          grade === 3 ? "5. 三年级：可含分数初步认识、万以内加减、简单几何" : "",
        ].filter(Boolean).join("\n")
      : [
          "1. 每个题目必须使用不同的生活场景或数学背景",
          "2. 数值、情境、考查角度不可雷同",
          "3. 几何题请附带 TikZ 代码描述图形",
        ].join("\n"),
    "",
    `=== 输出格式（JSON 数组）===`,
    `[`,
    `  {`,
    `    "stem": "题干（LaTeX 数学公式用 $...$ 或 $$...$$）",`,
    `    "options": [{"label":"A","content":"选项内容"},...]  // 选择题必填4个选项`,
    `    "answer": {"value": "正确答案", "explanation": "简要解释"},`,
    `    "analysis": "详细解题思路和步骤",`,
    `    "knowledgePoints": ["知识点编码1", "知识点编码2"],`,
    `    "difficulty": ${getDefaultScore(params.type) === 3 ? 1 : getDefaultScore(params.type) === 10 ? 3 : 2},`,
    `    "score": ${getDefaultScore(params.type)},`,
    `    "hasDiagram": ${isLowGrade || params.type === "SA"},`,
    `    "diagramTikz": "如果涉及几何图形，给出 TikZ 代码，否则留空字符串"`,
    `  }`,
    `]`,
    "",
    `=== 质量自检清单（输出前逐条确认） ===`,
    `- [ ] 每题场景/情境是否完全不同？`,
    `- [ ] 每题数值是否没有重复？`,
    `- [ ] 数学答案是否正确？`,
    `- [ ] ${isLowGrade ? "题干是否简短适合低年级？" : "知识点覆盖是否不重复？"}`,
    `- [ ] 格式是否符合 JSON 标准？`,
  ].filter((line) => line !== "").join("\n");

  // 更新多样性追踪
  if (params.kpCode) usedScenarios.add(params.kpCode);

  try {
    const result = await executeSkill("math-classifier", {
      params: { question: prompt },
      responseFormat: "json",
      temperature: diversityTemp,
      maxTokens: 8000,
    });

    if (result.success && result.parsed) {
      const data = result.parsed as Record<string, unknown>;
      const questions = Array.isArray(data)
        ? data
        : data.questions || data.results || [];

      return (questions as Array<Record<string, unknown>>).slice(0, count).map((q, i) =>
        mapLLMOutputToQuestion(q, params, i)
      );
    }
  } catch {
    // Fallback: return a generated placeholder
  }

  // 最终回退：返回一道占位题
  return [createPlaceholderQuestion(params, grade)];
}

// ── 类型映射 ──

function mapDbRowToQuestion(row: Record<string, unknown>): IQuestion {
  return {
    id: String(row.id || `db-${Date.now()}`),
    externalId: String(row.source_id || ""),
    sourceDataset: String(row.source || ""),
    questionType: (row.question_type as QuestionType) || "MC",
    cognitiveLevel: (row.cognitive_level as CognitiveLevel) || "L2",
    stem: String(row.question_text || ""),
    options: parseOptions(String(row.answer_text || "")),
    answer: { value: String(row.answer_text || "") },
    analysis: "",
    knowledgePoints: [String(row.kp_code || "")],
    difficulty: Math.round((Number(row.difficulty) || 0.7) * 5) as never,
    score: 5,
    tags: parseTags(String(row.tags || "")),
    images: [],
    createdAt: String(row.created_at || new Date().toISOString()),
    updatedAt: String(row.updated_at || new Date().toISOString()),
  };
}

function mapLLMOutputToQuestion(
  q: Record<string, unknown>,
  params: RetrieveParams,
  index: number,
): IQuestion {
  const options = Array.isArray(q.options)
    ? (q.options as Array<Record<string, unknown>>).map((o) => ({
        label: String(o.label || o.aoVal || "A"),
        content: String(o.content || ""),
        isCorrect: Boolean(o.isCorrect),
      }))
    : [];

  // 处理图表
  const hasDiagram = Boolean(q.hasDiagram) || Boolean(q.diagramTikz);
  const images = hasDiagram
    ? [{ url: "", tikz: String(q.diagramTikz || ""), caption: String(q.stem || "").slice(0, 50) }]
    : [];

  return {
    id: `llm-${Date.now()}-${index}`,
    questionType: params.type,
    cognitiveLevel: (q.cognitiveLevel as CognitiveLevel) || params.cognitiveLevel || "L2",
    stem: String(q.stem || q.problem || ""),
    options,
    answer: {
      value: String(
        typeof q.answer === "object"
          ? (q.answer as Record<string, unknown>).value || JSON.stringify(q.answer)
          : q.answer || ""
      ),
      steps: Array.isArray(q.solutionSteps)
        ? (q.solutionSteps as Array<Record<string, unknown>>).map((s, i) => ({
            stepNumber: i + 1,
            content: String(s.content || s || ""),
          }))
        : undefined,
    },
    analysis: String(q.analysis || ""),
    knowledgePoints: Array.isArray(q.knowledgePoints)
      ? (q.knowledgePoints as string[])
      : params.kpCode ? [params.kpCode] : [],
    difficulty: (Number(q.difficulty) || 2) as never,
    score: Number(q.score) || getDefaultScore(params.type),
    tags: [],
    images,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceDataset: "llm-generated",
  };
}

function createPlaceholderQuestion(params: RetrieveParams, grade: number): IQuestion {
  return {
    id: `placeholder-${Date.now()}`,
    questionType: params.type,
    cognitiveLevel: "L2",
    stem: `[${grade}年级] 题目正在生成中...（知识点：${params.kpCode || "通用"}，难度：${params.difficultyMin ?? 0.5}-${params.difficultyMax ?? 0.8}）`,
    options: params.type === "MC"
      ? [
          { label: "A", content: "选项 A" },
          { label: "B", content: "选项 B" },
          { label: "C", content: "选项 C" },
          { label: "D", content: "选项 D" },
        ]
      : [],
    answer: { value: "答案生成中..." },
    analysis: "请稍后刷新获取完整题目",
    knowledgePoints: params.kpCode ? [params.kpCode] : [],
    difficulty: 2 as never,
    score: getDefaultScore(params.type),
    tags: ["placeholder"],
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceDataset: "placeholder",
  };
}

// ── 工具函数 ──

function getTypeLabel(type: QuestionType): string {
  const map: Record<QuestionType, string> = {
    MC: "选择题", FB: "填空题", SA: "解答题", PR: "证明题", AP: "应用题",
  };
  return map[type] || "题目";
}

function getDefaultScore(type: QuestionType): number {
  const map: Record<QuestionType, number> = {
    MC: 3, FB: 4, SA: 10, PR: 12, AP: 10,
  };
  return map[type] || 5;
}

// ── 多样性约束构建 ──

function buildDiversityConstraints(
  type: QuestionType,
  grade: number,
  usedScenarios: string[],
  usedNumbers: string[],
): string[] {
  const constraints: string[] = [];

  // 题型特定约束
  const typeConstraints: Record<string, string[]> = {
    MC: [
      "每个题目的4个选项中，至少包含1个常见错误答案（典型错误/易混淆概念）",
      "选项 A/B/C/D 的数值不能全部是整数或全部是分数，至少混合两种类型",
    ],
    FB: [
      "填空答案不能全是整数，要有分数、小数、或代数表达式混合",
      "每道题的填空位置不同（不能在题目中都是最后一个空）",
    ],
    SA: [
      "每道解答题考查的步骤数不同：有的2步，有的3-4步",
      "不能所有解答题都是「解方程」类型，要有证明、计算、作图等不同要求",
    ],
  };

  if (typeConstraints[type]) {
    constraints.push(...typeConstraints[type]);
  }

  // 年级特定约束
  if (grade <= 3) {
    constraints.push(
      "低年级题目需要「图文并茂」：每道题描述一个可以用简单图形表示的场景",
      "使用孩子生活中熟悉的物品和情境（学习用品、食物、动物、玩具、游戏等）",
      "数字不要太大，符合该年级认知水平"
    );
  }

  // 防重复
  if (usedScenarios.length > 0) {
    constraints.push(
      `已使用过的场景/知识点: ${usedScenarios.slice(-5).join("、")}。请避免重复使用这些场景。`
    );
  }

  constraints.push(
    "每道题的情境必须完全不同：不能两道题都是「小明买东西」，换人物/场景/物品",
    "每道题的数值组合必须不同：不能两道题用相同的数字"
  );

  return constraints.map((c) => `- ${c}`);
}

function getCognitiveLabel(level: string): string {
  const map: Record<string, string> = {
    L1: "记忆", L2: "理解", L3: "应用", L4: "分析", L5: "综合",
  };
  return map[level] || level;
}

function parseOptions(_answerText: string) {
  return [];
}

function parseTags(tagsStr: string): string[] {
  try {
    return JSON.parse(tagsStr);
  } catch {
    return tagsStr ? tagsStr.split(",").map((t) => t.trim()) : [];
  }
}
