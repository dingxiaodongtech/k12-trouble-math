/**
 * 意图解析器 — 从自然语言输入中提取出卷参数
 *
 * 支持的输入示例:
 * - "帮我出一份七年级人教版的数学期中试卷，包含10道单选题"
 * - "初一下期末考卷，100分，选择题10道填空5道解答5道"
 * - "八年级上册三角形全等单元测试"
 */

import type {
  GradeLevel,
  Semester,
  ExamType,
  TextbookVersion,
  QuestionType,
} from "@/types/common";

export interface ParsedIntent {
  grade: GradeLevel;
  semester: Semester;
  examType: ExamType;
  textbookVersion: TextbookVersion;
  totalScore: number;
  duration: number;
  sections: Array<{
    type: QuestionType;
    count: number;
    scorePerQuestion: number;
    label: string;
  }>;
  /** 提取到的关键词 (知识点/章节) */
  keywords: string[];
  /** 原始用户输入 */
  raw: string;
  /** 解析置信度 */
  confidence: number;
}

// ── 年级映射 ──

const GRADE_MAP: Record<string, GradeLevel> = {
  一: 1, "1": 1, 二: 2, "2": 2, 三: 3, "3": 3,
  四: 4, "4": 4, 五: 5, "5": 5, 六: 6, "6": 6,
  七: 7, "7": 7, 八: 8, "8": 8, 九: 9, "9": 9,
};

const GRADE_ALIASES: Record<string, GradeLevel> = {
  初一: 7, 初二: 8, 初三: 9,
  高一: 10, 高二: 11, 高三: 12,
};

// ── 学期映射 ──

function detectSemester(input: string): Semester {
  if (/[上下]学?期/.test(input)) {
    return /上/.test(input) ? "上" : "下";
  }
  if (/期中|上半|前半/.test(input)) return "上";
  if (/期末|下半|后半/.test(input)) return "下";
  return "上"; // 默认上学期
}

// ── 考试类型映射 ──

function detectExamType(input: string): ExamType {
  if (/期中/.test(input)) return "midterm";
  if (/期末/.test(input)) return "final";
  if (/单元/.test(input)) return "unit";
  if (/模拟|一模|二模|三模/.test(input)) return "mock";
  if (/中考|高考|小升初|升学/.test(input)) return "entrance";
  if (/竞赛|奥数|杯赛/.test(input)) return "competition";
  return "final"; // 默认期末
}

// ── 教材版本 ──

function detectVersion(input: string): TextbookVersion {
  if (/人教/.test(input)) return "人教版";
  if (/北师大/.test(input)) return "北师大版";
  if (/苏教/.test(input)) return "苏教版";
  if (/华师大/.test(input)) return "华师大版";
  if (/浙教/.test(input)) return "浙教版";
  if (/沪教/.test(input)) return "沪教版";
  return "人教版"; // 默认
}

// ── 题型解析 ──

interface SectionMatch {
  type: QuestionType;
  count: number;
  scorePerQuestion: number;
}

function detectSections(input: string): SectionMatch[] {
  const sections: SectionMatch[] = [];

  // 选择题
  const mcMatch = input.match(
    /(?:选择题|单选题|单选|MC)[：:\s]*(\d+)\s*[道题个](?:[每，,、]*(\d+)\s*分)?/
  );
  if (mcMatch) {
    sections.push({
      type: "MC",
      count: parseInt(mcMatch[1]),
      scorePerQuestion: mcMatch[2] ? parseInt(mcMatch[2]) : 3,
    });
  }

  // 填空题
  const fbMatch = input.match(
    /(?:填空题|填空|FB)[：:\s]*(\d+)\s*[道题个](?:[每，,、]*(\d+)\s*分)?/
  );
  if (fbMatch) {
    sections.push({
      type: "FB",
      count: parseInt(fbMatch[1]),
      scorePerQuestion: fbMatch[2] ? parseInt(fbMatch[2]) : 4,
    });
  }

  // 解答题
  const saMatch = input.match(
    /(?:解答题|简答题|计算题|应用题|SA)[：:\s]*(\d+)\s*[道题个](?:[每，,、]*(\d+)\s*分)?/
  );
  if (saMatch) {
    sections.push({
      type: "SA",
      count: parseInt(saMatch[1]),
      scorePerQuestion: saMatch[2] ? parseInt(saMatch[2]) : 10,
    });
  }

  // 证明题
  const prMatch = input.match(
    /(?:证明题|PR)[：:\s]*(\d+)\s*[道题个](?:[每，,、]*(\d+)\s*分)?/
  );
  if (prMatch) {
    sections.push({
      type: "PR",
      count: parseInt(prMatch[1]),
      scorePerQuestion: prMatch[2] ? parseInt(prMatch[2]) : 12,
    });
  }

  return sections;
}

// ── 通用数量匹配 ──

const GENERAL_COUNT_REGEX = /(\d+)\s*[道题个]\s*(选择题|单选题|填空|解答|简答|计算|证明)/g;

function detectGeneralSections(input: string): SectionMatch[] {
  const sections: SectionMatch[] = [];
  let match: RegExpExecArray | null;

  while ((match = GENERAL_COUNT_REGEX.exec(input)) !== null) {
    const count = parseInt(match[1]);
    const typeStr = match[2];
    let type: QuestionType = "MC";
    let defaultScore = 3;

    if (/选择|单选/.test(typeStr)) { type = "MC"; defaultScore = 3; }
    else if (/填空/.test(typeStr)) { type = "FB"; defaultScore = 4; }
    else if (/解答|简答|计算/.test(typeStr)) { type = "SA"; defaultScore = 10; }
    else if (/证明/.test(typeStr)) { type = "PR"; defaultScore = 12; }

    sections.push({ type, count, scorePerQuestion: defaultScore });
  }

  return sections;
}

// ── 关键词提取 ──

function extractKeywords(input: string): string[] {
  const keywords: string[] = [];

  // 提取知识点/章节名称
  const kpPatterns = [
    /(?:关于|涉及|考察|覆盖)\s*(.+?)(?:的|等方面|等知识点|$)/g,
    /(?:第[一二三四五六七八九十\d]+章|单元)\s*[：:\s]*([^，,。.]+)/g,
    /(三角形|四边形|方程|函数|不等式|概率|统计|圆|相似|全等|勾股|因式分解|二次根式|分式|实数|有理数|整式)/g,
  ];

  for (const pattern of kpPatterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(input)) !== null) {
      const kw = (match[1] || match[0]).trim();
      if (kw.length >= 2 && !keywords.includes(kw)) {
        keywords.push(kw);
      }
    }
  }

  return keywords;
}

// ── 总分/时长检测 ──

function detectScore(input: string): number {
  const m = input.match(/(?:满分|总分|共)\s*(\d+)\s*分/);
  return m ? parseInt(m[1]) : 100;
}

function detectDuration(input: string): number {
  const m = input.match(/(?:时长|时间|考试)\s*(\d+)\s*(?:分钟|min)/);
  return m ? parseInt(m[1]) : 90;
}

// ── 默认题型方案 ──

function getDefaultSections(grade: GradeLevel, examType: ExamType): SectionMatch[] {
  // 参考 exam_pipeline.py 中的名师彩卷分析
  if (grade <= 2) {
    return [
      { type: "FB", count: 10, scorePerQuestion: 1 },
      { type: "FB", count: 8, scorePerQuestion: 2 },
      { type: "MC", count: 5, scorePerQuestion: 2 },
      { type: "SA", count: 4, scorePerQuestion: 6 },
    ];
  } else if (grade <= 4) {
    return [
      { type: "FB", count: 8, scorePerQuestion: 2 },
      { type: "MC", count: 5, scorePerQuestion: 2 },
      { type: "SA", count: 6, scorePerQuestion: 3 },
      { type: "SA", count: 4, scorePerQuestion: 6 },
    ];
  } else if (grade <= 6) {
    return [
      { type: "FB", count: 6, scorePerQuestion: 2 },
      { type: "MC", count: 6, scorePerQuestion: 2 },
      { type: "SA", count: 5, scorePerQuestion: 3 },
      { type: "SA", count: 4, scorePerQuestion: 6 },
    ];
  } else if (grade <= 8) {
    return [
      { type: "MC", count: 10, scorePerQuestion: 3 },
      { type: "FB", count: 5, scorePerQuestion: 4 },
      { type: "SA", count: 5, scorePerQuestion: 10 },
    ];
  } else {
    return [
      { type: "MC", count: 8, scorePerQuestion: 3 },
      { type: "FB", count: 6, scorePerQuestion: 4 },
      { type: "SA", count: 4, scorePerQuestion: 8 },
      { type: "PR", count: 2, scorePerQuestion: 12 },
    ];
  }
}

// ── 主编排函数 ──

export function parseIntent(input: string): ParsedIntent {
  const raw = input.trim();

  // 1. 年级检测
  let grade: GradeLevel = 7; // 默认七年级
  for (const [alias, value] of Object.entries(GRADE_ALIASES)) {
    if (raw.includes(alias)) { grade = value; break; }
  }
  const gradePattern = /([一二三四五六七八九1-9])\s*(?:年级|下|上)/;
  const gradeMatch = raw.match(gradePattern);
  if (gradeMatch) {
    const g = GRADE_MAP[gradeMatch[1]];
    if (g) grade = g;
  }

  // 2. 学期
  const semester = detectSemester(raw);

  // 3. 考试类型
  const examType = detectExamType(raw);

  // 4. 教材版本
  const version = detectVersion(raw);

  // 5. 题型
  let sections = detectSections(raw);
  if (sections.length === 0) {
    sections = detectGeneralSections(raw);
  }
  if (sections.length === 0) {
    sections = getDefaultSections(grade, examType);
  }
  // 合并同类型
  sections = mergeSections(sections);

  // 6. 总分/时长
  const totalScore = detectScore(raw);
  const duration = detectDuration(raw);

  // 7. 关键词
  const keywords = extractKeywords(raw);

  // 8. 计算分值合理性
  const actualScore = sections.reduce((s, sec) => s + sec.count * sec.scorePerQuestion, 0);
  let confidence = 0.8;
  if (sections.every((s) => s.count > 0 && s.scorePerQuestion > 0)) confidence += 0.1;
  if (keywords.length > 0) confidence += 0.05;
  if (Math.abs(actualScore - totalScore) / totalScore < 0.2) confidence += 0.05;

  // 如果总分不匹配，调整分值
  if (totalScore !== actualScore && sections.length > 0) {
    const scale = totalScore / actualScore;
    sections = sections.map((s) => ({
      ...s,
      scorePerQuestion: Math.round(s.scorePerQuestion * scale),
    }));
  }

  return {
    grade,
    semester,
    examType,
    textbookVersion: version,
    totalScore,
    duration,
    sections: sections.map((s, i) => ({
      ...s,
      label: getSectionLabel(s.type, i),
    })),
    keywords,
    raw,
    confidence: Math.min(confidence, 1),
  };
}

// ── 辅助函数 ──

function mergeSections(sections: SectionMatch[]): SectionMatch[] {
  const merged: Record<string, SectionMatch> = {};
  for (const s of sections) {
    const key = s.type;
    if (merged[key]) {
      merged[key].count += s.count;
    } else {
      merged[key] = { ...s };
    }
  }
  return Object.values(merged);
}

function getSectionLabel(type: QuestionType, index: number): string {
  const labels: Record<QuestionType, string> = {
    MC: "选择题",
    FB: "填空题",
    SA: "解答题",
    PR: "证明题",
    AP: "应用题",
  };
  const chineseNums = ["一", "二", "三", "四", "五", "六", "七", "八"];
  const prefix = chineseNums[index] || String(index + 1);
  return `${prefix}、${labels[type]}`;
}
