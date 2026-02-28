#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
直接合并 - 不依赖原始文件解析
"""

import json
import os

print("🚀 直接生成80篇完整版...")
print()

# 方法：直接读取所有新文章文件，组合成完整数组

# 读取第一批25篇
print("📖 读取 data_30new_articles.js...")
with open('/tmp/parenting-miniprogram/data_30new_articles.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取数组（从 [ 到最后的 ]）
start = content.find('[')
end = content.rfind(']') + 1
articles_25 = json.loads(content[start:end])
print(f"✅ 第一批: {len(articles_25)}篇")

# 读取第二批5篇
print()
print("📖 读取 data_5final_articles.js...")
with open('/tmp/parenting-miniprogram/data_5final_articles.js', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('[')
end = content.rfind(']') + 1
articles_5 = json.loads(content[start:end])
print(f"✅ 第二批: {len(articles_5)}篇")

# 合并新文章
new_articles = articles_25 + articles_5
print(f"✅ 新增文章: {len(new_articles)}篇")

# 现在读取原始data.js (50篇)
print()
print("📖 读取现有 data.js (原始50篇)...")
with open('/tmp/parenting-miniprogram/data.js', 'r', encoding='utf-8') as f:
    current = f.read()

# 检查当前有多少篇
current_count = current.count('"article_')
print(f"✅ 当前文件有: {current_count}篇文章")

# 如果当前不是80篇，说明需要重新生成
if current_count >= 80:
    print("✅ 已经是80篇，无需合并")
    exit(0)

# 如果当前是30篇左右，说明之前合并出错了
# 需要重新从原始50篇开始
print()
print("🔄 需要重新生成...")

# 尝试从备份读取
backup_files = [
    'data.js.backup_v1.2.0',
    'data.js.backup_50articles'
]

original_articles = []
for backup in backup_files:
    if os.path.exists(f'/tmp/parenting-miniprogram/{backup}'):
        print(f"📖 尝试读取 {backup}...")
        try:
            with open(f'/tmp/parenting-miniprogram/{backup}', 'r', encoding='utf-8') as f:
                content = f.read()
            # 查找allArticles
            import re
            match = re.search(r'allArticles:\s*(\[.*?\])', content, re.DOTALL)
            if match:
                arr = json.loads(match.group(1))
                if len(arr) >= 50:
                    original_articles = arr[:50]  # 取前50篇
                    print(f"✅ 从 {backup} 读取了 {len(original_articles)}篇")
                    break
        except:
            continue

if not original_articles:
    print("❌ 无法读取原始50篇")
    print("📝 将只使用新增的30篇...")
    original_articles = []

# 合并
all_articles = original_articles + new_articles
print()
print(f"🎉 最终合计: {len(all_articles)}篇文章")

if len(all_articles) != 80:
    print(f"⚠️  预期80篇，实际{len(all_articles)}篇")
    print(f"📊 原始: {len(original_articles)}篇")
    print(f"📊 新增: {len(new_articles)}篇")

# 生成完整data.js
print()
print("💾 生成 data.js...")

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
output_file = '/tmp/parenting-miniprogram/data.js'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(data_js)

print(f"✅ 已保存到 {output_file}")
print(f"📊 文件大小: {len(data_js)} 字节 ({len(data_js)//1024}KB)")

# 统计
print()
print("📊 文章分类:")
cat_count = {}
for a in all_articles:
    cat = a.get('category', '未知')
    cat_count[cat] = cat_count.get(cat, 0) + 1
for cat, count in sorted(cat_count.items()):
    print(f"  {cat}: {count}篇")

print()
print("=" * 70)
if len(all_articles) == 80:
    print("🎉 成功生成80篇完整版！")
else:
    print(f"⚠️  生成了{len(all_articles)}篇（预期80篇）")
print("=" * 70)
