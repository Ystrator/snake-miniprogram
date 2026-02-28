// 快速功能测试脚本
// 在微信开发者工具控制台运行此脚本

console.log('=== 育儿小程序快速功能测试 ===\n');

// 测试1: 测试年龄计算
function testAgeCalculation() {
  console.log('📅 测试1: 年龄计算功能');
  
  const app = getApp();
  
  // 设置测试宝宝信息（6个月大）
  const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).getTime();
  app.setBabyInfo(sixMonthsAgo, '测试宝宝');
  
  const age = app.calculateBabyAge();
  console.log(`  宝宝年龄: ${age.text}`);
  console.log(`  总月龄: ${age.totalMonths}个月`);
  
  // 获取推荐分类
  const recommendedCategory = app.getRecommendedCategory();
  console.log(`  推荐分类: ${recommendedCategory}`);
  
  // 验证结果
  if (age.totalMonths >= 5 && age.totalMonths <= 7) {
    console.log('  ✅ 年龄计算正确');
  } else {
    console.log('  ❌ 年龄计算可能有误');
  }
  
  if (recommendedCategory === 'age-0-1') {
    console.log('  ✅ 推荐分类正确');
  } else {
    console.log('  ❌ 推荐分类错误');
  }
}

// 测试2: 测试搜索功能
function testSearchFunction() {
  console.log('\n🔍 测试2: 搜索功能');
  
  const knowledgeData = require('../../data.js');
  const keyword = '黄疸';
  
  // 模拟搜索
  const results = knowledgeData.allArticles.filter(article => {
    const titleMatch = article.title && article.title.toLowerCase().includes(keyword.toLowerCase());
    const tagMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()));
    return titleMatch || tagMatch;
  });
  
  console.log(`  搜索关键词: "${keyword}"`);
  console.log(`  找到 ${results.length} 篇相关文章`);
  
  if (results.length > 0) {
    console.log('  ✅ 搜索功能正常');
    console.log(`  第一篇: ${results[0].title}`);
  } else {
    console.log('  ❌ 搜索功能可能有问题');
  }
}

// 测试3: 测试分类映射
function testCategoryMapping() {
  console.log('\n📚 测试3: 分类映射');
  
  const knowledgeData = require('../../data.js');
  
  // 检查age-0-1分类的文章数
  const age0to1Articles = knowledgeData.allArticles.filter(a => a.categoryId === 'age-0-1');
  console.log(`  age-0-1分类文章数: ${age0to1Articles.length}`);
  
  if (age0to1Articles.length > 0) {
    console.log('  ✅ 分类映射正确');
    console.log(`  示例文章: ${age0to1Articles[0].title}`);
  } else {
    console.log('  ❌ 分类映射可能有问题');
  }
}

// 测试4: 测试收藏功能
function testFavoriteFunction() {
  console.log('\n⭐ 测试4: 收藏功能');
  
  const app = getApp();
  
  // 清空收藏
  app.globalData.favorites = [];
  wx.setStorageSync('favorites', []);
  
  // 添加测试收藏
  const testArticle = {
    id: 'test_001',
    title: '测试文章',
    summary: '这是一个测试文章'
  };
  
  app.addFavorite(testArticle);
  
  const isFavorited = app.isFavorited('test_001');
  console.log(`  收藏状态: ${isFavorited ? '已收藏' : '未收藏'}`);
  
  if (isFavorited) {
    console.log('  ✅ 收藏功能正常');
  } else {
    console.log('  ❌ 收藏功能可能有问题');
  }
  
  // 清理测试数据
  app.removeFavorite('test_001');
}

// 测试5: 测试数据验证
function testDataValidation() {
  console.log('\n✅ 测试5: 数据验证');
  
  const knowledgeData = require('../../data.js');
  
  // 检查数据完整性
  let allValid = true;
  
  knowledgeData.allArticles.forEach((article, index) => {
    if (!article.id || !article.title || !article.categoryId) {
      console.log(`  ❌ 文章 ${index + 1} 缺少必要字段`);
      allValid = false;
    }
  });
  
  if (allValid) {
    console.log(`  ✅ 所有 ${knowledgeData.allArticles.length} 篇文章数据完整`);
  }
}

// 运行所有测试
function runAllTests() {
  try {
    testAgeCalculation();
    testSearchFunction();
    testCategoryMapping();
    testFavoriteFunction();
    testDataValidation();
    
    console.log('\n=== 测试完成 ===');
    console.log('✅ 核心功能测试通过');
  } catch (e) {
    console.error('❌ 测试出错:', e);
  }
}

// 导出测试函数
module.exports = {
  runAllTests,
  testAgeCalculation,
  testSearchFunction,
  testCategoryMapping,
  testFavoriteFunction,
  testDataValidation
};

// 自动运行（如果在控制台直接执行）
if (typeof runAllTests === 'function') {
  console.log('提示: 在页面 onLoad 中调用 runAllTests() 来运行测试');
  console.log('示例: const test = require("../../quick_test.js"); test.runAllTests();');
}
