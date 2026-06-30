/**
 * 出卷流水线编排器
 *
 * 完整流程:
 *   User Input → Intent Parser → Syllabus Design (LLM) →
 *   Question Retrieval → Exam Composition → IPaper JSON
 *
 * 使用:
 *   const paper = await orchestrateExam("帮我出一份七年级数学期中卷");
 */

import "server-only";
import { parseIntent, type ParsedIntent } from "./intent-parser";
import { retrieveQuestions } from "./question-retriever";
import { executeSkill } from "@/lib/skill-executor";
import type { IPaper, IModule, IQuestion, QuestionType } from "@/types";
import type { BlueprintItem, ComposeResponse } from "@/types/api";

// ── 编排入口 ──

export interface OrchestrateResult {
  paper: IPaper;
  logs: string[];
  errors: string[];
  elapsedMs: number;
}

export async function orchestrateExam(userInput: string): Promise<OrchestrateResult> {
  const startTime = Date.now();
  const logs: string[] = [];
  const errors: string[] = [];

  const log = (msg: string) => {
    logs.push(`[${new Date().toISOString()}] ${msg}`);
    console.log(`[Pipeline] ${msg}`);
  };

  try {
    // ═══════════════════════════════════════
    // Phase 1: 意图解析
    // ═══════════════════════════════════════
    log("Phase 1: 解析用户意图...");
    const intent = parseIntent(userInput);
    log(
      `  识别: ${intent.grade}年级${intent.semester}学期 ${intent.examType} ` +
      `${intent.textbookVersion} 满分${intent.totalScore} ` +
      `题型: ${intent.sections.map((s) => `${s.label}(${s.count}题)`).join(", ")}`
    );

    // ═══════════════════════════════════════
    // Phase 2: 细目表设计 (LLM)
    // ═══════════════════════════════════════
    log("Phase 2: 设计双向细目表...");
    const blueprint = await designSyllabus(intent);
    log(`  生成 ${blueprint.length} 个题位的细目表`);

    // ═══════════════════════════════════════
    // Phase 3: 逐题检索
    // ═══════════════════════════════════════
    log("Phase 3: 从题库检索题目...");
    const questionMap = await retrieveQuestionsForBlueprint(
      blueprint,
      intent,
      log
    );
    log(`  成功检索 ${questionMap.size} 个题位的题目`);

    // ═══════════════════════════════════════
    // Phase 4: 组装试卷
    // ═══════════════════════════════════════
    log("Phase 4: 组装试卷 JSON...");
    const paper = assemblePaper(intent, blueprint, questionMap, log);
    log(`  试卷组装完成: ${paper.modules.length} 个模块, ${paper.stats.totalQuestions} 题`);

    const elapsedMs = Date.now() - startTime;
    log(`完成! 总耗时 ${elapsedMs}ms`);

    return { paper, logs, errors, elapsedMs };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(msg);
    log(`ERROR: ${msg}`);

    // 返回降级试卷
    const fallbackPaper = createFallbackPaper(userInput);
    return { paper: fallbackPaper, logs, errors, elapsedMs: Date.now() - startTime };
  }
}

// ── Phase 2: 细目表设计 ──

async function designSyllabus(intent: ParsedIntent): Promise<BlueprintItem[]> {
  try {
    const kpList = intent.keywords.length > 0
      ? intent.keywords
      : [`${intent.grade}年级${intent.semester}学期数学`];

    const result = await executeSkill("math-exam-composer", {
      params: {
        version: intent.textbookVersion,
        grade: intent.grade,
        semester: intent.semester,
        examType: intent.examType,
        totalScore: intent.totalScore,
        duration: intent.duration,
        sections: intent.sections.map((s) => ({
          type: s.type,
          count: s.count,
          scorePerQuestion: s.scorePerQuestion,
          label: s.label,
        })),
        kpList,
      },
      responseFormat: "json",
      temperature: 0.2,
      maxRetries: 1,
    });

    if (result.success && result.parsed) {
      const data = result.parsed as ComposeResponse;
      if (data.blueprint && data.blueprint.length > 0) {
        return data.blueprint;
      }
    }

    // 如果 LLM 失败，使用意图书生成简单细目表
    return generateSimpleBlueprint(intent);
  } catch {
    return generateSimpleBlueprint(intent);
  }
}

/** 简单细目表 (不依赖 LLM) */
function generateSimpleBlueprint(intent: ParsedIntent): BlueprintItem[] {
  const blueprint: BlueprintItem[] = [];
  let number = 1;

  for (const section of intent.sections) {
    for (let i = 0; i < section.count; i++) {
      const difficultyTarget =
        i < section.count * 0.5
          ? 0.8  // 前 50% 容易
          : i < section.count * 0.8
            ? 0.55 // 中间 30% 中等
            : 0.3; // 最后 20% 较难

      blueprint.push({
        number,
        type: section.type,
        kpCode: "auto",  // 自动匹配
        cognitive: (i < section.count * 0.3 ? "L1" : i < section.count * 0.6 ? "L2" : "L3") as never,
        score: section.scorePerQuestion,
        difficultyTarget,
      });

      number++;
    }
  }

  return blueprint;
}

// ── Phase 3: 题目检索 ──

async function retrieveQuestionsForBlueprint(
  blueprint: BlueprintItem[],
  intent: ParsedIntent,
  log: (msg: string) => void,
): Promise<Map<number, IQuestion>> {
  const questionMap = new Map<number, IQuestion>();

  for (const item of blueprint) {
    log(`  检索题位 ${item.number}: ${item.type} kp=${item.kpCode} diff~${item.difficultyTarget}`);

    const questions = await retrieveQuestions(
      {
        type: item.type,
        kpCode: item.kpCode !== "auto" ? item.kpCode : undefined,
        difficultyMin: Math.max(0, item.difficultyTarget - 0.15),
        difficultyMax: Math.min(1, item.difficultyTarget + 0.15),
        cognitiveLevel: item.cognitive as never,
        limit: 3,
      },
      intent.grade,
      intent.semester,
    );

    // 选取第一道可用题目
    if (questions.length > 0) {
      const q = questions[0];
      q.score = item.score;

      // 补充知识点信息
      if (q.knowledgePoints.length === 0 && item.kpCode !== "auto") {
        q.knowledgePoints = [item.kpCode];
      }

      questionMap.set(item.number, q);
    }
  }

  return questionMap;
}

// ── Phase 4: 试卷组装 ──

function assemblePaper(
  intent: ParsedIntent,
  blueprint: BlueprintItem[],
  questionMap: Map<number, IQuestion>,
  log: (msg: string) => void,
): IPaper {
  const gradeNames: Record<number, string> = {
    1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六",
    7: "七", 8: "八", 9: "九", 10: "十", 11: "十一", 12: "十二",
  };
  const gradeName = gradeNames[intent.grade] || String(intent.grade);

  const examTypeLabels: Record<string, string> = {
    unit: "单元测试", midterm: "期中考试", final: "期末考试",
    mock: "模拟考试", entrance: "升学考试", competition: "竞赛",
  };

  const title = intent.keywords.length > 0
    ? `${gradeName}年级${intent.semester}学期${intent.keywords.join("、")}${examTypeLabels[intent.examType] || "考试"}`
    : `${gradeName}年级${intent.semester}学期数学${examTypeLabels[intent.examType] || "考试"}`;

  // 按题型分组
  const moduleMap = new Map<QuestionType, { items: BlueprintItem[]; label: string }>();

  for (const section of intent.sections) {
    moduleMap.set(section.type, { items: [], label: section.label });
  }

  for (const item of blueprint) {
    const mod = moduleMap.get(item.type);
    if (mod) mod.items.push(item);
  }

  // 构建 modules
  const modules: IModule[] = [];
  let moduleIndex = 0;

  for (const [type, { items, label }] of moduleMap) {
    if (items.length === 0) continue;

    moduleIndex++;
    const totalScore = items.reduce((s, it) => s + it.score, 0);
    const questions: IQuestion[] = [];

    for (const item of items) {
      const q = questionMap.get(item.number);
      if (q) {
        q.score = item.score;
        questions.push(q);
      }
    }

    const typeLabels: Record<string, string> = {
      MC: "选择题", FB: "填空题", SA: "解答题", PR: "证明题", AP: "应用题",
    };

    modules.push({
      id: `module-${moduleIndex}`,
      moduleIndex,
      title: label || `${typeLabels[type] || type}`,
      subtitle: `本大题共${items.length}小题，每小题${items[0]?.score || 0}分，共${totalScore}分`,
      questionType: type,
      questionCount: questions.length,
      scorePerQuestion: items[0]?.score || 0,
      totalScore,
      questions,
    });
  }

  const allQuestions = modules.flatMap((m) => m.questions);
  const totalScore = allQuestions.reduce((s, q) => s + q.score, 0);

  // 统计
  const difficultyDist: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const q of allQuestions) {
    const d = q.difficulty as unknown as number;
    difficultyDist[d] = (difficultyDist[d] || 0) + 1;
  }

  const paperId = `exam-${Date.now()}`;

  return {
    id: paperId,
    version: "1.0",
    header: {
      schoolName: intent.textbookVersion === "人教版" ? "" : "",
      examTitle: title,
      examDate: new Date().toISOString().split("T")[0],
      grade: `${gradeName}年级`,
      textbookVersion: intent.textbookVersion,
      totalScore: intent.totalScore,
      durationMinutes: intent.duration,
      studentInfo: {
        name: "________",
        className: "________",
        studentId: "________",
        score: "________",
      },
    },
    config: {
      title,
      examType: intent.examType,
      gradeLevel: intent.grade,
      semester: intent.semester,
      textbookVersion: intent.textbookVersion,
      totalScore: intent.totalScore,
      durationMinutes: intent.duration,
      constraints: {
        questionCounts: {},
        questionScores: {},
        difficultyDistribution: {},
        requiredKnowledgePoints: [],
        optionalKnowledgePoints: [],
        minKnowledgeCoverage: 0,
        targetDifficulty: 2,
        allowBeyondScope: false,
        allowDuplicateKp: false,
      },
      scope: {
        grade: intent.grade,
        semester: intent.semester,
        textbookVersion: intent.textbookVersion,
        chapters: intent.keywords,
        knowledgePoints: [],
      },
      outputFormat: "json",
      includeAnswerSheet: false,
      includeSolutions: false,
    },
    modules,
    stats: {
      totalQuestions: allQuestions.length,
      totalScore: intent.totalScore,
      moduleCount: modules.length,
      difficultyDistribution: difficultyDist as never,
      cognitiveDistribution: { L1: 0, L2: 0, L3: 0, L4: 0, L5: 0 },
      knowledgeCoverage: {
        covered: [],
        coverage: 0,
        uncoveredRequired: [],
      },
      sourceYears: [],
      estimatedTime: intent.duration,
    },
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "pipeline",
    tags: ["auto-generated", ...intent.keywords],
  };
}

// ── 降级处理 ──

function createFallbackPaper(userInput: string): IPaper {
  return {
    id: `fallback-${Date.now()}`,
    version: "0.1",
    header: {
      schoolName: "",
      examTitle: "数学试卷",
      examDate: new Date().toISOString().split("T")[0],
      grade: "",
      textbookVersion: "人教版",
      totalScore: 100,
      durationMinutes: 90,
      studentInfo: { name: "", className: "", studentId: "", score: "" },
    },
    config: {
      title: "数学试卷",
      examType: "final",
      gradeLevel: 7,
      semester: "上",
      textbookVersion: "人教版",
      totalScore: 100,
      durationMinutes: 90,
      constraints: { questionCounts: {}, questionScores: {}, difficultyDistribution: {}, requiredKnowledgePoints: [], optionalKnowledgePoints: [], minKnowledgeCoverage: 0, targetDifficulty: 2, allowBeyondScope: false, allowDuplicateKp: false },
      scope: { grade: 7, semester: "上", textbookVersion: "人教版", chapters: [], knowledgePoints: [] },
      outputFormat: "json",
      includeAnswerSheet: false,
      includeSolutions: false,
    },
    modules: [
      {
        id: "fallback-m1",
        moduleIndex: 1,
        title: "一、选择题",
        subtitle: "系统遇到错误，这是示例试卷",
        questionType: "MC",
        questionCount: 1,
        scorePerQuestion: 3,
        totalScore: 3,
        questions: [
          {
            id: "fallback-q1",
            questionType: "MC",
            cognitiveLevel: "L2",
            stem: `[流水线遇到错误] 原始请求: "${userInput.slice(0, 100)}"`,
            options: [
              { label: "A", content: "请重试" },
              { label: "B", content: "检查网络连接" },
              { label: "C", content: "联系管理员" },
              { label: "D", content: "以上都是" },
            ],
            answer: { value: "D" },
            analysis: "系统在生成试卷时遇到错误。请检查 API Key 配置或稍后重试。",
            knowledgePoints: [],
            difficulty: 1 as never,
            score: 3,
            tags: ["error"],
            images: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sourceDataset: "error",
          },
        ],
      },
    ],
    stats: {
      totalQuestions: 1,
      totalScore: 3,
      moduleCount: 1,
      difficultyDistribution: { 0: 0, 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 },
      cognitiveDistribution: { L1: 0, L2: 1, L3: 0, L4: 0, L5: 0 },
      knowledgeCoverage: { covered: [], coverage: 0, uncoveredRequired: [] },
      sourceYears: [],
      estimatedTime: 5,
    },
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "fallback",
    tags: ["error", "fallback"],
  };
}
