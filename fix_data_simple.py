#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复数据问题 - 简化版
"""

import re
from datetime import datetime

# 分类映射表
CATEGORY_MAP = {
    "0-6个月": "age-0-1",
    "6-12个月": "age-0-1",
    "1-3岁": "age-1-3",
    "3-6岁": "age-3-6",
    "通用知识": "general"
}

def fix_data_js():
    """修复 data.js 文件"""
    print("🔧 开始修复 data.js...")

    with open('/tmp/parenting-miniprogram/data.js', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    fixed_lines = []
    fix_count = 0
    in_article = False
    has_category = False
    has_categoryId = False

    for i, line in enumerate(lines):
        # 检测是否是文章开始
        if '"id":' in line and 'article_' in line:
            in_article = True
            has_category = False
            has_categoryId = False
            fixed_lines.append(line)
            continue

        # 在文章对象内
        if in_article:
            # 检查是否有 category 字段
            if '"category":' in line:
                has_category = True
                # 提取分类值
                match = re.search(r'"category":\s*"([^"]+)"', line)
                if match:
                    category = match.group(1)
                    if category in CATEGORY_MAP:
                        cat_id = CATEGORY_MAP[category]
                        # 检查是否已经有 categoryId
                        if i + 1 < len(lines) and '"categoryId"' in lines[i + 1]:
                            has_categoryId = True
                        else:
                            # 添加 categoryId 字段
                            indent = len(line) - len(line.lstrip())
                            fixed_lines.append(line)
                            fixed_lines.append(' ' * indent + f'"categoryId": "{cat_id}",\n')
                            fix_count += 1
                            has_categoryId = True
                            continue
                fixed_lines.append(line)
                continue

            # 检查文章结束
            if line.strip() == '},' or line.strip() == '}':
                in_article = False
                fixed_lines.append(line)
                continue

        fixed_lines.append(line)

    # 备份原文件
    backup_path = '/tmp/parenting-miniprogram/data.js.backup_before_fix'
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print(f"💾 已备份原文件")

    # 写入修复后的文件
    with open('/tmp/parenting-miniprogram/data.js', 'w', encoding='utf-8') as f:
        f.writelines(fixed_lines)
    print(f"💾 已写入修复后的文件")
    print(f"✅ 修复了 {fix_count} 篇文章的 categoryId 字段")

    return True

def main():
    print("=" * 60)
    print("🔧 育儿小程序数据修复工具")
    print("=" * 60)
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    if fix_data_js():
        print("\n✅ 数据修复完成！")
        print("\n📋 修复内容:")
        print("  ✅ 为所有文章添加 categoryId 字段")
        print("  ✅ 建立分类映射 (0-6个月 → age-0-1)")
        return True
    else:
        print("\n❌ 数据修复失败")
        return False

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
