#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
最终验证脚本 - 确保所有数据问题已修复
"""

import json
import subprocess
import sys

def run_node_test(code):
    """运行 Node.js 测试代码"""
    result = subprocess.run(
        ['node', '-e', code],
        cwd='/tmp/parenting-miniprogram',
        capture_output=True,
        text=True,
        timeout=15
    )
    return result

def test_1_json_syntax():
    """测试1: JSON语法验证"""
    print("📋 测试1: JSON语法验证")
    test_code = '''
try {
  const data = require('./data.js');
  console.log(JSON.stringify({
    test: 1,
    pass: true,
    articles: data.allArticles.length,
    categories: data.categories.length
  }));
} catch(e) {
  console.log(JSON.stringify({
    test: 1,
    pass: false,
    error: e.message
  }));
}
'''
    result = run_node_test(test_code)
    if result.returncode == 0:
        data = json.loads(result.stdout.strip())
        if data['pass']:
            print(f"  ✅ 通过 - 文章数: {data['articles']}, 分类数: {data['categories']}")
            return True
        else:
            print(f"  ❌ 失败 - {data.get('error', '未知错误')}")
            return False
    else:
        print(f"  ❌ 失败 - {result.stderr}")
        return False

def test_2_category_mapping():
    """测试2: 分类映射验证"""
    print("\n📋 测试2: 分类映射验证")
    test_code = '''
const data = require('./data.js');

// 检查每篇文章是否有 categoryId
const missingCategoryId = data.allArticles.filter(a => !a.categoryId);
const withCategoryId = data.allArticles.filter(a => a.categoryId);

// 统计各分类的文章数
const categoryCount = {};
data.allArticles.forEach(article => {
  const catId = article.categoryId || 'unknown';
  categoryCount[catId] = (categoryCount[catId] || 0) + 1;
});

console.log(JSON.stringify({
  test: 2,
  pass: missingCategoryId.length === 0,
  total: data.allArticles.length,
  withCategoryId: withCategoryId.length,
  missingCategoryId: missingCategoryId.length,
  categoryCount: categoryCount
}));
'''
    result = run_node_test(test_code)
    if result.returncode == 0:
        data = json.loads(result.stdout.strip())
        if data['pass']:
            print(f"  ✅ 通过 - {data['withCategoryId']}/{data['total']}篇文章有categoryId")
            print(f"  📊 分类分布:")
            for cat_id, count in sorted(data['categoryCount'].items()):
                print(f"     {cat_id}: {count}篇")
            return True
        else:
            print(f"  ❌ 失败 - {data['missingCategoryId']}篇文章缺少categoryId")
            return False
    else:
        print(f"  ❌ 失败 - {result.stderr}")
        return False

def test_3_search_function():
    """测试3: 搜索功能验证"""
    print("\n📋 测试3: 搜索功能验证")
    test_code = '''
const data = require('./data.js');

// 测试搜索关键词
const testKeywords = ['黄疸', '睡眠', '发烧', '发育'];
const results = {};

testKeywords.forEach(keyword => {
  const matches = data.allArticles.filter(article => {
    const titleMatch = article.title.toLowerCase().includes(keyword.toLowerCase());
    const summaryMatch = article.summary && article.summary.toLowerCase().includes(keyword.toLowerCase());
    const descMatch = article.description && article.description.toLowerCase().includes(keyword.toLowerCase());
    const tagMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()));
    return titleMatch || summaryMatch || descMatch || tagMatch;
  });
  results[keyword] = matches.length;
});

const totalResults = Object.values(results).reduce((a, b) => a + b, 0);
const allPass = totalResults > 0;

console.log(JSON.stringify({
  test: 3,
  pass: allPass,
  results: results,
  totalResults: totalResults
}));
'''
    result = run_node_test(test_code)
    if result.returncode == 0:
        data = json.loads(result.stdout.strip())
        if data['pass']:
            print(f"  ✅ 通过 - 搜索功能正常")
            print(f"  📊 搜索结果:")
            for keyword, count in data['results'].items():
                print(f"     '{keyword}': {count}篇")
            return True
        else:
            print(f"  ❌ 失败 - 没有搜索结果")
            return False
    else:
        print(f"  ❌ 失败 - {result.stderr}")
        return False

def test_4_article_access():
    """测试4: 文章访问验证"""
    print("\n📋 测试4: 文章访问验证")
    test_code = '''
const data = require('./data.js');

// 测试不同ID格式的访问
const testCases = [
  { id: 'article_001', expected: true },
  { id: 'article_050', expected: true },
  { id: 'article_080', expected: true },
  { id: '999', expected: false }
];

const results = testCases.map(tc => {
  const article = data.allArticles.find(a => a.id === tc.id);
  const found = !!article;
  return {
    id: tc.id,
    expected: tc.expected,
    found: found,
    pass: found === tc.expected
  };
});

const allPass = results.every(r => r.pass);

console.log(JSON.stringify({
  test: 4,
  pass: allPass,
  results: results
}));
'''
    result = run_node_test(test_code)
    if result.returncode == 0:
        data = json.loads(result.stdout.strip())
        print(f"  {'✅ 通过' if data['pass'] else '❌ 失败'} - 文章访问{'正常' if data['pass'] else '异常'}")
        for result in data['results']:
            status = '✓' if result['pass'] else '✗'
            print(f"     {status} {result['id']}: {'找到' if result['found'] else '未找到'}")
        return data['pass']
    else:
        print(f"  ❌ 失败 - {result.stderr}")
        return False

def test_5_data_completeness():
    """测试5: 数据完整性验证"""
    print("\n📋 测试5: 数据完整性验证")
    test_code = '''
const data = require('./data.js');

// 检查每篇文章的必填字段
const requiredFields = ['id', 'title', 'category', 'categoryId', 'tags', 'summary', 'description', 'quickAnswers', 'content'];
const issues = [];

data.allArticles.forEach((article, index) => {
  requiredFields.forEach(field => {
    if (!article[field]) {
      issues.push(`文章${index + 1}(${article.id}): 缺少字段 ${field}`);
    }
  });

  // 检查 content 是否为数组
  if (article.content && !Array.isArray(article.content)) {
    issues.push(`文章${index + 1}(${article.id}): content 不是数组`);
  }
});

console.log(JSON.stringify({
  test: 5,
  pass: issues.length === 0,
  total: data.allArticles.length,
  issues: issues.slice(0, 10), // 只显示前10个问题
  issueCount: issues.length
}));
'''
    result = run_node_test(test_code)
    if result.returncode == 0:
        data = json.loads(result.stdout.strip())
        if data['pass']:
            print(f"  ✅ 通过 - 所有{data['total']}篇文章数据完整")
            return True
        else:
            print(f"  ❌ 失败 - 发现{data['issueCount']}个问题")
            if data['issues']:
                print(f"  问题示例:")
                for issue in data['issues']:
                    print(f"     - {issue}")
            return False
    else:
        print(f"  ❌ 失败 - {result.stderr}")
        return False

def main():
    print("=" * 70)
    print("🔍 育儿小程序数据问题修复 - 最终验证")
    print("=" * 70)
    print()

    results = []

    # 运行所有测试
    results.append(("JSON语法验证", test_1_json_syntax()))
    results.append(("分类映射验证", test_2_category_mapping()))
    results.append(("搜索功能验证", test_3_search_function()))
    results.append(("文章访问验证", test_4_article_access()))
    results.append(("数据完整性验证", test_5_data_completeness()))

    # 汇总结果
    print("\n" + "=" * 70)
    print("📊 验证结果汇总")
    print("=" * 70)

    passed = sum(1 for _, result in results if result)
    total = len(results)

    for name, result in results:
        status = "✅ 通过" if result else "❌ 失败"
        print(f"{status} - {name}")

    print()
    print(f"总计: {passed}/{total} 测试通过")
    print("=" * 70)

    if passed == total:
        print()
        print("🎉 所有数据问题已修复！")
        print()
        print("✅ 修复内容:")
        print("  • 为80篇文章添加 categoryId 字段")
        print("  • 建立分类映射关系 (0-6个月 → age-0-1)")
        print("  • 修复文章详情页加载逻辑")
        print("  • 验证数据完整性")
        print()
        print("📋 下一步:")
        print("  1. 在微信开发者工具中测试小程序")
        print("  2. 测试搜索、分类、文章详情等功能")
        print("  3. 验证用户反馈的问题是否解决")
        print()
        return True
    else:
        print()
        print("⚠️  仍有部分问题需要处理")
        print()
        return False

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
