#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
最终合并 - 生成80篇完整版
"""

import json

print("📖 读取现有 data.js (75篇)...")
with open('/tmp/parenting-miniprogram/data.js', 'r', encoding='utf-8') as f:
    current = f.read()

# 读取最后5篇
print("📖 读取最后5篇文章...")
with open('/tmp/parenting-miniprogram/data_5final_articles.js', 'r', encoding='utf-8') as f:
    content_5 = f.read()

start = content_5.find('[')
end = content_5.rfind(']') + 1
final_5 = json.loads(content_5[start:end])

print(f"✅ 读取了 {len(final_5)} 篇文章")

# 现在手动添加这5篇到 data.js
# 在 module.exports 前添加
import_pos = current.find('module.exports')

# 在module.exports前有 }; 
# 我们需要在最后的 ] 前添加 ,
# 找到最后一个 ]
last_bracket = current.rfind(']', 0, import_pos)

# 构建新文章JSON
new_articles_str = json.dumps(final_5, ensure_ascii=False, indent=2)
new_articles_str = new_articles_str[1:-1]  # 去掉[]

# 拼接
part1 = current[:last_bracket]
part2 = current[last_bracket:]

# 在 ] 前加逗号和新文章
merged = part1 + ',\n' + new_articles_str + '\n' + part2

# 保存
with open('/tmp/parenting-miniprogram/data.js', 'w', encoding='utf-8') as f:
    f.write(merged)

total = merged.count('"article_')
print(f"✅ 已保存，总计 {total} 篇文章")
print()
print("=" * 70)
print("🎉 最终完成！")
print("=" * 70)
print(f"文章总数: {total}篇")
print(f"文件大小: {len(merged)} 字节 ({len(merged)//1024}KB)")
print()
print("最新5篇文章:")
for a in final_5:
    print(f"  - {a['id']}: {a['title']}")
