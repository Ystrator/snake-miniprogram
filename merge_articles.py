#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
import json

print("开始合并文章数据...")

# 读取新生成的50篇文章
print("读取 data_50articles.js...")
with open('data_50articles.js', 'r', encoding='utf-8') as f:
    new_content = f.read()

# 提取articles数组
pattern = r'const articles = (\[.*?\]);'
matches = re.findall(pattern, new_content, re.DOTALL)

if not matches:
    print("无法从data_50articles.js提取articles数组")
    exit(1)

new_articles_json = matches[0]
count = new_articles_json.count('"id"')
print(f"提取到新文章：{count}篇")

# 解析JSON
try:
    new_articles = json.loads(new_articles_json)
except json.JSONDecodeError as e:
    print(f"JSON解析失败: {e}")
    exit(1)

# 转换为小程序需要的格式
converted_articles = []

for article in new_articles:
    converted_article = {
        'id': article['id'],
        'title': article['title'],
        'category': article['category'],
        'tags': article['tags'],
        'summary': article['description'],
        'description': article['description'],
        'quickAnswers': article['quickAnswers'],
        'content': article['content'],
        'publishDate': '2026-02-27'
    }
    converted_articles.append(converted_article)

print(f"转换了{len(converted_articles)}篇文章")

# 输出为JavaScript格式
output = """// 育儿知识数据库（50篇完整版）
// 生成时间: 2026-02-27
// 数据来源: 基于AAP、WHO等权威医学指南

const knowledgeData = {
  categories: [
    {
      id: 'age-0-1',
      name: '0-1岁',
      icon: '👶',
      description: '新生儿护理与早期发育',
      articles: []
    },
    {
      id: 'age-1-3',
      name: '1-3岁',
      icon: '👧',
      description: '幼儿期成长与护理',
      articles: []
    },
    {
      id: 'age-3-6',
      name: '3-6岁',
      icon: '🧒',
      description: '学龄前准备与能力培养',
      articles: []
    },
    {
      id: 'general',
      name: '通用知识',
      icon: '📚',
      description: '全年龄段适用的育儿知识',
      articles: []
    }
  ],

  // 所有文章的扁平数组（50篇）
  allArticles: """ + json.dumps(converted_articles, ensure_ascii=False, indent=2) + """
}

// 根据分类筛选文章
function getArticlesByCategory(categoryId) {
  return knowledgeData.allArticles.filter(article => 
    article.category === categoryId || 
    article.tags.includes(categoryId)
  )
}

// 搜索文章
function searchArticles(keyword) {
  const lowerKeyword = keyword.toLowerCase()
  return knowledgeData.allArticles.filter(article => 
    article.title.toLowerCase().includes(lowerKeyword) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)) ||
    article.description.toLowerCase().includes(lowerKeyword)
  )
}

// 获取推荐文章（根据宝宝月龄）
function getRecommendedArticles(babyAgeMonths) {
  let category = 'general'
  
  if (babyAgeMonths < 6) {
    category = 'age-0-1'
  } else if (babyAgeMonths < 36) {
    category = 'age-1-3'
  } else if (babyAgeMonths < 72) {
    category = 'age-3-6'
  }
  
  return getArticlesByCategory(category).slice(0, 10)
}

module.exports = {
  knowledgeData,
  getArticlesByCategory,
  searchArticles,
  getRecommendedArticles
}
"""

# 写入文件
with open('data_50final.js', 'w', encoding='utf-8') as f:
    f.write(output)

print("合并完成！")
print("输出文件: data_50final.js")
print("文章总数: {}篇".format(len(converted_articles)))
