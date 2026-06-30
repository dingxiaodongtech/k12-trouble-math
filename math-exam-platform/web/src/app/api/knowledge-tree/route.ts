/**
 * 知识树 API — CSV 教材树 + DB 题目标签交叉查询
 *
 * GET /api/knowledge-tree               → 全量返回
 * GET /api/knowledge-tree?stage=小学     → 按学段过滤
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

// ── 类型 ──
interface KPNode {
  id: string;
  name: string;
  description: string;
  cognitiveLevel: string;
  importance: number;
  questionCount: number;
  /** 数据库中匹配到的标签名（用于前端筛选） */
  dbTags: string[];
}

interface SectionNode {
  id: string;
  name: string;
  order: number;
  knowledgePoints: KPNode[];
}

interface ChapterNode {
  id: string;
  name: string;
  shortName: string;
  order: number;
  description: string;
  totalPoints: number;
  totalQuestions: number;
  sections: SectionNode[];
}

interface GradeNode {
  id: string;
  name: string;
  shortName: string;
  gradeLevel: number;
  semester: string;
  tags?: string[];
  chapters: ChapterNode[];
}

interface StageNode {
  id: string;
  name: string;
  order: number;
  grades: GradeNode[];
}

// ── 常量 ──
const GRADE_NUM: Record<string, number> = {
  一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9,
};
const STAGE_ORDER: Record<string, number> = { 小学: 1, 初中: 2, 中考: 3, 竞赛: 4 };
const SKIP_UNITS = new Set(["周测", "寒暑假", "开学", "期中", "期末", "竞赛", "阶段检测", "复习与关联", "总复习"]);

function getStageName(booklet: string): string | null {
  const g = GRADE_NUM[booklet[0]];
  if (!g || g > 9) return null;
  return g <= 6 ? "小学" : "初中";
}

function shortName(booklet: string): string {
  return booklet.replace("年级", "").replace("册", "").trim();
}

function safeId(...parts: string[]): string {
  return parts.join("-").replace(/[^a-zA-Z0-9一-鿿-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}

function parseChapterOrder(name: string): number {
  const cn: Record<string, number> = {
    一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10,
    十一:11,十二:12,十三:13,十四:14,十五:15,十六:16,十七:17,十八:18,
  };
  // 匹配 "第X章" 或 "第X单元" 模式
  const m0 = name.match(/第([一二三四五六七八九十]+)[章单元节]/);
  if (m0) return cn[m0[1]] || 99;
  // 匹配开头的汉字数字（如 "一5以内数的认识和加、减法"）
  const m = name.match(/^([一二三四五六七八九十]+)/);
  if (m) return cn[m[1]] || 99;
  // 匹配阿拉伯数字
  const m2 = name.match(/^(\d+)/);
  if (m2) return parseInt(m2[1]);
  // 综合与实践类放在最后
  if (name.includes("综合与实践")) return 98;
  return 99;
}

// ── 缓存 ──
let cachedTree: StageNode[] | null = null;
let cachedAt = 0;
const CACHE_TTL = 30_000;

// ═══════════════════════════════════════════════════════════
// 加载题目标签索引（从 SQLite）
// ═══════════════════════════════════════════════════════════

function loadDBTagIndex(): Map<string, { count: number; tags: Set<string> }> {
  const index = new Map<string, { count: number; tags: Set<string> }>();
  const dbPath = path.resolve(process.cwd(), "..", "data", "exam_platform.db");

  if (!fs.existsSync(dbPath)) return index;

  const db = new Database(dbPath, { readonly: true });
  const rows = db.prepare(
    "SELECT kp_name, kp_path, textbook_kp_name, textbook_kp_path FROM question_index"
  ).all() as any[];

  for (const row of rows) {
    // 收集一行中所有可用于匹配的标签值
    const tagValues = new Set<string>();

    // kp_name
    if (row.kp_name) tagValues.add(row.kp_name);

    // kp_path 数组元素
    try {
      const kpp = JSON.parse(row.kp_path || "[]");
      if (Array.isArray(kpp)) kpp.forEach((p: string) => { if (p) tagValues.add(p); });
    } catch {}

    // textbook_kp_name
    if (row.textbook_kp_name) tagValues.add(row.textbook_kp_name);

    // textbook_kp_path 数组元素
    try {
      const tkpp = JSON.parse(row.textbook_kp_path || "[]");
      if (Array.isArray(tkpp)) tkpp.forEach((p: string) => { if (p) tagValues.add(p); });
    } catch {}

    // 索引：每个标签值 → 计数 + 关联的所有标签
    for (const tag of tagValues) {
      if (!index.has(tag)) index.set(tag, { count: 0, tags: new Set() });
      const entry = index.get(tag)!;
      entry.count++;
      for (const t of tagValues) entry.tags.add(t);
    }
  }

  db.close();
  return index;
}

// ═══════════════════════════════════════════════════════════
// 加载 CSV 树 + DB 交叉查询
// ═══════════════════════════════════════════════════════════

function loadTree(): StageNode[] {
  const now = Date.now();
  if (cachedTree && now - cachedAt < CACHE_TTL) return cachedTree;

  // 1. 加载 DB 标签索引
  const tagIndex = loadDBTagIndex();
  const hasDB = tagIndex.size > 0;
  console.log(`[knowledge-tree] DB tag index: ${tagIndex.size} unique tags`);

  // 2. 解析 CSV
  const csvPath = path.resolve(process.cwd(), "..", "data", "textbook_tree_v2.csv");
  if (!fs.existsSync(csvPath)) return [];

  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.trim().split("\n");
  if (lines.length < 2) return [];

  const stageMap = new Map<string, StageNode>();

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < 5) continue;
    const version = (cols[0] || "").trim().replace(/\r/g, "");
    const booklet = (cols[1] || "").trim().replace(/\r/g, "");
    const unit = (cols[2] || "").trim().replace(/\r/g, "");
    const section = (cols[3] || "").trim().replace(/\r/g, "");
    const kpName = (cols[4] || "").trim().replace(/\r/g, "");
    if (!version.includes("人教版") && version !== "中考" && version !== "竞赛") continue;

    let stageName: string;
    let gradeNum: number;
    let semester: string;

    if (booklet === "中考") { stageName = "中考"; gradeNum = 9; semester = "全"; }
    else if (booklet === "小学竞赛") { stageName = "竞赛"; gradeNum = 6; semester = "全"; }
    else if (booklet === "初中竞赛") { stageName = "竞赛"; gradeNum = 9; semester = "全"; }
    else if (booklet === "竞赛") { stageName = "竞赛"; gradeNum = 6; semester = "全"; }
    else if (booklet.includes("年级")) {
      const s = getStageName(booklet);
      if (!s) continue;
      stageName = s; gradeNum = GRADE_NUM[booklet[0]] || 7;
      semester = booklet.includes("上") ? "上" : "下";
    } else { continue; }

    if (SKIP_UNITS.has(unit)) continue;

    if (!stageMap.has(stageName)) {
      stageMap.set(stageName, {
        id: safeId(stageName), name: stageName,
        order: STAGE_ORDER[stageName] || 99, grades: [],
      });
    }
    const stage = stageMap.get(stageName)!;

    const gradeId = safeId("grade", booklet);
    let grade = stage.grades.find(g => g.id === gradeId);
    if (!grade) {
      const isOld = (gradeNum >= 4 && gradeNum <= 9) && semester === "下";
      grade = {
        id: gradeId, name: booklet, shortName: shortName(booklet),
        gradeLevel: gradeNum, semester,
        tags: isOld ? ["旧版"] : [], chapters: [],
      };
      stage.grades.push(grade);
    }

    const chId = safeId("ch", gradeId, unit);
    let chapter = grade.chapters.find(c => c.id === chId);
    if (!chapter) {
      chapter = {
        id: chId, name: unit,
        shortName: unit.replace(/^[一二三四五六七八九十]+/, "").trim() || unit,
        order: parseChapterOrder(unit), description: "",
        totalPoints: 0, totalQuestions: 0, sections: [],
      };
      grade.chapters.push(chapter);
    }

    // 中考/竞赛：无小节层级，专题名直接做section，不产生子KP
    const secName = section || kpName;
    const kpFinal = (section && kpName) ? kpName : "";

    const secId = safeId("sec", chId, secName);
    let sec = chapter.sections.find(s => s.id === secId);
    if (!sec) {
      sec = { id: secId, name: secName, order: chapter.sections.length + 1, knowledgePoints: [] };
      chapter.sections.push(sec);
    }

    if (kpFinal && !sec.knowledgePoints.find(k => k.name === kpFinal)) {
      let qCount = 0;
      const dbTags: string[] = [];
      if (hasDB) {
        const exact = tagIndex.get(kpFinal);
        if (exact) { qCount = exact.count; dbTags.push(kpFinal); }
        for (const [tag, entry] of tagIndex) {
          if (tag !== kpFinal && (
            tag === kpFinal || tag.includes(kpFinal) || kpFinal.includes(tag) ||
            tag.replace(/[（(][^)）]*[)）]/g, "") === kpFinal.replace(/[（(][^)）]*[)）]/g, "")
          )) { qCount += entry.count; dbTags.push(tag); }
        }
      }
      sec.knowledgePoints.push({
        id: safeId("kp", secId, kpFinal),
        name: kpFinal,
        description: "", cognitiveLevel: "", importance: 0,
        questionCount: qCount, dbTags: [...new Set(dbTags)].slice(0, 10),
      });
    }
  }

  // 3. 后处理：排序 + 清理空节点 + 聚合统计
  const result: StageNode[] = [];
  for (const [, stage] of stageMap) {
    stage.grades.sort((a, b) => a.gradeLevel - b.gradeLevel || a.name.localeCompare(b.name));
    for (const grade of stage.grades) {
      // 清理：只移除无名空section；有名section（含中考专题叶子）保留
      for (const ch of grade.chapters) {
        ch.sections = ch.sections.filter(sec => sec.name.trim() !== "");
        ch.sections.sort((a, b) => a.order - b.order);
      }
      // 清理：移除没有section的chapter
      grade.chapters = grade.chapters.filter(ch => ch.sections.length > 0);
      grade.chapters.sort((a, b) => a.order - b.order);

      for (const ch of grade.chapters) {
        ch.totalPoints = ch.sections.reduce((s, sec) => s + sec.knowledgePoints.length, 0);
        ch.totalQuestions = ch.sections.reduce((s, sec) =>
          s + sec.knowledgePoints.reduce((ss, kp) => ss + kp.questionCount, 0), 0
        );
      }
    }
    // 清理：移除没有chapter的grade
    stage.grades = stage.grades.filter(g => g.chapters.length > 0);
    result.push(stage);
  }
  result.sort((a, b) => a.order - b.order);

  cachedTree = result;
  cachedAt = now;
  console.log(`[knowledge-tree] Built tree: ${result.map(s => `${s.name}(${s.grades.length})`).join(", ")}`);
  return result;
}

// ═══════════════════════════════════════════════════════════
// Route Handler
// ═══════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const stageFilter = searchParams.get("stage");
  const gradeFilter = searchParams.get("grade");
  const search = searchParams.get("search");

  let tree = loadTree();

  if (stageFilter) tree = tree.filter(s => s.name === stageFilter || s.id === stageFilter);
  if (gradeFilter) {
    tree = tree.map(s => ({
      ...s,
      grades: s.grades.filter(g => g.name === gradeFilter || g.id === gradeFilter),
    }));
  }

  if (search) {
    const q = search.toLowerCase();
    tree = tree.map(s => ({
      ...s,
      grades: s.grades.map(g => ({
        ...g,
        chapters: g.chapters.map(ch => ({
          ...ch,
          sections: ch.sections.map(sec => ({
            ...sec,
            knowledgePoints: sec.knowledgePoints.filter(kp => kp.name.toLowerCase().includes(q)),
          })).filter(sec => sec.knowledgePoints.length > 0),
        })).filter(ch => ch.sections.length > 0),
      })).filter(g => g.chapters.length > 0),
    })).filter(s => s.grades.length > 0);
  }

  let totalKps = 0, totalQs = 0;
  for (const s of tree) for (const g of s.grades) for (const ch of g.chapters) for (const sec of ch.sections) {
    totalKps += sec.knowledgePoints.length;
    totalQs += sec.knowledgePoints.reduce((s, kp) => s + kp.questionCount, 0);
  }

  return NextResponse.json({
    success: true,
    data: tree,
    meta: { totalStages: tree.length, totalKnowledgePoints: totalKps, totalQuestions: totalQs },
    timestamp: new Date().toISOString(),
  });
}
