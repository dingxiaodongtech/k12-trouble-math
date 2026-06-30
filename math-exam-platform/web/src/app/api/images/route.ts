/**
 * 图片代理 API — 从本地文件系统读取图片
 *
 * GET /api/images?path=images/2024年上海市中考数学真题_Q5_image36.png
 *
 * 图片存储在: extraction_tool/output_llm/images/
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 图片根目录
const IMG_ROOT = path.resolve(
  process.cwd(),
  "..",
  "extraction_tool",
  "output_llm",
  "images"
);

// MIME 类型映射
const MIME_MAP: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".wmf": "image/wmf",
  ".emf": "image/emf",
};

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path") || "";

  if (!rawPath) {
    return NextResponse.json({ error: "缺少 path 参数" }, { status: 400 });
  }

  // 安全检查：防止路径遍历
  if (rawPath.includes("..") || rawPath.includes("~")) {
    return NextResponse.json({ error: "非法路径" }, { status: 403 });
  }

  // 提取纯文件名（去掉路径前缀）
  const fileName = path.basename(rawPath);
  const filePath = path.join(IMG_ROOT, fileName);

  if (!fs.existsSync(filePath)) {
    // 尝试大小写不敏感匹配
    if (fs.existsSync(IMG_ROOT)) {
      const files = fs.readdirSync(IMG_ROOT);
      const match = files.find(
        (f) => f.toLowerCase() === fileName.toLowerCase()
      );
      if (match) {
        return serveFile(path.join(IMG_ROOT, match));
      }
    }
    return NextResponse.json(
      { error: "图片不存在", path: rawPath },
      { status: 404 }
    );
  }

  return serveFile(filePath);
}

function serveFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_MAP[ext] || "application/octet-stream";

  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": mimeType,
      "Cache-Control": "public, max-age=86400, immutable",
      "Content-Length": String(buffer.length),
    },
  });
}
