// 功能测试脚本 - 版本1.2.0
console.log('=== 版本1.2.0 功能测试 ===\n');

// 模拟app.js中的月龄计算
function calculateBabyAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date('2026-02-27'); // 当前测试日期

  let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += today.getMonth();

  const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
  const ageMonths = Math.floor(days / 30);
  const ageDays = days % 30;

  return {
    totalDays: days,
    totalMonths: months,
    months: ageMonths,
    days: ageDays,
    text: `${ageMonths}个月${ageDays}天`
  };
}

// 模拟搜索功能
function testSearch() {
  console.log('1. 测试搜索功能');
  
  // 模拟文章数据
  const articles = [
    { id: '001', title: '新生儿睡眠指南', description: '帮助宝宝建立良好的睡眠习惯', tags: ['睡眠', '新生儿'] },
    { id: '002', title: '宝宝睡眠问题解答', description: '解决宝宝睡眠问题', tags: ['睡眠', '护理'] },
    { id: '003', title: '母乳喂养指南', description: '全面的母乳喂养知识', tags: ['喂养', '母乳'] }
  ];
  
  const keyword = '睡眠';
  
  const results = articles.map(article => {
    const titleMatch = article.title.toLowerCase().includes(keyword.toLowerCase());
    const descMatch = article.description && article.description.toLowerCase().includes(keyword.toLowerCase());
    const tagMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()));

    let relevance = 0;
    if (titleMatch) relevance += 10;
    if (tagMatch) relevance += 5;
    if (descMatch) relevance += 3;

    return {
      ...article,
      relevance: relevance,
      isTopMatch: titleMatch,
      isRecommended: relevance >= 5
    };
  }).filter(article => article.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);
  
  console.log('   搜索关键词:', keyword);
  console.log('   搜索结果数:', results.length);
  results.forEach(r => {
    console.log(`   - ${r.title} (相关度:${r.relevance}, 🔥最相关:${r.isTopMatch}, ⭐推荐:${r.isRecommended})`);
  });
  
  // 验证相关度标记
  const hasTopMatch = results.some(r => r.isTopMatch);
  const hasRecommended = results.some(r => r.isRecommended);
  console.log('   有🔥最相关标记:', hasTopMatch ? '✅' : '❌');
  console.log('   有⭐推荐标记:', hasRecommended ? '✅' : '❌');
  console.log('');
}

// 测试月龄计算
function testBabyAge() {
  console.log('2. 测试月龄计算');
  
  const testDate = '2025-09-01'; // 任务要求的测试日期
  const result = calculateBabyAge(testDate);
  
  console.log('   测试生日:', testDate);
  console.log('   计算结果:', result.text);
  console.log('   总天数:', result.totalDays);
  console.log('   总月龄:', result.totalMonths);
  
  // 验证计算是否合理（应该约5-6个月）
  const isReasonable = result.totalMonths >= 5 && result.totalMonths <= 6;
  console.log('   计算合理:', isReasonable ? '✅' : '❌');
  console.log('');
}

// 测试分类推荐
function testRecommendation() {
  console.log('3. 测试智能推荐');
  
  const ageInfo = calculateBabyAge('2025-09-01');
  let categoryId = '';
  
  if (ageInfo.totalMonths < 12) {
    categoryId = 'age-0-1';  // 0-1岁
  } else if (ageInfo.totalMonths < 36) {
    categoryId = 'age-1-3';  // 1-3岁
  } else {
    categoryId = 'age-3-6';  // 3-6岁
  }
  
  console.log('   宝宝月龄:', ageInfo.totalMonths, '个月');
  console.log('   推荐分类:', categoryId);
  console.log('   分类正确:', categoryId === 'age-0-1' ? '✅' : '❌');
  console.log('');
}

// 运行测试
testSearch();
testBabyAge();
testRecommendation();

console.log('=== 测试完成 ===');
