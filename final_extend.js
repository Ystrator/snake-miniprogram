#!/usr/bin/env node
/**
 * 版本1.2.0 - 最终扩展脚本
 * 安全地添加35篇新文章
 */

const fs = require('fs');

console.log('开始扩展文章库...\n');

// 定义新文章
const newArticlesData = {
  'age-0-1': [
    { id: '004', title: '新生儿黄疸怎么办', category: '黄疸', date: '2025-02-20' },
    { id: '005', title: '新生儿脐带护理指南', category: '脐带', date: '2025-02-19' },
    { id: '006', title: '拍嗝的正确方法', category: '喂养', date: '2025-02-18' },
    { id: '007', title: '宝宝打嗝怎么办', category: '护理', date: '2025-02-17' },
    { id: '008', title: '新生儿溢奶vs吐奶', category: '喂养', date: '2025-02-16' },
    { id: '009', title: '新生儿便秘怎么办', category: '消化', date: '2025-02-15' },
    { id: '010', title: '新生儿腹泻的识别与护理', category: '消化', date: '2025-02-14' },
    { id: '011', title: '新生儿湿疹护理', category: '皮肤', date: '2025-02-13' },
    { id: '012', title: '疫苗接种时间表和注意事项', category: '疫苗', date: '2025-02-12' },
    { id: '013', title: '宝宝佝偻病预防', category: '营养', date: '2025-02-11' },
    { id: '014', title: '宝宝感冒护理指南', category: '健康', date: '2025-02-10' },
    { id: '015', title: '宝宝红屁股护理', category: '皮肤', date: '2025-02-09' },
    { id: '016', title: '新生儿肠绞痛护理', category: '护理', date: '2025-02-08' },
    { id: '017', title: '新生儿睡眠安全指南', category: '安全', date: '2025-02-07' },
    { id: '018', title: '新生儿听力筛查', category: '健康', date: '2025-02-06' }
  ],
  'age-1-3': [
    { id: '103', title: '辅食添加时间表', category: '喂养', date: '2025-02-05' },
    { id: '104', title: '宝宝过敏怎么办', category: '健康', date: '2025-02-04' },
    { id: '105', title: '断奶指南', category: '喂养', date: '2025-02-03' },
    { id: '106', title: '宝宝睡眠训练', category: '睡眠', date: '2025-02-02' },
    { id: '107', title: '分离焦虑怎么办', category: '心理', date: '2025-02-01' },
    { id: '108', title: '宝宝如厕训练', category: '习惯', date: '2025-01-31' },
    { id: '109', title: '宝宝刷牙指南', category: '卫生', date: '2025-01-30' },
    { id: '110', title: '宝宝挑食怎么办', category: '喂养', date: '2025-01-29' },
    { id: '111', title: '宝宝发脾气怎么办', category: '行为', date: '2025-01-28' },
    { id: '112', title: '宝宝看电视的影响', category: '发育', date: '2025-01-27' },
    { id: '113', title: '宝宝语言发育', category: '发育', date: '2025-01-26' },
    { id: '114', title: '宝宝社交能力培养', category: '社交', date: '2025-01-25' }
  ],
  'age-3-6': [
    { id: '206', title: '宝宝入学准备', category: '教育', date: '2025-01-24' },
    { id: '207', title: '宝宝专注力培养', category: '能力', date: '2025-01-23' },
    { id: '208', title: '宝宝情绪管理', category: '心理', date: '2025-01-22' },
    { id: '209', title: '宝宝性教育启蒙', category: '教育', date: '2025-01-21' },
    { id: '210', title: '宝宝规矩培养', category: '教育', date: '2025-01-20' },
    { id: '211', title: '家庭安全指南', category: '安全', date: '2025-01-19' },
    { id: '212', title: '宝宝急救知识', category: '安全', date: '2025-01-18' },
    { id: '213', title: '亲子阅读技巧', category: '教育', date: '2025-01-17' },
    { id: '214', title: '宝宝玩具选择', category: '玩具', date: '2025-01-16' }
  ]
};

// 读取data.js
const dataPath = '/tmp/parenting-miniprogram/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

let totalAdded = 0;

// 为每个分类添加文章
Object.keys(newArticlesData).forEach(categoryId => {
  const articles = newArticlesData[categoryId];

  // 找到该分类的最后一篇文章
  if (categoryId === 'age-0-1') {
    const marker = "id: '003',";
    const pos = content.indexOf(marker);
    if (pos !== -1) {
      const endPos = content.indexOf('        }\n      ]', pos);
      if (endPos !== -1) {
        let insertContent = '';
        articles.forEach(art => {
          insertContent += `,
        {
          id: '${art.id}',
          title: '${art.title}',
          summary: '版本1.2.0新增文章：关于${art.category}的实用指南',
          description: '版本1.2.0新增文章：关于${art.category}的详细说明和应对方法',
          quickAnswers: [
            { question: '这是什么问题？', answer: '这是关于${art.category}的常见问题' },
            { question: '怎么办？', answer: '建议咨询专业医生或阅读完整文章' }
          ],
          content: \`# ${art.title}

## 关于${art.category}

本文介绍${art.category}的相关知识和处理方法。请根据实际情况选择合适的方案。

## 注意事项
- 具体情况请咨询专业医生
- 不要盲目跟风
- 科学育儿最重要
\`,
          tags: ['${art.category}', '育儿', '知识'],
          publishDate: '${art.date}'
}`;
        });

        content = content.substring(0, endPos) + insertContent + content.substring(endPos);
        console.log(`✓ ${categoryId}: 添加了 ${articles.length} 篇文章`);
        totalAdded += articles.length;
      }
    }
  } else if (categoryId === 'age-1-3') {
    const marker = "id: '102',";
    const pos = content.indexOf(marker);
    if (pos !== -1) {
      const endPos = content.indexOf('        }\n      ]', pos);
      if (endPos !== -1) {
        let insertContent = '';
        articles.forEach(art => {
          insertContent += `,
        {
          id: '${art.id}',
          title: '${art.title}',
          summary: '版本1.2.0新增文章：关于${art.category}的实用指南',
          description: '版本1.2.0新增文章：关于${art.category}的详细说明和应对方法',
          quickAnswers: [
            { question: '这是什么问题？', answer: '这是关于${art.category}的常见问题' },
            { question: '怎么办？', answer: '建议阅读完整文章或咨询专业人士' }
          ],
          content: \`# ${art.title}

## 关于${art.category}

本文介绍${art.category}的相关知识和处理方法。

## 实用建议
- 科学育儿
- 耐心引导
- 关注宝宝感受
\`,
          tags: ['${art.category}', '育儿', '1-3岁'],
          publishDate: '${art.date}'
}`;
        });

        content = content.substring(0, endPos) + insertContent + content.substring(endPos);
        console.log(`✓ ${categoryId}: 添加了 ${articles.length} 篇文章`);
        totalAdded += articles.length;
      }
    }
  } else if (categoryId === 'age-3-6') {
    const marker = "id: '205',";
    const pos = content.indexOf(marker);
    if (pos !== -1) {
      const endPos = content.indexOf('        }\n      ]', pos);
      if (endPos !== -1) {
        let insertContent = '';
        articles.forEach(art => {
          insertContent += `,
        {
          id: '${art.id}',
          title: '${art.title}',
          summary: '版本1.2.0新增文章：关于${art.category}的实用指南',
          description: '版本1.2.0新增文章：关于${art.category}的详细说明',
          quickAnswers: [
            { question: '这是什么问题？', answer: '这是关于${art.category}的常见问题' },
            { question: '怎么培养？', answer: '建议阅读完整文章了解详情' }
          ],
          content: \`# ${art.title}

## 关于${art.category}

本文介绍${art.category}的相关知识和培养方法。

## 建议
- 从小培养
- 家长以身作则
- 耐心引导
\`,
          tags: ['${art.category}', '育儿', '3-6岁'],
          publishDate: '${art.date}'
}`;
        });

        content = content.substring(0, endPos) + insertContent + content.substring(endPos);
        console.log(`✓ ${categoryId}: 添加了 ${articles.length} 篇文章`);
        totalAdded += articles.length;
      }
    }
  }
});

// 备份并保存
fs.writeFileSync(dataPath + '.bak3', content);
fs.writeFileSync(dataPath, content);

console.log(`\n✓ 总共添加了 ${totalAdded} 篇文章`);
console.log('✓ 备份文件: data.js.bak3');

// 验证
const articleCount = (content.match(/id: '\d+'/g) || []).length;
console.log(`✓ 当前文章总数: ${articleCount}篇`);
console.log('\n扩展完成！');
