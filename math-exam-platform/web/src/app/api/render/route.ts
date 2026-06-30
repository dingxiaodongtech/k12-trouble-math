/**
 * API /api/render — 渲染试卷为 PDF
 *
 * POST: 接收 paper JSON body，返回 PDF 文件
 * GET:  接收 ?id=xxx (试卷文件名)，从 json_final 读取后渲染
 */
import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(execFile);

// process.cwd() 在 Next.js 运行时指向 web/
const PROJECT_ROOT = path.resolve(process.cwd(), "..");
const PIPELINE_DIR = path.join(PROJECT_ROOT, "pipeline");
const JSON_DIR = path.join(
  PROJECT_ROOT, "extraction_tool", "output_llm", "json_final"
);
const OUTPUT_DIR = path.join(PROJECT_ROOT, "output");
const RENDER_SCRIPT = path.join(PIPELINE_DIR, "render_paper.py");
const PYTHON = "python";

// ── IPaper → json_final 格式转换 ──
// 前端 IPaper 格式 ≠ render_paper.py 期望的 json_final 格式，需转换
function convertIPaperToJsonFinal(iPaper: any): any {
  // 如果已经是 json_final 格式（有 paper + modules 且 modules[0].questions[0].subject_type 存在），直接返回
  if (iPaper.paper && iPaper.modules && Array.isArray(iPaper.modules) &&
      iPaper.modules[0]?.questions?.[0]?.subject_type) {
    return iPaper;
  }

  const header = iPaper.header || {};
  const config = iPaper.config || {};

  const mapSubjectType = (qt: string): string => {
    const m: Record<string, string> = {
      MC: "单选题", FB: "填空题", SA: "解答题", PR: "证明题", AP: "作图题",
    };
    return m[qt] || "解答题";
  };
  const mapEntryType = (qt: string): string => {
    const m: Record<string, string> = {
      MC: "单选", FB: "填空(人工批改)", SA: "解答", PR: "解答", AP: "解答",
    };
    return m[qt] || "解答";
  };

  const modules = (iPaper.modules || []).map((m: any) => ({
    name: m.title || "",
    description: m.subtitle || m.instructions || "",
    questions: (m.questions || []).map((q: any, qi: number) => {
      const qt = q.questionType || "SA";
      // 选项转换: [{label:"A",content:"xx"}] → ["A. xx"]
      const options = (q.options || []).map((o: any) =>
        o.label ? `${o.label}. ${o.content || ""}` : (o.content || String(o))
      );
      // 答案转换
      let answer: any = q.answer;
      if (answer && typeof answer === "object" && !Array.isArray(answer)) {
        const val = answer.value;
        if (qt === "FB") {
          // 填空题: {value:"42"} → [{blank_index:1, value:"42"}]
          answer = [{ blank_index: 1, value: String(val), display_answer: String(val) }];
        } else {
          answer = String(val);
        }
      }
      return {
        id: q.id ? (parseInt(q.id) || qi + 1) : qi + 1,
        subject_type: mapSubjectType(qt),
        entry_type: mapEntryType(qt),
        stem: q.stem || "",
        options: qt === "MC" ? options : [],
        answer: answer ?? "",
        analysis: q.analysis || "",
        score: q.score || 0,
        has_image: (q.images || []).length > 0,
        image_urls: {},
      };
    }),
  }));

  return {
    paper: {
      name: header.examTitle || config.title || "数学试卷",
      year: header.examDate || "",
      grade: header.grade || "",
      semester: config.semester || "",
      subject: "数学",
      version: header.textbookVersion || config.textbookVersion || "",
      type: config.examType || "",
      total_score: header.totalScore || config.totalScore || 100,
    },
    modules,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let paperJson = body.paper;          // paper JSON 对象
    const mode = body.mode || "end";       // inline | end

    if (!paperJson) {
      return NextResponse.json(
        { error: "缺少 paper 字段" },
        { status: 400 }
      );
    }

    // 格式转换：IPaper → json_final（render_paper.py 期望的格式）
    paperJson = convertIPaperToJsonFinal(paperJson);

    // 生成唯一文件名
    const timestamp = Date.now();
    const safeName = `exam_${timestamp}`;
    const inputJsonPath = path.join(OUTPUT_DIR, `${safeName}_input.json`);
    const pdfPath = path.join(OUTPUT_DIR, `${safeName}.pdf`);

    // 写入临时 JSON
    fs.writeFileSync(inputJsonPath, JSON.stringify(paperJson), "utf-8");

    // 调 Python 渲染
    const { stdout, stderr } = await execAsync(
      PYTHON,
      [
        RENDER_SCRIPT,
        "--json", inputJsonPath,
        "--mode", mode,
        "--output", pdfPath,
      ],
      {
        cwd: PROJECT_ROOT,
        timeout: 120_000,           // 2 分钟超时
        maxBuffer: 50 * 1024 * 1024,
        env: {
          ...process.env,
          MIKTEX_DISABLE_DIALOG: "TRUE",
          MIKTEX_AUTOINSTALL: "1",
        },
      }
    );

    // 清理临时 JSON
    try { fs.unlinkSync(inputJsonPath); } catch {}

    // 检查 PDF 是否存在
    if (!fs.existsSync(pdfPath)) {
      console.error("Render failed:", stderr);
      return NextResponse.json(
        { error: "PDF 生成失败", detail: stderr.slice(0, 500) },
        { status: 500 }
      );
    }

    // 读取 PDF 返回
    const pdfBuffer = fs.readFileSync(pdfPath);

    // 返回 PDF 流
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${path.basename(pdfPath)}"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (err: any) {
    console.error("Render error:", err);
    return NextResponse.json(
      { error: "渲染过程中出错", detail: err.message },
      { status: 500 }
    );
  }
}

/**
 * GET 模式：从 json_final/ 读取已有试卷渲染
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "需要 ?id=试卷文件名(不含.json)" },
      { status: 400 }
    );
  }

  // 在 json_final/ 中找文件
  const files = fs.readdirSync(JSON_DIR).filter(
    (f) => f.endsWith(".json") && f.includes(id)
  );
  if (files.length === 0) {
    return NextResponse.json(
      { error: `未找到匹配的试卷: ${id}` },
      { status: 404 }
    );
  }

  const jsonPath = path.join(JSON_DIR, files[0]);
  const paperJson = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // 调用 POST 逻辑
  const body = JSON.stringify({ paper: paperJson, mode: "end" });
  const req = new NextRequest(new URL(request.url), {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  return POST(req);
}
