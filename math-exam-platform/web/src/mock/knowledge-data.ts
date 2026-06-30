/**
 * 知识树数据 — 从 textbook_tree_v2.csv 自动生成
 * 覆盖: 小学(1-6年级) + 初中(7-9年级) + 中考 + 竞赛
 * 来源: 人教版(2024新版)
 * 生成时间: 2026-06-11
 */

import type { Stage, Grade, Chapter, KnowledgePoint } from "@/types/knowledge";

export const stage_小学: Stage = {
  id: "小学",
  name: "小学",
  order: 1,
  grades: [
    {
      id: "grade-一年级上册",
      name: "一年级上册",
      shortName: "一上",
      gradeLevel: 1,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-一年级上册-01",
          name: "一5以内数的认识和加、减法",
          shortName: "5以内数的认识和加、减法",
          order: 1,
          description: "",
          totalPoints: 7,
          totalQuestions: 97,
          sections: [
          {
            id: "sec-grade-一年级上册-01-01",
            name: "1.1~5的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-1", name: "1~5的认识", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 30 },
            { id: "kp-auto-2", name: "比大小", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 20 },
            { id: "kp-auto-3", name: "第几", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 8 },
            { id: "kp-auto-4", name: "分与合", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-一年级上册-01-02",
            name: "2.1~5的加、减法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-5", name: "加法", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 14 },
            { id: "kp-auto-6", name: "减法", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-一年级上册-01-03",
            name: "3.0的认识和加、减法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-7", name: "3.0的认识和加、减法", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 14 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级上册-02",
          name: "二6~10的认识和加、减法",
          shortName: "6~10的认识和加、减法",
          order: 2,
          description: "",
          totalPoints: 9,
          totalQuestions: 132,
          sections: [
          {
            id: "sec-grade-一年级上册-02-01",
            name: "1.6~9的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-8", name: "6~9的认识", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 16 },
            { id: "kp-auto-9", name: "比大小、第几", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 28 },
            { id: "kp-auto-10", name: "分与合", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-一年级上册-02-02",
            name: "2.6~9的加、减法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-11", name: "6和7的加、减法", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 23 },
            { id: "kp-auto-12", name: "8和9的加、减法", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-一年级上册-02-03",
            name: "3.10的认识和加、减法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-13", name: "10的认识", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 30 },
            { id: "kp-auto-14", name: "10的加、减法", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 20 },
            { id: "kp-auto-15", name: "连加、连减", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 20 },
            { id: "kp-auto-16", name: "加减混合", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 21 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级上册-03",
          name: "三认识立体图形",
          shortName: "认识立体图形",
          order: 3,
          description: "",
          totalPoints: 1,
          totalQuestions: 19,
          sections: [
          {
            id: "sec-grade-一年级上册-03-01",
            name: "三认识立体图形",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-17", name: "三认识立体图形", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 29 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级上册-04",
          name: "四11~20的认识",
          shortName: "11~20的认识",
          order: 4,
          description: "",
          totalPoints: 3,
          totalQuestions: 75,
          sections: [
          {
            id: "sec-grade-一年级上册-04-01",
            name: "10的再认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-18", name: "10的再认识", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-一年级上册-04-02",
            name: "11~20的认识",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-19", name: "11~20的认识", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-一年级上册-04-03",
            name: "简单的加、减法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-20", name: "简单的加、减法", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 14 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级上册-05",
          name: "五20以内的进位加法",
          shortName: "20以内的进位加法",
          order: 5,
          description: "",
          totalPoints: 3,
          totalQuestions: 50,
          sections: [
          {
            id: "sec-grade-一年级上册-05-01",
            name: "5、4、3、2加几",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-21", name: "5、4、3、2加几", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-一年级上册-05-02",
            name: "8、7、6加几",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-22", name: "8、7、6加几", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-一年级上册-05-03",
            name: "9加几",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-23", name: "9加几", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级上册-06",
          name: "六复习与关联",
          shortName: "复习与关联",
          order: 6,
          description: "",
          totalPoints: 3,
          totalQuestions: 48,
          sections: [
          {
            id: "sec-grade-一年级上册-06-01",
            name: "整理复习",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-24", name: "数与运算", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 32 },
            { id: "kp-auto-25", name: "数量关系", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 13 },
            { id: "kp-auto-26", name: "图形的认识", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级上册-07",
          name: "数学游戏",
          shortName: "数学游戏",
          order: 7,
          description: "",
          totalPoints: 5,
          totalQuestions: 93,
          sections: [
          {
            id: "sec-grade-一年级上册-07-01",
            name: "在操场上玩一玩",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-27", name: "在操场上玩一玩", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-一年级上册-07-02",
            name: "在教室里玩一玩",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-28", name: "在教室里玩一玩", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-一年级上册-07-03",
            name: "在教室里认一认",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-29", name: "在教室里认一认", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-一年级上册-07-04",
            name: "在校园里找一找",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-30", name: "在校园里找一找", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-一年级上册-07-05",
            name: "学习准备",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-31", name: "学习准备", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 21 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-一年级下册",
      name: "一年级下册",
      shortName: "一下",
      gradeLevel: 1,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-一年级下册-01",
          name: "二20以内的退位减法",
          shortName: "20以内的退位减法",
          order: 1,
          description: "",
          totalPoints: 3,
          totalQuestions: 62,
          sections: [
          {
            id: "sec-grade-一年级下册-01-01",
            name: "十几减5、4、3、2",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-32", name: "十几减5、4、3、2", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-一年级下册-01-02",
            name: "十几减8、7、6",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-33", name: "十几减8、7、6", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-一年级下册-01-03",
            name: "十几减9",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-34", name: "十几减9", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 17 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级下册-02",
          name: "三100以内数的认识",
          shortName: "100以内数的认识",
          order: 2,
          description: "",
          totalPoints: 4,
          totalQuestions: 73,
          sections: [
          {
            id: "sec-grade-一年级下册-02-01",
            name: "摆一摆，想一想",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-35", name: "摆一摆，想一想", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-一年级下册-02-02",
            name: "数数、数的组成",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-36", name: "数数、数的组成", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-一年级下册-02-03",
            name: "数的顺序、比较大小",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-37", name: "数的顺序、比较大小", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-一年级下册-02-04",
            name: "简单的加、减法",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-38", name: "简单的加、减法", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级下册-03",
          name: "四100以内的口算加、减法",
          shortName: "100以内的口算加、减法",
          order: 3,
          description: "",
          totalPoints: 2,
          totalQuestions: 56,
          sections: [
          {
            id: "sec-grade-一年级下册-03-01",
            name: "1.口算加法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-39", name: "1.口算加法", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-一年级下册-03-02",
            name: "2.口算减法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-40", name: "2.口算减法", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级下册-04",
          name: "五100以内的笔算加、减法",
          shortName: "100以内的笔算加、减法",
          order: 4,
          description: "",
          totalPoints: 2,
          totalQuestions: 65,
          sections: [
          {
            id: "sec-grade-一年级下册-04-01",
            name: "1.笔算加法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-41", name: "1.笔算加法", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-一年级下册-04-02",
            name: "2.笔算减法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-42", name: "2.笔算减法", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 21 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级下册-05",
          name: "七复习与关联",
          shortName: "复习与关联",
          order: 5,
          description: "",
          totalPoints: 3,
          totalQuestions: 35,
          sections: [
          {
            id: "sec-grade-一年级下册-05-01",
            name: "整理复习",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-43", name: "数与运算", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 29 },
            { id: "kp-auto-44", name: "数量关系", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 10 },
            { id: "kp-auto-45", name: "图形的认识", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 15 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-一年级下册-06",
          name: "☆欢乐购物街",
          shortName: "☆欢乐购物街",
          order: 6,
          description: "",
          totalPoints: 3,
          totalQuestions: 43,
          sections: [
          {
            id: "sec-grade-一年级下册-06-01",
            name: "买卖我做主",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-46", name: "买卖我做主", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-一年级下册-06-02",
            name: "小讲堂",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-47", name: "小讲堂", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-一年级下册-06-03",
            name: "认识人民币",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-48", name: "认识人民币", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 23 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-三年级上册",
      name: "三年级上册",
      shortName: "三上",
      gradeLevel: 3,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-三年级上册-01",
          name: "一观察物体",
          shortName: "观察物体",
          order: 1,
          description: "",
          totalPoints: 1,
          totalQuestions: 57,
          sections: [
          {
            id: "sec-grade-三年级上册-01-01",
            name: "一观察物体",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-49", name: "一观察物体", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级上册-02",
          name: "三毫米、分米和千米",
          shortName: "毫米、分米和千米",
          order: 2,
          description: "",
          totalPoints: 2,
          totalQuestions: 69,
          sections: [
          {
            id: "sec-grade-三年级上册-02-01",
            name: "千米的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-50", name: "千米的认识", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-三年级上册-02-02",
            name: "毫米、分米的认识",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-51", name: "毫米、分米的认识", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 12 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级上册-03",
          name: "四多位数乘一位数",
          shortName: "多位数乘一位数",
          order: 3,
          description: "",
          totalPoints: 2,
          totalQuestions: 65,
          sections: [
          {
            id: "sec-grade-三年级上册-03-01",
            name: "1.口算乘法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-52", name: "1.口算乘法", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-三年级上册-03-02",
            name: "2.笔算乘法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-53", name: "2.笔算乘法", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 29 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级上册-04",
          name: "五线和角",
          shortName: "线和角",
          order: 4,
          description: "",
          totalPoints: 2,
          totalQuestions: 66,
          sections: [
          {
            id: "sec-grade-三年级上册-04-01",
            name: "1.线段、射线、直线",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-54", name: "1.线段、射线、直线", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-三年级上册-04-02",
            name: "2.角的认识",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-55", name: "2.角的认识", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 30 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级上册-05",
          name: "六分数的初步认识",
          shortName: "分数的初步认识",
          order: 5,
          description: "",
          totalPoints: 4,
          totalQuestions: 77,
          sections: [
          {
            id: "sec-grade-三年级上册-05-01",
            name: "1.初步认识分数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-56", name: "几分之一", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 27 },
            { id: "kp-auto-57", name: "几分之几", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-三年级上册-05-02",
            name: "2.分数的简单计算",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-58", name: "2.分数的简单计算", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-三年级上册-05-03",
            name: "3.进一步认识分数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-59", name: "3.进一步认识分数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 15 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级上册-06",
          name: "七复习与关联",
          shortName: "复习与关联",
          order: 6,
          description: "",
          totalPoints: 5,
          totalQuestions: 88,
          sections: [
          {
            id: "sec-grade-三年级上册-06-01",
            name: "*数学广角：搭配问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-60", name: "*数学广角：搭配问题", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-三年级上册-06-02",
            name: "整理复习",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-61", name: "数与运算", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 11 },
            { id: "kp-auto-62", name: "数量关系", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 23 },
            { id: "kp-auto-63", name: "图形的认识与测量", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 27 },
            { id: "kp-auto-64", name: "常见的量", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 22 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级上册-07",
          name: "☆曹冲称象的故事",
          shortName: "☆曹冲称象的故事",
          order: 7,
          description: "",
          totalPoints: 4,
          totalQuestions: 85,
          sections: [
          {
            id: "sec-grade-三年级上册-07-01",
            name: "小讲堂",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-65", name: "小讲堂", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-三年级上册-07-02",
            name: "称重大挑战",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-66", name: "称重大挑战", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-三年级上册-07-03",
            name: "称重我很行",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-67", name: "称重我很行", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-三年级上册-07-04",
            name: "认识质量单位",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-68", name: "认识质量单位", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级上册-08",
          name: "☆数字编码",
          shortName: "☆数字编码",
          order: 8,
          description: "",
          totalPoints: 3,
          totalQuestions: 59,
          sections: [
          {
            id: "sec-grade-三年级上册-08-01",
            name: "小讲堂",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-69", name: "小讲堂", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-三年级上册-08-02",
            name: "编制学号",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-70", name: "编制学号", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-三年级上册-08-03",
            name: "认识数字编码",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-71", name: "认识数字编码", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 20 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-三年级下册",
      name: "三年级下册",
      shortName: "三下",
      gradeLevel: 3,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-三年级下册-01",
          name: "一生活中的运动现象",
          shortName: "生活中的运动现象",
          order: 1,
          description: "",
          totalPoints: 1,
          totalQuestions: 18,
          sections: [
          {
            id: "sec-grade-三年级下册-01-01",
            name: "剪纸",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-72", name: "剪纸", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级下册-02",
          name: "二除数是一位数的除法",
          shortName: "除数是一位数的除法",
          order: 2,
          description: "",
          totalPoints: 2,
          totalQuestions: 56,
          sections: [
          {
            id: "sec-grade-三年级下册-02-01",
            name: "1.口算除法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-73", name: "1.口算除法", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-三年级下册-02-02",
            name: "2.笔算除法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-74", name: "2.笔算除法", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级下册-03",
          name: "三长方形和正方形",
          shortName: "长方形和正方形",
          order: 3,
          description: "",
          totalPoints: 3,
          totalQuestions: 56,
          sections: [
          {
            id: "sec-grade-三年级下册-03-01",
            name: "周长",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-75", name: "周长", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-三年级下册-03-02",
            name: "多边形",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-76", name: "多边形", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-三年级下册-03-03",
            name: "拼图游戏",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-77", name: "拼图游戏", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 29 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级下册-04",
          name: "四图形的面积",
          shortName: "图形的面积",
          order: 4,
          description: "",
          totalPoints: 3,
          totalQuestions: 36,
          sections: [
          {
            id: "sec-grade-三年级下册-04-01",
            name: "长方形和正方形的面积",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-78", name: "长方形和正方形的面积", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-三年级下册-04-02",
            name: "面积单位间的进率",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-79", name: "面积单位间的进率", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-三年级下册-04-03",
            name: "面积和面积单位",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-80", name: "面积和面积单位", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 16 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级下册-05",
          name: "六小数的初步认识",
          shortName: "小数的初步认识",
          order: 5,
          description: "",
          totalPoints: 3,
          totalQuestions: 71,
          sections: [
          {
            id: "sec-grade-三年级下册-05-01",
            name: "小数的大小比较",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-81", name: "小数的大小比较", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-三年级下册-05-02",
            name: "简单的小数加、减法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-82", name: "简单的小数加、减法", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-三年级下册-05-03",
            name: "认识小数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-83", name: "认识小数", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级下册-06",
          name: "七复习与关联",
          shortName: "复习与关联",
          order: 6,
          description: "",
          totalPoints: 6,
          totalQuestions: 85,
          sections: [
          {
            id: "sec-grade-三年级下册-06-01",
            name: "*数学广角：重叠问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-84", name: "*数学广角：重叠问题", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-三年级下册-06-02",
            name: "整理复习",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-85", name: "数与运算", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 17 },
            { id: "kp-auto-86", name: "数量关系", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 29 },
            { id: "kp-auto-87", name: "图形的认识与测量、位置与运动", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 26 },
            { id: "kp-auto-88", name: "数据的收集、整理与表达", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 12 },
            { id: "kp-auto-89", name: "常见的量", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-三年级下册-07",
          name: "☆年、月、日的秘密",
          shortName: "☆年、月、日的秘密",
          order: 7,
          description: "",
          totalPoints: 4,
          totalQuestions: 59,
          sections: [
          {
            id: "sec-grade-三年级下册-07-01",
            name: "作息时间表中的秘密",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-90", name: "作息时间表中的秘密", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-三年级下册-07-02",
            name: "小讲堂",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-91", name: "小讲堂", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-三年级下册-07-03",
            name: "年历中的秘密",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-92", name: "年历中的秘密", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-三年级下册-07-04",
            name: "年历设计师",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-93", name: "年历设计师", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 18 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-二年级上册",
      name: "二年级上册",
      shortName: "二上",
      gradeLevel: 2,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-二年级上册-01",
          name: "一分类与整理",
          shortName: "分类与整理",
          order: 1,
          description: "",
          totalPoints: 1,
          totalQuestions: 11,
          sections: [
          {
            id: "sec-grade-二年级上册-01-01",
            name: "一分类与整理",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-94", name: "一分类与整理", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 27 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级上册-02",
          name: "二1~6的表内乘法",
          shortName: "1~6的表内乘法",
          order: 2,
          description: "",
          totalPoints: 5,
          totalQuestions: 92,
          sections: [
          {
            id: "sec-grade-二年级上册-02-01",
            name: "1.乘法的初步认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-95", name: "1.乘法的初步认识", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-二年级上册-02-02",
            name: "2.2~6的乘法口诀",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-96", name: "5的乘法口诀", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 31 },
            { id: "kp-auto-97", name: "2、3、4的乘法口诀", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 23 },
            { id: "kp-auto-98", name: "乘加、乘减", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 11 },
            { id: "kp-auto-99", name: "6的乘法口诀", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级上册-03",
          name: "三1~6的表内除法",
          shortName: "1~6的表内除法",
          order: 3,
          description: "",
          totalPoints: 3,
          totalQuestions: 53,
          sections: [
          {
            id: "sec-grade-二年级上册-03-01",
            name: "1.除法的初步认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-100", name: "平均分", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 15 },
            { id: "kp-auto-101", name: "除法", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-二年级上册-03-02",
            name: "2.用2~6的乘法口诀求商",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-102", name: "2.用2~6的乘法口诀求商", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级上册-04",
          name: "五7~9的表内乘、除法",
          shortName: "7~9的表内乘、除法",
          order: 4,
          description: "",
          totalPoints: 2,
          totalQuestions: 67,
          sections: [
          {
            id: "sec-grade-二年级上册-04-01",
            name: "7~9的乘法口诀",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-103", name: "7~9的乘法口诀", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-二年级上册-04-02",
            name: "用7~9的乘法口诀求商",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-104", name: "用7~9的乘法口诀求商", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级上册-05",
          name: "六复习与关联",
          shortName: "复习与关联",
          order: 5,
          description: "",
          totalPoints: 4,
          totalQuestions: 81,
          sections: [
          {
            id: "sec-grade-二年级上册-05-01",
            name: "整理复习",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-105", name: "数与运算", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 29 },
            { id: "kp-auto-106", name: "数量关系", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 17 },
            { id: "kp-auto-107", name: "图形的位置与测量", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 19 },
            { id: "kp-auto-108", name: "数据分类", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 25 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级上册-06",
          name: "☆校园小导游",
          shortName: "☆校园小导游",
          order: 6,
          description: "",
          totalPoints: 3,
          totalQuestions: 37,
          sections: [
          {
            id: "sec-grade-二年级上册-06-01",
            name: "小讲堂",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-109", name: "小讲堂", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-二年级上册-06-02",
            name: "校园小导游",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-110", name: "校园小导游", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-二年级上册-06-03",
            name: "认识东、南、西、北",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-111", name: "认识东、南、西、北", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 21 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级上册-07",
          name: "☆身体上的尺子",
          shortName: "☆身体上的尺子",
          order: 7,
          description: "",
          totalPoints: 3,
          totalQuestions: 45,
          sections: [
          {
            id: "sec-grade-二年级上册-07-01",
            name: "小讲堂",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-112", name: "小讲堂", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-二年级上册-07-02",
            name: "身体上的尺子",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-113", name: "身体上的尺子", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-二年级上册-07-03",
            name: "身体上的长度",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-114", name: "身体上的长度", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 11 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-二年级下册",
      name: "二年级下册",
      shortName: "二下",
      gradeLevel: 2,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-二年级下册-01",
          name: "三万以内数的认识",
          shortName: "万以内数的认识",
          order: 1,
          description: "",
          totalPoints: 3,
          totalQuestions: 76,
          sections: [
          {
            id: "sec-grade-二年级下册-01-01",
            name: "10000以内数的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-115", name: "10000以内数的认识", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-二年级下册-01-02",
            name: "1000以内数的认识",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-116", name: "1000以内数的认识", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-二年级下册-01-03",
            name: "简单的加、减法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-117", name: "简单的加、减法", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级下册-02",
          name: "四万以内的加法和减法",
          shortName: "万以内的加法和减法",
          order: 2,
          description: "",
          totalPoints: 4,
          totalQuestions: 44,
          sections: [
          {
            id: "sec-grade-二年级下册-02-01",
            name: "*数独游戏",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-118", name: "*数独游戏", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-二年级下册-02-02",
            name: "1.加法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-119", name: "1.加法", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-二年级下册-02-03",
            name: "2.减法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-120", name: "2.减法", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-二年级下册-02-04",
            name: "3.加、减法各部分间的关系",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-121", name: "3.加、减法各部分间的关系", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 9 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级下册-03",
          name: "五复习与关联",
          shortName: "复习与关联",
          order: 3,
          description: "",
          totalPoints: 2,
          totalQuestions: 64,
          sections: [
          {
            id: "sec-grade-二年级下册-03-01",
            name: "整理复习",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-122", name: "数与运算", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 22 },
            { id: "kp-auto-123", name: "数量关系", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级下册-04",
          name: "☆时间在哪里",
          shortName: "☆时间在哪里",
          order: 4,
          description: "",
          totalPoints: 4,
          totalQuestions: 67,
          sections: [
          {
            id: "sec-grade-二年级下册-04-01",
            name: "小讲堂",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-124", name: "小讲堂", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-二年级下册-04-02",
            name: "我与时间的故事",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-125", name: "我与时间的故事", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-二年级下册-04-03",
            name: "我的时间小书",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-126", name: "我的时间小书", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-二年级下册-04-04",
            name: "认识时间",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-127", name: "认识时间", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 23 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-二年级下册-05",
          name: "☆数学连环画",
          shortName: "☆数学连环画",
          order: 5,
          description: "",
          totalPoints: 3,
          totalQuestions: 35,
          sections: [
          {
            id: "sec-grade-二年级下册-05-01",
            name: "小小故事会",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-128", name: "小小故事会", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-二年级下册-05-02",
            name: "我是小画家",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-129", name: "我是小画家", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-二年级下册-05-03",
            name: "连环画分享会",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-130", name: "连环画分享会", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 16 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-五年级上册",
      name: "五年级上册",
      shortName: "五上",
      gradeLevel: 5,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-五年级上册-01",
          name: "一观察简单组合体",
          shortName: "观察简单组合体",
          order: 1,
          description: "",
          totalPoints: 1,
          totalQuestions: 41,
          sections: [
          {
            id: "sec-grade-五年级上册-01-01",
            name: "一观察简单组合体",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-131", name: "一观察简单组合体", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 23 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-02",
          name: "二小数乘法",
          shortName: "小数乘法",
          order: 2,
          description: "",
          totalPoints: 3,
          totalQuestions: 32,
          sections: [
          {
            id: "sec-grade-五年级上册-02-01",
            name: "小数乘小数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-132", name: "小数乘小数", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-五年级上册-02-02",
            name: "小数乘整数",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-133", name: "小数乘整数", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-五年级上册-02-03",
            name: "整数乘法运算律推广到小数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-134", name: "整数乘法运算律推广到小数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 16 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-03",
          name: "三小数除法",
          shortName: "小数除法",
          order: 3,
          description: "",
          totalPoints: 2,
          totalQuestions: 27,
          sections: [
          {
            id: "sec-grade-五年级上册-03-01",
            name: "一个数除以小数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-135", name: "一个数除以小数", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-五年级上册-03-02",
            name: "除数是整数的小数除法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-136", name: "除数是整数的小数除法", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 14 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-04",
          name: "四图形的运动",
          shortName: "图形的运动",
          order: 4,
          description: "",
          totalPoints: 4,
          totalQuestions: 85,
          sections: [
          {
            id: "sec-grade-五年级上册-04-01",
            name: "平移",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-137", name: "平移", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-五年级上册-04-02",
            name: "旋转",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-138", name: "旋转", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-五年级上册-04-03",
            name: "设计图案",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-139", name: "设计图案", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-五年级上册-04-04",
            name: "轴对称",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-140", name: "轴对称", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-05",
          name: "五用字母表示数和数量关系",
          shortName: "用字母表示数和数量关系",
          order: 5,
          description: "",
          totalPoints: 1,
          totalQuestions: 17,
          sections: [
          {
            id: "sec-grade-五年级上册-05-01",
            name: "*探秘百数表",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-141", name: "*探秘百数表", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 30 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-06",
          name: "六多边形的面积",
          shortName: "多边形的面积",
          order: 6,
          description: "",
          totalPoints: 5,
          totalQuestions: 93,
          sections: [
          {
            id: "sec-grade-五年级上册-06-01",
            name: "*格点多边形的面积",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-142", name: "*格点多边形的面积", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-五年级上册-06-02",
            name: "三角形的面积",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-143", name: "三角形的面积", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-五年级上册-06-03",
            name: "平行四边形的面积",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-144", name: "平行四边形的面积", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-五年级上册-06-04",
            name: "梯形的面积",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-145", name: "梯形的面积", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-五年级上册-06-05",
            name: "组合图形的面积",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-146", name: "组合图形的面积", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 22 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-07",
          name: "七可能性",
          shortName: "可能性",
          order: 7,
          description: "",
          totalPoints: 1,
          totalQuestions: 29,
          sections: [
          {
            id: "sec-grade-五年级上册-07-01",
            name: "*掷一掷",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-147", name: "*掷一掷", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-08",
          name: "八复习与关联",
          shortName: "复习与关联",
          order: 8,
          description: "",
          totalPoints: 6,
          totalQuestions: 107,
          sections: [
          {
            id: "sec-grade-五年级上册-08-01",
            name: "*数学广角：植树问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-148", name: "*数学广角：植树问题", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-五年级上册-08-02",
            name: "整理复习",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-149", name: "数与运算", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 31 },
            { id: "kp-auto-150", name: "数量关系", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 26 },
            { id: "kp-auto-151", name: "图形的位置", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 8 },
            { id: "kp-auto-152", name: "图形的运动与测量", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 8 },
            { id: "kp-auto-153", name: "可能性", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级上册-09",
          name: "☆有趣的密铺",
          shortName: "☆有趣的密铺",
          order: 9,
          description: "",
          totalPoints: 3,
          totalQuestions: 42,
          sections: [
          {
            id: "sec-grade-五年级上册-09-01",
            name: "密铺",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-154", name: "密铺", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-五年级上册-09-02",
            name: "小讲堂",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-155", name: "小讲堂", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-五年级上册-09-03",
            name: "设计密铺图案",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-156", name: "设计密铺图案", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 32 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-五年级下册",
      name: "五年级下册",
      shortName: "五下",
      gradeLevel: 5,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-五年级下册-01",
          name: "1观察物体（三）",
          shortName: "1观察物体（三）",
          order: 1,
          description: "",
          totalPoints: 1,
          totalQuestions: 58,
          sections: [
          {
            id: "sec-grade-五年级下册-01-01",
            name: "1观察物体（三）",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-157", name: "1观察物体（三）", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-02",
          name: "2因数和倍数",
          shortName: "2因数和倍数",
          order: 2,
          description: "",
          totalPoints: 3,
          totalQuestions: 37,
          sections: [
          {
            id: "sec-grade-五年级下册-02-01",
            name: "1.因数和倍数的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-158", name: "1.因数和倍数的认识", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-五年级下册-02-02",
            name: "2.2、5、3的倍数",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-159", name: "2.2、5、3的倍数", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-五年级下册-02-03",
            name: "3.质数和合数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-160", name: "3.质数和合数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 29 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-03",
          name: "3长方体和正方体",
          shortName: "3长方体和正方体",
          order: 3,
          description: "",
          totalPoints: 6,
          totalQuestions: 99,
          sections: [
          {
            id: "sec-grade-五年级下册-03-01",
            name: "1长方体和正方体的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-161", name: "长方体", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 13 },
            { id: "kp-auto-162", name: "正方体", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-五年级下册-03-02",
            name: "2.长方体和正方体的表面积",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-163", name: "2.长方体和正方体的表面积", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-五年级下册-03-03",
            name: "3.长方体和正方体的体积",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-164", name: "体积和体积单位", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 23 },
            { id: "kp-auto-165", name: "体积单位间的进率", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 14 },
            { id: "kp-auto-166", name: "容积和容积单位", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-04",
          name: "探索图形",
          shortName: "探索图形",
          order: 4,
          description: "",
          totalPoints: 1,
          totalQuestions: 30,
          sections: [
          {
            id: "sec-grade-五年级下册-04-01",
            name: "探索图形",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-167", name: "探索图形", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 22 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-05",
          name: "4分数的意义和性质",
          shortName: "4分数的意义和性质",
          order: 5,
          description: "",
          totalPoints: 10,
          totalQuestions: 135,
          sections: [
          {
            id: "sec-grade-五年级下册-05-01",
            name: "1.分数的意义",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-168", name: "分数的产生", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 13 },
            { id: "kp-auto-169", name: "分数的意义", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 20 },
            { id: "kp-auto-170", name: "分数与除法", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-五年级下册-05-02",
            name: "2.真分数和假分数",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-171", name: "2.真分数和假分数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-五年级下册-05-03",
            name: "3.分数的基本性质",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-172", name: "3.分数的基本性质", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-五年级下册-05-04",
            name: "4.约分",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-173", name: "最大公因数", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 15 },
            { id: "kp-auto-174", name: "约分", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-五年级下册-05-05",
            name: "5.通分",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-175", name: "最小公倍数", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 10 },
            { id: "kp-auto-176", name: "通分", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-五年级下册-05-06",
            name: "6.分数和小数的互化",
            order: 6,
            knowledgePoints: [
            { id: "kp-auto-177", name: "6.分数和小数的互化", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 29 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-06",
          name: "5图形的运动（三）",
          shortName: "5图形的运动（三）",
          order: 6,
          description: "",
          totalPoints: 1,
          totalQuestions: 48,
          sections: [
          {
            id: "sec-grade-五年级下册-06-01",
            name: "5图形的运动（三）",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-178", name: "5图形的运动（三）", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 16 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-07",
          name: "6分数的加法和减法",
          shortName: "6分数的加法和减法",
          order: 7,
          description: "",
          totalPoints: 3,
          totalQuestions: 48,
          sections: [
          {
            id: "sec-grade-五年级下册-07-01",
            name: "1.同分母分数加、减法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-179", name: "1.同分母分数加、减法", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-五年级下册-07-02",
            name: "2.异分母分数加、减法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-180", name: "2.异分母分数加、减法", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-五年级下册-07-03",
            name: "3.分数加减混合运算",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-181", name: "3.分数加减混合运算", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 30 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-08",
          name: "怎样通知最快",
          shortName: "怎样通知最快",
          order: 8,
          description: "",
          totalPoints: 1,
          totalQuestions: 26,
          sections: [
          {
            id: "sec-grade-五年级下册-08-01",
            name: "怎样通知最快",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-182", name: "怎样通知最快", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 11 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-09",
          name: "7折线统计图",
          shortName: "7折线统计图",
          order: 9,
          description: "",
          totalPoints: 1,
          totalQuestions: 54,
          sections: [
          {
            id: "sec-grade-五年级下册-09-01",
            name: "7折线统计图",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-183", name: "7折线统计图", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-10",
          name: "8数学广角——找次品",
          shortName: "8数学广角——找次品",
          order: 10,
          description: "",
          totalPoints: 1,
          totalQuestions: 38,
          sections: [
          {
            id: "sec-grade-五年级下册-10-01",
            name: "8数学广角——找次品",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-184", name: "8数学广角——找次品", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 28 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-五年级下册-11",
          name: "9总复习",
          shortName: "9总复习",
          order: 11,
          description: "",
          totalPoints: 1,
          totalQuestions: 41,
          sections: [
          {
            id: "sec-grade-五年级下册-11-01",
            name: "9总复习",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-185", name: "9总复习", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 8 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-六年级上册",
      name: "六年级上册",
      shortName: "六上",
      gradeLevel: 6,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-六年级上册-01",
          name: "一确定位置",
          shortName: "确定位置",
          order: 1,
          description: "",
          totalPoints: 2,
          totalQuestions: 25,
          sections: [
          {
            id: "sec-grade-六年级上册-01-01",
            name: "用方向和距离确定位置",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-186", name: "用方向和距离确定位置", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-六年级上册-01-02",
            name: "用有序数对确定位置",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-187", name: "用有序数对确定位置", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-02",
          name: "二分数乘法",
          shortName: "分数乘法",
          order: 2,
          description: "",
          totalPoints: 3,
          totalQuestions: 64,
          sections: [
          {
            id: "sec-grade-六年级上册-02-01",
            name: "一个数乘分数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-188", name: "一个数乘分数", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-六年级上册-02-02",
            name: "分数、小数混合运算及运算律",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-189", name: "分数、小数混合运算及运算律", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-六年级上册-02-03",
            name: "分数乘整数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-190", name: "分数乘整数", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-03",
          name: "三分数除法",
          shortName: "分数除法",
          order: 3,
          description: "",
          totalPoints: 3,
          totalQuestions: 79,
          sections: [
          {
            id: "sec-grade-六年级上册-03-01",
            name: "1.倒数的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-191", name: "1.倒数的认识", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-六年级上册-03-02",
            name: "2.分数除法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-192", name: "一个数除以整数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 22 },
            { id: "kp-auto-193", name: "一个数除以分数", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 21 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-04",
          name: "四圆",
          shortName: "圆",
          order: 4,
          description: "",
          totalPoints: 4,
          totalQuestions: 68,
          sections: [
          {
            id: "sec-grade-六年级上册-04-01",
            name: "*利用圆设计图案",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-194", name: "*利用圆设计图案", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-六年级上册-04-02",
            name: "1.圆和扇形的认识",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-195", name: "1.圆和扇形的认识", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-六年级上册-04-03",
            name: "2.圆的周长",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-196", name: "2.圆的周长", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-六年级上册-04-04",
            name: "3.圆的面积",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-197", name: "3.圆的面积", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 29 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-05",
          name: "五百分数",
          shortName: "百分数",
          order: 5,
          description: "",
          totalPoints: 3,
          totalQuestions: 31,
          sections: [
          {
            id: "sec-grade-六年级上册-05-01",
            name: "1.百分数的意义",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-198", name: "1.百分数的意义", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-六年级上册-05-02",
            name: "2.百分数的应用",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-199", name: "2.百分数的应用", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-六年级上册-05-03",
            name: "确定达标线",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-200", name: "确定达标线", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 25 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-06",
          name: "六复习与关联",
          shortName: "复习与关联",
          order: 6,
          description: "",
          totalPoints: 5,
          totalQuestions: 58,
          sections: [
          {
            id: "sec-grade-六年级上册-06-01",
            name: "*数学广角：鸽巢问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-201", name: "*数学广角：鸽巢问题", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-六年级上册-06-02",
            name: "整理复习",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-202", name: "数与运算", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 23 },
            { id: "kp-auto-203", name: "图形的认识与测量", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 25 },
            { id: "kp-auto-204", name: "图形的位置与运动", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 27 },
            { id: "kp-auto-205", name: "数据的收集、整理与表达", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 15 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-07",
          name: "☆生活中的负数",
          shortName: "☆生活中的负数",
          order: 7,
          description: "",
          totalPoints: 4,
          totalQuestions: 62,
          sections: [
          {
            id: "sec-grade-六年级上册-07-01",
            name: "寻找负数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-206", name: "寻找负数", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-六年级上册-07-02",
            name: "小讲堂",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-207", name: "小讲堂", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-六年级上册-07-03",
            name: "应用负数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-208", name: "应用负数", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-六年级上册-07-04",
            name: "认识负数",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-209", name: "认识负数", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-08",
          name: "☆体育中的数学",
          shortName: "☆体育中的数学",
          order: 8,
          description: "",
          totalPoints: 3,
          totalQuestions: 39,
          sections: [
          {
            id: "sec-grade-六年级上册-08-01",
            name: "交流分享",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-210", name: "交流分享", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-六年级上册-08-02",
            name: "分析研讨",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-211", name: "分析研讨", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-六年级上册-08-03",
            name: "确定主题",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-212", name: "确定主题", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 28 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级上册-09",
          name: "☆水是生命之源",
          shortName: "☆水是生命之源",
          order: 9,
          description: "",
          totalPoints: 1,
          totalQuestions: 11,
          sections: [
          {
            id: "sec-grade-六年级上册-09-01",
            name: "☆水是生命之源",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-213", name: "☆水是生命之源", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 31 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-六年级下册",
      name: "六年级下册",
      shortName: "六下",
      gradeLevel: 6,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-六年级下册-01",
          name: "1负数",
          shortName: "1负数",
          order: 1,
          description: "",
          totalPoints: 1,
          totalQuestions: 28,
          sections: [
          {
            id: "sec-grade-六年级下册-01-01",
            name: "1负数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-214", name: "1负数", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 20 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级下册-02",
          name: "2百分数（二）",
          shortName: "2百分数（二）",
          order: 2,
          description: "",
          totalPoints: 4,
          totalQuestions: 63,
          sections: [
          {
            id: "sec-grade-六年级下册-02-01",
            name: "利率",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-215", name: "利率", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-六年级下册-02-02",
            name: "成数",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-216", name: "成数", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-六年级下册-02-03",
            name: "折扣",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-217", name: "折扣", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-六年级下册-02-04",
            name: "税率",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-218", name: "税率", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级下册-03",
          name: "生活与百分数",
          shortName: "生活与百分数",
          order: 3,
          description: "",
          totalPoints: 1,
          totalQuestions: 17,
          sections: [
          {
            id: "sec-grade-六年级下册-03-01",
            name: "生活与百分数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-219", name: "生活与百分数", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级下册-04",
          name: "3圆柱与圆锥",
          shortName: "3圆柱与圆锥",
          order: 4,
          description: "",
          totalPoints: 5,
          totalQuestions: 60,
          sections: [
          {
            id: "sec-grade-六年级下册-04-01",
            name: "1.圆柱",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-220", name: "圆柱的认识", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 13 },
            { id: "kp-auto-221", name: "圆柱的表面积", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 32 },
            { id: "kp-auto-222", name: "圆柱的体积", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-六年级下册-04-02",
            name: "2.圆锥",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-223", name: "圆锥的认识", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 21 },
            { id: "kp-auto-224", name: "圆锥的体积", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 30 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级下册-05",
          name: "4比例",
          shortName: "4比例",
          order: 5,
          description: "",
          totalPoints: 8,
          totalQuestions: 108,
          sections: [
          {
            id: "sec-grade-六年级下册-05-01",
            name: "1.比例的意义和基本性质",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-225", name: "比例的意义", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 11 },
            { id: "kp-auto-226", name: "比例的基本性质", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 22 },
            { id: "kp-auto-227", name: "解比例", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-六年级下册-05-02",
            name: "2.正比例和反比例",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-228", name: "正比例", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 8 },
            { id: "kp-auto-229", name: "反比例", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-六年级下册-05-03",
            name: "3.比例的应用",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-230", name: "比例尺", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 27 },
            { id: "kp-auto-231", name: "图形的放大与缩小", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 15 },
            { id: "kp-auto-232", name: "用比例解决问题", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级下册-06",
          name: "自行车里的数学",
          shortName: "自行车里的数学",
          order: 6,
          description: "",
          totalPoints: 1,
          totalQuestions: 33,
          sections: [
          {
            id: "sec-grade-六年级下册-06-01",
            name: "自行车里的数学",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-233", name: "自行车里的数学", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级下册-07",
          name: "5数学广角——鸽巢问题",
          shortName: "5数学广角——鸽巢问题",
          order: 7,
          description: "",
          totalPoints: 1,
          totalQuestions: 35,
          sections: [
          {
            id: "sec-grade-六年级下册-07-01",
            name: "5数学广角——鸽巢问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-234", name: "5数学广角——鸽巢问题", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-六年级下册-08",
          name: "6整理与复习",
          shortName: "6整理与复习",
          order: 8,
          description: "",
          totalPoints: 12,
          totalQuestions: 144,
          sections: [
          {
            id: "sec-grade-六年级下册-08-01",
            name: "1.数与代数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-235", name: "数的认识", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 9 },
            { id: "kp-auto-236", name: "数的运算", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 11 },
            { id: "kp-auto-237", name: "式与方程", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 21 },
            { id: "kp-auto-238", name: "比和比例", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-六年级下册-08-02",
            name: "2.图形与几何",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-239", name: "图形的认识与测量", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 23 },
            { id: "kp-auto-240", name: "图形的运动", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 10 },
            { id: "kp-auto-241", name: "图形的位置", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-六年级下册-08-03",
            name: "3.统计与概率",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-242", name: "3.统计与概率", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-六年级下册-08-04",
            name: "4.数学思考",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-243", name: "4.数学思考", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-六年级下册-08-05",
            name: "5.综合与实践",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-244", name: "绿色出行", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 29 },
            { id: "kp-auto-245", name: "北京五日游", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 28 },
            { id: "kp-auto-246", name: "有趣的平衡", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 11 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-四年级上册",
      name: "四年级上册",
      shortName: "四上",
      gradeLevel: 4,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-四年级上册-01",
          name: "一万以上数的认识",
          shortName: "万以上数的认识",
          order: 1,
          description: "",
          totalPoints: 4,
          totalQuestions: 80,
          sections: [
          {
            id: "sec-grade-四年级上册-01-01",
            name: "亿以上数的认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-247", name: "亿以上数的认识", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-四年级上册-01-02",
            name: "亿以内数的认识",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-248", name: "亿以内数的认识", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-四年级上册-01-03",
            name: "数的大小比较",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-249", name: "数的大小比较", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-四年级上册-01-04",
            name: "数的改写和求近似数",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-250", name: "数的改写和求近似数", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-02",
          name: "二角的度量",
          shortName: "角的度量",
          order: 2,
          description: "",
          totalPoints: 2,
          totalQuestions: 46,
          sections: [
          {
            id: "sec-grade-四年级上册-02-01",
            name: "角的再认识",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-251", name: "角的再认识", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-四年级上册-02-02",
            name: "角的度量",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-252", name: "角的度量", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 12 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-03",
          name: "三多位数乘两位数",
          shortName: "多位数乘两位数",
          order: 3,
          description: "",
          totalPoints: 2,
          totalQuestions: 56,
          sections: [
          {
            id: "sec-grade-四年级上册-03-01",
            name: "1.口算乘法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-253", name: "1.口算乘法", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-四年级上册-03-02",
            name: "2.笔算乘法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-254", name: "2.笔算乘法", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 24 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-04",
          name: "四加法模型和乘法模型",
          shortName: "加法模型和乘法模型",
          order: 4,
          description: "",
          totalPoints: 1,
          totalQuestions: 47,
          sections: [
          {
            id: "sec-grade-四年级上册-04-01",
            name: "四加法模型和乘法模型",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-255", name: "四加法模型和乘法模型", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-05",
          name: "五平行四边形和梯形",
          shortName: "平行四边形和梯形",
          order: 5,
          description: "",
          totalPoints: 3,
          totalQuestions: 41,
          sections: [
          {
            id: "sec-grade-四年级上册-05-01",
            name: "平行和垂直",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-256", name: "平行和垂直", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-四年级上册-05-02",
            name: "平行四边形和梯形",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-257", name: "平行四边形和梯形", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-四年级上册-05-03",
            name: "神奇的默比乌斯带",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-258", name: "神奇的默比乌斯带", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 24 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-06",
          name: "六条形统计图",
          shortName: "条形统计图",
          order: 6,
          description: "",
          totalPoints: 2,
          totalQuestions: 69,
          sections: [
          {
            id: "sec-grade-四年级上册-06-01",
            name: "单式条形统计图",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-259", name: "单式条形统计图", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-四年级上册-06-02",
            name: "复式条形统计图",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-260", name: "复式条形统计图", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 14 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-07",
          name: "七复习与关联",
          shortName: "复习与关联",
          order: 7,
          description: "",
          totalPoints: 4,
          totalQuestions: 69,
          sections: [
          {
            id: "sec-grade-四年级上册-07-01",
            name: "整理复习",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-261", name: "数与运算", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 22 },
            { id: "kp-auto-262", name: "数量关系", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 31 },
            { id: "kp-auto-263", name: "图形的认识与测量", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 25 },
            { id: "kp-auto-264", name: "数据的收集、整理与表达", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-08",
          name: "☆1亿有多大",
          shortName: "☆1亿有多大",
          order: 8,
          description: "",
          totalPoints: 3,
          totalQuestions: 38,
          sections: [
          {
            id: "sec-grade-四年级上册-08-01",
            name: "1亿张纸有多高",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-265", name: "1亿张纸有多高", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-四年级上册-08-02",
            name: "1亿有多大",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-266", name: "1亿有多大", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-四年级上册-08-03",
            name: "小讲堂",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-267", name: "小讲堂", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 17 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级上册-09",
          name: "☆寻找宝藏",
          shortName: "☆寻找宝藏",
          order: 9,
          description: "",
          totalPoints: 4,
          totalQuestions: 43,
          sections: [
          {
            id: "sec-grade-四年级上册-09-01",
            name: "小讲堂",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-268", name: "小讲堂", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-四年级上册-09-02",
            name: "校园寻宝",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-269", name: "校园寻宝", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-四年级上册-09-03",
            name: "绘制藏宝图",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-270", name: "绘制藏宝图", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-四年级上册-09-04",
            name: "藏宝——寻宝大挑战",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-271", name: "藏宝——寻宝大挑战", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 26 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-四年级下册",
      name: "四年级下册",
      shortName: "四下",
      gradeLevel: 4,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-四年级下册-01",
          name: "1四则运算",
          shortName: "1四则运算",
          order: 1,
          description: "",
          totalPoints: 3,
          totalQuestions: 59,
          sections: [
          {
            id: "sec-grade-四年级下册-01-01",
            name: "乘、除法的意义和各部分间的关系",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-272", name: "乘、除法的意义和各部分间的关系", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-四年级下册-01-02",
            name: "加、减法的意义和各部分间的关系",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-273", name: "加、减法的意义和各部分间的关系", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-四年级下册-01-03",
            name: "括号",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-274", name: "括号", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 24 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-02",
          name: "2观察物体（二）",
          shortName: "2观察物体（二）",
          order: 2,
          description: "",
          totalPoints: 1,
          totalQuestions: 46,
          sections: [
          {
            id: "sec-grade-四年级下册-02-01",
            name: "2观察物体（二）",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-275", name: "2观察物体（二）", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 15 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-03",
          name: "3运算律",
          shortName: "3运算律",
          order: 3,
          description: "",
          totalPoints: 2,
          totalQuestions: 29,
          sections: [
          {
            id: "sec-grade-四年级下册-03-01",
            name: "乘法运算律",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-276", name: "乘法运算律", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-四年级下册-03-02",
            name: "加法运算律",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-277", name: "加法运算律", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-04",
          name: "4小数的意义和性质",
          shortName: "4小数的意义和性质",
          order: 4,
          description: "",
          totalPoints: 7,
          totalQuestions: 92,
          sections: [
          {
            id: "sec-grade-四年级下册-04-01",
            name: "1.小数的意义和读写法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-278", name: "小数的意义", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 21 },
            { id: "kp-auto-279", name: "小数的读法和写法", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-四年级下册-04-02",
            name: "2.小数的性质和大小比较",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-280", name: "小数的性质", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 11 },
            { id: "kp-auto-281", name: "小数的大小比较", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-四年级下册-04-03",
            name: "3.小数点移动引起小数大小的变化",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-282", name: "3.小数点移动引起小数大小的变化", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-四年级下册-04-04",
            name: "4.小数与单位换算",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-283", name: "4.小数与单位换算", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-四年级下册-04-05",
            name: "5.小数的近似数",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-284", name: "5.小数的近似数", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-05",
          name: "5三角形",
          shortName: "5三角形",
          order: 5,
          description: "",
          totalPoints: 3,
          totalQuestions: 57,
          sections: [
          {
            id: "sec-grade-四年级下册-05-01",
            name: "三角形的内角和",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-285", name: "三角形的内角和", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-四年级下册-05-02",
            name: "三角形的分类",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-286", name: "三角形的分类", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-四年级下册-05-03",
            name: "三角形的特性",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-287", name: "三角形的特性", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 17 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-06",
          name: "6小数的加法和减法",
          shortName: "6小数的加法和减法",
          order: 6,
          description: "",
          totalPoints: 3,
          totalQuestions: 31,
          sections: [
          {
            id: "sec-grade-四年级下册-06-01",
            name: "小数加减法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-288", name: "小数加减法", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-四年级下册-06-02",
            name: "小数加减混合运算",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-289", name: "小数加减混合运算", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-四年级下册-06-03",
            name: "整数加法运算律推广到小数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-290", name: "整数加法运算律推广到小数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 16 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-07",
          name: "7图形的运动（二）",
          shortName: "7图形的运动（二）",
          order: 7,
          description: "",
          totalPoints: 2,
          totalQuestions: 63,
          sections: [
          {
            id: "sec-grade-四年级下册-07-01",
            name: "平移",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-291", name: "平移", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-四年级下册-07-02",
            name: "轴对称",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-292", name: "轴对称", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-08",
          name: "8平均数与条形统计图",
          shortName: "8平均数与条形统计图",
          order: 8,
          description: "",
          totalPoints: 2,
          totalQuestions: 64,
          sections: [
          {
            id: "sec-grade-四年级下册-08-01",
            name: "复式条形统计图",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-293", name: "复式条形统计图", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-四年级下册-08-02",
            name: "平均数",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-294", name: "平均数", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 28 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-09",
          name: "营养午餐",
          shortName: "营养午餐",
          order: 9,
          description: "",
          totalPoints: 1,
          totalQuestions: 53,
          sections: [
          {
            id: "sec-grade-四年级下册-09-01",
            name: "营养午餐",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-295", name: "营养午餐", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 18 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-10",
          name: "9数学广角——鸡兔同笼",
          shortName: "9数学广角——鸡兔同笼",
          order: 10,
          description: "",
          totalPoints: 1,
          totalQuestions: 37,
          sections: [
          {
            id: "sec-grade-四年级下册-10-01",
            name: "9数学广角——鸡兔同笼",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-296", name: "9数学广角——鸡兔同笼", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 22 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-四年级下册-11",
          name: "10总复习",
          shortName: "10总复习",
          order: 11,
          description: "",
          totalPoints: 1,
          totalQuestions: 16,
          sections: [
          {
            id: "sec-grade-四年级下册-11-01",
            name: "10总复习",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-297", name: "10总复习", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 25 },
            ],
          },
          ],
        },
      ],
    },
  ],
};

export const stage_初中: Stage = {
  id: "初中",
  name: "初中",
  order: 2,
  grades: [
    {
      id: "grade-七年级上册",
      name: "七年级上册",
      shortName: "七上",
      gradeLevel: 7,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-七年级上册-01",
          name: "第一章有理数",
          shortName: "第一章有理数",
          order: 1,
          description: "",
          totalPoints: 6,
          totalQuestions: 83,
          sections: [
          {
            id: "sec-grade-七年级上册-01-01",
            name: "1.1正数和负数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-298", name: "1.1正数和负数", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-七年级上册-01-02",
            name: "1.2有理数及其大小比较",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-299", name: "1.2.1有理数的概念", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 12 },
            { id: "kp-auto-300", name: "1.2.2数轴", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 26 },
            { id: "kp-auto-301", name: "1.2.3相反数", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 24 },
            { id: "kp-auto-302", name: "1.2.4绝对值", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 32 },
            { id: "kp-auto-303", name: "1.2.5有理数的大小比较", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 30 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级上册-02",
          name: "第二章有理数的运算",
          shortName: "第二章有理数的运算",
          order: 2,
          description: "",
          totalPoints: 8,
          totalQuestions: 86,
          sections: [
          {
            id: "sec-grade-七年级上册-02-01",
            name: "2.1有理数的加法与减法",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-304", name: "2.1.1有理数的加法", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 26 },
            { id: "kp-auto-305", name: "2.1.2有理数的减法", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-七年级上册-02-02",
            name: "2.2有理数的乘法与除法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-306", name: "2.2.1有理数的乘法", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 20 },
            { id: "kp-auto-307", name: "2.2.2有理数的除法", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 28 },
            { id: "kp-auto-308", name: "探究与发现从数系扩充看有理数乘法法则", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-七年级上册-02-03",
            name: "2.3有理数的乘方",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-309", name: "2.3.1乘方", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 20 },
            { id: "kp-auto-310", name: "2.3.2科学记数法", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 19 },
            { id: "kp-auto-311", name: "2.3.3近似数", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级上册-03",
          name: "综合与实践进位制的认识与探究",
          shortName: "综合与实践进位制的认识与探究",
          order: 3,
          description: "",
          totalPoints: 1,
          totalQuestions: 23,
          sections: [
          {
            id: "sec-grade-七年级上册-03-01",
            name: "综合与实践进位制的认识与探究",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-312", name: "综合与实践进位制的认识与探究", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 17 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级上册-04",
          name: "第三章代数式",
          shortName: "第三章代数式",
          order: 4,
          description: "",
          totalPoints: 2,
          totalQuestions: 38,
          sections: [
          {
            id: "sec-grade-七年级上册-04-01",
            name: "3.1列代数式表示数量关系",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-313", name: "3.1列代数式表示数量关系", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-七年级上册-04-02",
            name: "3.2代数式的值",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-314", name: "3.2代数式的值", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 23 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级上册-05",
          name: "第四章整式的加减",
          shortName: "第四章整式的加减",
          order: 5,
          description: "",
          totalPoints: 2,
          totalQuestions: 56,
          sections: [
          {
            id: "sec-grade-七年级上册-05-01",
            name: "4.1整式",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-315", name: "4.1整式", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-七年级上册-05-02",
            name: "4.2整式的加法与减法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-316", name: "4.2整式的加法与减法", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 28 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级上册-06",
          name: "第五章一元一次方程",
          shortName: "第五章一元一次方程",
          order: 6,
          description: "",
          totalPoints: 4,
          totalQuestions: 63,
          sections: [
          {
            id: "sec-grade-七年级上册-06-01",
            name: "5.1方程",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-317", name: "5.1.1从算式到方程", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 9 },
            { id: "kp-auto-318", name: "5.1.2等式的性质", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-七年级上册-06-02",
            name: "5.2解一元一次方程",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-319", name: "探究与发现无限循环小数化分数", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-七年级上册-06-03",
            name: "5.3实际问题与一元一次方程",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-320", name: "5.3实际问题与一元一次方程", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级上册-07",
          name: "第六章几何图形初步",
          shortName: "第六章几何图形初步",
          order: 7,
          description: "",
          totalPoints: 7,
          totalQuestions: 72,
          sections: [
          {
            id: "sec-grade-七年级上册-07-01",
            name: "6.1几何图形",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-321", name: "6.1.1立体图形与平面图形", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 20 },
            { id: "kp-auto-322", name: "6.1.2点、线、面、体", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-七年级上册-07-02",
            name: "6.2直线、射线、线段",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-323", name: "6.2.1直线、射线、线段", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 29 },
            { id: "kp-auto-324", name: "6.2.2线段的比较与运算", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-七年级上册-07-03",
            name: "6.3角",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-325", name: "6.3.1角的概念", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 20 },
            { id: "kp-auto-326", name: "6.3.2角的比较与运算", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 30 },
            { id: "kp-auto-327", name: "6.3.3余角和补角", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级上册-08",
          name: "综合与实践设计学校田径运动会比赛场地",
          shortName: "综合与实践设计学校田径运动会比赛场地",
          order: 8,
          description: "",
          totalPoints: 1,
          totalQuestions: 26,
          sections: [
          {
            id: "sec-grade-七年级上册-08-01",
            name: "综合与实践设计学校田径运动会比赛场地",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-328", name: "综合与实践设计学校田径运动会比赛场地", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 25 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-七年级下册",
      name: "七年级下册",
      shortName: "七下",
      gradeLevel: 7,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-七年级下册-01",
          name: "第七章相交线与平行线",
          shortName: "第七章相交线与平行线",
          order: 1,
          description: "",
          totalPoints: 8,
          totalQuestions: 124,
          sections: [
          {
            id: "sec-grade-七年级下册-01-01",
            name: "7.1相交线",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-329", name: "7.1.1两条直线相交", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 11 },
            { id: "kp-auto-330", name: "7.1.2两条直线垂直", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 28 },
            { id: "kp-auto-331", name: "7.1.3两条直线被第三条直线所截", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-七年级下册-01-02",
            name: "7.2平行线",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-332", name: "7.2.1平行线的概念", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 31 },
            { id: "kp-auto-333", name: "7.2.2平行线的判定", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 9 },
            { id: "kp-auto-334", name: "7.2.3平行线的性质", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-七年级下册-01-03",
            name: "7.3定义、命题、定理",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-335", name: "7.3定义、命题、定理", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-七年级下册-01-04",
            name: "7.4平移",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-336", name: "探究与发现利用平移设计图案", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 26 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级下册-02",
          name: "第八章实数",
          shortName: "第八章实数",
          order: 2,
          description: "",
          totalPoints: 3,
          totalQuestions: 58,
          sections: [
          {
            id: "sec-grade-七年级下册-02-01",
            name: "8.1平方根",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-337", name: "8.1平方根", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-七年级下册-02-02",
            name: "8.2立方根",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-338", name: "8.2立方根", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-七年级下册-02-03",
            name: "8.3实数及其简单运算",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-339", name: "8.3实数及其简单运算", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 15 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级下册-03",
          name: "第九章平面直角坐标系",
          shortName: "第九章平面直角坐标系",
          order: 3,
          description: "",
          totalPoints: 5,
          totalQuestions: 56,
          sections: [
          {
            id: "sec-grade-七年级下册-03-01",
            name: "9.1用坐标描述平面内点的位置",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-340", name: "9.1.1平面直角坐标系的概念", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 20 },
            { id: "kp-auto-341", name: "9.1.2用坐标描述简单几何图形", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 21 },
            { id: "kp-auto-342", name: "阅读与思考用经纬度表示地理位置", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-七年级下册-03-02",
            name: "9.2坐标方法的简单应用",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-343", name: "9.2.1用坐标表示地理位置", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 23 },
            { id: "kp-auto-344", name: "9.2.2用坐标表示平移", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级下册-04",
          name: "第十章二元一次方程组",
          shortName: "第十章二元一次方程组",
          order: 4,
          description: "",
          totalPoints: 5,
          totalQuestions: 61,
          sections: [
          {
            id: "sec-grade-七年级下册-04-01",
            name: "10.1二元一次方程组的概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-345", name: "10.1二元一次方程组的概念", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-七年级下册-04-02",
            name: "10.2消元——解二元一次方程组",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-346", name: "10.2.1代入消元法", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 27 },
            { id: "kp-auto-347", name: "10.2.2加减消元法", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-七年级下册-04-03",
            name: "10.3实际问题与二元一次方程组",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-348", name: "10.3实际问题与二元一次方程组", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-七年级下册-04-04",
            name: "10.4三元一次方程组的解法",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-349", name: "10.4三元一次方程组的解法", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 18 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级下册-05",
          name: "第十一章不等式与不等式组",
          shortName: "第十一章不等式与不等式组",
          order: 5,
          description: "",
          totalPoints: 5,
          totalQuestions: 96,
          sections: [
          {
            id: "sec-grade-七年级下册-05-01",
            name: "11.1不等式",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-350", name: "11.1.1不等式及其解集", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 16 },
            { id: "kp-auto-351", name: "11.1.2不等式的性质", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 8 },
            { id: "kp-auto-352", name: "阅读与思考用求差法比较大小", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-七年级下册-05-02",
            name: "11.2一元一次不等式",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-353", name: "11.2一元一次不等式", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-七年级下册-05-03",
            name: "11.3一元一次不等式组",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-354", name: "11.3一元一次不等式组", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级下册-06",
          name: "综合与实践低碳生活",
          shortName: "综合与实践低碳生活",
          order: 6,
          description: "",
          totalPoints: 1,
          totalQuestions: 15,
          sections: [
          {
            id: "sec-grade-七年级下册-06-01",
            name: "综合与实践低碳生活",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-355", name: "综合与实践低碳生活", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 23 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级下册-07",
          name: "第十二章数据的收集、整理与描述",
          shortName: "第十二章数据的收集、整理与描述",
          order: 7,
          description: "",
          totalPoints: 6,
          totalQuestions: 94,
          sections: [
          {
            id: "sec-grade-七年级下册-07-01",
            name: "12.1统计调查",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-356", name: "12.1.1全面调查", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 29 },
            { id: "kp-auto-357", name: "12.1.2抽样调查", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 23 },
            { id: "kp-auto-358", name: "探究与发现瓶子中有多少粒豆子", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-七年级下册-07-02",
            name: "12.2用统计图描述数据",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-359", name: "12.2.1扇形图、条形图和折线图", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 27 },
            { id: "kp-auto-360", name: "12.2.2直方图", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 26 },
            { id: "kp-auto-361", name: "12.2.3趋势图", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 29 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-七年级下册-08",
          name: "综合与实践日昼时长规律的探究",
          shortName: "综合与实践日昼时长规律的探究",
          order: 8,
          description: "",
          totalPoints: 1,
          totalQuestions: 42,
          sections: [
          {
            id: "sec-grade-七年级下册-08-01",
            name: "综合与实践日昼时长规律的探究",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-362", name: "综合与实践日昼时长规律的探究", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 21 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-九年级上册",
      name: "九年级上册",
      shortName: "九上",
      gradeLevel: 9,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-九年级上册-01",
          name: "第二十五章一元二次方程",
          shortName: "第二十五章一元二次方程",
          order: 1,
          description: "",
          totalPoints: 6,
          totalQuestions: 85,
          sections: [
          {
            id: "sec-grade-九年级上册-01-01",
            name: "25.1一元二次方程的概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-363", name: "25.1一元二次方程的概念", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-九年级上册-01-02",
            name: "25.2降次——解一元二次方程",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-364", name: "25.2.1配方法", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 25 },
            { id: "kp-auto-365", name: "25.2.2公式法", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 16 },
            { id: "kp-auto-366", name: "25.2.3因式分解法", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 28 },
            { id: "kp-auto-367", name: "25.2.4一元二次方程的根与系数的关系", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-九年级上册-01-03",
            name: "25.3实际问题与一元二次方程",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-368", name: "25.3实际问题与一元二次方程", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-02",
          name: "第二十六章二次函数",
          shortName: "第二十六章二次函数",
          order: 2,
          description: "",
          totalPoints: 6,
          totalQuestions: 76,
          sections: [
          {
            id: "sec-grade-九年级上册-02-01",
            name: "26.1二次函数的概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-369", name: "26.1二次函数的概念", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-九年级上册-02-02",
            name: "26.2二次函数的图象和性质",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-370", name: "26.2.1二次函数y=ax²的图象和性质", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 28 },
            { id: "kp-auto-371", name: "26.2.2二次函数y=a(x-h)²+k的图象和性质", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 17 },
            { id: "kp-auto-372", name: "26.2.3二次函数y=ax²+bx+c的图象和性质", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-九年级上册-02-03",
            name: "26.3二次函数与一元二次方程",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-373", name: "26.3二次函数与一元二次方程", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-九年级上册-02-04",
            name: "26.4实际问题与二次函数",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-374", name: "26.4实际问题与二次函数", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-03",
          name: "第二十七章反比例函数",
          shortName: "第二十七章反比例函数",
          order: 3,
          description: "",
          totalPoints: 3,
          totalQuestions: 49,
          sections: [
          {
            id: "sec-grade-九年级上册-03-01",
            name: "27.1反比例函数的概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-375", name: "27.1反比例函数的概念", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-九年级上册-03-02",
            name: "27.2反比例函数的图象和性质",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-376", name: "27.2反比例函数的图象和性质", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-九年级上册-03-03",
            name: "27.3实际问题与反比例函数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-377", name: "27.3实际问题与反比例函数", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 28 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-04",
          name: "综合与实践高铁列车运行中的数量关系",
          shortName: "综合与实践高铁列车运行中的数量关系",
          order: 4,
          description: "",
          totalPoints: 1,
          totalQuestions: 20,
          sections: [
          {
            id: "sec-grade-九年级上册-04-01",
            name: "综合与实践高铁列车运行中的数量关系",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-378", name: "综合与实践高铁列车运行中的数量关系", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-05",
          name: "第二十八章旋转",
          shortName: "第二十八章旋转",
          order: 5,
          description: "",
          totalPoints: 4,
          totalQuestions: 50,
          sections: [
          {
            id: "sec-grade-九年级上册-05-01",
            name: "28.1图形的旋转",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-379", name: "28.1图形的旋转", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-九年级上册-05-02",
            name: "28.2中心对称",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-380", name: "28.2.1中心对称及其性质", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 28 },
            { id: "kp-auto-381", name: "28.2.2中心对称图形", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 22 },
            { id: "kp-auto-382", name: "28.2.3关于原点对称的点的坐标", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 18 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-06",
          name: "第二十九章圆",
          shortName: "第二十九章圆",
          order: 6,
          description: "",
          totalPoints: 6,
          totalQuestions: 81,
          sections: [
          {
            id: "sec-grade-九年级上册-06-01",
            name: "29.1圆的有关概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-383", name: "29.1.1圆的有关概念", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 32 },
            { id: "kp-auto-384", name: "29.1.2过三点的圆", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-九年级上册-06-02",
            name: "29.2圆的有关性质",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-385", name: "29.2.1垂直于弦的直径", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 16 },
            { id: "kp-auto-386", name: "29.2.2圆心角", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 12 },
            { id: "kp-auto-387", name: "29.2.3圆周角", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-九年级上册-06-03",
            name: "29.3弧长和扇形面积",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-388", name: "29.3弧长和扇形面积", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 24 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-07",
          name: "第三十章直线与圆的位置关系",
          shortName: "第三十章直线与圆的位置关系",
          order: 7,
          description: "",
          totalPoints: 4,
          totalQuestions: 81,
          sections: [
          {
            id: "sec-grade-九年级上册-07-01",
            name: "30.1直线与圆",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-389", name: "30.1.1直线与圆相离、相切、相交", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 28 },
            { id: "kp-auto-390", name: "30.1.2圆的切线", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-九年级上册-07-02",
            name: "30.2三角形的内切圆",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-391", name: "30.2三角形的内切圆", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-九年级上册-07-03",
            name: "30.3正多边形与圆",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-392", name: "30.3正多边形与圆", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 25 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-08",
          name: "综合与实践生活中的优化问题",
          shortName: "综合与实践生活中的优化问题",
          order: 8,
          description: "",
          totalPoints: 1,
          totalQuestions: 23,
          sections: [
          {
            id: "sec-grade-九年级上册-08-01",
            name: "综合与实践生活中的优化问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-393", name: "综合与实践生活中的优化问题", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 11 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级上册-09",
          name: "第二十五章概率初步",
          shortName: "第二十五章概率初步",
          order: 9,
          description: "",
          totalPoints: 6,
          totalQuestions: 79,
          sections: [
          {
            id: "sec-grade-九年级上册-09-01",
            name: "25.1随机事件与概率",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-394", name: "25.1.1随机事件", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 17 },
            { id: "kp-auto-395", name: "25.1.2概率", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-九年级上册-09-02",
            name: "25.2用列举法求概率",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-396", name: "25.2用列举法求概率", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 23 },
            { id: "kp-auto-397", name: "列表法求概率", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 21 },
            { id: "kp-auto-398", name: "树状图法求概率", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-九年级上册-09-03",
            name: "25.3用频率估计概率",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-399", name: "25.3用频率估计概率", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 12 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-九年级下册",
      name: "九年级下册",
      shortName: "九下",
      gradeLevel: 9,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-九年级下册-01",
          name: "第二十六章反比例函数",
          shortName: "第二十六章反比例函数",
          order: 1,
          description: "",
          totalPoints: 4,
          totalQuestions: 46,
          sections: [
          {
            id: "sec-grade-九年级下册-01-01",
            name: "26.1反比例函数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-400", name: "26.1.1反比例函数", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 30 },
            { id: "kp-auto-401", name: "26.1.2反比例函数的图象和性质", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-九年级下册-01-02",
            name: "26.2实际问题与反比例函数",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-402", name: "26.2实际问题与反比例函数", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-九年级下册-01-03",
            name: "本章复习与测试",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-403", name: "本章复习与测试", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级下册-02",
          name: "第二十七章相似",
          shortName: "第二十七章相似",
          order: 2,
          description: "",
          totalPoints: 6,
          totalQuestions: 68,
          sections: [
          {
            id: "sec-grade-九年级下册-02-01",
            name: "27.1图形的相似",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-404", name: "27.1图形的相似", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-九年级下册-02-02",
            name: "27.2相似三角形",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-405", name: "27.2.1相似三角形的判定", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 11 },
            { id: "kp-auto-406", name: "27.2.2相似三角形的性质", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 16 },
            { id: "kp-auto-407", name: "27.2.3相似三角形应用举例", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-九年级下册-02-03",
            name: "27.3位似",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-408", name: "27.3位似", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-九年级下册-02-04",
            name: "本章复习与测试",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-409", name: "本章复习与测试", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 15 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级下册-03",
          name: "第二十八章锐角三角函数",
          shortName: "第二十八章锐角三角函数",
          order: 3,
          description: "",
          totalPoints: 4,
          totalQuestions: 49,
          sections: [
          {
            id: "sec-grade-九年级下册-03-01",
            name: "28.1锐角三角函数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-410", name: "28.1锐角三角函数", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-九年级下册-03-02",
            name: "28.2解直角三角形及其应用",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-411", name: "28.2.1解直角三角形", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 27 },
            { id: "kp-auto-412", name: "28.2.2应用举例", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-九年级下册-03-03",
            name: "本章复习与测试",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-413", name: "本章复习与测试", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级下册-04",
          name: "第二十九章投影与视图",
          shortName: "第二十九章投影与视图",
          order: 4,
          description: "",
          totalPoints: 4,
          totalQuestions: 89,
          sections: [
          {
            id: "sec-grade-九年级下册-04-01",
            name: "29.1投影",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-414", name: "29.1投影", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-九年级下册-04-02",
            name: "29.2三视图",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-415", name: "29.2三视图", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-九年级下册-04-03",
            name: "29.3课题学习制作立体模型",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-416", name: "29.3课题学习制作立体模型", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-九年级下册-04-04",
            name: "本章复习与测试",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-417", name: "本章复习与测试", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 16 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-九年级下册-05",
          name: "综合复习与测试",
          shortName: "综合复习与测试",
          order: 5,
          description: "",
          totalPoints: 1,
          totalQuestions: 20,
          sections: [
          {
            id: "sec-grade-九年级下册-05-01",
            name: "综合复习与测试",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-418", name: "综合复习与测试", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 32 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-八年级上册",
      name: "八年级上册",
      shortName: "八上",
      gradeLevel: 8,
      semester: "上",
      chapters: [
        {
          id: "ch-grade-八年级上册-01",
          name: "第十三章三角形",
          shortName: "第十三章三角形",
          order: 1,
          description: "",
          totalPoints: 5,
          totalQuestions: 94,
          sections: [
          {
            id: "sec-grade-八年级上册-01-01",
            name: "13.1三角形的概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-419", name: "13.1三角形的概念", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-八年级上册-01-02",
            name: "13.2与三角形有关的线段",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-420", name: "13.2.1三角形的边", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 25 },
            { id: "kp-auto-421", name: "13.2.2三角形的中线、角平分线、高", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-八年级上册-01-03",
            name: "13.3三角形的内角与外角",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-422", name: "13.3.1三角形的内角", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 9 },
            { id: "kp-auto-423", name: "13.3.2三角形的外角", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级上册-02",
          name: "综合与实践确定匀质薄板的重心位置",
          shortName: "综合与实践确定匀质薄板的重心位置",
          order: 2,
          description: "",
          totalPoints: 1,
          totalQuestions: 43,
          sections: [
          {
            id: "sec-grade-八年级上册-02-01",
            name: "综合与实践确定匀质薄板的重心位置",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-424", name: "综合与实践确定匀质薄板的重心位置", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 9 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级上册-03",
          name: "第十四章全等三角形",
          shortName: "第十四章全等三角形",
          order: 3,
          description: "",
          totalPoints: 3,
          totalQuestions: 76,
          sections: [
          {
            id: "sec-grade-八年级上册-03-01",
            name: "14.1全等三角形及其性质",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-425", name: "14.1全等三角形及其性质", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-八年级上册-03-02",
            name: "14.2三角形全等的判定",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-426", name: "14.2三角形全等的判定", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-八年级上册-03-03",
            name: "14.3角的平分线",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-427", name: "14.3角的平分线", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 17 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级上册-04",
          name: "第十五章轴对称",
          shortName: "第十五章轴对称",
          order: 4,
          description: "",
          totalPoints: 6,
          totalQuestions: 91,
          sections: [
          {
            id: "sec-grade-八年级上册-04-01",
            name: "15.1图形的轴对称",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-428", name: "15.1.1轴对称及其性质", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 19 },
            { id: "kp-auto-429", name: "15.1.2线段的垂直平分线", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-八年级上册-04-02",
            name: "15.2画轴对称的图形",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-430", name: "15.2画轴对称的图形", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-八年级上册-04-03",
            name: "15.3等腰三角形",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-431", name: "15.3.1等腰三角形", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 29 },
            { id: "kp-auto-432", name: "15.3.2等边三角形", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 17 },
            { id: "kp-auto-433", name: "探究与发现三角形中边与角之间的不等关系", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级上册-05",
          name: "综合与实践最短路径问题",
          shortName: "综合与实践最短路径问题",
          order: 5,
          description: "",
          totalPoints: 1,
          totalQuestions: 40,
          sections: [
          {
            id: "sec-grade-八年级上册-05-01",
            name: "综合与实践最短路径问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-434", name: "综合与实践最短路径问题", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 21 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级上册-06",
          name: "第十六章整式的乘法",
          shortName: "第十六章整式的乘法",
          order: 6,
          description: "",
          totalPoints: 6,
          totalQuestions: 65,
          sections: [
          {
            id: "sec-grade-八年级上册-06-01",
            name: "16.1幂的运算",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-435", name: "16.1.1同底数幂的乘法", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 12 },
            { id: "kp-auto-436", name: "16.1.2幂的乘方与积的乘方", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-八年级上册-06-02",
            name: "16.2整式的乘法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-437", name: "16.2整式的乘法", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-八年级上册-06-03",
            name: "16.3乘法公式",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-438", name: "16.3.1平方差公式", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 23 },
            { id: "kp-auto-439", name: "16.3.2完全平方公式", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 20 },
            { id: "kp-auto-440", name: "阅读与思考杨辉三角", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级上册-07",
          name: "第十七章因式分解",
          shortName: "第十七章因式分解",
          order: 7,
          description: "",
          totalPoints: 2,
          totalQuestions: 24,
          sections: [
          {
            id: "sec-grade-八年级上册-07-01",
            name: "17.1用提公因式法分解因式",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-441", name: "17.1用提公因式法分解因式", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-八年级上册-07-02",
            name: "17.2用公式法分解因式",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-442", name: "阅读与思考x²+(p+q)+pq型式子的因式分解", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级上册-08",
          name: "第十八章分式",
          shortName: "第十八章分式",
          order: 8,
          description: "",
          totalPoints: 6,
          totalQuestions: 108,
          sections: [
          {
            id: "sec-grade-八年级上册-08-01",
            name: "18.1分式及其基本性质",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-443", name: "18.1.1从分数到分式", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 13 },
            { id: "kp-auto-444", name: "18.1.2分式的基本性质", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-八年级上册-08-02",
            name: "18.2分式的乘法与除法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-445", name: "18.2分式的乘法与除法", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-八年级上册-08-03",
            name: "18.3分式的加法与减法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-446", name: "18.3分式的加法与减法", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-八年级上册-08-04",
            name: "18.4整数指数幂",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-447", name: "18.4整数指数幂", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-八年级上册-08-05",
            name: "18.5分式方程",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-448", name: "18.5分式方程", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 12 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-八年级下册",
      name: "八年级下册",
      shortName: "八下",
      gradeLevel: 8,
      semester: "下",
      chapters: [
        {
          id: "ch-grade-八年级下册-01",
          name: "第十九章二次根式",
          shortName: "第十九章二次根式",
          order: 1,
          description: "",
          totalPoints: 4,
          totalQuestions: 47,
          sections: [
          {
            id: "sec-grade-八年级下册-01-01",
            name: "19.1二次根式及其性质",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-449", name: "19.1二次根式及其性质", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-八年级下册-01-02",
            name: "19.2二次根式的乘法与除法",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-450", name: "19.2二次根式的乘法与除法", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-八年级下册-01-03",
            name: "19.3二次根式的加法与减法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-451", name: "19.3二次根式的加法与减法", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-八年级下册-01-04",
            name: "阅读与思考海伦-秦九韶公式",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-452", name: "阅读与思考海伦-秦九韶公式", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级下册-02",
          name: "第二十章勾股定理",
          shortName: "第二十章勾股定理",
          order: 2,
          description: "",
          totalPoints: 3,
          totalQuestions: 59,
          sections: [
          {
            id: "sec-grade-八年级下册-02-01",
            name: "20.1勾股定理及其应用",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-453", name: "20.1勾股定理及其应用", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-八年级下册-02-02",
            name: "20.2勾股定理的逆定理及其应用",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-454", name: "20.2勾股定理的逆定理及其应用", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-八年级下册-02-03",
            name: "阅读与思考勾股定理的证明",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-455", name: "阅读与思考勾股定理的证明", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 18 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级下册-03",
          name: "第二十一章四边形",
          shortName: "第二十一章四边形",
          order: 3,
          description: "",
          totalPoints: 10,
          totalQuestions: 136,
          sections: [
          {
            id: "sec-grade-八年级下册-03-01",
            name: "21.1四边形及多边形",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-456", name: "21.1.1四边形及其内角和", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 20 },
            { id: "kp-auto-457", name: "21.1.2多边形及其内角和", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-八年级下册-03-02",
            name: "21.2平行四边形",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-458", name: "21.2.1平行四边形及其性质", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 18 },
            { id: "kp-auto-459", name: "21.2.2平行四边形的判定", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 29 },
            { id: "kp-auto-460", name: "21.2.3三角形的中位线", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-八年级下册-03-03",
            name: "21.3特殊的平行四边形",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-461", name: "21.3.1矩形", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 15 },
            { id: "kp-auto-462", name: "21.3.2菱形", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 10 },
            { id: "kp-auto-463", name: "21.3.3正方形", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-八年级下册-03-04",
            name: "探究与发现利用菱形的性质和判定尺规作图",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-464", name: "探究与发现利用菱形的性质和判定尺规作图", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-八年级下册-03-05",
            name: "探究与发现用多边形镶嵌平面",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-465", name: "探究与发现用多边形镶嵌平面", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 14 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级下册-04",
          name: "第二十二章函数",
          shortName: "第二十二章函数",
          order: 4,
          description: "",
          totalPoints: 2,
          totalQuestions: 39,
          sections: [
          {
            id: "sec-grade-八年级下册-04-01",
            name: "22.1函数的概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-466", name: "22.1函数的概念", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-八年级下册-04-02",
            name: "22.2函数的表示",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-467", name: "22.2函数的表示", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级下册-05",
          name: "第二十三章一次函数",
          shortName: "第二十三章一次函数",
          order: 5,
          description: "",
          totalPoints: 4,
          totalQuestions: 58,
          sections: [
          {
            id: "sec-grade-八年级下册-05-01",
            name: "23.1一次函数的概念",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-468", name: "23.1一次函数的概念", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-八年级下册-05-02",
            name: "23.2一次函数的图象和性质",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-469", name: "23.2一次函数的图象和性质", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-八年级下册-05-03",
            name: "23.3一次函数与方程（组）、不等式",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-470", name: "23.3一次函数与方程（组）、不等式", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-八年级下册-05-04",
            name: "23.4实际问题与一次函数",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-471", name: "23.4实际问题与一次函数", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 17 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级下册-06",
          name: "综合与实践音乐与数学",
          shortName: "综合与实践音乐与数学",
          order: 6,
          description: "",
          totalPoints: 1,
          totalQuestions: 45,
          sections: [
          {
            id: "sec-grade-八年级下册-06-01",
            name: "综合与实践音乐与数学",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-472", name: "综合与实践音乐与数学", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 25 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级下册-07",
          name: "第二十四章数据的分析",
          shortName: "第二十四章数据的分析",
          order: 7,
          description: "",
          totalPoints: 5,
          totalQuestions: 50,
          sections: [
          {
            id: "sec-grade-八年级下册-07-01",
            name: "24.1数据的集中趋势",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-473", name: "24.1.1平均数", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 8 },
            { id: "kp-auto-474", name: "24.1.2中位数和众数", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-八年级下册-07-02",
            name: "24.2数据的离散程度",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-475", name: "24.2数据的离散程度", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-八年级下册-07-03",
            name: "24.3数据的四分位数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-476", name: "24.3数据的四分位数", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-八年级下册-07-04",
            name: "24.4数据的分组",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-477", name: "24.4数据的分组", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-八年级下册-08",
          name: "综合与实践学生体质健康调查与分析",
          shortName: "综合与实践学生体质健康调查与分析",
          order: 8,
          description: "",
          totalPoints: 1,
          totalQuestions: 36,
          sections: [
          {
            id: "sec-grade-八年级下册-08-01",
            name: "综合与实践学生体质健康调查与分析",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-478", name: "综合与实践学生体质健康调查与分析", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 21 },
            ],
          },
          ],
        },
      ],
    },
  ],
};

export const stage_中考: Stage = {
  id: "中考",
  name: "中考",
  order: 3,
  grades: [
    {
      id: "grade-中考",
      name: "中考",
      shortName: "中考",
      gradeLevel: 9,
      semester: "全",
      chapters: [
        {
          id: "ch-grade-中考-01",
          name: "数与式",
          shortName: "数与式",
          order: 1,
          description: "",
          totalPoints: 14,
          totalQuestions: 169,
          sections: [
          {
            id: "sec-grade-中考-01-01",
            name: "二次根式",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-479", name: "二次根式", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 21 },
            { id: "kp-auto-480", name: "二次根式的运算", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 32 },
            { id: "kp-auto-481", name: "二次根式的估值", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-中考-01-02",
            name: "分式",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-482", name: "分式", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 24 },
            { id: "kp-auto-483", name: "分式的化简与求值", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 19 },
            { id: "kp-auto-484", name: "分式方程及其应用", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-中考-01-03",
            name: "实数",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-485", name: "实数", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 13 },
            { id: "kp-auto-486", name: "实数的分类与相关概念", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 22 },
            { id: "kp-auto-487", name: "科学记数法与近似数", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 20 },
            { id: "kp-auto-488", name: "实数的大小比较", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-中考-01-04",
            name: "数与式微专题",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-489", name: "数与式微专题", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-中考-01-05",
            name: "整式",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-490", name: "整式", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 13 },
            { id: "kp-auto-491", name: "整式的运算", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 14 },
            { id: "kp-auto-492", name: "因式分解", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-02",
          name: "方程（组）与不等式（组）",
          shortName: "方程（组）与不等式（组）",
          order: 2,
          description: "",
          totalPoints: 8,
          totalQuestions: 113,
          sections: [
          {
            id: "sec-grade-中考-02-01",
            name: "一元二次方程",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-493", name: "一元二次方程", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 12 },
            { id: "kp-auto-494", name: "根的判别式", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 14 },
            { id: "kp-auto-495", name: "根与系数的关系", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-中考-02-02",
            name: "一次方程（组）",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-496", name: "一次方程（组）", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-中考-02-03",
            name: "不等式与不等式组",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-497", name: "不等式与不等式组", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 21 },
            { id: "kp-auto-498", name: "不等式（组）的应用", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-中考-02-04",
            name: "分式方程",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-499", name: "分式方程", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-中考-02-05",
            name: "方程（组）与不等式（组）微专题",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-500", name: "方程（组）与不等式（组）微专题", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 21 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-03",
          name: "函数",
          shortName: "函数",
          order: 3,
          description: "",
          totalPoints: 9,
          totalQuestions: 134,
          sections: [
          {
            id: "sec-grade-中考-03-01",
            name: "一次函数的图象与性质",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-501", name: "一次函数的图象与性质", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-中考-03-02",
            name: "一次函数的应用与综合",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-502", name: "一次函数的应用与综合", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-中考-03-03",
            name: "二次函数图象与性质",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-503", name: "二次函数图象与性质", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 22 },
            { id: "kp-auto-504", name: "二次函数的图象与系数关系", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 11 },
            { id: "kp-auto-505", name: "二次函数与方程、不等式", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 23 },
            ],
          },
          {
            id: "sec-grade-中考-03-04",
            name: "二次函数应用与综合",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-506", name: "二次函数应用与综合", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-中考-03-05",
            name: "函数与平面直角坐标系",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-507", name: "函数与平面直角坐标系", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-中考-03-06",
            name: "函数微专题",
            order: 6,
            knowledgePoints: [
            { id: "kp-auto-508", name: "函数微专题", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-中考-03-07",
            name: "反比例函数",
            order: 7,
            knowledgePoints: [
            { id: "kp-auto-509", name: "反比例函数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 9 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-04",
          name: "图形的性质",
          shortName: "图形的性质",
          order: 4,
          description: "",
          totalPoints: 20,
          totalQuestions: 229,
          sections: [
          {
            id: "sec-grade-中考-04-01",
            name: "三角形的概念和性质",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-510", name: "三角形的概念和性质", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-中考-04-02",
            name: "与圆有关的位置关系",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-511", name: "与圆有关的位置关系", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 17 },
            { id: "kp-auto-512", name: "切线的性质与判定", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 20 },
            ],
          },
          {
            id: "sec-grade-中考-04-03",
            name: "与圆有关的计算",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-513", name: "与圆有关的计算", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 14 },
            { id: "kp-auto-514", name: "弧长与扇形面积", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 13 },
            { id: "kp-auto-515", name: "圆锥的侧面积与全面积", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-中考-04-04",
            name: "全等三角形",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-516", name: "全等三角形", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-中考-04-05",
            name: "几何图形初步",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-517", name: "几何图形初步", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-中考-04-06",
            name: "四边形综合",
            order: 6,
            knowledgePoints: [
            { id: "kp-auto-518", name: "四边形综合", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-中考-04-07",
            name: "图形的性质微专题",
            order: 7,
            knowledgePoints: [
            { id: "kp-auto-519", name: "图形的性质微专题", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-中考-04-08",
            name: "圆的基本性质",
            order: 8,
            knowledgePoints: [
            { id: "kp-auto-520", name: "圆的基本性质", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 24 },
            { id: "kp-auto-521", name: "垂径定理及其推论", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 20 },
            { id: "kp-auto-522", name: "弧、弦、圆心角", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-中考-04-09",
            name: "多边形与平行四边形",
            order: 9,
            knowledgePoints: [
            { id: "kp-auto-523", name: "多边形与平行四边形", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-中考-04-10",
            name: "正方形",
            order: 10,
            knowledgePoints: [
            { id: "kp-auto-524", name: "正方形", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-中考-04-11",
            name: "直角三角形",
            order: 11,
            knowledgePoints: [
            { id: "kp-auto-525", name: "直角三角形", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-中考-04-12",
            name: "相似三角形（含位似）",
            order: 12,
            knowledgePoints: [
            { id: "kp-auto-526", name: "相似三角形（含位似）", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-中考-04-13",
            name: "矩形",
            order: 13,
            knowledgePoints: [
            { id: "kp-auto-527", name: "矩形", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-中考-04-14",
            name: "等腰三角形",
            order: 14,
            knowledgePoints: [
            { id: "kp-auto-528", name: "等腰三角形", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-中考-04-15",
            name: "菱形",
            order: 15,
            knowledgePoints: [
            { id: "kp-auto-529", name: "菱形", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 9 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-05",
          name: "图形的变化",
          shortName: "图形的变化",
          order: 5,
          description: "",
          totalPoints: 5,
          totalQuestions: 85,
          sections: [
          {
            id: "sec-grade-中考-05-01",
            name: "图形的变化微专题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-530", name: "图形的变化微专题", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-中考-05-02",
            name: "尺规作图",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-531", name: "尺规作图", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-中考-05-03",
            name: "投影与视图",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-532", name: "投影与视图", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-中考-05-04",
            name: "轴对称、平移、旋转",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-533", name: "轴对称、平移、旋转", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-中考-05-05",
            name: "锐角三角函数",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-534", name: "锐角三角函数", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 22 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-06",
          name: "统计与概率",
          shortName: "统计与概率",
          order: 6,
          description: "",
          totalPoints: 2,
          totalQuestions: 52,
          sections: [
          {
            id: "sec-grade-中考-06-01",
            name: "概率",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-535", name: "概率", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-中考-06-02",
            name: "统计",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-536", name: "统计", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 10 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-07",
          name: "数与代数基础",
          shortName: "数与代数基础",
          order: 7,
          description: "",
          totalPoints: 3,
          totalQuestions: 39,
          sections: [
          {
            id: "sec-grade-中考-07-01",
            name: "函数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-537", name: "函数", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-中考-07-02",
            name: "应用",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-538", name: "应用", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-中考-07-03",
            name: "计算",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-539", name: "计算", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 25 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-08",
          name: "图形与几何基础",
          shortName: "图形与几何基础",
          order: 8,
          description: "",
          totalPoints: 5,
          totalQuestions: 74,
          sections: [
          {
            id: "sec-grade-中考-08-01",
            name: "三角形",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-540", name: "三角形", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-中考-08-02",
            name: "四边形",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-541", name: "四边形", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 29 },
            ],
          },
          {
            id: "sec-grade-中考-08-03",
            name: "图形的变化",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-542", name: "图形的变化", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-中考-08-04",
            name: "圆",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-543", name: "圆", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-中考-08-05",
            name: "锐角三角函数",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-544", name: "锐角三角函数", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 8 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-09",
          name: "统计概率基础",
          shortName: "统计概率基础",
          order: 9,
          description: "",
          totalPoints: 2,
          totalQuestions: 42,
          sections: [
          {
            id: "sec-grade-中考-09-01",
            name: "概率",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-545", name: "概率", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-中考-09-02",
            name: "统计",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-546", name: "统计", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 27 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-10",
          name: "几何压轴",
          shortName: "几何压轴",
          order: 10,
          description: "",
          totalPoints: 3,
          totalQuestions: 31,
          sections: [
          {
            id: "sec-grade-中考-10-01",
            name: "三角形压轴",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-547", name: "三角形压轴", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-中考-10-02",
            name: "四边形压轴",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-548", name: "四边形压轴", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-中考-10-03",
            name: "圆压轴",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-549", name: "圆压轴", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 15 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-11",
          name: "函数压轴",
          shortName: "函数压轴",
          order: 11,
          description: "",
          totalPoints: 2,
          totalQuestions: 32,
          sections: [
          {
            id: "sec-grade-中考-11-01",
            name: "二次函数与几何压轴",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-550", name: "二次函数与几何压轴", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-中考-11-02",
            name: "二次函数性质压轴",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-551", name: "二次函数性质压轴", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 24 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-中考-12",
          name: "中考常见题型",
          shortName: "中考常见题型",
          order: 12,
          description: "",
          totalPoints: 9,
          totalQuestions: 117,
          sections: [
          {
            id: "sec-grade-中考-12-01",
            name: "分类讨论",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-552", name: "分类讨论思想", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-中考-12-02",
            name: "动点与存在性问题",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-553", name: "动点问题", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 19 },
            { id: "kp-auto-554", name: "存在性问题", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-中考-12-03",
            name: "新定义与阅读理解",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-555", name: "新定义问题", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 14 },
            { id: "kp-auto-556", name: "阅读理解型问题", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 14 },
            ],
          },
          {
            id: "sec-grade-中考-12-04",
            name: "最值与优化",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-557", name: "几何最值", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 12 },
            { id: "kp-auto-558", name: "代数最值", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 8 },
            ],
          },
          {
            id: "sec-grade-中考-12-05",
            name: "规律探索",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-559", name: "数字规律", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 13 },
            { id: "kp-auto-560", name: "图形规律", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 8 },
            ],
          },
          ],
        },
      ],
    },
  ],
};

export const stage_竞赛: Stage = {
  id: "竞赛",
  name: "竞赛",
  order: 4,
  grades: [
    {
      id: "grade-初中竞赛",
      name: "初中竞赛",
      shortName: "初中竞赛",
      gradeLevel: 9,
      semester: "全",
      chapters: [
        {
          id: "ch-grade-初中竞赛-01",
          name: "平面几何",
          shortName: "平面几何",
          order: 1,
          description: "",
          totalPoints: 3,
          totalQuestions: 77,
          sections: [
          {
            id: "sec-grade-初中竞赛-01-01",
            name: "七大模型",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-561", name: "燕尾模型", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 14 },
            { id: "kp-auto-562", name: "相似模型", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 21 },
            { id: "kp-auto-563", name: "风筝模型", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 27 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-初中竞赛-02",
          name: "数论进阶",
          shortName: "数论进阶",
          order: 2,
          description: "",
          totalPoints: 4,
          totalQuestions: 86,
          sections: [
          {
            id: "sec-grade-初中竞赛-02-01",
            name: "不定方程",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-564", name: "不定方程", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 12 },
            { id: "kp-auto-565", name: "勾股数", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 11 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-02-02",
            name: "整除与同余",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-566", name: "一元二次方程整数根", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 20 },
            { id: "kp-auto-567", name: "同余与费马小定理", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 13 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-初中竞赛-03",
          name: "不等式",
          shortName: "不等式",
          order: 3,
          description: "",
          totalPoints: 3,
          totalQuestions: 67,
          sections: [
          {
            id: "sec-grade-初中竞赛-03-01",
            name: "均值与柯西",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-568", name: "均值不等式", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 21 },
            { id: "kp-auto-569", name: "柯西不等式", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-03-02",
            name: "证明技巧",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-570", name: "不等式证明技巧", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 27 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-初中竞赛-04",
          name: "几何进阶",
          shortName: "几何进阶",
          order: 4,
          description: "",
          totalPoints: 4,
          totalQuestions: 88,
          sections: [
          {
            id: "sec-grade-初中竞赛-04-01",
            name: "几何变换",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-571", name: "平移旋转对称综合", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-04-02",
            name: "四点共圆",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-572", name: "四点共圆", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 22 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-04-03",
            name: "圆幂定理",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-573", name: "圆幂定理", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 32 },
            { id: "kp-auto-574", name: "托勒密定理", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 31 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-初中竞赛-05",
          name: "函数与最值",
          shortName: "函数与最值",
          order: 5,
          description: "",
          totalPoints: 4,
          totalQuestions: 84,
          sections: [
          {
            id: "sec-grade-初中竞赛-05-01",
            name: "函数",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-575", name: "含参二次函数", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 12 },
            { id: "kp-auto-576", name: "绝对值函数", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 15 },
            { id: "kp-auto-577", name: "高斯函数[x]", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 17 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-05-02",
            name: "函数最值",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-578", name: "函数最值", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-初中竞赛-06",
          name: "组合计数进阶",
          shortName: "组合计数进阶",
          order: 6,
          description: "",
          totalPoints: 3,
          totalQuestions: 57,
          sections: [
          {
            id: "sec-grade-初中竞赛-06-01",
            name: "图论",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-579", name: "图论初步", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 24 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-06-02",
            name: "递推与归纳",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-580", name: "递推与归纳法", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 15 },
            { id: "kp-auto-581", name: "二项式定理", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 32 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-初中竞赛-07",
          name: "思想与方法",
          shortName: "思想与方法",
          order: 7,
          description: "",
          totalPoints: 3,
          totalQuestions: 70,
          sections: [
          {
            id: "sec-grade-初中竞赛-07-01",
            name: "极端原理",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-582", name: "极端原理", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-07-02",
            name: "染色与覆盖",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-583", name: "染色与覆盖", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-初中竞赛-07-03",
            name: "调整法",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-584", name: "调整法", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 27 },
            ],
          },
          ],
        },
      ],
    },
    {
      id: "grade-小学竞赛",
      name: "小学竞赛",
      shortName: "小学竞赛",
      gradeLevel: 6,
      semester: "全",
      chapters: [
        {
          id: "ch-grade-小学竞赛-01",
          name: "平面几何",
          shortName: "平面几何",
          order: 1,
          description: "",
          totalPoints: 9,
          totalQuestions: 130,
          sections: [
          {
            id: "sec-grade-小学竞赛-01-01",
            name: "七大模型",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-585", name: "等积变形", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 10 },
            { id: "kp-auto-586", name: "一半模型", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 16 },
            { id: "kp-auto-587", name: "鸟头模型", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 27 },
            { id: "kp-auto-588", name: "蝴蝶模型", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-01-02",
            name: "图形的分与合",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-589", name: "图形的分与合", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-01-03",
            name: "圆和扇形",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-590", name: "圆和扇形", description: "", cognitiveLevel: "记忆", importance: 4, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-01-04",
            name: "巧求周长",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-591", name: "巧求周长", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 28 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-01-05",
            name: "巧求面积",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-592", name: "巧求面积", description: "", cognitiveLevel: "应用", importance: 5, questionCount: 21 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-01-06",
            name: "格点与面积",
            order: 6,
            knowledgePoints: [
            { id: "kp-auto-593", name: "格点与面积", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 18 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-小学竞赛-02",
          name: "立体几何",
          shortName: "立体几何",
          order: 2,
          description: "",
          totalPoints: 6,
          totalQuestions: 90,
          sections: [
          {
            id: "sec-grade-小学竞赛-02-01",
            name: "体积相关问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-594", name: "体积相关问题", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 15 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-02-02",
            name: "多角度观察",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-595", name: "多角度观察", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-02-03",
            name: "染色问题",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-596", name: "染色问题", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-02-04",
            name: "立体图形的展开",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-597", name: "立体图形的展开", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 25 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-02-05",
            name: "等体积变形",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-598", name: "等体积变形", description: "", cognitiveLevel: "应用", importance: 3, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-02-06",
            name: "表面积相关问题",
            order: 6,
            knowledgePoints: [
            { id: "kp-auto-599", name: "表面积相关问题", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 23 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-小学竞赛-03",
          name: "间隔问题",
          shortName: "间隔问题",
          order: 3,
          description: "",
          totalPoints: 3,
          totalQuestions: 33,
          sections: [
          {
            id: "sec-grade-小学竞赛-03-01",
            name: "上楼问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-600", name: "上楼问题", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 19 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-03-02",
            name: "方阵问题",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-601", name: "方阵问题", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 9 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-03-03",
            name: "植树问题",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-602", name: "植树问题", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 30 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-小学竞赛-04",
          name: "天平上的数学",
          shortName: "天平上的数学",
          order: 4,
          description: "",
          totalPoints: 2,
          totalQuestions: 65,
          sections: [
          {
            id: "sec-grade-小学竞赛-04-01",
            name: "天平称重",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-603", name: "天平称重", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-04-02",
            name: "天平辨伪",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-604", name: "天平辨伪", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 12 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-小学竞赛-05",
          name: "数论",
          shortName: "数论",
          order: 5,
          description: "",
          totalPoints: 6,
          totalQuestions: 72,
          sections: [
          {
            id: "sec-grade-小学竞赛-05-01",
            name: "位值原理",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-605", name: "位值原理", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-05-02",
            name: "余数问题",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-606", name: "余数问题", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 26 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-05-03",
            name: "奇偶性分析",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-607", name: "奇偶性分析", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-05-04",
            name: "整除与带余除法",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-608", name: "整除与带余除法", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 18 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-05-05",
            name: "最大公约数与最小公倍数",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-609", name: "最大公约数与最小公倍数", description: "", cognitiveLevel: "分析", importance: 4, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-05-06",
            name: "质数与合数",
            order: 6,
            knowledgePoints: [
            { id: "kp-auto-610", name: "质数与合数", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 19 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-小学竞赛-06",
          name: "计数",
          shortName: "计数",
          order: 6,
          description: "",
          totalPoints: 4,
          totalQuestions: 64,
          sections: [
          {
            id: "sec-grade-小学竞赛-06-01",
            name: "加法原理与乘法原理",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-611", name: "加法原理与乘法原理", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-06-02",
            name: "容斥原理",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-612", name: "容斥原理", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-06-03",
            name: "抽屉原理",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-613", name: "抽屉原理", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 27 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-06-04",
            name: "排列与组合",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-614", name: "排列与组合", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 14 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-小学竞赛-07",
          name: "应用题",
          shortName: "应用题",
          order: 7,
          description: "",
          totalPoints: 9,
          totalQuestions: 114,
          sections: [
          {
            id: "sec-grade-小学竞赛-07-01",
            name: "工程问题",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-615", name: "工程问题", description: "", cognitiveLevel: "理解", importance: 3, questionCount: 10 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-07-02",
            name: "年龄问题",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-616", name: "年龄问题", description: "", cognitiveLevel: "分析", importance: 3, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-07-03",
            name: "时钟问题",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-617", name: "时钟问题", description: "", cognitiveLevel: "分析", importance: 5, questionCount: 16 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-07-04",
            name: "浓度问题",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-618", name: "浓度问题", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 32 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-07-05",
            name: "牛吃草问题",
            order: 5,
            knowledgePoints: [
            { id: "kp-auto-619", name: "牛吃草问题", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-07-06",
            name: "经济问题",
            order: 6,
            knowledgePoints: [
            { id: "kp-auto-620", name: "经济问题", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 30 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-07-07",
            name: "行程问题",
            order: 7,
            knowledgePoints: [
            { id: "kp-auto-621", name: "相遇与追及", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 15 },
            { id: "kp-auto-622", name: "流水行船", description: "", cognitiveLevel: "理解", importance: 4, questionCount: 26 },
            { id: "kp-auto-623", name: "火车过桥", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 9 },
            ],
          },
          ],
        },
        {
          id: "ch-grade-小学竞赛-08",
          name: "逻辑推理",
          shortName: "逻辑推理",
          order: 8,
          description: "",
          totalPoints: 4,
          totalQuestions: 77,
          sections: [
          {
            id: "sec-grade-小学竞赛-08-01",
            name: "操作与对策",
            order: 1,
            knowledgePoints: [
            { id: "kp-auto-624", name: "操作与对策", description: "", cognitiveLevel: "应用", importance: 4, questionCount: 12 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-08-02",
            name: "数字谜与数阵图",
            order: 2,
            knowledgePoints: [
            { id: "kp-auto-625", name: "数字谜与数阵图", description: "", cognitiveLevel: "理解", importance: 5, questionCount: 31 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-08-03",
            name: "最值问题",
            order: 3,
            knowledgePoints: [
            { id: "kp-auto-626", name: "最值问题", description: "", cognitiveLevel: "记忆", importance: 5, questionCount: 13 },
            ],
          },
          {
            id: "sec-grade-小学竞赛-08-04",
            name: "逻辑推理",
            order: 4,
            knowledgePoints: [
            { id: "kp-auto-627", name: "逻辑推理", description: "", cognitiveLevel: "记忆", importance: 3, questionCount: 11 },
            ],
          },
          ],
        },
      ],
    },
  ],
};

export const allStages: Stage[] = [
  stage_小学,
  stage_初中,
  stage_中考,
  stage_竞赛,
];

export const grade7Up = stage_初中.grades.find((g: Grade) => g.gradeLevel === 7 && g.semester === "上") || stage_初中.grades[0];


export function getStage(id: string): Stage | undefined {
  return allStages.find((s: Stage) => s.id === id);
}

export function getGrade(id: string): Grade | undefined {
  for (const stage of allStages) {
    for (const grade of stage.grades) {
      if (grade.id === id) return grade;
    }
  }
  return undefined;
}

export function getChapter(id: string): Chapter | undefined {
  for (const stage of allStages) {
    for (const grade of stage.grades) {
      for (const chapter of grade.chapters) {
        if (chapter.id === id) return chapter;
      }
    }
  }
  return undefined;
}

export function flattenKnowledgePoints(stages: Stage[]): Array<{
  point: KnowledgePoint;
  sectionName: string;
  chapterName: string;
  gradeName: string;
  stageName: string;
}> {
  const result: Array<{
    point: KnowledgePoint;
    sectionName: string;
    chapterName: string;
    gradeName: string;
    stageName: string;
  }> = [];
  for (const stage of stages) {
    for (const grade of stage.grades) {
      for (const chapter of grade.chapters) {
        for (const section of chapter.sections) {
          for (const point of section.knowledgePoints) {
            result.push({ point, sectionName: section.name, chapterName: chapter.name, gradeName: grade.name, stageName: stage.name });
          }
        }
      }
    }
  }
  return result;
}

export function getStats(stages: Stage[]) {
  const points = flattenKnowledgePoints(stages);
  const totalQuestions = points.reduce((s, p) => s + p.point.questionCount, 0);
  return {
    totalStages: stages.length,
    totalGrades: stages.reduce((s, st) => s + st.grades.length, 0),
    totalChapters: stages.reduce((s, st) => s + st.grades.reduce((s2, g) => s2 + g.chapters.length, 0), 0),
    totalKnowledgePoints: points.length,
    totalQuestions,
  };
}
