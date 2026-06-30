// ── 题目核心类型定义 ──
// 基于 datasets 中多种数据源 (TAL-SCQ5K, CMM_Math, MATH, Ape210K, Math23K 等)

import type {
  QuestionType,
  CognitiveLevel,
  DifficultyLevel,
  SourceInfo,
  AnswerAreaType,
  KpCode,
  KnowledgeFeature,
  GradeLevel,
  Semester,
} from "./common";

// ── 选项 ──

/** 选项 (标准格式) */
export interface IOption {
  label: string;              // A, B, C, D, ...
  content: string;            // 选项文本 (支持 LaTeX)
  isCorrect?: boolean;        // 是否为正确答案
}

/** 原始数据集选项格式 (TAL-SCQ5K 风格) */
export type RawDatasetOption = Array<{
  aoVal: string;
  content: string;
}>;

// ── 图片/图形 ──

/** 题目配图 */
export interface IQuestionImage {
  url: string;                // 图片 URL 或路径
  alt?: string;               // 替代文本
  width?: number;
  height?: number;
  tikz?: string;              // TikZ 源码 (可渲染为 SVG)
  caption?: string;           // 图注
}

// ── 解题步骤 ──

/** 解题步骤 */
export interface ISolutionStep {
  stepNumber: number;
  content: string;            // 步骤文本 (支持 LaTeX)
  explanation?: string;       // 步骤解释
  formula?: string;           // 关键公式
  diagramUrl?: string;        // 配图
}

// ── 答案 ──

/** 答案 (统一格式) */
export interface IAnswer {
  value: string;                      // 正确答案文本
  unit?: string;                      // 单位 (如 "千米", "cm²")
  explanation?: string;               // 简要解释
  alternativeAnswers?: string[];      // 等价答案
  steps?: ISolutionStep[];            // 详细解题步骤
  hasValidation?: boolean;            // 是否需要人工验证
}

// ── 题目主体 ──

/**
 * 标准化单题数据结构
 *
 * 这是平台的核心题目模型，统一了所有数据源的题目格式。
 * 设计原则：
 *  - stem: 题干部分，包含题目描述，支持 LaTeX 公式
 *  - options: 选项列表 (选择题必有)
 *  - answer: 标准答案
 *  - analysis: 解析/解题过程
 *  - knowledgePoints: 关联的知识点编码
 */
export interface IQuestion {
  // ── 标识 ──
  id: string;                           // 全局唯一 ID
  externalId?: string;                   // 原始数据源 ID (如 "14361", "ape210k__00376527")
  sourceDataset?: string;                // 来源数据集 (如 "TAL-SCQ5K", "MATH", "CMM_Math")

  // ── 题型与分类 ──
  questionType: QuestionType;
  cognitiveLevel: CognitiveLevel;        // 认知层级

  // ── 内容 (核心) ──
  stem: string;                          // 题干 (支持 LaTeX $$...$$ / $...$)
  options: IOption[];                    // 选项 (MC 题必有；其他题型为空数组)
  answer: IAnswer;                       // 答案
  analysis: string;                      // 解析/解题过程 (支持 LaTeX)

  // ── 知识点 ──
  knowledgePoints: KpCode[];             // 知识点编码列表
  knowledgePointNames?: string[];        // 知识点中文名 (冗余，方便展示)
  knowledgePath?: string[];              // 知识点层级路径 (如 ["拓展思维", "计算模块", "小数乘除"])

  // ── 难度与评分 ──
  difficulty: DifficultyLevel;           // 0-5 难度等级
  score: number;                         // 建议分值

  // ── 元信息 ──
  gradeLevel?: GradeLevel;               // 适用年级
  semester?: Semester;                   // 适用学期
  subject?: string;                      // 学科分类 (如 "解析几何", "代数")
  source?: SourceInfo;                   // 题目来源 (年份、地区、考试类型)
  tags: string[];                        // 标签

  // ── 图片与图形 ──
  images: IQuestionImage[];              // 配图

  // ── 解题与验证 ──
  solutionSteps?: ISolutionStep[];       // 详细解题步骤
  equation?: string;                     // 核心方程/公式 (Ape210K 风格)
  hasAutoCheck?: boolean;                // 是否可自动批改

  // ── 扩展字段 ──
  // 用于变体题生成、质量评分等
  variantOf?: string;                    // 如果是变体，指向原题 ID
  qualityScore?: number;                 // 质量评分 0-100
  usageCount?: number;                   // 被使用次数
  lastUsedAt?: string;                   // 最后使用时间 ISO 8601
  createdAt: string;                     // 创建时间 ISO 8601
  updatedAt: string;                     // 更新时间 ISO 8601

  // 原始数据 (保留原始格式，用于调试和溯源)
  rawData?: Record<string, unknown>;
}

// ── 原始数据集题目格式 (兼容多种数据源) ──

/** TAL-SCQ5K / 竞赛题 原始格式 */
export interface IRawTALQuestion {
  problem: string;
  options: RawDatasetOption[];
  answer: string;
  analysis: string[];
  difficulty: string;                   // "0"-"2"
  knowledge: string[];                  // 知识点路径
  source: string[];
  _dataset: string;
  _ds_name: string;
  id?: string;
}

/** CMM_Math / 图片题 原始格式 */
export interface IRawCMMQuestion {
  id: string;
  image: string[];
  answer: string;
  solution: string | null;
  level: string;                        // 如 "高一"
  question: string;
  options: string;
  subject: string;
  analysis: string;
  _dataset: string;
  _ds_name: string;
}

/** Ape210K / 应用题 原始格式 */
export interface IRawApeQuestion {
  id: string;
  question: string;
  answer: string;
  equation: string;                     // 核心方程
  source: string;
  _dataset: string;
  _ds_name: string;
}

/** MATH / 英文竞赛题 原始格式 */
export interface IRawMATHQuestion {
  category: string;                     // algebra, geometry, etc.
  split: string;                        // train, test
  problem: string;
  solution: string;
  level: string;                        // Level 1-5
  type: string;
}

/** GeoQA / 几何题 原始格式 */
export interface IRawGeoQAQuestion {
  id: string;
  question: string;
  answer: string;
  source: string;
  _dataset: string;
  _ds_name: string;
}

/** 统一原始题目类型 (Discriminated Union) */
export type RawQuestion =
  | { dataset: "TAL-SCQ5K"; data: IRawTALQuestion }
  | { dataset: "CMM_Math"; data: IRawCMMQuestion }
  | { dataset: "Ape210K"; data: IRawApeQuestion }
  | { dataset: "MATH"; data: IRawMATHQuestion }
  | { dataset: "GeoQA"; data: IRawGeoQAQuestion }
  | { dataset: "Math23K"; data: Record<string, unknown> }
  | { dataset: "C-Eval"; data: Record<string, unknown> }
  | { dataset: "other"; data: Record<string, unknown> };

// ── 题目筛选/搜索参数 ──

export interface IQuestionFilter {
  questionType?: QuestionType;
  cognitiveLevel?: CognitiveLevel;
  difficulty?: DifficultyLevel | [DifficultyLevel, DifficultyLevel];
  gradeLevel?: GradeLevel | [GradeLevel, GradeLevel];
  knowledgePoints?: KpCode[];
  tags?: string[];
  source?: string;
  hasDiagram?: boolean;
  minScore?: number;
  maxScore?: number;
  searchText?: string;                  // 题干全文搜索
  ids?: string[];                       // 精确 ID 匹配
  excludeIds?: string[];                // 排除 ID
}

/** 题目排序 */
export type QuestionSortField =
  | "difficulty"
  | "score"
  | "createdAt"
  | "usageCount"
  | "qualityScore";

export interface IQuestionSort {
  field: QuestionSortField;
  order: "asc" | "desc";
}

/** 题目搜索请求 */
export interface IQuestionSearchParams {
  filter?: IQuestionFilter;
  sort?: IQuestionSort;
  page?: number;
  pageSize?: number;
}

/** 题目搜索响应 */
export interface IQuestionSearchResult {
  items: IQuestion[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ── 题目统计 ──

/** 题目统计信息 */
export interface IQuestionStats {
  totalCount: number;
  byType: Record<QuestionType, number>;
  byDifficulty: Record<DifficultyLevel, number>;
  byGrade: Record<GradeLevel, number>;
  byDomain: Record<string, number>;
  topKnowledgePoints: Array<{ code: KpCode; name: string; count: number }>;
}
