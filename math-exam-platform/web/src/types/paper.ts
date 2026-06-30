// ── 试卷结构类型定义 ──
// 基于 exam_template.tex 和 exam_pipeline.py 的数据结构

import type {
  ExamType,
  GradeLevel,
  Semester,
  TextbookVersion,
  QuestionType,
  DifficultyLevel,
  KpCode,
  CognitiveLevel,
} from "./common";
import type { IQuestion } from "./question";

// ── 试卷配置 ──

/** 出卷约束 */
export interface IExamConstraints {
  /** 各题型数量 */
  questionCounts: Partial<Record<QuestionType, number>>;
  /** 各题型分值 */
  questionScores: Partial<Record<QuestionType, number>>;
  /** 难度分布 (如 {0: 0.1, 1: 0.3, 2: 0.4, 3: 0.15, 4: 0.05}) */
  difficultyDistribution: Partial<Record<DifficultyLevel, number>>;
  /** 必须覆盖的知识点 */
  requiredKnowledgePoints: KpCode[];
  /** 可选知识点 (从这些中随机选 N 个) */
  optionalKnowledgePoints: KpCode[];
  /** 至少覆盖的知识点数量 */
  minKnowledgeCoverage: number;
  /** 每题平均难度目标 */
  targetDifficulty: number;             // 0-5
  /** 是否允许超纲题 */
  allowBeyondScope: boolean;
  /** 是否允许重复知识点 */
  allowDuplicateKp: boolean;
}

/** 考试范围 */
export interface IExamScope {
  grade: GradeLevel;
  semester: Semester;
  textbookVersion: TextbookVersion;
  chapters: string[];                   // 章节名称 (如 ["第一章", "第二章"])
  knowledgePoints: KpCode[];            // 包含的知识点
}

/** 试卷配置 (完整的出卷参数) */
export interface IExamConfig {
  // 基本信息
  title: string;
  examType: ExamType;
  gradeLevel: GradeLevel;
  semester: Semester;
  textbookVersion: TextbookVersion;
  schoolName?: string;
  examDate?: string;

  // 考试参数
  totalScore: number;                   // 满分
  durationMinutes: number;              // 考试时长(分钟)

  // 出卷约束
  constraints: IExamConstraints;
  scope: IExamScope;

  // 输出选项
  outputFormat: "latex" | "pdf" | "html" | "json";
  includeAnswerSheet: boolean;          // 是否生成答题卡
  includeSolutions: boolean;            // 是否附带解析
  watermark?: string;                   // 水印文字
  headerNote?: string;                  // 卷首说明
}

// ── 试卷模块 (大题) ──

/**
 * 试卷模块 (如 "一、选择题")
 *
 * 一份试卷由多个 IModule 组成，每个模块包含相同题型的若干题目。
 */
export interface IModule {
  id: string;
  moduleIndex: number;                  // 序号 (1-based)
  title: string;                        // 如 "一、选择题"
  subtitle?: string;                    // 如 "本大题共10小题，每小题3分，共30分"
  questionType: QuestionType;
  questionCount: number;
  scorePerQuestion: number;
  totalScore: number;                   // questionCount × scorePerQuestion
  questions: IQuestion[];
  instructions?: string;                // 额外说明 (如 "请将答案填在答题卡上")
}

// ── 试卷头信息 ──

/** 试卷密封线/考生信息区 */
export interface IPaperHeader {
  schoolName: string;
  examTitle: string;
  examDate: string;
  grade: string;                        // 如 "六年级"
  textbookVersion: string;
  totalScore: number;
  durationMinutes: number;
  studentInfo: {
    name: string;                       // 姓名填空位
    className: string;                  // 班级填空位
    studentId: string;                  // 学号填空位
    score: string;                      // 得分填空位
  };
  notes?: string[];                     // 考生须知
}

// ── 试卷整体结构 ──

/**
 * 标准化试卷数据结构
 *
 * 这是平台的试卷核心模型。
 * 试卷 = 试卷头 + 若干个模块(大题) + 参考答案
 */
export interface IPaper {
  // 标识
  id: string;
  version: string;                      // 试卷版本号 (如 "1.0", "2.1")

  // 试卷头
  header: IPaperHeader;

  // 配置
  config: IExamConfig;

  // 试卷正文：由多个模块(大题)组成
  modules: IModule[];

  // 统计信息
  stats: IPaperStats;

  // 参考答案 (Teacher's Edition)
  answerKey?: IPaperAnswerKey;

  // 元信息
  createdAt: string;
  updatedAt: string;
  createdBy: string;                    // 创建者/系统
  tags: string[];                       // 标签

  // 状态
  status: PaperStatus;                  // 草稿/审校中/已发布/已归档

  // LaTeX 源码 (编译用)
  latexSource?: string;
  pdfUrl?: string;
  htmlUrl?: string;
}

/** 试卷状态 */
export type PaperStatus = "draft" | "auditing" | "published" | "archived";

// ── 试卷统计 ──

export interface IPaperStats {
  totalQuestions: number;
  totalScore: number;
  moduleCount: number;
  difficultyDistribution: Record<DifficultyLevel, number>;
  cognitiveDistribution: Record<CognitiveLevel, number>;
  knowledgeCoverage: {
    covered: KpCode[];                  // 已覆盖知识点
    coverage: number;                   // 覆盖率 (0-1)
    uncoveredRequired: KpCode[];        // 必考点但未覆盖
  };
  sourceYears: number[];                // 试题年份分布
  estimatedTime: number;                // 预估用时(分钟)
}

// ── 试卷答案 ──

/** 答案表条目 */
export interface IAnswerSheetItem {
  moduleIndex: number;
  questionIndex: number;                // 在模块内的序号 (1-based)
  questionId: string;
  correctAnswer: string;
  score: number;
  answerAreaType: "blank" | "lines" | "canvas" | "box";
  lines?: number;                       // 行数 (解答题)
}

/** 试卷答案卷 */
export interface IPaperAnswerKey {
  paperId: string;
  modules: IAnswerModule[];
  totalScore: number;
}

/** 答案模块 */
export interface IAnswerModule {
  moduleIndex: number;
  title: string;
  items: IAnswerSheetItem[];
}

// ── 出卷任务 ──

/** 组卷任务状态 */
export type GenerationTaskStatus = "pending" | "searching" | "composing" | "auditing" | "rendering" | "completed" | "failed";

/** 组卷任务 */
export interface IGenerationTask {
  id: string;
  config: IExamConfig;
  status: GenerationTaskStatus;
  progress: number;                     // 0-100
  paperId?: string;                     // 生成的试卷 ID
  error?: string;                       // 错误信息
  startedAt: string;
  completedAt?: string;
  logs: IGenerationLog[];
}

/** 组卷日志 */
export interface IGenerationLog {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  data?: Record<string, unknown>;
}

// ── 审校 ──

/** 审校问题 */
export interface IAuditIssue {
  id: string;
  paperId: string;
  moduleIndex: number;
  questionIndex: number;
  severity: "error" | "warning" | "suggestion";
  type: "duplicate_kp" | "wrong_difficulty" | "typo" | "format" | "missing_kp" | "other";
  description: string;
  suggestion?: string;
  resolved: boolean;
}

/** 审校结果 */
export interface IAuditResult {
  paperId: string;
  passed: boolean;
  issues: IAuditIssue[];
  score: number;                        // 审校评分 0-100
  summary: string;
  checkedAt: string;
}

// ── 试卷历史/变体 ──

/** 试卷版本历史 */
export interface IPaperVersion {
  paperId: string;
  version: string;
  changes: string;                      // 变更说明
  createdAt: string;
  createdBy: string;
  snapshot?: IPaper;                    // 版本快照
}
