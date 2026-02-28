#!/bin/bash

# 首页图标 (未激活 - 灰色)
convert -size 81x81 xc:none -fill '#8E8E93' -draw "path 'M 40 15 L 47 32 L 65 32 L 50 43 L 55 60 L 40 50 L 25 60 L 30 43 L 15 32 L 33 32 Z'" home.png

# 首页图标 (激活 - 蓝色)
convert -size 81x81 xc:none -fill '#007AFF' -draw "path 'M 40 15 L 47 32 L 65 32 L 50 43 L 55 60 L 40 50 L 25 60 L 30 43 L 15 32 L 33 32 Z'" home-active.png

# 分类图标 (未激活)
convert -size 81x81 xc:none -fill '#8E8E93' -draw "rectangle 20,20 60,65" -fill 'white' -draw "line 40,20 40,65" category.png
convert -size 81x81 xc:none -fill '#8E8E93' -draw "rectangle 20,20 60,65" -fill 'white' -draw "line 20,42 60,42" category.png

# 分类图标 (激活)
convert -size 81x81 xc:none -fill '#007AFF' -draw "rectangle 20,20 60,65" -fill 'white' -draw "line 40,20 40,65" category-active.png
convert -size 81x81 xc:none -fill '#007AFF' -draw "rectangle 20,20 60,65" -fill 'white' -draw "line 20,42 60,42" category-active.png

# 搜索图标 (未激活)
convert -size 81x81 xc:none -fill '#8E8E93' -draw "circle 40,40 25,25" -draw "line 55,55 70,70" search.png

# 搜索图标 (激活)
convert -size 81x81 xc:none -fill '#007AFF' -draw "circle 40,40 25,25" -draw "line 55,55 70,70" search-active.png

# 收藏图标 (未激活)
convert -size 81x81 xc:none -fill '#8E8E93' -draw "path 'M 40 15 L 47 32 L 65 32 L 50 43 L 55 60 L 40 50 L 25 60 L 30 43 L 15 32 L 33 32 Z'" favorite.png

# 收藏图标 (激活)
convert -size 81x81 xc:none -fill '#007AFF' -draw "path 'M 40 15 L 47 32 L 65 32 L 50 43 L 55 60 L 40 50 L 25 60 L 30 43 L 15 32 L 33 32 Z'" favorite-active.png

echo "✅ 所有图标创建完成！"
ls -lh
