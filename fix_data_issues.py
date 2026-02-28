#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复数据问题
1. 添加 categoryId 字段
2. 统一 ID 格式
3. 验证数据完整性
"""

import json
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
        content = f.read()

    # 提取 allArticles 数组部分
    match = re.search(r'allArticles:\s*\[(.*?)\];', content, re.DOTALL)
    if not match:
        print("❌ 无法找到 allArticles 数组")
        return False

    articles_json = match.group(0)
    articles_json = 'allArticles: [' + match.group(1) + ']'

    # 手动解析 JSON
    try:
        # 提取每个文章对象
        article_pattern = r'\{[^}]*"id":\s*"([^"]+)"[^}]*"category":\s*"([^"]+)"[^}]*\}'
        articles_data = re.findall(article_pattern, content, re.DOTALL)

        print(f"📊 找到 {len(articles_data)} 篇文章")

        # 统计分类分布
        category_count = {}
        for article_id, category in articles_data:
            category_count[category] = category_count.get(category, 0) + 1

        print("\n📁 分类分布:")
        for cat, count in sorted(category_count.items()):
            print(f"  {cat}: {count}篇")

        # 修复：在每篇文章的 category 字段后添加 categoryId
        fixed_content = content
        fix_count = 0

        for category, cat_id in CATEGORY_MAP.items():
            # 查找所有使用该分类的文章
            pattern = f'"category":\s*"{category}"'
            replacement = f'"category": "{category}",\n    "categoryId": "{cat_id}"'

            # 只替换还没有 categoryId 的
            matches = re.findall(pattern, fixed_content)
            for match in matches:
                # 检查下一行是否已有 categoryId
                # 使用多行模式检查
                temp_fixed = re.sub(
                    pattern + r'(?!\s*,\s*"categoryId")',
                    replacement,
                    fixed_content,
                    count=1
                )
                if temp_fixed != fixed_content:
                    fix_count += 1
                fixed_content = temp_fixed

        print(f"\n✅ 修复了 {fix_count} 篇文章的 categoryId 字段")

        # 备份原文件
        backup_path = '/tmp/parenting-miniprogram/data.js.backup_before_fix'
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"💾 已备份原文件到: {backup_path}")

        # 写入修复后的文件
        with open('/tmp/parenting-miniprogram/data.js', 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        print(f"💾 已写入修复后的文件")

        return True

    except Exception as e:
        print(f"❌ 修复失败: {e}")
        import traceback
        traceback.print_exc()
        return False

def verify_data():
    """验证修复后的数据"""
    print("\n🔍 验证数据完整性...")

    try:
        # 使用 Node.js 验证 JSON 语法
        import subprocess
        result = subprocess.run(
            ['node', '-e', 'try { const data = require("./data.js"); console.log(JSON.stringify({valid: true, count: data.allArticles.length, categories: data.categories.length})); } catch(e) { console.log(JSON.stringify({valid: false, error: e.message})); }'],
            cwd='/tmp/parenting-miniprogram',
            capture_output=True,
            text=True,
            timeout=10
        )

        if result.returncode == 0:
            verify_info = json.loads(result.stdout.strip())
            if verify_info.get('valid'):
                print(f"✅ JSON 语法正确")
                print(f"✅ 文章总数: {verify_info['count']}")
                print(f"✅ 分类数: {verify_info['categories']}")
                return True
            else:
                print(f"❌ 验证失败: {verify_info.get('error')}")
                return False
        else:
            print(f"❌ 验证失败: {result.stderr}")
            return False

    except Exception as e:
        print(f"❌ 验证过程出错: {e}")
        return False

def check_article_ids():
    """检查文章ID格式"""
    print("\n🔍 检查文章ID格式...")

    with open('/tmp/parenting-miniprogram/data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # 检查不同的ID格式
    article_ids = re.findall(r'"id":\s*"([^"]+)"', content)

    print(f"📊 找到 {len(article_ids)} 个文章ID")

    # 统计ID格式
    format_count = {}
    for aid in article_ids:
        if aid.startswith('article_'):
            format_count['article_XXX'] = format_count.get('article_XXX', 0) + 1
        elif aid.isdigit() or (aid.startswith('0') and aid[1:].isdigit()):
            format_count['数字ID'] = format_count.get('数字ID', 0) + 1
        else:
            format_count['其他'] = format_count.get('其他', 0) + 1

    print("\n📋 ID格式分布:")
    for fmt, count in sorted(format_count.items()):
        print(f"  {fmt}: {count}个")

    # 检查是否有重复ID
    id_count = {}
    for aid in article_ids:
        id_count[aid] = id_count.get(aid, 0) + 1

    duplicates = {aid: count for aid, count in id_count.items() if count > 1}
    if duplicates:
        print(f"\n⚠️  发现重复ID:")
        for aid, count in duplicates.items():
            print(f"  {aid}: {count}次")
    else:
        print(f"\n✅ 没有重复ID")

    return len(duplicates) == 0

def main():
    print("=" * 60)
    print("🔧 育儿小程序数据修复工具")
    print("=" * 60)
    print(f"⏰ 开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()

    # 步骤1: 修复数据
    if not fix_data_js():
        print("\n❌ 数据修复失败")
        return False

    # 步骤2: 验证数据
    if not verify_data():
        print("\n❌ 数据验证失败")
        return False

    # 步骤3: 检查ID
    if not check_article_ids():
        print("\n⚠️  存在重复ID，需要处理")
        return False

    print("\n" + "=" * 60)
    print("✅ 数据修复完成！")
    print("=" * 60)
    print("\n📋 修复内容:")
    print("  ✅ 为所有文章添加 categoryId 字段")
    print("  ✅ 建立分类映射关系")
    print("  ✅ 验证JSON语法正确")
    print("  ✅ 检查ID重复情况")
    print("\n📝 下一步:")
    print("  1. 检查 article.js 的文章查找逻辑")
    print("  2. 确保ID格式匹配")
    print("  3. 测试文章详情页加载")

    return True

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
