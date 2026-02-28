// 育儿小程序逻辑修复验证脚本
// 运行环境: Node.js
// 用途: 验证数据结构和核心逻辑是否正确

const knowledgeData = require('./data.js');

console.log('=== 育儿小程序逻辑修复验证 ===\n');

// 测试1: 验证所有文章都有categoryId字段
console.log('✅ 测试1: 验证文章categoryId字段');
let missingCategoryId = 0;
knowledgeData.allArticles.forEach((article, index) => {
  if (!article.categoryId) {
    console.error(`  ❌ 文章 ${article.id} 缺少 categoryId`);
    missingCategoryId++;
  }
});
if (missingCategoryId === 0) {
  console.log(`  ✅ 全部 ${knowledgeData.allArticles.length} 篇文章都有 categoryId`);
} else {
  console.log(`  ❌ ${missingCategoryId} 篇文章缺少 categoryId`);
}

// 测试2: 验证categoryId映射到正确的分类
console.log('\n✅ 测试2: 验证分类映射');
let invalidCategoryCount = 0;
const validCategoryIds = knowledgeData.categories.map(c => c.id);
knowledgeData.allArticles.forEach(article => {
  if (article.categoryId && !validCategoryIds.includes(article.categoryId)) {
    console.error(`  ❌ 文章 ${article.id} 的 categoryId "${article.categoryId}" 无效`);
    invalidCategoryCount++;
  }
});
if (invalidCategoryCount === 0) {
  console.log(`  ✅ 全部文章的 categoryId 都有效`);
} else {
  console.log(`  ❌ ${invalidCategoryCount} 篇文章的 categoryId 无效`);
}

// 测试3: 统计各分类文章数量
console.log('\n✅ 测试3: 分类文章统计');
const categoryStats = {};
knowledgeData.categories.forEach(cat => {
  categoryStats[cat.id] = 0;
});
knowledgeData.allArticles.forEach(article => {
  if (article.categoryId && categoryStats.hasOwnProperty(article.categoryId)) {
    categoryStats[article.categoryId]++;
  }
});
Object.keys(categoryStats).forEach(catId => {
  const cat = knowledgeData.categories.find(c => c.id === catId);
  console.log(`  📚 ${cat.name}: ${categoryStats[catId]} 篇文章`);
});

// 测试4: 验证搜索字段完整性
console.log('\n✅ 测试4: 验证搜索字段');
let missingTitle = 0;
let missingTags = 0;
knowledgeData.allArticles.forEach(article => {
  if (!article.title) missingTitle++;
  if (!article.tags || article.tags.length === 0) missingTags++;
});
console.log(`  ${missingTitle === 0 ? '✅' : '❌'} 标题字段: ${missingTitle} 个缺失`);
console.log(`  ${missingTags === 0 ? '✅' : '❌'} 标签字段: ${missingTags} 个缺失`);

// 测试5: 年龄计算逻辑测试
console.log('\n✅ 测试5: 年龄计算逻辑');
function calculateBabyAge(birthdayTimestamp) {
  const birthDate = new Date(birthdayTimestamp);
  const today = new Date();
  
  const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
  const totalMonths = Math.floor(totalDays / 30);
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  
  return {
    totalDays,
    totalMonths,
    months,
    days,
    text: `${months}个月${days}天`
  };
}

// 测试不同年龄
const testCases = [
  { name: '新生儿', daysAgo: 10 },
  { name: '6个月', daysAgo: 180 },
  { name: '1岁', daysAgo: 365 },
  { name: '2岁', daysAgo: 730 },
  { name: '3岁', daysAgo: 1095 }
];

testCases.forEach(testCase => {
  const birthday = new Date(Date.now() - testCase.daysAgo * 24 * 60 * 60 * 1000).getTime();
  const age = calculateBabyAge(birthday);
  console.log(`  👶 ${testCase.name} (${testCase.daysAgo}天): ${age.text} (总计${age.totalMonths}个月)`);
});

// 测试6: 推荐分类逻辑
console.log('\n✅ 测试6: 推荐分类逻辑');
function getRecommendedCategory(months) {
  if (months < 6) return 'age-0-1';
  else if (months < 12) return 'age-0-1';
  else if (months < 36) return 'age-1-3';
  else return 'age-3-6';
}

const ageTests = [
  { months: 3, expected: 'age-0-1' },
  { months: 8, expected: 'age-0-1' },
  { months: 18, expected: 'age-1-3' },
  { months: 48, expected: 'age-3-6' }
];

ageTests.forEach(test => {
  const result = getRecommendedCategory(test.months);
  const match = result === test.expected ? '✅' : '❌';
  console.log(`  ${match} ${test.months}个月 -> ${result} (期望: ${test.expected})`);
});

console.log('\n=== 验证完成 ===');
