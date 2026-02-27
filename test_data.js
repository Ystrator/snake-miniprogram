// 测试数据文件
console.log('数据文件已加载');

const knowledgeData = {
  categories: [
    {
      id: 'age-0-1',
      name: '0-1岁',
      icon: '👶',
      description: '新生儿护理与早期发育',
      articles: [
        {
          id: '001',
          title: '新生儿睡眠指南',
          summary: '帮助宝宝建立良好的睡眠习惯，解决新生儿常见的睡眠问题。',
          content: '# 新生儿睡眠指南\n\n## 睡眠时间安排\n- **新生儿（0-1个月）**：每天睡眠14-17小时',
          tags: ['睡眠', '新生儿', '护理'],
          publishDate: '2025-01-15'
        }
      ]
    }
  ],
  search(keyword) {
    console.log('搜索关键词:', keyword);
    const results = [];
    this.categories.forEach(category => {
      category.articles.forEach(article => {
        const searchText = `${article.title} ${article.summary} ${article.tags.join(' ')}`.toLowerCase();
        if (searchText.includes(keyword.toLowerCase())) {
          results.push({
            ...article,
            categoryName: category.name,
            categoryId: category.id
          });
        }
      });
    });
    return results;
  },
  getArticle(articleId) {
    console.log('获取文章:', articleId);
    for (const category of this.categories) {
      const article = category.articles.find(a => a.id === articleId);
      if (article) {
        return {
          ...article,
          categoryName: category.name,
          categoryId: category.id
        };
      }
    }
    return null;
  },
  getByTag(tag) {
    const results = [];
    this.categories.forEach(category => {
      category.articles.forEach(article => {
        if (article.tags.includes(tag)) {
          results.push({
            ...article,
            categoryName: category.name,
            categoryId: category.id
          });
        }
      });
    });
    return results;
  },
  getHotTags(limit = 20) {
    const tagCount = {};
    this.categories.forEach(category => {
      category.articles.forEach(article => {
        article.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
  }
};

console.log('知识库初始化完成');
console.log('分类数量:', knowledgeData.categories.length);
console.log('文章总数:', knowledgeData.categories.reduce((sum, c) => sum + c.articles.length, 0));

module.exports = knowledgeData;
