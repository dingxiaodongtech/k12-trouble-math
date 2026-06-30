/**
 * 出卷任务管理器 — 支持异步进度追踪
 *
 * 使用 in-memory Map 存储任务状态，前端通过轮询获取实时进度。
 */

import "server-only";
import { orchestrateExam, type OrchestrateResult } from "./exam-orchestrator";

// ── 任务状态类型 ──

export type TaskPhase =
  | "parsing"      // 解析意图
  | "syllabus"     // 设计细目表
  | "retrieving"   // 检索题目
  | "assembling"   // 组装试卷
  | "completed"    // 完成
  | "failed";      // 失败

export interface TaskProgress {
  taskId: string;
  status: "pending" | "running" | "completed" | "failed";
  phase: TaskPhase;
  phaseLabel: string;
  progress: number;        // 0-100
  message: string;
  logs: string[];
  startedAt: number;       // timestamp ms
  estimatedTotalMs: number;
  result?: OrchestrateResult;
  error?: string;
}

// ── 全局任务存储 (服务端内存) ──

const tasks = new Map<string, TaskProgress>();

// 5 分钟后自动清理已完成的任务
const TASK_TTL_MS = 5 * 60 * 1000;

function scheduleCleanup(taskId: string) {
  setTimeout(() => {
    const task = tasks.get(taskId);
    if (task && (task.status === "completed" || task.status === "failed")) {
      tasks.delete(taskId);
    }
  }, TASK_TTL_MS);
}

// ── 公开 API ──

/** 启动出卷任务，返回 taskId */
export function startTask(userInput: string): string {
  const taskId = `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const initialProgress: TaskProgress = {
    taskId,
    status: "pending",
    phase: "parsing",
    phaseLabel: "正在解析你的需求...",
    progress: 0,
    message: "启动出卷流水线",
    logs: [],
    startedAt: Date.now(),
    estimatedTotalMs: 45000,
  };

  tasks.set(taskId, initialProgress);

  // 异步执行流水线
  runPipeline(taskId, userInput);

  return taskId;
}

/** 获取任务进度 */
export function getTaskProgress(taskId: string): TaskProgress | null {
  return tasks.get(taskId) || null;
}

/** 获取所有活跃任务 */
export function getActiveTaskCount(): number {
  let count = 0;
  for (const [, task] of tasks) {
    if (task.status === "pending" || task.status === "running") {
      count++;
    }
  }
  return count;
}

// ── 流水线执行 ──

async function runPipeline(taskId: string, userInput: string) {
  const update = (partial: Partial<TaskProgress>) => {
    const current = tasks.get(taskId);
    if (current) {
      tasks.set(taskId, { ...current, ...partial });
    }
  };

  try {
    // Phase 1: 解析
    update({
      status: "running",
      phase: "parsing",
      phaseLabel: "🔍 正在解析你的出卷需求...",
      progress: 10,
      message: "识别年级、学期、题型、分值...",
      logs: ["开始解析用户意图..."],
    });

    // 模拟解析延迟(实际在 orchestrateExam 内部执行)
    await sleep(200);

    // Phase 2: 细目表
    update({
      phase: "syllabus",
      phaseLabel: "📋 正在设计双向细目表...",
      progress: 25,
      message: "调用 AI 编排知识点分布...",
      logs: ["意图解析完成", "开始设计细目表..."],
      estimatedTotalMs: Math.max(30000, Date.now() - (tasks.get(taskId)?.startedAt || Date.now()) + 25000),
    });

    // 实际执行流水线
    const result = await orchestrateExam(userInput);

    // 如果 orchestrateExam 没有抛出异常，从它的 logs 提取信息
    const pipelineLogs = result.logs || [];

    // Phase 3: 检索
    update({
      phase: "retrieving",
      phaseLabel: "🔎 正在从题库检索匹配题目...",
      progress: 60,
      message: "查询数据库并生成候选题目...",
      logs: [...pipelineLogs.slice(-5), "正在检索题目..."],
    });

    // Phase 4: 组装
    update({
      phase: "assembling",
      phaseLabel: "📦 正在组装试卷...",
      progress: 85,
      message: "按题型分模块、统一格式...",
      logs: [...pipelineLogs.slice(-10), "正在组装试卷..."],
    });

    await sleep(200);

    // 完成
    const totalQ = result.paper.modules.reduce((s, m) => s + m.questions.length, 0);
    const elapsed = Date.now() - (tasks.get(taskId)?.startedAt || Date.now());

    update({
      status: "completed",
      phase: "completed",
      phaseLabel: "✅ 试卷生成完成！",
      progress: 100,
      message: `已生成 ${result.paper.modules.length} 个模块、${totalQ} 道题目，耗时 ${(elapsed / 1000).toFixed(1)} 秒`,
      logs: [...pipelineLogs, `✅ 完成！耗时 ${elapsed}ms`],
      result,
      estimatedTotalMs: elapsed,
    });

    scheduleCleanup(taskId);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    update({
      status: "failed",
      phase: "failed",
      phaseLabel: "❌ 生成失败",
      progress: 0,
      message: errorMsg,
      logs: [...(tasks.get(taskId)?.logs || []), `❌ 错误: ${errorMsg}`],
      error: errorMsg,
    });
    scheduleCleanup(taskId);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
