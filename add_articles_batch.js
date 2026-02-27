#!/usr/bin/env node
/**
 * 版本1.2.0 - 批量添加新文章到data.js
 * 直接读取、修改、写入文件
 */

const fs = require('fs');

// 读取data.js
const dataPath = '/tmp/parenting-miniprogram/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

console.log('开始添加新文章...');

// 在age-0-1分类的articles数组末尾（id: '003'之后）添加新文章
const articles_0_1 = `
        {
          id: '004',
          title: '新生儿黄疸怎么办',
          summary: '新生儿黄疸是常见现象，本文介绍如何判断和处理黄疸',
          description: '新生儿黄疸是常见现象，本文介绍如何判断和处理黄疸',
          quickAnswers: [
            { question: '什么是生理性黄疸？', answer: '出生后2-3天出现，7-10天自行消退' },
            { question: '什么时候需要就医？', answer: '24小时内出现、数值过高、精神差' },
            { question: '如何帮助退黄？', answer: '多喂奶多排泄、适当晒太阳（避免直射）' },
            { question: '黄疸多久能好？', answer: '生理性黄疸通常2周内消退' }
          ],
          content: \`# 新生儿黄疸怎么办

## 黄疸的类型
- **生理性黄疸**：出生后2-3天出现，7-10天自行消退
- **病理性黄疸**：24小时内出现，或数值过高、持续时间过长

## 判断标准
- **轻度**：血清胆红素 < 12 mg/dL
- **中度**：血清胆红素 12-15 mg/dL
- **重度**：血清胆红素 > 15 mg/dL（需就医）

## 居家护理
1. **多喂奶多排泄**：每天8-12次，促进胆红素排出
2. **适当晒太阳**：隔着玻璃，每次15-20分钟，避免直射眼睛
3. **观察大便颜色**：黄色大便正常，陶土色需就医

## 何时就医
- 24小时内出现黄疸
- 黄疸程度加重或扩散到手脚心
- 宝宝精神差、不吃奶、嗜睡
- 黄疸持续超过2周
\`,
          tags: ['黄疸', '新生儿', '健康'],
          publishDate: '2025-02-20'
        },
        {
          id: '005',
          title: '新生儿脐带护理指南',
          summary: '学会正确护理宝宝脐带，预防感染',
          description: '学会正确护理宝宝脐带，预防感染',
          quickAnswers: [
            { question: '脐带多久脱落？', answer: '通常7-14天自然脱落' },
            { question: '怎么护理脐带？', answer: '保持干燥清洁，每天用碘伏消毒' },
            { question: '可以洗澡吗？', answer: '可以，但洗完后要立即擦干' },
            { question: '有异味怎么办？', answer: '可能是感染，立即就医' }
          ],
          content: \`# 新生儿脐带护理指南

## 脐带脱落时间
- **正常时间**：7-14天
- **延迟**：超过3周未脱落需咨询医生

## 正确护理方法
1. **洗手**：护理前务必洗手
2. **观察**：每天检查脐带根部是否有分泌物
3. **消毒**：用碘伏棉签从内向外擦拭
4. **保持干燥**：尿布要低于脐带，避免摩擦

## 注意事项
- 不要把尿布盖住脐带
- 洗澡后立即擦干
- 不要用手去抠脐带残端
- 穿宽松衣物，减少摩擦

## 异常情况
- 脐带根部有脓性分泌物
- 脐带周围皮肤红肿
- 有异味或出血
- 宝宝哭闹明显、发烧

以上情况需立即就医！
\`,
          tags: ['脐带', '护理', '新生儿'],
          publishDate: '2025-02-19'
        },
        {
          id: '006',
          title: '拍嗝的正确方法',
          summary: '学会正确的拍嗝技巧，减少宝宝溢奶和不适',
          description: '学会正确的拍嗝技巧，减少宝宝溢奶和不适',
          quickAnswers: [
            { question: '每次喂奶都要拍嗝吗？', answer: '是的，特别是奶粉喂养的宝宝' },
            { question: '拍多久合适？', answer: '通常5-10分钟，直到打出嗝为止' },
            { question: '拍不出嗝怎么办？', answer: '换姿势再试，或让宝宝右侧卧躺一会儿' },
            { question: '哪种拍嗝姿势最好？', answer: '竖抱拍背是最常用的方法' }
          ],
          content: \`# 拍嗝的正确方法

## 为什么要拍嗝
宝宝吃奶时容易吞入空气，拍嗝可以帮助排出气体，减少溢奶和不适。

## 三种拍嗝姿势

### 1. 竖抱拍背法（最常用）
- 让宝宝趴在肩膀上
- 一手托住宝宝屁股
- 另一手空心掌轻拍上背部
- 由下往上拍，力度适中

### 2. 坐腿拍背法
- 让宝宝坐在大腿上
- 一手扶住宝宝下巴和胸部
- 另一手轻拍或抚摸背部
- 身体稍微前倾

### 3. 俯卧托胸法
- 让宝宝趴在手臂上
- 手掌托住宝宝胸部
- 另一手轻拍或抚摸背部
- 头部略高于胸部

## 拍嗝技巧
- **时机**：喂奶中和喂奶后都要拍
- **时长**：5-10分钟
- **力度**：空心掌，由下往上
- **耐心**：不是每次都能拍出嗝

## 拍不出嗝怎么办
- 换个姿势再试试
- 让宝宝右侧卧躺15-20分钟
- 抚摸背部代替拍打
- 不必强求，有些宝宝不需要拍嗝
\`,
          tags: ['拍嗝', '喂养', '溢奶'],
          publishDate: '2025-02-18'
        }
`;

// 在id: '003'的文章后面插入
const marker003 = "id: '003',";
const insertPos = content.indexOf(marker003);
// 找到这篇文章的结束位置（下一个}之后，]之前）
let endPos = content.indexOf('}\n        }\n      ]', insertPos);
if (endPos === -1) {
  // 尝试另一种模式
  endPos = content.indexOf('}\n      ]', insertPos);
}

if (endPos !== -1) {
  // 在articles数组的]之前插入新文章
  const before = content.substring(0, endPos);
  const after = content.substring(endPos);
  
  // 插入逗号和新文章
  content = before + ',\n' + articles_0_1.trim() + after;
  console.log('✓ 已添加0-1岁分类文章');
}

// 备份原文件
fs.writeFileSync(dataPath + '.bak', content);
console.log('✓ 已备份原文件');

// 写入新文件
fs.writeFileSync(dataPath, content);
console.log('✓ 已更新data.js');

console.log('\n完成！');
