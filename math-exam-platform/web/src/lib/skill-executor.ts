/**
 * 数学技能执行器 (Server-Side Only)
 *
 * 读取 Python 项目下的 SKILL.md 提示词模板，通过 DeepSeek API 执行推理。
 * 对应 model_client.py 的 TypeScript 版本。
 *
 * 使用方式:
 *   import { executeSkill } from "@/lib/skill-executor";
 *   const result = await executeSkill("math-classifier", { question: "..." });
 */

import "server-only";

// ── 模型配置 ──

interface ModelConfig {
  name: string;
  provider: string;
  modelId: string;
  baseUrl: string;
  apiKeyEnv: string;
  temperature: number;
  maxTokens: number;
  isReasoner: boolean;
}

const BUILTIN_MODELS: Record<string, ModelConfig> = {
  "deepseek-v4-flash": {
    name: "deepseek-v4-flash",
    provider: "deepseek",
    modelId: "deepseek-v4-flash",
    baseUrl: "https://api.deepseek.com",
    apiKeyEnv: "DEEPSEEK_API_KEY",
    temperature: 0.0,
    maxTokens: 16000,
    isReasoner: false,
  },
  "deepseek-v4-pro": {
    name: "deepseek-v4-pro",
    provider: "deepseek",
    modelId: "deepseek-v4-pro",
    baseUrl: "https://api.deepseek.com",
    apiKeyEnv: "DEEPSEEK_API_KEY",
    temperature: 0.0,
    maxTokens: 32000,
    isReasoner: true,
  },
};

// 技能 → 推荐模型 映射
const SKILL_MODEL_MAP: Record<string, string> = {
  "math-classifier": "deepseek-v4-flash",
  "math-exam-composer": "deepseek-v4-pro",
  "math-exam-report-writer": "deepseek-v4-flash",
  "math-latex-renderer": "deepseek-v4-flash",   // 代码生成
  "math-question-auditor": "deepseek-v4-pro",
  "math-solution-verifier": "deepseek-v4-pro",
};

// ── 技能提示词缓存 ──

const promptCache = new Map<string, string>();

/**
 * 从 SKILL.md 文件提取 Prompt 模板
 * 路径: ../skills/{skillName}/SKILL.md
 */
function getSkillPromptPath(skillName: string): string {
  const fs = require("fs");
  const path = require("path");
  const skillsDir = path.resolve(
    process.cwd(),
    "..",
    "skills",
    skillName
  );
  return path.join(skillsDir, "SKILL.md");
}

/**
 * 读取技能提示词，从 SKILL.md 中提取 ### Prompt 模板 部分
 */
function loadSkillPrompt(skillName: string): string {
  if (promptCache.has(skillName)) {
    return promptCache.get(skillName)!;
  }

  const fs = require("fs");
  const promptPath = getSkillPromptPath(skillName);

  if (!fs.existsSync(promptPath)) {
    throw new Error(`Skill prompt not found: ${promptPath}`);
  }

  const content = fs.readFileSync(promptPath, "utf-8") as string;

  // 提取 "## Prompt 模板" 或 "## 核心策略" 之后的内容
  const promptMatch =
    content.match(/## Prompt 模板\n\n```\n([\s\S]*?)```/) ||
    content.match(/## 核心策略[\s\S]*?(?=##)/);

  let prompt: string;
  if (promptMatch) {
    prompt = promptMatch[1] || content;
  } else {
    // 如果没有找到明确的 prompt 模板块，使用整个文档作为 system prompt
    prompt = content;
  }

  promptCache.set(skillName, prompt);
  return prompt;
}

/**
 * 获取技能的完整执行提示词 (system prompt = SKILL.md, user prompt = 参数)
 */
export function getSkillSystemPrompt(skillName: string): string {
  const fs = require("fs");
  const promptPath = getSkillPromptPath(skillName);

  if (!fs.existsSync(promptPath)) {
    return "";
  }

  return fs.readFileSync(promptPath, "utf-8") as string;
}

// ── LLM 调用核心 ──

interface LLMCallOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "json" | "text";
  stream?: boolean;
}

interface LLMCallResult {
  reply: string | null;
  error: string | null;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

/**
 * 调用 LLM (DeepSeek API)
 */
async function callLLM(
  systemPrompt: string,
  userPrompt: string,
  options: LLMCallOptions = {}
): Promise<LLMCallResult> {
  const modelName = options.model || "deepseek-v4-flash";
  const config = BUILTIN_MODELS[modelName];

  if (!config) {
    return { reply: null, error: `Unknown model: ${modelName}`, model: modelName };
  }

  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) {
    return {
      reply: null,
      error: `Missing API key: ${config.apiKeyEnv}. Set it in .env file.`,
      model: modelName,
    };
  }

  const temperature = options.temperature ?? config.temperature;
  const maxTokens = options.maxTokens ?? config.maxTokens;

  try {
    const messages: Array<{ role: string; content: string }> = [];

    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: userPrompt });

    const body: Record<string, unknown> = {
      model: config.modelId,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    };

    // JSON mode (DeepSeek supports response_format)
    if (options.responseFormat === "json") {
      body.response_format = { type: "json_object" };
    }

    const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000), // 120s timeout
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        reply: null,
        error: `LLM API error ${response.status}: ${errorBody}`,
        model: modelName,
      };
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
      usage?: { prompt_tokens: number; completion_tokens: number };
    };

    let reply = data.choices?.[0]?.message?.content || "";

    // 清理思考标签（reasoner 模型）
    if (config.isReasoner && reply) {
      reply = reply.replace(/<[^>]+>/g, "").trim();
    }

    return {
      reply,
      error: null,
      model: modelName,
      usage: data.usage
        ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
          }
        : undefined,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { reply: null, error: message, model: modelName };
  }
}

/**
 * 带重试的 LLM 调用
 */
async function callLLMWithRetry(
  systemPrompt: string,
  userPrompt: string,
  options: LLMCallOptions = {},
  maxRetries = 3
): Promise<LLMCallResult> {
  let lastResult: LLMCallResult | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await callLLM(systemPrompt, userPrompt, options);
    if (result.reply && !result.error) {
      return result;
    }
    lastResult = result;

    // 指数退避
    if (attempt < maxRetries - 1) {
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return lastResult!;
}

// ── 技能执行入口 ──

export interface SkillExecuteOptions {
  /** 覆盖默认模型 */
  model?: string;
  /** 覆盖温度 */
  temperature?: number;
  /** 覆盖最大 tokens */
  maxTokens?: number;
  /** 返回格式 */
  responseFormat?: "json" | "text";
  /** 重试次数 */
  maxRetries?: number;
  /** 技能参数 (作为 user prompt 拼接) */
  params: Record<string, unknown>;
}

export interface SkillExecuteResult {
  success: boolean;
  data?: string;
  parsed?: unknown;         // JSON.parse(data) 如果 responseFormat=json
  error?: string;
  model: string;
  skillName: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

/**
 * 执行一个数学技能
 *
 * @param skillName — 技能名称 (如 "math-classifier")
 * @param options — 执行选项与参数
 * @returns 执行结果
 *
 * @example
 * const result = await executeSkill("math-classifier", {
 *   params: { question: "解方程 2x+3=7", answer: "x=2" },
 *   responseFormat: "json",
 * });
 */
export async function executeSkill(
  skillName: string,
  options: SkillExecuteOptions
): Promise<SkillExecuteResult> {
  const { params, responseFormat = "json", maxRetries = 3 } = options;

  try {
    // 1. 加载技能 system prompt
    const systemPrompt = getSkillSystemPrompt(skillName);
    if (!systemPrompt) {
      return {
        success: false,
        error: `Skill "${skillName}" not found`,
        model: "",
        skillName,
      };
    }

    // 2. 构建 user prompt (参数拼接)
    const userPrompt = buildUserPrompt(skillName, params);

    // 3. 确定模型
    const model = options.model || SKILL_MODEL_MAP[skillName] || "deepseek-v4-flash";

    // 4. 调用 LLM
    const result = await callLLMWithRetry(
      systemPrompt,
      userPrompt,
      {
        model,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        responseFormat,
      },
      maxRetries
    );

    if (result.error || !result.reply) {
      return {
        success: false,
        error: result.error || "Empty response",
        model,
        skillName,
      };
    }

    // 5. 尝试解析 JSON
    let parsed: unknown = null;
    if (responseFormat === "json") {
      parsed = extractJSON(result.reply);
    }

    return {
      success: true,
      data: result.reply,
      parsed,
      model,
      skillName,
      usage: result.usage,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: message,
      model: options.model || SKILL_MODEL_MAP[skillName] || "",
      skillName,
    };
  }
}

// ── User Prompt 构建 ──

/**
 * 根据技能名称和参数构建 user prompt
 */
function buildUserPrompt(
  skillName: string,
  params: Record<string, unknown>
): string {
  switch (skillName) {
    case "math-classifier":
      return buildClassifierPrompt(params);
    case "math-exam-composer":
      return buildComposerPrompt(params);
    case "math-exam-report-writer":
      return buildReportPrompt(params);
    case "math-latex-renderer":
      return buildRendererPrompt(params);
    case "math-question-auditor":
      return buildAuditorPrompt(params);
    case "math-solution-verifier":
      return buildVerifierPrompt(params);
    default:
      return JSON.stringify(params, null, 2);
  }
}

function buildClassifierPrompt(params: Record<string, unknown>): string {
  const lines: string[] = ["请对以下数学题进行分类挂载：", ""];
  if (params.question) lines.push(`## 题目\n${params.question}`);
  if (params.answer) lines.push(`\n## 答案\n${params.answer}`);
  if (params.analysis) lines.push(`\n## 解析\n${params.analysis}`);
  if (params.subject) lines.push(`\n## 学科\n${params.subject}`);
  lines.push("\n请输出 JSON 格式的挂载结果。");
  return lines.join("\n");
}

function buildComposerPrompt(params: Record<string, unknown>): string {
  const lines: string[] = ["请根据以下要求设计一份数学试卷：", ""];
  if (params.version) lines.push(`- 教材版本：${params.version}`);
  if (params.grade !== undefined) lines.push(`- 年级：${params.grade}年级`);
  if (params.semester) lines.push(`- 学期：${params.semester}学期`);
  if (params.examType) lines.push(`- 类型：${params.examType}`);
  if (params.totalScore) lines.push(`- 满分：${params.totalScore}分`);
  if (params.duration) lines.push(`- 时长：${params.duration}分钟`);
  if (params.sections) {
    const secs = params.sections as Array<Record<string, unknown>>;
    const sectionStrs = secs.map(
      (s) => `${s.type}(${s.count}题×${s.scorePerQuestion}分)`
    );
    lines.push(`- 题型分布：${sectionStrs.join(", ")}`);
  }
  if (params.kpList) {
    const kps = params.kpList as string[];
    lines.push(`\n## 知识点范围\n${kps.join("\n")}`);
  }
  lines.push("\n请按步骤输出双向细目表和最终 JSON。");
  return lines.join("\n");
}

function buildReportPrompt(params: Record<string, unknown>): string {
  const lines: string[] = ["请根据以下数据生成一份试卷分析报告：", ""];
  if (params.examJson) {
    lines.push("## 试卷信息");
    lines.push("```json");
    lines.push(JSON.stringify(params.examJson, null, 2));
    lines.push("```");
  }
  if (params.auditJson) {
    lines.push("\n## 审校结果");
    lines.push("```json");
    lines.push(JSON.stringify(params.auditJson, null, 2));
    lines.push("```");
  }
  lines.push("\n请按照报告结构输出 Markdown 格式的完整报告。");
  return lines.join("\n");
}

function buildRendererPrompt(params: Record<string, unknown>): string {
  const lines: string[] = ["请根据以下试卷 JSON 生成 LaTeX 源码：", ""];
  lines.push("```json");
  lines.push(JSON.stringify(params.paperJson, null, 2));
  lines.push("```");
  if (params.answerMode) lines.push(`\n答案模式：${params.answerMode}`);
  if (params.outputFormat) lines.push(`输出格式：${params.outputFormat}`);
  if (params.schoolName) lines.push(`学校名称：${params.schoolName}`);
  if (params.examDate) lines.push(`考试日期：${params.examDate}`);
  lines.push("\n请输出完整的 LaTeX 源码。");
  return lines.join("\n");
}

function buildAuditorPrompt(params: Record<string, unknown>): string {
  const lines: string[] = ["请对以下试卷执行 42 条审校规则：", ""];
  lines.push("```json");
  lines.push(JSON.stringify(params.examJson, null, 2));
  lines.push("```");
  if (params.rules) {
    lines.push(`\n需要执行的规则：${JSON.stringify(params.rules)}`);
  }
  lines.push("\n请逐条检查并输出审校结果 JSON。");
  return lines.join("\n");
}

function buildVerifierPrompt(params: Record<string, unknown>): string {
  const lines: string[] = ["请验证以下数学题的答案是否正确：", ""];
  if (params.questionText) lines.push(`## 题目\n${params.questionText}`);
  if (params.answerText) lines.push(`\n## 给定答案\n${params.answerText}`);
  if (params.questionType) lines.push(`\n## 题型\n${params.questionType}`);
  lines.push(
    "\n请独立求解，然后与给定答案对比。优先使用 Python sympy 代码验证。输出 JSON 结果。"
  );
  return lines.join("\n");
}

// ── JSON 提取工具 ──

/**
 * 从 LLM 回复中提取 JSON（处理 markdown 代码块包裹）
 */
export function extractJSON(text: string): unknown {
  // 尝试匹配 ```json ... ``` 代码块
  const codeBlockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  const jsonStr = codeBlockMatch ? codeBlockMatch[1] : text;

  try {
    return JSON.parse(jsonStr.trim());
  } catch {
    // 尝试匹配第一个 { 到最后一个 } 之间的内容
    const braceMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      try {
        return JSON.parse(braceMatch[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// ── 流式执行 (用于 SSE) ──

export interface StreamSkillOptions extends SkillExecuteOptions {
  onChunk?: (chunk: string) => void;
}

/**
 * 流式执行技能 (Server-Sent Events)
 * 用于需要实时展示进度的场景 (如组卷过程)
 */
export async function* executeSkillStream(
  skillName: string,
  options: StreamSkillOptions
): AsyncGenerator<{ content: string; done: boolean }> {
  const systemPrompt = getSkillSystemPrompt(skillName);
  const userPrompt = buildUserPrompt(skillName, options.params);
  const modelName = options.model || SKILL_MODEL_MAP[skillName] || "deepseek-v4-flash";
  const config = BUILTIN_MODELS[modelName];

  if (!config) {
    yield { content: `Error: Unknown model ${modelName}`, done: true };
    return;
  }

  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) {
    yield { content: `Error: Missing API key ${config.apiKeyEnv}`, done: true };
    return;
  }

  const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.modelId,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: options.temperature ?? config.temperature,
      max_tokens: options.maxTokens ?? config.maxTokens,
      stream: true,
    }),
    signal: AbortSignal.timeout(300_000),
  });

  if (!response.ok || !response.body) {
    yield { content: `Error: API returned ${response.status}`, done: true };
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();
        if (data === "[DONE]") {
          yield { content: "", done: true };
          return;
        }
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content || "";
          if (content) {
            yield { content, done: false };
          }
        } catch {
          // skip parse errors on individual chunks
        }
      }
    }
  }

  yield { content: "", done: true };
}

// ── 健康检查 ──

export function getAvailableSkills(): string[] {
  const fs = require("fs");
  const skillsDir = require("path").resolve(
    process.cwd(),
    "..",
    "skills"
  );
  if (!fs.existsSync(skillsDir)) return [];
  return fs
    .readdirSync(skillsDir)
    .filter((name: string) =>
      fs.existsSync(require("path").join(skillsDir, name, "SKILL.md"))
    );
}

export function getAvailableModels(): string[] {
  const available: string[] = [];
  for (const [name, config] of Object.entries(BUILTIN_MODELS)) {
    if (process.env[config.apiKeyEnv]) {
      available.push(name);
    }
  }
  return available;
}
