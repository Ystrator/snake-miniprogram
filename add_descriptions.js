// 批量为文章添加 description 字段
const fs = require('fs');

// 读取 data.js
let content = fs.readFileSync('/tmp/parenting-miniprogram/data.js', 'utf8');

// 为现有文章添加 description 字段（基于 summary 字段）
const replacements = [
  {
    id: '001',
    title: '新生儿睡眠指南',
    description: '帮助宝宝建立良好睡眠习惯，解决新生儿常见睡眠问题'
  },
  {
    id: '002',
    title: '母乳喂养实用指南',
    description: '从初乳到断奶，全面的母乳喂养知识和技巧'
  },
  {
    id: '003',
    title: '宝宝发育里程碑0-12个月',
    description: '了解宝宝在第一年的重要发育节点和成长指标'
  },
  {
    id: '101',
    title: '幼儿营养均衡饮食',
    description: '如何为1-3岁幼儿提供均衡营养，培养良好饮食习惯'
  },
  {
    id: '102',
    title: '应对幼儿 tantrum（发脾气）',
    description: '理解并有效应对1-3岁幼儿的情绪爆发和行为问题'
  },
  {
    id: '103',
    title: '如厕训练指南',
    description: '何时开始如厕训练，如何成功完成如厕训练'
  },
  {
    id: '201',
    title: '培养孩子的社交能力',
    description: '帮助3-6岁儿童建立良好的社交技能和人际关系'
  },
  {
    id: '202',
    title: '学龄前儿童的情绪管理',
    description: '教授3-6岁儿童认识和管理情绪的方法'
  },
  {
    id: '301',
    title: '儿童安全座椅指南',
    description: '如何选择和使用儿童安全座椅，保障乘车安全'
  },
  {
    id: '302',
    title: '家庭安全隐患排查',
    description: '全面排查家中的安全隐患，为宝宝创造安全环境'
  },
  {
    id: '401',
    title: '宝宝发烧护理指南',
    description: '宝宝发烧怎么办？如何测量体温、物理降温和判断是否需要就医'
  },
  {
    id: '402',
    title: '感冒与流感护理',
    description: '宝宝感冒和流感的症状区分、家庭护理方法和预防措施'
  }
];

// 为每个文章添加 description
replacements.forEach(article => {
  // 匹配文章块，在 summary 后添加 description
  const regex = new RegExp(
    `(\\{\\s*id:\\s*'${article.id}',[\\s\\S]*?summary:\\s*'[^']*',)(\\s*content:)`,
    'g'
  );

  content = content.replace(regex, `$1\n          description: '${article.description}',$3`);
});

// 写回文件
fs.writeFileSync('/tmp/parenting-miniprogram/data.js', content, 'utf8');

console.log('✅ 已为所有文章添加 description 字段');
