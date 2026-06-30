"use client";

/**
 * 数学公式 + 富文本渲染器 — 基于 KaTeX
 *
 * 支持:
 * - 行内公式 $...$ / 块级公式 $$...$$
 * - 图片占位符 {{IMG:filename}}  /  {{IMG:filename|width=300}}
 * - 填空占位符 {{BLANK}} / {{BLANK:n}}
 * - 换行 \n → <br>
 * - image_urls 映射解析
 *
 * 深色模式适配 (CSS 变量驱动 KaTeX 颜色)。
 */

import { useEffect, useRef, useMemo } from "react";
import katex from "katex";

// ── 工具函数 ──

function escapeHtml(text: unknown): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── 图片占位符解析 ──

/**
 * 从 image_urls 中解析图片 URL
 *
 * image_urls 格式:
 *   - 直接映射:  { "image4.png": "image4.png", ... }          ← 纯文件名→文件名（step 3a 命中）
 *   - 上下文 key: { "stem": "image4.png", "analysis": "image25.png", ... }  ← context 匹配（step 3b/3c）
 *   - 选项 key:   { "option_A": "image21.png", "option_B": "image22.png", ... }
 *
 * IMG 占位符格式: {{IMG:image4.png}}（filename 本身，不是 context key）
 *
 * 数据修复后（_fix_image_urls.py），每条 image_urls 同时包含直接映射和 context key。
 */
function toStaticUrl(rawPath: string): string {
  if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
    return rawPath;
  }
  // 相对路径 → public/ 静态文件（已通过目录 Junction 挂载）
  const clean = rawPath.replace(/\\/g, "/");
  return clean.startsWith("/") ? clean : `/${clean}`;
}

function resolveImageUrl(
  filename: string,
  imageUrls: Record<string, string> | undefined,
  imgContext: string | undefined
): string | null {
  if (!filename) return null;

  // 1) 完整 URL — 直接返回
  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }

  // 2) filename 已经是相对路径（如 images/xxx.png），直接转静态 URL
  if (filename.includes("/") || filename.includes("\\")) {
    return toStaticUrl(filename);
  }

  // 3) 纯文件名（如 image36.png），在 imageUrls 中查找
  if (!imageUrls || Object.keys(imageUrls).length === 0) return null;

  // 3a) 优先：filename 本身作为 key 直接命中
  //     （数据修复后，image_urls 中已含 {"image36.png": "image36.png"} 的映射）
  if (imageUrls[filename]) return toStaticUrl(imageUrls[filename]);

  // 3b) imgContext 精确匹配（如 imgContext="analysis" → imageUrls["analysis"]）
  if (imgContext && imageUrls[imgContext]) return toStaticUrl(imageUrls[imgContext]);

  // 3c) imgContext 前缀匹配 — 处理 analysis_0/analysis_1 等索引 key
  //     取第一个匹配的（通常 analysis_0 就是第一张图）
  if (imgContext) {
    const indexedKey = Object.keys(imageUrls).find(
      (k) => k === imgContext || k.startsWith(imgContext + "_")
    );
    if (indexedKey && imageUrls[indexedKey]) {
      return toStaticUrl(imageUrls[indexedKey]);
    }
  }

  // 3d) 选项后缀模式: _A/_B/_C/_D → option_A/option_B 等
  const optMatch = filename.match(/_([A-D])\b/);
  if (optMatch && imageUrls["option_" + optMatch[1]]) {
    return toStaticUrl(imageUrls["option_" + optMatch[1]]);
  }

  // ⚠ 不含 stem 兜底 — 宁可显示占位符也不张冠李戴
  // ⚠ 不含"只有一张图就用它" — 会错把 option 图显示在 analysis 里

  return null;
}

// ── LaTeX 表格 → HTML 转换 ──

/**
 * 将 LaTeX 表格内容（tabularx/tabular 的 body）转为 HTML <table>
 * 处理: \\ 分行、& 分列、\hline 忽略、\multicolumn 支持
 */
function latexTableToHtml(body: string): string {
  // 先剥离内部嵌套的 tabularx/tabular 标记
  let content = body
    .replace(/\\begin\{tabularx\}\{[^}]*\}/g, "")
    .replace(/\\end\{tabularx\}/g, "")
    .replace(/\\begin\{tabular\}\{[^}]*\}/g, "")
    .replace(/\\end\{tabular\}/g, "");

  // 清理残缺 tabularx 中的 LaTeX 列定义和控制命令
  content = content
    .replace(/\{\\textwidth\}/g, "")
    .replace(/\{\|p\{\\dimexpr[^}]*\}/g, "") // {|p{\dimexpr 0.286\tabcolsep-2
    .replace(/\\dimexpr[^\\]*?\\tabcolsep-2/g, "") // \dimexpr 0.286\tabcolsep-2
    .replace(/\\tabcolsep/g, "")
    .replace(/\\arraybackslash\{\}/g, "")
    .replace(/\\leavevmode/g, "")
    .replace(/\\centering/g, "")
    .replace(/\\raggedright/g, "")
    .replace(/\\raggedleft/g, "")
    .replace(/\\hline/g, "")
    .replace(/\\cline\{[^}]*\}/g, "")
    .replace(/\\arrayrulewidth/g, "")
    // 处理 \multirow{n}{*}{text} → text
    .replace(/\\multirow\{[^}]*\}\{[^}]*\}\{([^}]*)\}/g, "$1")
    // 处理 \multicolumn{n}{align}{text} → text
    .replace(/\\multicolumn\{[^}]*\}\{[^}]*\}\{([^}]*)\}/g, "$1");

  // 按 \\ 分行（注意 \\\\ 在 LaTeX 中是换行）
  const rows = content.split(/\\\\/)
    .map(r => r.trim())
    .filter(r => r && r !== "\\hline" && !/^\\hline$/.test(r));

  if (rows.length === 0) return escapeHtml(body);

  const htmlRows: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].replace(/\\hline/g, "").trim();
    if (!row) continue;

    // 按 & 分列
    const cells = row.split("&").map(c => c.trim()).filter(Boolean);
    if (cells.length === 0) continue;

    const tag = i === 0 ? "th" : "td";
    const cellHtml = cells.map(c => {
      // 处理 \multicolumn{n}{align}{text}
      const mcMatch = c.match(/^\\multicolumn\{(\d+)\}\{[^}]*\}\{(.*)\}$/);
      if (mcMatch) {
        const colSpan = mcMatch[1];
        const text = mcMatch[2];
        return `<${tag} colspan="${colSpan}">${escapeHtml(text)}</${tag}>`;
      }
      return `<${tag}>${escapeHtml(c)}</${tag}>`;
    }).join("");

    htmlRows.push(`<tr>${cellHtml}</tr>`);
  }

  if (htmlRows.length === 0) return escapeHtml(body);

  // 第一行作为 thead，其余作为 tbody
  const thead = `<thead>${htmlRows[0]}</thead>`;
  const tbody = htmlRows.length > 1
    ? `<tbody>${htmlRows.slice(1).join("")}</tbody>`
    : "";

  return `<table class="md-table">${thead}${tbody}</table>`;
}

// ── LaTeX 预处理 ──

/**
 * 裸 Unicode 数学符号 → $...$ 包裹，使 KaTeX 使用数学字体渲染
 * 排除已在 <code> 标签内的（避免破坏错误提示）
 */
const BARE_MATH_SYMBOLS = /([π∠△□∘⊥∥∞∑∏√±×÷≤≥≠≈→←↑↓αβγθδελμσφψω∵∴⊙⊕⊗])(?![^<]*<\/code>)/g;

function normalizeLatexEnvs(text: string): string {
  return text
    // \sun → \odot（KaTeX 不支持 \sun）
    .replace(/\\sun\b/g, "\\odot ")
    // ∵/∴ 开头的行 → 强制换行
    .replace(/([^>])([∵∴])/g, "$1<br>$2")
    // 裸数学符号 → $...$ 行内公式（KaTeX 渲染为数学字体）
    .replace(BARE_MATH_SYMBOLS, (_m, sym) => `$${sym}$`)
    // align* → aligned (KaTeX 不支持 align*)
    .replace(
      /\\begin\{align\*\}([\s\S]*?)\\end\{align\*\}/g,
      (_: string, body: string) => `$$\\begin{aligned}${body}\\end{aligned}$$`
    )
    .replace(
      /\\begin\{align\}([\s\S]*?)\\end\{align\}/g,
      (_: string, body: string) => `$$\\begin{aligned}${body}\\end{aligned}$$`
    )
    // equation* → display math
    .replace(
      /\\begin\{equation\*\}([\s\S]*?)\\end\{equation\*\}/g,
      (_: string, body: string) => `$$${body}$$`
    )
    // table + tabularx → 转为 HTML <table>（KaTeX 不支持 tabularx/table）
    .replace(
      /\\begin\{table\}([\s\S]*?)\\end\{table\}/g,
      (_: string, body: string) => latexTableToHtml(body)
    )
    // 独立的 tabularx → 转为 HTML <table>
    .replace(
      /\\begin\{tabularx\}\{[^}]*\}([\s\S]*?)\\end\{tabularx\}/g,
      (_: string, body: string) => latexTableToHtml(body)
    )
    // 独立的 tabular → 转为 HTML <table>
    .replace(
      /\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
      (_: string, body: string) => latexTableToHtml(body)
    )
    // 残缺的 tabularx — 数据中 \begin{tabularx} 标签丢失
    // 格式: {\textwidth}{列定义...}表格内容（含 & 和 \\）
    // 策略: 匹配 {\textwidth} + 列定义（到第一个 \arraybackslash 或 & 之前），然后处理表格内容
    .replace(
      /\{\\textwidth\}\s*\{[^&]*?(?=\\arraybackslash|&|\\leavevmode|$)/g,
      ""
    )
    // 清理残留的列定义碎片
    .replace(/\{\|p\{\\dimexpr[^}]*\}/g, "")
    .replace(/p\{\\dimexpr[^}]*\}/g, "")
    .replace(/\\dimexpr\s*[\d.]+\\tabcolsep-2/g, "")
    .replace(/\\dimexpr\s*[\d.]+\\tabcolsep/g, "")
    .replace(/\\tabcolsep/g, "")
    // 兜底
    .replace(/\{\\textwidth\}/g, "")
    .replace(/\{\|p\{0\.\d+/g, "")
    // 全局清理残留的 LaTeX 表格命令（在残缺 tabularx 内容中）
    .replace(/\\cline\{[^}]*\}/g, "")
    .replace(/\\multirow\{[^}]*\}\{[^}]*\}\{([^}]*)\}/g, "$1")
    .replace(/\\multicolumn\{[^}]*\}\{[^}]*\}\{([^}]*)\}/g, "$1")
    .replace(/\\arraybackslash\{\}/g, "")
    .replace(/\\leavevmode/g, "")
    .replace(/\\raggedright/g, "")
    .replace(/\\centering/g, "");
}

// ── Markdown 表格渲染 ──

/**
 * 检测 Markdown 表格块（连续 | 开头的行，含 |---| 分隔行），转为 HTML <table>
 */
function renderMarkdownTables(
  text: string,
  cellRenderer: (cell: string) => string
): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (/^\s*\|/.test(lines[i])) {
      // 收集连续的表格行
      const tableLines: string[] = [];
      let j = i;
      while (j < lines.length && /^\s*\|/.test(lines[j])) {
        tableLines.push(lines[j].trim());
        j++;
      }
      // 需要至少 2 行且有分隔行 |---|
      const sepIdx = tableLines.findIndex((l) => /^\|[\s\-:|]+\|$/.test(l));
      if (tableLines.length >= 2 && sepIdx >= 0) {
        const headerLines = tableLines.slice(0, sepIdx);
        const dataLines = tableLines.slice(sepIdx + 1);
        let html = '<table class="md-table">';
        if (headerLines.length > 0) {
          html += "<thead>";
          headerLines.forEach((hl) => {
            const cells = hl.split("|").slice(1, -1);
            html += "<tr>" + cells.map((c) => `<th>${cellRenderer(c.trim())}</th>`).join("") + "</tr>";
          });
          html += "</thead>";
        }
        if (dataLines.length > 0) {
          html += "<tbody>";
          dataLines.forEach((dl) => {
            const cells = dl.split("|").slice(1, -1);
            html += "<tr>" + cells.map((c) => `<td>${cellRenderer(c.trim())}</td>`).join("") + "</tr>";
          });
          html += "</tbody>";
        }
        html += "</table>";
        result.push(html);
        i = j;
      } else {
        result.push(lines[i]);
        i++;
      }
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  return result.join("\n");
}

// ── 核心渲染：处理所有占位符 + LaTeX ──

/**
 * 渲染混合内容：先处理占位符（IMG/BLANK/换行），再处理 LaTeX 公式
 */
function renderMixedText(
  text: unknown,
  imageUrls?: Record<string, string>,
  imgContext?: string
): string {
  if (text == null || text === "") return "";
  if (typeof text !== "string") {
    // 对象/数组/数字等 → JSON 序列化后转义
    try { text = JSON.stringify(text); } catch { return ""; }
  }
  const rawText = normalizeLatexEnvs(text as string);

  // 1) 先处理 Markdown 表格 → 用占位符替换
  const tableBlocks: string[] = [];
  const withTables = renderMarkdownTables(rawText, (cell: string) => {
    return cell.replace(/\$([^$]+)\$/g, (_m: string, f: string) => {
      try { return katex.renderToString(f.trim(), { displayMode: false, throwOnError: false, strict: false, trust: true }); }
      catch { return escapeHtml(f); }
    });
  });
  // 用唯一占位符替换 <table> 块，防止被 escapeHtml 破坏
  const textWithPlaceholders = withTables.replace(
    /<table class="md-table">[\s\S]*?<\/table>/g,
    (match) => { tableBlocks.push(match); return `%%TABLE_${tableBlocks.length - 1}%%`; }
  );

  // 2) 预处理：修复残缺的 {{IMG:...} （缺一个 }）
  const fixedText = textWithPlaceholders.replace(
    /\{\{IMG:([^}]+)\}(?!\})/g,
    "{{IMG:$1}}"
  );

  // 3) 用正则分割：LaTeX 公式 + IMG 占位符 + BLANK 占位符
  const tokenRegex =
    /(\$\$[\s\S]*?\$\$|\$[^$]+\$|\{\{IMG:[^}]*\}\}|\{\{BLANK:?\d*\}\})/g;

  const parts: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(fixedText)) !== null) {
    // 前面的普通文本：转义 HTML + 换行转 <br>
    const before = fixedText.slice(lastIndex, match.index);
    if (before) {
      let processed = escapeHtml(before).replace(/\n/g, "<br>");
      // 恢复表格占位符
      processed = processed.replace(/%%TABLE_(\d+)%%/g, (_m, idx) => tableBlocks[parseInt(idx)] || "");
      parts.push(processed);
    }

    const token = match[0];

    // ── $$...$$ 块级公式 ──
    if (token.startsWith("$$") && token.endsWith("$$")) {
      const formula = token.slice(2, -2).trim();
      try {
        parts.push(
          katex.renderToString(formula, {
            displayMode: true,
            throwOnError: false,
            strict: false,
            trust: true,
          })
        );
      } catch {
        parts.push(
          `<code class="text-red-500 dark:text-red-400 text-xs">${escapeHtml(formula)}</code>`
        );
      }
    }
    // ── $...$ 行内公式 ──
    else if (token.startsWith("$") && token.endsWith("$") && token.length > 2) {
      const formula = token.slice(1, -1).trim();
      try {
        parts.push(
          katex.renderToString(formula, {
            displayMode: false,
            throwOnError: false,
            strict: false,
            trust: true,
          })
        );
      } catch {
        parts.push(
          `<code class="text-red-500 dark:text-red-400 text-xs">${escapeHtml(formula)}</code>`
        );
      }
    }
    // ── {{IMG:...}} 图片占位符 ──
    else if (token.startsWith("{{IMG:")) {
      const raw = token.slice(6, -2); // 去掉 {{IMG: 和 }}
      const pipeParts = raw.split("|");
      const fn = pipeParts[0].trim();
      let width = 0;
      let height = 0;
      for (let i = 1; i < pipeParts.length; i++) {
        const kv = pipeParts[i].match(/^(width|height)=(\d+)$/);
        if (kv) {
          if (kv[1] === "width") width = parseInt(kv[2]);
          else height = parseInt(kv[2]);
        }
      }
      const resolved = resolveImageUrl(fn, imageUrls, imgContext);
      if (resolved) {
        const imgTag = `<img src="${escapeHtml(resolved)}" loading="lazy" style="max-width:50%;max-height:180px;object-fit:contain;border-radius:4px;border:1px solid var(--border);${width ? `width:${width}px;` : ""}${height ? `height:${height}px;` : ""}" class="my-1" />`;
        // 去重：与前一标签相同则跳过（修复数据中同一图片紧邻出现两次的问题）
        const lastPart = parts[parts.length - 1] || "";
        if (!lastPart.includes(`src="${escapeHtml(resolved)}"`)) {
          parts.push(imgTag);
        }
      } else {
        // 无图片时显示占位图标
        parts.push(
          `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs">📷 ${escapeHtml(fn)}</span>`
        );
      }
    }
    // ── {{BLANK:n}} 或 {{BLANK}} 填空占位符 ──
    else if (token.startsWith("{{BLANK")) {
      const bm = token.match(/^\{?\{?BLANK:?(\d*)\}?\}?$/);
      const num = bm && bm[1] ? bm[1] : "";
      if (num) {
        parts.push(
          `<span class="inline-block min-w-[44px] h-[24px] leading-[24px] text-center border-b-2 border-purple-300 dark:border-purple-500 text-purple-400 dark:text-purple-300 text-[11px] font-bold mx-[3px] px-[5px] align-middle">${escapeHtml(num)}</span>`
        );
      } else {
        parts.push(
          `<span class="inline-block min-w-[44px] h-[24px] leading-[24px] text-center border-b-2 border-purple-300 dark:border-purple-500 text-purple-400 dark:text-purple-300 text-[11px] font-bold mx-[3px] px-[5px] align-middle">?</span>`
        );
      }
    }

    lastIndex = match.index + token.length;
  }

  // 剩余部分
  const tail = fixedText.slice(lastIndex);
  if (tail) {
    let processed = escapeHtml(tail).replace(/\n/g, "<br>");
    processed = processed.replace(/%%TABLE_(\d+)%%/g, (_m: string, idx: string) => tableBlocks[parseInt(idx)] || "");
    parts.push(processed);
  }

  return parts.join("");
}

// ── 完整的独立图片 URL 渲染（用于 image_urls 中的直接 URL）──

function renderImageUrls(urls: string | string[] | Record<string, string> | undefined): string {
  if (!urls) return "";
  let urlList: string[] = [];
  if (typeof urls === "string") urlList = [urls];
  else if (Array.isArray(urls)) urlList = urls;
  else urlList = Object.values(urls).filter(
    (v) => typeof v === "string" && (v.startsWith("http://") || v.startsWith("https://"))
  );
  if (urlList.length === 0) return "";
  return urlList
    .map(
      (u) =>
        `<img src="${escapeHtml(u)}" loading="lazy" class="block my-2 rounded border border-border max-w-full" style="max-width:100%" />`
    )
    .join("");
}

// ── 组件 Props ──

export interface MathRendererProps {
  /** 包含 LaTeX 公式的文本 */
  content: string;
  /** 是否以块级模式渲染整个内容 */
  displayMode?: boolean;
  /** 额外的 CSS 类 */
  className?: string;
  /** 纯文本模式 (不渲染公式，只做 HTML 转义) */
  plainText?: boolean;
  /**
   * 图片 URL 映射，用于解析 {{IMG:key}} 占位符
   * 格式: { "stem": "https://...", "option_A": "https://...", ... }
   */
  imageUrls?: Record<string, string>;
  /**
   * 当前渲染上下文（如 "stem" / "option_A" / "analysis"），
   * 用于回退匹配 imageUrls 中的图片
   */
  imgContext?: string;
}

/**
 * 数学公式 + 富文本渲染组件
 *
 * @example
 * <MathRenderer content="解方程 $2x^2 - 5x + 2 = 0$" />
 * <MathRenderer content="$$\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$" displayMode />
 * <MathRenderer content="{{IMG:stem}}如上图，$\\triangle ABC$" imageUrls={{stem: "https://..."}} imgContext="stem" />
 */
export function MathRenderer({
  content,
  displayMode = false,
  className = "",
  plainText = false,
  imageUrls,
  imgContext,
}: MathRendererProps) {
  const html = useMemo(() => {
    if (plainText) return escapeHtml(content).replace(/\n/g, "<br>");
    if (displayMode) {
      try {
        return katex.renderToString(content.trim(), {
          displayMode: true,
          throwOnError: false,
          strict: false,
          trust: true,
        });
      } catch {
        return `<code class="text-destructive">${escapeHtml(content)}</code>`;
      }
    }
    return renderMixedText(content, imageUrls, imgContext);
  }, [content, displayMode, plainText, imageUrls, imgContext]);

  if (!content) return null;

  return (
    <span
      className={`math-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ── 便捷组件 ──

/** 行内公式 */
export function InlineMath({
  formula,
  className = "",
}: {
  formula: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(formula.trim(), ref.current, {
          displayMode: false,
          throwOnError: false,
          strict: false,
          trust: true,
        });
      } catch {
        ref.current.textContent = formula;
      }
    }
  }, [formula]);

  return <span ref={ref} className={`inline MathRendererInlineMath ${className}`} />;
}

/** 块级公式 */
export function DisplayMath({
  formula,
  className = "",
}: {
  formula: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(formula.trim(), ref.current, {
          displayMode: true,
          throwOnError: false,
          strict: false,
          trust: true,
        });
      } catch {
        ref.current.textContent = formula;
      }
    }
  }, [formula]);

  return (
    <div
      ref={ref}
      className={`my-4 overflow-x-auto MathRendererDisplayMath ${className}`}
    />
  );
}

export default MathRenderer;
