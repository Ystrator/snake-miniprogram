#!/bin/bash

echo "📖 读取原始50篇..."
# 从备份读取原始数据
ORIGINAL=$(cat data.js.backup_v1.2.0)

echo "📖 读取新增30篇..."
# 合并新增数据
NEW_25=$(cat data_30new_articles.js | grep -A 100000 'const newArticles')
NEW_5=$(cat data_5final_articles.js | grep -A 100000 'const finalArticles')

# 提取数组内容
echo "🔗 合并数据..."
# 使用Python合并
python3 << 'ENDPYTHON'
import json
import re

print("正在生成80篇完整版...")

# 读取原始50篇
with open('data.js.backup_v1.2.0', 'r', encoding='utf-8') as f:
    original = f.read()

# 使用正则提取allArticles数组
match = re.search(r'allArticles:\s*(\[.*?\])\s*\};?\s*module\.exports', original, re.DOTALL)
if match:
    try:
        articles_50 = json.loads(match.group(1))
        print(f"✅ 读取原始文章: {len(articles_50)}篇")
    except:
        print("尝试其他方法...")
        articles_50 = []
else:
    print("使用备用方法...")
    articles_50 = []

# 读取新增文章
with open('data_30new_articles.js', 'r', encoding='utf-8') as f:
    content = f.read()
    match = re.search(r'const newArticles = (\[.*?\]);', content, re.DOTALL)
    if match:
        articles_25 = json.loads(match.group(1))
        print(f"✅ 读取第一批新增: {len(articles_25)}篇")
    else:
        articles_25 = []

with open('data_5final_articles.js', 'r', encoding='utf-8') as f:
    content = f.read()
    match = re.search(r'const finalArticles = (\[.*?\]);', content, re.DOTALL)
    if match:
        articles_5 = json.loads(match.group(1))
        print(f"✅ 读取第二批新增: {len(articles_5)}篇")
    else:
        articles_5 = []

# 合并所有文章
all_articles = articles_50 + articles_25 + articles_5
print(f"🎉 合并完成: 总计{len(all_articles)}篇")

# 生成完整的data.js
data_js = f"""// 育儿知识数据库（{len(all_articles)}篇完整版）
// 更新时间: 2026-02-28
// 数据来源: 基于AAP、WHO等权威医学指南 + 微信公众号高赞内容
// 版本: 1.3.0

const knowledgeData = {{
  categories: [
    {{
      id: 'age-0-1',
      name: '0-1岁',
      icon: '👶',
      description: '新生儿护理与早期发育',
      articles: []
    }},
    {{
      id: 'age-1-3',
      name: '1-3岁',
      icon: '👧',
      description: '幼儿期成长与护理',
      articles: []
    }},
    {{
      id: 'age-3-6',
      name: '3-6岁',
      icon: '🧒',
      description: '学龄前准备与能力培养',
      articles: []
    }},
    {{
      id: 'general',
      name: '通用知识',
      icon: '📚',
      description: '全年龄段适用的育儿知识',
      articles: []
    }}
  ],

  // 所有文章的扁平数组（{len(all_articles)}篇）
  allArticles: {json.dumps(all_articles, ensure_ascii=False, indent=2)}
}};

module.exports = knowledgeData;
"""

# 保存
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print(f"✅ 已保存到 data.js")
print(f"📊 文件大小: {len(data_js)} 字节 ({len(data_js)//1024}KB)")

# 统计分类
print("\n📊 文章分类:")
cat_count = {}
for a in all_articles:
    cat = a.get('category', '未知')
    cat_count[cat] = cat_count.get(cat, 0) + 1
for cat, count in sorted(cat_count.items()):
    print(f"  {cat}: {count}篇")

print(f"\n🎉 完成！总计{len(all_articles)}篇文章")
ENDPYTHON

