/**
 * 出卷流水线 API — 支持异步任务追踪
 *
 * POST /api/pipeline/generate-exam  → 启动出卷任务，返回 taskId
 * GET  /api/pipeline/generate-exam?taskId=xxx → 查询任务进度
 */

import { NextRequest, NextResponse } from "next/server";
import { startTask, getTaskProgress } from "@/lib/pipeline/task-manager";

// ── POST: 启动出卷任务 ──

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userInput: string = body.input || body.message || body.query || "";

    if (!userInput.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "请输入出卷指令，例如：帮我出一份七年级人教版数学期中试卷",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 启动异步任务
    const taskId = startTask(userInput.trim());

    return NextResponse.json(
      {
        success: true,
        data: { taskId },
        message: "出卷任务已启动，请轮询进度",
        timestamp: new Date().toISOString(),
      },
      { status: 202 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

// ── GET: 查询任务进度 ──

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json(
      { success: false, error: "缺少 taskId 参数" },
      { status: 400 }
    );
  }

  const progress = getTaskProgress(taskId);

  if (!progress) {
    return NextResponse.json(
      { success: false, error: "任务不存在或已过期" },
      { status: 404 }
    );
  }

  const data: Record<string, unknown> = {
    taskId: progress.taskId,
    status: progress.status,
    phase: progress.phase,
    phaseLabel: progress.phaseLabel,
    progress: progress.progress,
    message: progress.message,
    logs: progress.logs.slice(-15),
    startedAt: progress.startedAt,
    elapsedMs: Date.now() - progress.startedAt,
    estimatedTotalMs: progress.estimatedTotalMs,
    error: progress.error,
  };

  // 如果完成，附带结果
  if (progress.status === "completed" && progress.result) {
    Object.assign(data, {
      paper: progress.result.paper,
      pipelineLogs: progress.result.logs,
      pipelineErrors: progress.result.errors,
    });
  }

  return NextResponse.json({ success: true, data });
}
