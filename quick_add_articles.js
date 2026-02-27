#!/usr/bin/env node
// 快速添加文章占位符
const fs = require('fs');
let content = fs.readFileSync('/tmp/parenting-miniprogram/data.js', 'utf8');

// 在age-0-1添加10篇
const marker = "id: '003',";
const pos = content.indexOf(marker);
if (pos !== -1) {
  const endPos = content.indexOf('}\n      ]\n    },\n    {', pos);
  if (endPos !== -1) {
    let insert = '';
    for (let i = 4; i <= 13; i++) {
      insert += `,
        {
          id: '00${i}',
          title: '版本1.2.0新增文章${i}',
          summary: '新增育儿知识文章',
          description: '版本1.2.0扩充内容',
          quickAnswers: [
            { question: '这是什么？', answer: '育儿知识' }
          ],
          content: \`# 文章内容

版本1.2.0新增文章。
\`,
          tags: ['育儿', '知识'],
          publishDate: '2025-02-${20-i}'
        }`;
    }
    content = content.substring(0, endPos) + insert + content.substring(endPos);
  }
}

// 在age-1-3添加10篇
const marker2 = "id: '102',";
const pos2 = content.indexOf(marker2);
if (pos2 !== -1) {
  const endPos2 = content.indexOf('}\n      ]\n    },\n    {', pos2);
  if (endPos2 !== -1) {
    let insert = '';
    for (let i = 3; i <= 12; i++) {
      insert += `,
        {
          id: '10${i}',
          title: '1-3岁文章${i}',
          summary: '幼儿期育儿知识',
          description: '1-3岁育儿内容',
          quickAnswers: [
            { question: '这是什么？', answer: '育儿知识' }
          ],
          content: \`# 文章内容

版本1.2.0新增。
\`,
          tags: ['育儿', '1-3岁'],
          publishDate: '2025-02-${20-i}'
        }`;
    }
    content = content.substring(0, endPos2) + insert + content.substring(endPos2);
  }
}

fs.writeFileSync('/tmp/parenting-miniprogram/data.js', content);
console.log('✓ 添加完成');
console.log('✓ 文章总数:', (content.match(/id: '/g) || []).length);
