// ── 通用/共享类型定义 ──

/** 题目类型 */
export type QuestionType = "MC" | "FB" | "SA" | "PR" | "AP";

/** 题目类型中文映射 */
export const QuestionTypeLabel: Record<QuestionType, string> = {
  MC: "选择题",
  FB: "填空题",
  SA: "简答题",
  PR: "证明题",
  AP: "应用题",
};

/** 认知层级 */
export type CognitiveLevel = "L1" | "L2" | "L3" | "L4" | "L5";

/** 认知层级中文映射 */
export const CognitiveLevelLabel: Record<CognitiveLevel, string> = {
  L1: "记忆",
  L2: "理解",
  L3: "应用",
  L4: "分析",
  L5: "综合",
};

/** 学段 */
export type Section = "PS" | "MS" | "HS";
export const SectionLabel: Record<Section, string> = {
  PS: "小学",
  MS: "初中",
  HS: "高中",
};

/** 教材版本 */
export type TextbookVersion =
  | "人教版"
  | "北师大版"
  | "苏教版"
  | "华师大版"
  | "浙教版"
  | "沪教版"
  | "通用版";

/** 考试类型 */
export type ExamType = "unit" | "midterm" | "final" | "mock" | "entrance" | "competition";

export const ExamTypeLabel: Record<ExamType, string> = {
  unit: "单元测试",
  midterm: "期中考试",
  final: "期末考试",
  mock: "模拟考试",
  entrance: "升学考试",
  competition: "竞赛",
};

/** 学期 */
export type Semester = "上" | "下" | "全";

/** 年级 (1-12) */
export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** 题目来源信息 */
export interface SourceInfo {
  name: string;       // 如 "2021年北京中考"
  year?: number;
  region?: string;
  type?: string;      // 如 "中考"、"期末"、"竞赛"
  url?: string;
}

/** 难度等级 */
export type DifficultyLevel = 0 | 1 | 2 | 3 | 4 | 5;
export const DifficultyLabel: Record<DifficultyLevel, string> = {
  0: "基础",
  1: "容易",
  2: "中等",
  3: "较难",
  4: "困难",
  5: "压轴",
};

/** 数学领域 */
export type MathDomain = "NUM" | "ALG" | "GEO" | "STA" | "MSR" | "LOG";
export const MathDomainLabel: Record<MathDomain, string> = {
  NUM: "数与运算",
  ALG: "代数",
  GEO: "图形与几何",
  STA: "统计与概率",
  MSR: "度量",
  LOG: "逻辑与思维",
};

/** 知识点特征分类 */
export type KnowledgeFeature =
  | "概念"
  | "算法"
  | "应用"
  | "数量关系"
  | "空间观念"
  | "推理"
  | "模型";

/** 答题区域类型 */
export type AnswerAreaType = "blank" | "lines" | "canvas" | "box";

/**
 * 知识点编码: {SECTION}-{DOMAIN}-{NNN}
 * 例: PS-NUM-001 (小学-数与运算-1~5的认识)
 */
export type KpCode = string;
