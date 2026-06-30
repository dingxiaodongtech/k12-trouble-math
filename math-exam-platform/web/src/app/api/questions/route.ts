/** 试题库 API — 从 SQLite 读取 */
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.resolve(process.cwd(), "..", "..", "临时文件", "math-exam-platform", "math-exam-platform", "data", "exam_platform.db");

const TYPE_MAP: Record<string, string> = {
  MC: "单选题", FB: "填空题", SA: "解答题", PR: "证明题", CA: "计算题", TF: "判断题", AP: "作图题",
};

function getDb() {
  return new Database(DB_PATH, { readonly: true });
}

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") || "";
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get("limit") || "200"), 2000);

    const db = getDb();
    let sql = "SELECT * FROM question_index WHERE 1=1";
    const params: any[] = [];

    if (search) {
      sql += " AND question_text LIKE ?";
      params.push(`%${search}%`);
    }
    sql += " ORDER BY id LIMIT ?";
    params.push(limit);

    const rows = db.prepare(sql).all(...params) as any[];
    const questions = rows.map((r: any, i: number) => {
      let tags: any = {};
      try { tags = JSON.parse(r.tags || "{}"); } catch {}
      let kpTags: any = {};
      try { kpTags = JSON.parse(r.knowledge_tags || "{}"); } catch {}

      return {
        id: i + 1,
        subject_type: TYPE_MAP[r.question_type] || r.question_type || "解答题",
        entry_type: r.question_type || "",
        stem: r.question_text || "",
        options: [],
        answer: r.answer_text || "",
        analysis: r.solution_steps || "",
        score: r.score_points ? parseInt(r.score_points) : 0,
        has_image: !!r.has_diagram,
        image_urls: r.diagram_url ? { stem: r.diagram_url } : {},
        kp_name: tags.domain || kpTags.kp_name || "",
        kp_path: tags.domain ? [tags.domain] : [],
        textbook_kp_name: r.unit_name || "",
        textbook_kp_path: [r.section_name || ""].filter(Boolean),
        secondary_kps: [],
        feature: r.cognitive_level || "",
        warnings: [],
        _paper: r.source || "",
        _file: r.source_id || "",
        _module: r.question_type_std || "",
        _source: `${r.grade_std || ""}年级·${r.semester || ""}`,
        grade: r.grade_std || 0,
        difficulty: r.difficulty || 3,
      };
    });

    db.close();
    return NextResponse.json({ success: true, data: questions, total: questions.length });
  } catch (e: any) {
    return NextResponse.json({ success: false, data: [], total: 0, error: e.message });
  }
}
