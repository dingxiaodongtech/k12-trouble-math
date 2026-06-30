/** 试卷库 API — 从 SQLite 读取 */
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.resolve(process.cwd(), "..", "..", "临时文件", "math-exam-platform", "math-exam-platform", "data", "exam_platform.db");

function getDb() {
  return new Database(DB_PATH, { readonly: true });
}

const GRADE_NUMS: Record<number, string> = { 1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七",8:"八",9:"九",10:"十" };

function gradeLabel(n: number): string {
  const cn = GRADE_NUMS[n] || String(n);
  return `${cn}年级`;
}

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const db = getDb();

    if (id) {
      // 单卷详情
      const decodedId = decodeURIComponent(id);
      const questions = db.prepare(
        "SELECT * FROM question_index WHERE source = ? OR source_id = ? ORDER BY id"
      ).all(decodedId, decodedId) as any[];

      if (questions.length === 0) {
        db.close();
        return NextResponse.json({ success: false, data: null, error: "试卷不存在" });
      }

      const first = questions[0];
      const modules: Record<string, any[]> = {};
      for (const q of questions) {
        const modKey = q.unit_name || q.question_type_std || "题目";
        if (!modules[modKey]) modules[modKey] = [];
        modules[modKey].push({
          id: q.id,
          subject_type: q.question_type || "SA",
          stem: q.question_text || "",
          options: [],
          answer: q.answer_text || "",
          analysis: q.solution_steps || "",
          image_urls: q.diagram_url ? { stem: q.diagram_url } : {},
          score: q.score_points ? parseInt(q.score_points) : 0,
        });
      }

      db.close();
      return NextResponse.json({
        success: true,
        data: {
          paper: {
            name: first.source || "",
            year: "",
            region: "",
            grade: gradeLabel(first.grade_std || 7),
            type: first.question_type_std || "",
            total_score: questions.reduce((s: number, q: any) => s + (q.score_points ? parseInt(q.score_points) : 0), 0),
          },
          modules: Object.entries(modules).map(([name, qs]) => ({
            name, description: "", questions: qs,
          })),
        },
      });
    }

    // 试卷列表
    const rows = db.prepare(
      "SELECT source, grade_std, semester, question_type_std, COUNT(*) as q_count FROM question_index WHERE source IS NOT NULL AND source != '' GROUP BY source ORDER BY source"
    ).all() as any[];

    const papers = rows.map((r: any) => ({
      id: r.source,
      title: r.source || "",
      year: "",
      region: "",
      grade: gradeLabel(r.grade_std || 7),
      examType: r.question_type_std || "",
      totalScore: 0,
      questions: r.q_count,
      tags: [] as string[],
      status: "已发布" as const,
      createdAt: "",
    }));

    db.close();
    return NextResponse.json({ success: true, data: papers, total: papers.length });
  } catch (e: any) {
    return NextResponse.json({ success: false, data: [], total: 0, error: e.message });
  }
}
