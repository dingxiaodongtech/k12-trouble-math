"server only";

/**
 * 本地数据加载器 — 从 json_final（中考） + json_quanjie（小学同步）读取
 * 仅服务端使用
 */
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve(process.cwd(), "..", "extraction_tool", "output_llm");
const JSON_DIRS = ["json_final", "json_quanjie", "json_legacy", "json_qita", "json_sc003", "json_tongbu", "json_changping"];

export interface QuestionItem {
  id: number | string;
  stem: string;
  answer: string | Record<string, unknown>;
  analysis: string;
  subject_type: string;
  entry_type: string;
  options: string[];
  score: number;
  has_image: boolean;
  image_urls: Record<string, string>;
  kp_code?: string;
  kp_name?: string;
  kp_path?: string[];
  feature?: string;
  textbook_kp_name?: string;
  textbook_kp_path?: string[];
  secondary_kps?: Array<{kp_name?: string; kp_path?: string[]; role?: string; is_outline?: boolean}>;
  _file: string;
  _paper: string;
  _module: string;
}

export interface PaperItem {
  id: string;
  title: string;
  year: string;
  region: string;
  grade: string;
  examType: string;
  totalScore: number;
  questions: number;
  tags: string[];
  status: "已发布" | "草稿";
  version?: string;
  score?: number;
  duration?: number;
}

function isValidJson(f: string): boolean {
  return f.endsWith(".json") && !f.includes("review") && !f.startsWith("_");
}

/** 读取所有题目 */
export function loadAllQuestions(): QuestionItem[] {
  const all: QuestionItem[] = [];
  for (const d of JSON_DIRS) {
    const dirPath = path.join(OUT_DIR, d);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter(isValidJson);
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
        const data = JSON.parse(raw);
        const paperName = data?.paper?.name || file;
        for (const mod of data?.modules || []) {
          for (const q of mod?.questions || []) {
            all.push({ ...q, _file: file, _paper: paperName, _module: mod.name });
          }
        }
      } catch { continue; }
    }
  }
  return all;
}

/** 读取所有试卷 */
export function loadAllPapers(): PaperItem[] {
  const papers: PaperItem[] = [];
  for (const d of JSON_DIRS) {
    const dirPath = path.join(OUT_DIR, d);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter(isValidJson);
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
        const data = JSON.parse(raw);
        const p = data?.paper || {};
        const mods = data?.modules || [];
        const totalQ = mods.reduce((s: number, m: any) => s + (m.questions?.length || 0), 0);
        const kps = new Set<string>();
        for (const m of mods) for (const q of m.questions || []) { if (q.kp_name) kps.add(q.kp_name); if (q.textbook_kp_name) kps.add(q.textbook_kp_name); }
        papers.push({
          id: file.replace(".json", ""),
          title: p.name || file,
          year: p.year || "",
          region: Array.isArray(p.region) ? p.region.join("、") : p.region || "",
          grade: p.grade || "",
          examType: p.type || "",
          totalScore: p.total_score || 0,
          questions: totalQ,
          tags: Array.from(kps).slice(0, 10),
          status: "已发布" as const,
        });
      } catch { continue; }
    }
  }
  return papers;
}

/** 读取单份试卷 */
export function loadPaper(id: string): Record<string, unknown> | null {
  for (const d of JSON_DIRS) {
    const fp = path.join(OUT_DIR, d, `${id}.json`);
    if (fs.existsSync(fp)) {
      try { return JSON.parse(fs.readFileSync(fp, "utf-8")); } catch { return null; }
    }
  }
  return null;
}
