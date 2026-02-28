#!/bin/bash
# 合并data.js和data_50articles.js

echo "开始合并文章数据..."

# 备份原文件
cp data.js data.js.backup

# 提取data_50articles.js中的articles数组
# 并追加到data.js中

python3 << 'EOF'
import json
import re

# 读取现有data.js
with open('data.js', 'r', encoding='utf-8') as f:
    existing_content = f.read()

# 读取新生成的50篇文章
with open('data_50articles.js', 'r', encoding='utf-8') as f:
    new_content = f.read()

# 提取articles数组
# 使用正则表达式查找knowledgeData.articles数组
pattern = r'articles:\s*\[(.*?)\]'
matches = re.findall(pattern, existing_content, re.DOTALL)

if matches:
    # 找到现有的articles数组
    existing_articles = matches[0]
else:
    existing_articles = ''

# 从新文件中提取articles
new_matches = re.findall(pattern, new_content, re.DOTALL)
if new_matches:
    new_articles = new_matches[0]

    # 合并articles
    merged_articles = existing_articles + ',' + new_articles

    # 替换原文件中的articles数组
    updated_content = re.sub(
        r'articles:\s*\[.*?\]',
        f'articles: [{merged_articles}]',
        existing_content,
        flags=re.DOTALL
    )

    # 写入新文件
    with open('data_merged.js', 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("✅ 合并完成！")
    print(f"原文章数：{existing_articles.count('id:')}")
    print(f"新增文章数：{new_articles.count('id:')}")
    print(f"合并后文章数：{merged_articles.count('id:')}")
    print("输出文件：data_merged.js")
else:
    print("❌ 无法提取articles数组")
EOF

echo "合并完成！请查看 data_merged.js"
