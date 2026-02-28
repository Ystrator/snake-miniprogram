#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试搜索和分类功能
"""

import json
import subprocess

def test_data_loading():
    """测试数据加载"""
    print("🔍 测试数据加载...")

    test_code = '''
const data = require('./data.js');

// 测试1: 检查文章总数
console.log('文章总数:', data.allArticles.length);

// 测试2: 检查分类映射
const catMap = {};
data.allArticles.forEach(article => {
  if (article.categoryId) {
    catMap[article.categoryId] = (catMap[article.categoryId] || 0) + 1;
  }
});
console.log('分类分布:');
Object.keys(catMap).forEach(catId => {
  console.log(`  ${catId}: ${catMap[catId]}篇`);
});

// 测试3: 检查搜索功能
const keyword = '黄疸';
const results = data.allArticles.filter(article => {
  const titleMatch = article.title.toLowerCase().includes(keyword.toLowerCase());
  const summaryMatch = article.summary && article.summary.toLowerCase().includes(keyword.toLowerCase());
  const descMatch = article.description && article.description.toLowerCase().includes(keyword.toLowerCase());
  const tagMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()));
  return titleMatch || summaryMatch || descMatch || tagMatch;
});
console.log(`\\n搜索"${keyword}": ${results.length}篇结果`);
results.slice(0, 3).forEach(r => {
  console.log(`  - ${r.title} (分类: ${r.categoryId})`);
});

// 测试4: 检查文章ID格式
const idFormats = {};
data.allArticles.forEach(article => {
  if (article.id.startsWith('article_')) {
    idFormats['article_XXX'] = (idFormats['article_XXX'] || 0) + 1;
  } else {
    idFormats['其他'] = (idFormats['其他'] || 0) + 1;
  }
});
console.log('\\nID格式分布:');
Object.keys(idFormats).forEach(fmt => {
  console.log(`  ${fmt}: ${idFormats[fmt]}个`);
});
'''

    result = subprocess.run(
        ['node', '-e', test_code],
        cwd='/tmp/parenting-miniprogram',
        capture_output=True,
        text=True,
        timeout=10
    )

    if result.returncode == 0:
        print(result.stdout)
        return True
    else:
        print(f"❌ 测试失败: {result.stderr}")
        return False

def test_article_access():
    """测试文章访问"""
    print("\n🔍 测试文章访问...")

    test_code = '''
const data = require('./data.js');

// 测试不同ID格式的访问
const testIds = [
  'article_001',
  '001',
  'article_050',
  '050'
];

testIds.forEach(testId => {
  const article = data.allArticles.find(a => a.id === testId);
  if (article) {
    console.log(`✓ 找到文章 (${testId}): ${article.title}`);
  } else {
    console.log(`✗ 未找到文章 (${testId})`);
  }
});

// 统计每种格式的文章数
const articlePrefix = data.allArticles.filter(a => a.id.startsWith('article_')).length;
const numericOnly = data.allArticles.filter(a => !a.id.startsWith('article_')).length;
console.log(`\\nID格式统计:`);
console.log(`  article_XXX格式: ${articlePrefix}篇`);
console.log(`  纯数字格式: ${numericOnly}篇`);
'''

    result = subprocess.run(
        ['node', '-e', test_code],
        cwd='/tmp/parenting-miniprogram',
        capture_output=True,
        text=True,
        timeout=10
    )

    if result.returncode == 0:
        print(result.stdout)
        return True
    else:
        print(f"❌ 测试失败: {result.stderr}")
        return False

def main():
    print("=" * 60)
    print("🧪 数据功能测试")
    print("=" * 60)
    print()

    success = True

    # 测试1: 数据加载
    if not test_data_loading():
        success = False

    # 测试2: 文章访问
    if not test_article_access():
        success = False

    print("\n" + "=" * 60)
    if success:
        print("✅ 所有测试通过！")
    else:
        print("❌ 部分测试失败")
    print("=" * 60)

    return success

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
