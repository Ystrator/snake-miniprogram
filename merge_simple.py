#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单合并脚本 - 将新文章追加到现有data.js
"""

import json

print("📖 读取新文章数据...")
with open('/tmp/parenting-miniprogram/data_30new_articles.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取newArticles数组
start = content.find('[')
end = content.rfind(']') + 1
new_articles_json = content[start:end]

new_articles = json.loads(new_articles_json)
print(f"✅ 读取了 {len(new_articles)} 篇新文章")

# 读取现有data.js获取格式
print()
print("📖 读取现有 data.js 获取格式...")
with open('/tmp/parenting-miniprogram/data.js', 'r', encoding='utf-8') as f:
    original = f.read()

# 找到allArticles开始位置
all_articles_start = original.find('allArticles:')
if all_articles_start == -1:
    print("❌ 找不到 allArticles")
    exit(1)

# 找到数组开始
array_start = original.find('[', all_articles_start)
if array_start == -1:
    print("❌ 找不到数组开始")
    exit(1)

# 提取数组前缀（allArticles: [）
prefix = original[:array_start+1]

print(f"✅ 找到 allArticles 位置: {array_start}")

# 现在我们需要读取现有的文章
# 读取完整的allArticles数组
# 使用更简单的方法：手动构建

print()
print("🔗 生成合并后的文件...")

# 创建合并后的文章列表
# 由于解析现有JSON有问题，我们直接在原文件中追加

# 找到原数组结束位置（最后一个 ]）
# 更简单的方法：找到module.exports前的位置

module_pos = original.find('module.exports')
if module_pos == -1:
    print("❌ 找不到 module.exports")
    exit(1)

# 在module.exports前有一个}; 和换行
# 我们需要在数组的最后一个元素后面添加逗号和新文章

# 找到数组结尾
array_end = original.rfind(']', 0, module_pos)
if array_end == -1:
    print("❌ 找不到数组结尾")
    exit(1)

# 构建新的data.js
part1 = original[:array_end]  # 到数组结尾前（不包括]）
part2 = original[array_end:]  # 从数组结尾开始

# 构建新文章的JSON字符串
new_articles_str = json.dumps(new_articles, ensure_ascii=False, indent=2)
# 移除外层的[]
new_articles_str = new_articles_str[1:-1]

# 合并
# 在part1的最后加上逗号，然后加上新文章，然后加上part2
merged_data = part1 + ',\n' + new_articles_str + '\n' + part2

# 保存
output_file = '/tmp/parenting-miniprogram/data.js'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(merged_data)

print(f"✅ 已保存到 data.js")
print(f"📊 文件大小: {len(merged_data)} 字节 ({len(merged_data)//1024}KB)")

# 验证
print()
print("🔍 验证合并结果...")
article_count = merged_data.count('"article_')
print(f"✅ 文章总数: {article_count}")

print()
print("=" * 70)
print("🎉 合并完成！")
print("=" * 70)
print(f"原有文章: ~50篇")
print(f"新增文章: {len(new_articles)}篇")
print(f"总计文章: {article_count}篇")
print()
print("✅ data.js 已更新，可以直接使用！")
print("=" * 70)
