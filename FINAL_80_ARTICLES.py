#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成最终的80篇文章完整版
"""

import json

# 读取原始50篇
print("📖 读取原始50篇...")
with open('/tmp/parenting-miniprogram/data.js.backup_v1.2.0', 'r', encoding='utf-8') as f:
    original = f.read()

# 提取文章
start_idx = original.find('allArticles:')
if start_idx == -1:
    print("❌ 找不到 allArticles")
    exit(1)

# 找到数组
array_start = original.find('[', start_idx)

# 找到数组结束（在module.exports前）
module_idx = original.find('module.exports')
array_end = original.rfind(']', 0, module_idx)

articles_50_json = original[array_start + len('allArticles:'):array_end + 1]
articles_50 = json.loads(articles_50_json)

print(f"✅ 读取了 {len(articles_50)} 篇原始文章")

# 读取新增30篇（25+5）
print()
print("📖 读取新增30篇...")

# 第一批25篇
with open('/tmp/parenting-miniprogram/data_30new_articles.js', 'r', encoding='utf-8') as f:
    content_25 = f.read()
start_25 = content_25.find('[')
end_25 = content_25.rfind(']') + 1
articles_25 = json.loads(content_25[start_25:end_25])

print(f"✅ 读取了 {len(articles_25)} 篇（第一批）")

# 第二批5篇
with open('/tmp/parenting-miniprogram/data_5final_articles.js', 'r', encoding='utf-8') as f:
    content_5 = f.read()
start_5 = content_5.find('[')
end_5 = content_5.rfind(']') + 1
articles_5 = json.loads(content_5[start_5:end_5])

print(f"✅ 读取了 {len(articles_5)} 篇（第二批）")

# 合并
articles_30 = articles_25 + articles_5
print(f"✅ 新增文章总计 {len(articles_30)} 篇")

# 最终80篇
all_80 = articles_50 + articles_30
print()
print(f"🎉 最终合计: {len(all_80)} 篇文章")

# 生成完整的data.js
print()
print("💾 生成完整的 data.js...")

data_js = f"""// 育儿知识数据库（80篇完整版）
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

  // 所有文章的扁平数组（{len(all_80)}篇）
  allArticles: {json.dumps(all_80, ensure_ascii=False, indent=2)}
}};

module.exports = knowledgeData;
"""

# 保存
output = '/tmp/parenting-miniprogram/data.js'
with open(output, 'w', encoding='utf-8') as f:
    f.write(data_js)

print(f"✅ 已保存到 data.js")
print(f"📊 文件大小: {len(data_js)} 字节 ({len(data_js)//1024}KB)")
print()

# 统计
print("📊 文章分类统计:")
cat_count = {}
for article in all_80:
    cat = article.get('category', '未知')
    cat_count[cat] = cat_count.get(cat, 0) + 1

for cat, count in sorted(cat_count.items()):
    print(f"  - {cat}: {count}篇")

print()
print("=" * 70)
print("🎉 80篇完整版生成完成！")
print("=" * 70)
print(f"✅ 文件位置: {output}")
print(f"✅ 文章总数: {len(all_80)}篇")
print(f"✅ 文件大小: {len(data_js)//1024}KB")
print()
print("📝 最新10篇文章:")
for a in all_80[-10:]:
    print(f"  {a['id']}: {a['title']}")
