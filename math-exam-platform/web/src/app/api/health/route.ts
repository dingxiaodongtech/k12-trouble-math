/**
 * 健康检查 API
 * GET /api/health
 */

import { NextResponse } from "next/server";
import { getAvailableSkills, getAvailableModels } from "@/lib/skill-executor";

export async function GET() {
  const skills = getAvailableSkills();
  const models = getAvailableModels();

  const status = skills.length > 0 && models.length > 0 ? "ok" : "degraded";

  return NextResponse.json({
    success: true,
    data: {
      status,
      version: "2.0.0",
      skills,
      modelsAvailable: models,
      timestamp: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
}
