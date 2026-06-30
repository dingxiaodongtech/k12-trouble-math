// ── API 请求/响应类型定义 ──
// 与各 Math Skill 的输入输出对齐

import type {
  IQuestion,
  IPaper,
  IExamConfig,
  IAuditResult,
  IGenerationTask,
  IKpTagResult,
  QuestionType,
  DifficultyLevel,
  CognitiveLevel,
  Semester,
  KpCode,
  ExamType,
  GradeLevel,
  TextbookVersion,
} from "./index";

// ── 通用 API 包装 ──

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;            // 错误码
  timestamp: string;
}

export interface ApiPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: ApiPagination;
}

// ── Skill: math-classifier (题目分类挂载) ──

export interface ClassifyRequest {
  question: string;          // 题干 (支持 LaTeX)
  answer?: string;           // 答案
  analysis?: string;         // 解析
  subject?: string;          // 学科提示 (如 "初中数学")
}

export interface ClassifyResponse {
  kpCode: KpCode;
  kpName: string;            // 知识点名称
  domain: string;            // 领域
  feature: string;           // 特征 (算法/应用/概念/...)
  abilityLevel: CognitiveLevel;
  grade: string;             // 推定年级
  gradeLevel: GradeLevel;
  booklet: string;           // 册别 (如 "八年级上册")
  unitName: string;          // 单元名
  sectionName: string;       // 小节名
  confidence: number;        // 置信度 0-1
  reasoning: string;         // 判定理由
}

// ── Skill: math-exam-composer (试卷组卷编排) ──

export interface ComposeRequest {
  version: TextbookVersion;
  grade: GradeLevel;
  semester: Semester;
  examType: ExamType;
  totalScore: number;
  duration: number;          // 分钟
  sections: SectionSpec[];
  kpList: string[];          // 知识点名称列表 (覆盖范围)
}

export interface SectionSpec {
  type: QuestionType;
  count: number;
  scorePerQuestion: number;
  label?: string;            // 如 "一、选择题"
}

export interface BlueprintItem {
  number: number;            // 题号
  type: QuestionType;
  kpCode: KpCode;
  cognitive: CognitiveLevel;
  score: number;
  difficultyTarget: number;  // 0-1
}

export interface QueryCondition {
  number: number;
  type: QuestionType;
  kp: KpCode;
  diff: [number, number];    // 难度范围
  limit: number;
}

export interface ComposeResponse {
  exam: {
    title: string;
    grade: GradeLevel;
    semester: string;
    version: string;
    totalScore: number;
    durationMin: number;
  };
  blueprint: BlueprintItem[];
  queryConditions: QueryCondition[];
  // 后续 Pipeline 会填充
  modules?: IPaper["modules"];
}

// ── Skill: math-exam-report-writer (试卷分析报告) ──

export interface ReportRequest {
  examJson: IPaper;          // 试卷 JSON
  auditJson?: IAuditResult;  // 审校结果 (可选)
}

export interface ReportResponse {
  title: string;
  summary: string;
  sections: ReportSection[];
  rawMarkdown: string;       // 完整 Markdown 报告
}

export interface ReportSection {
  heading: string;
  level: 1 | 2 | 3;
  content: string;
  table?: ReportTable;
}

export interface ReportTable {
  headers: string[];
  rows: string[][];
}

// ── Skill: math-latex-renderer (LaTeX 渲染编译) ──

export type AnswerMode = "end" | "inline" | "separate";
export type OutputFormat = "latex" | "pdf" | "html";

export interface RenderRequest {
  paperJson: IPaper;         // 试卷 JSON
  answerMode: AnswerMode;    // 答案位置
  outputFormat: OutputFormat;
  compile?: boolean;         // 是否直接编译 PDF (需要 xelatex 环境)
  schoolName?: string;
  examDate?: string;
}

export interface RenderResponse {
  latexSource: string;       // LaTeX 源码
  pdfUrl?: string;           // 编译后 PDF 下载地址
  htmlUrl?: string;          // HTML 预览地址
  log?: string;              // 编译日志
}

// ── Skill: math-question-auditor (试卷审校) ──

export interface AuditRequest {
  examJson: IPaper;          // 试卷 JSON
  rules?: number[];          // 需要执行的规则编号 (默认全部 42 条)
}

export interface AuditIssue {
  rule: number;
  qNumber: number;           // 题号
  level: "ERROR" | "WARN" | "INFO";
  field: "stem" | "answer" | "analysis" | "options";
  old: string;
  new: string;
  autoFixed: boolean;
  description?: string;
}

export type AuditResponse = IAuditResult & {
  issues: AuditIssue[];
  fixesApplied: number;
};

// ── Skill: math-solution-verifier (解答验证) ──

export interface VerifyRequest {
  questionText: string;      // 题干
  answerText: string;        // 待验证答案
  questionType?: QuestionType;
  hints?: string[];          // 额外提示
}

export interface VerifyResponse {
  match: boolean | null;     // true=正确, false=错误, null=无法判断
  computed?: string;         // 独立计算的结果
  given: string;             // 原始给定答案
  method: "sympy" | "llm" | "both";
  confidence?: number;       // 0-1
  reason?: string;           // 不匹配时的解释
  pythonCode?: string;       // 使用的 Python 验证代码
}

// ── 题库相关 API ──

export interface QuestionListRequest {
  filter?: Record<string, unknown>;
  sort?: { field: string; order: "asc" | "desc" };
  page?: number;
  pageSize?: number;
}

export interface QuestionListResponse {
  questions: IQuestion[];
  pagination: ApiPagination;
}

export interface QuestionByIdRequest {
  id: string;
}

// ── 试卷 CRUD API ──

export interface PaperSaveRequest {
  paper: IPaper;
}

export interface PaperSaveResponse {
  id: string;
  version: string;
}

export interface PaperListResponse {
  papers: IPaper[];
  pagination: ApiPagination;
}

// ── 生成任务追踪 ──

export interface TaskStatusResponse {
  task: IGenerationTask;
}

// ── 知识点 API ──

export interface KpTreeResponse {
  tree: Record<string, unknown>;
  meta: Record<string, unknown>;
}

// ── 健康检查 ──

export interface HealthResponse {
  status: "ok" | "degraded" | "down";
  version: string;
  skills: string[];
  modelsAvailable: string[];
}
