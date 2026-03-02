#!/bin/bash

echo "======================================"
echo "AI智能问答+个性化推送功能验证"
echo "======================================"
echo ""

# 检查新增文件
echo "【检查新增文件】"
files=(
  "utils/ai-engine.js"
  "utils/recommendation-engine.js"
  "utils/storage-manager.js"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    size=$(ls -lh "$file" | awk '{print $5}')
    echo "✓ $file ($size)"
  else
    echo "✗ $file 不存在"
  fi
done
echo ""

# 检查修改文件
echo "【检查修改文件】"
modified_files=(
  "pages/index/index.js"
  "pages/index/index.wxml"
  "pages/search/search.js"
  "pages/search/search.wxml"
  "pages/article/article.js"
  "pages/article/article.wxml"
  "pages/profile/profile.js"
)

for file in "${modified_files[@]}"; do
  if [ -f "$file" ]; then
    size=$(ls -lh "$file" | awk '{print $5}')
    modified=$(ls -l "$file" | awk '{print $6, $7, $8}')
    echo "✓ $file ($size, $modified)"
  else
    echo "✗ $file 不存在"
  fi
done
echo ""

# 运行功能测试
echo "【运行功能测试】"
if node test_ai_features.js 2>&1 | grep -q "✅ 所有功能测试通过"; then
  echo "✓ 功能测试通过"
else
  echo "✗ 功能测试失败"
fi
echo ""

# 检查代码语法
echo "【检查JavaScript语法】"
for file in utils/*.js pages/*/*.js; do
  if [ -f "$file" ]; then
    if node -c "$file" 2>/dev/null; then
      echo "✓ $file 语法正确"
    else
      echo "✗ $file 语法错误"
    fi
  fi
done
echo ""

echo "======================================"
echo "验证完成!"
echo "======================================"
