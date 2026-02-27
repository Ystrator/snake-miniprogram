# 🚀 育儿知识大全 v1.2.0 快速上手

## 项目信息
- **路径**: `/tmp/parenting-miniprogram/`
- **版本**: v1.2.0
- **日期**: 2026-02-27

## 快速开始

### 1. 打开项目
```bash
# 微信开发者工具
文件 → 打开目录 → 选择 /tmp/parenting-miniprogram/
```

### 2. 查看新功能

#### 👶 宝宝档案
**路径**: `pages/baby/baby`

**功能**:
- 点击首页顶部年龄卡片进入
- 或通过首页"宝宝档案"入口

**测试步骤**:
1. 点击"设置宝宝档案"
2. 输入小名（如"豆豆"）
3. 选择生日（如2025-01-01）
4. 确认保存
5. 查看首页显示的年龄

#### 🔍 搜索优化
**路径**: `pages/search/search`

**功能**:
- 搜索"睡眠"查看相关度标记
- 查看底部相关文章推荐
- 热门搜索词显示搜索量

**测试步骤**:
1. 点击首页搜索框
2. 输入"睡眠"
3. 查看搜索结果
4. 注意🔥最相关和⭐推荐标记
5. 滚动到底部查看相关文章

## 核心文件说明

### 新增文件
```
pages/baby/
├── baby.js   # 宝宝档案逻辑
├── baby.wxml # 界面
├── baby.wxss # 样式
└── baby.json # 配置
```

### 修改文件
```
app.js              # 新增宝宝信息管理
app.json            # 新增baby页面路由
pages/index/        # 新增年龄显示
pages/search/       # 优化搜索功能
data.js             # 优化数据结构
```

## API文档

### 宝宝信息管理

```javascript
// 设置宝宝信息
app.setBabyInfo(birthdayTimestamp, '小名');

// 获取宝宝信息
const babyInfo = app.getBabyInfo();

// 计算月龄
const ageInfo = app.calculateBabyAge();
// 返回: { months: 5, days: 23, text: '5个月23天' }

// 获取推荐分类
const categoryId = app.getRecommendedCategory();
// 返回: 'age-0-1' / 'age-1-3' / 'age-3-6'
```

### 数据结构

```javascript
{
  id: '001',
  title: '文章标题',
  description: '文章描述（新增）',
  summary: '简短总结',
  tags: ['标签1', '标签2'],
  quickAnswers: [
    { question: '问题', answer: '答案' }
  ],
  content: '详细内容...',
  publishDate: '2025-01-15'
}
```

## 测试清单

### ✅ 宝宝档案
- [ ] 设置宝宝信息
- [ ] 查看月龄显示
- [ ] 编辑宝宝信息
- [ ] 删除宝宝信息
- [ ] 本地存储验证

### ✅ 搜索功能
- [ ] 搜索"睡眠"
- [ ] 查看相关度标记
- [ ] 查看相关推荐
- [ ] 测试热门搜索

### ✅ 兼容性
- [ ] 夜间模式切换
- [ ] 页面跳转
- [ ] 数据加载

## 常见问题

**Q: 月龄计算不准确？**
A: 检查设置的生日是否正确，系统使用30天=1个月计算

**Q: 搜索结果没有相关度标记？**
A: 确保搜索词能匹配到文章标题或标签

**Q: 宝宝档案数据丢失？**
A: 检查本地存储权限，数据存储在wx.storage中

## 开发者备注

- 所有功能已通过语法检查
- 备份文件：`data.js.backup`
- 详细报告：`DEV_COMPLETION_REPORT_V1.2.0.md`

## 联系方式

- **开发**: 开发工程师
- **测试**: 测试工程师
- **体验**: 新手妈妈体验官

---

**祝测试顺利！** 🎉
