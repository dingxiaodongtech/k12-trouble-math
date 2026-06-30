# K12 智能组卷 — 题库网站

## 产品定位

给教师用的组卷工具。不要和学习困难诊断、自适应学习混淆。

## 页面结构

| 路由 | 功能 |
|------|------|
| `/` | 首页，AI 出卷搜索入口 |
| `/builder` | 组卷工作台，左侧知识树 + 右侧试卷预览 |
| `/question-bank` | 试题库，左侧知识树筛选 + 右侧题目列表 |
| `/paper-bank` | 试卷库，左侧筛选树 + 右侧试卷列表 |
| `/paper/[id]` | 试卷详情 |

## 数据源

### 知识树 API (`/api/knowledge-tree`)

从 `../data/textbook_tree_v2.csv` 动态加载。CSV 格式：**无表头**，5 列：
```
版本, 分册, 单元, 小节, 知识点
```

- 版本 `"人教版"` 匹配 小学+初中，`"中考"` 和 `"竞赛"` 独立模块
- **版本优先级**：人教版(2024新版) > 人教版（2012） > 人教版（五四制）（2012）
- 四下/五下/六下/九下 新版未出版，用旧版兜底
- 中考和竞赛：分册="中考"/"竞赛"，单元=领域，知识点=专题
- API 后处理：删除无 KP 的空 section/chapter，确保"有子级才显示父级"
- 默认选中"初中"tab

CSV 由 `临时文件/小学初中数学教材目录+知识点汇总.xlsx` 生成，只取 `类型=教材` 的行。

### 试题 API (`/api/questions`)

从 SQLite 读取，数据库位置硬编码为：
```
../../临时文件/math-exam-platform/math-exam-platform/data/exam_platform.db
```
约 576MB，45117 题。schema 关键列：`question_text`, `answer_text`, `question_type`, `tags`(JSON), `knowledge_tags`(JSON), `source`, `grade_std`, `difficulty`

### 试卷 API (`/api/exams`)

同一数据库。按 `source` 字段分组为试卷。

## 试题树组件 (`QuestionTreePanel`)

4 个 tab：小学 / 初中 / 中考 / 竞赛

- 小学/初中：年级按钮 → 章节 Accordion（含 Checkbox 级联）→ 小节 → KP
- 中考：领域(chapter) → 知识点(section) → 专题(KP)
- 竞赛：同中考扁平结构
- 选中 KP → `onSelectionChange(ids, names, dbTags)` → 父组件筛选题目
- 空 section（0 KP）在 API 层已过滤，前端不再处理

## 试卷筛选组件 (`PaperTreePanel`)

3 个 tab：同步试题 / 中考真题 / 全部

- 筛选逻辑在 `paper-bank/content.tsx` 的 `filtered` useMemo 中
- grade 匹配用 `includes`（前端传"三年级"，DB 存"三年级"）
- examType 匹配用标准化函数 `normalizeExamType()`

## 已知局限

- 题库图片路径依赖 Windows junction `web/public/images → extraction_tool/output_llm/images`
- 题目 options 在新 DB schema 中不存在，选择题可能缺选项
- MiKTeX 需要本地安装才能 PDF 导出
- 数据库路径通过 `../../临时文件/...` 硬编码，部署需调整
- 原始 1432 题 DB（path: `data/exam_platform.db`）已于 2026-06-29 丢失，不可恢复
