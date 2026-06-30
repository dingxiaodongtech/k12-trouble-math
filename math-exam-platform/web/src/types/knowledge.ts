// ── 知识树 · 前端展示类型 (新) ──
// 层级: 学段 → 年级 → 章节 → 小节 → 知识点

export interface Stage {
  id: string;
  name: string;
  order: number;
  grades: Grade[];
}

export interface Grade {
  id: string;
  name: string;
  shortName: string;
  gradeLevel: number;
  semester: "上" | "下" | "全";
  tags?: string[];
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  name: string;
  shortName: string;
  order: number;
  description?: string;
  sections: ChapterSection[];
  totalPoints: number;
  totalQuestions: number;
}

export interface ChapterSection {
  id: string;
  name: string;
  order: number;
  knowledgePoints: KnowledgePoint[];
}

export interface KnowledgePoint {
  id: string;
  name: string;
  description?: string;
  cognitiveLevel: "记忆" | "理解" | "应用" | "分析" | "综合";
  importance: number;
  questionCount: number;
  /** 数据库中与本题匹配的标签名（用于前端筛选） */
  dbTags?: string[];
  examMethods?: string[];
  prerequisites?: string[];
  related?: string[];
}

export interface KnowledgeFilter {
  stageId?: string;
  gradeId?: string;
  chapterId?: string;
  domain?: string;
  searchText?: string;
  selectedPointIds: Set<string>;
}

export interface KnowledgeTreeNode {
  key: string;
  title: string;
  type: "stage" | "grade" | "chapter" | "section" | "point";
  data: Stage | Grade | Chapter | ChapterSection | KnowledgePoint;
  children?: KnowledgeTreeNode[];
  isLeaf?: boolean;
  questionCount: number;
}

// ── 旧版兼容类型 ──

import type { CognitiveLevel, GradeLevel, MathDomain, Section, Semester, QuestionType, KnowledgeFeature, KpCode } from "./common";

export interface KpSystemMeta {
  version: string;
  description: string;
  encodingRule: string;
  sections: Record<Section, string>;
  domains: Record<MathDomain, string>;
  questionTypes: Record<QuestionType, string>;
  cognitiveLevels: Record<CognitiveLevel, string>;
}

export interface IKnowledgePointLegacy {
  code: KpCode;
  name: string;
  grades: GradeLevel[];
  weight: number;
  domain: MathDomain;
  section: Section;
  parentCode?: KpCode;
  children?: KpCode[];
  features?: KnowledgeFeature[];
  prerequisites?: KpCode[];
  searchKeywords?: string[];
}

export interface IKnowledgePointGroup {
  code: string;
  name: string;
  section: Section;
  domain: MathDomain;
  points: Record<KpCode, IKnowledgePointLegacy>;
}

export interface IKnowledgePointSystem {
  meta: KpSystemMeta;
  knowledgePoints: Record<string, IKnowledgePointGroup>;
}

export interface ITextbookUnit {
  name: string;
  chapters: ITextbookChapter[];
  knowledgePoints: KpCode[];
}

export interface ITextbookChapter {
  name: string;
  knowledgePoints: KpCode[];
  pageRange?: [number, number];
}

export interface ITextbookBooklet {
  version: string;
  grade: GradeLevel;
  semester: Semester;
  gradeName: string;
  units: ITextbookUnit[];
}

export interface IKpTreeNode {
  code: KpCode;
  name: string;
  weight: number;
  grades: GradeLevel[];
  children: IKpTreeNode[];
  isLeaf: boolean;
}

export interface IKpTagResult {
  grade: string;
  kp: string;
  feature: KnowledgeFeature;
  confidence: number;
  reason: string;
  stem: string;
  answer: string;
  dataset: string;
}

export interface IExamMethod {
  id: string;
  name: string;
  kpCode: KpCode;
  description: string;
  exampleQuestionIds: string[];
  frequency: number;
  difficultyRange: [number, number];
}

export interface IAbilityTestItem {
  id: string;
  kpCode: KpCode;
  cognitiveLevel: CognitiveLevel;
  questionText: string;
  expectedTime: number;
}
