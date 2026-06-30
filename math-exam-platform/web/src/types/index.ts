// ── 数学考试平台 · 类型定义统一导出 ──
// 使用方法: import { IQuestion, IPaper, QuestionType, ... } from "@/types"

// ── 通用类型 ──
export type {
  QuestionType,
  CognitiveLevel,
  Section,
  TextbookVersion,
  ExamType,
  Semester,
  GradeLevel,
  DifficultyLevel,
  MathDomain,
  KnowledgeFeature,
  AnswerAreaType,
  SourceInfo,
  KpCode,
} from "./common";

export {
  QuestionTypeLabel,
  CognitiveLevelLabel,
  SectionLabel,
  ExamTypeLabel,
  DifficultyLabel,
  MathDomainLabel,
} from "./common";

// ── 题目类型 ──
export type {
  IOption,
  RawDatasetOption,
  IQuestionImage,
  ISolutionStep,
  IAnswer,
  IQuestion,
  IRawTALQuestion,
  IRawCMMQuestion,
  IRawApeQuestion,
  IRawMATHQuestion,
  IRawGeoQAQuestion,
  RawQuestion,
  IQuestionFilter,
  QuestionSortField,
  IQuestionSort,
  IQuestionSearchParams,
  IQuestionSearchResult,
  IQuestionStats,
} from "./question";

// ── 试卷类型 ──
export type {
  IExamConstraints,
  IExamScope,
  IExamConfig,
  IModule,
  IPaperHeader,
  IPaper,
  PaperStatus,
  IPaperStats,
  IAnswerSheetItem,
  IPaperAnswerKey,
  IAnswerModule,
  GenerationTaskStatus,
  IGenerationTask,
  IGenerationLog,
  IAuditIssue,
  IAuditResult,
  IPaperVersion,
} from "./paper";

// ── 知识点类型 (新版 · 展示用) ──
export type {
  Stage,
  Grade,
  Chapter,
  ChapterSection,
  KnowledgePoint,
  KnowledgeFilter,
  KnowledgeTreeNode,
} from "./knowledge";

// ── 知识点类型 (旧版 · 编码体系) ──
export type {
  KpSystemMeta,
  IKnowledgePointLegacy,
  IKnowledgePointGroup,
  IKnowledgePointSystem,
  ITextbookUnit,
  ITextbookChapter,
  ITextbookBooklet,
  IKpTreeNode,
  IKpTagResult,
  IExamMethod,
  IAbilityTestItem,
} from "./knowledge";

// ── API 类型 ──
export type {
  ApiResponse,
  ApiPagination,
  ApiPaginatedResponse,
  ClassifyRequest,
  ClassifyResponse,
  ComposeRequest,
  ComposeResponse,
  SectionSpec,
  BlueprintItem,
  QueryCondition,
  ReportRequest,
  ReportResponse,
  ReportSection,
  ReportTable,
  RenderRequest,
  RenderResponse,
  AnswerMode,
  OutputFormat,
  AuditRequest,
  AuditIssue as ApiAuditIssue,
  AuditResponse,
  VerifyRequest,
  VerifyResponse,
  HealthResponse,
} from "./api";
