// 搜索页面 - 优化版本
const knowledgeData = require('../../data.js');

const app = getApp();

Page({
  data: {
    darkMode: false,
    keyword: '',
    searchResults: [],
    searched: false,
    hotTags: [
      { tag: '睡眠', count: 156 },
      { tag: '喂养', count: 132 },
      { tag: '发烧', count: 98 },
      { tag: '发育', count: 87 },
      { tag: '哭闹', count: 76 },
      { tag: '营养', count: 65 },
      { tag: '如厕', count: 54 },
      { tag: '安全', count: 132 }
    ],
    relatedArticles: []
  },

  onLoad(options) {
    console.log('搜索页面加载', options);
    this.setData({
      darkMode: app.globalData.darkMode
    });
    if (options.keyword) {
      this.setData({
        keyword: decodeURIComponent(options.keyword)
      });
      this.doSearch();
    }
  },

  onShow() {
    this.setData({
      darkMode: app.globalData.darkMode
    });
  },

  onThemeChange(enabled) {
    this.setData({
      darkMode: enabled
    });
  },

  toggleDarkMode() {
    app.toggleDarkMode();
    wx.showToast({
      title: this.data.darkMode ? '已关闭夜间模式' : '已开启夜间模式',
      icon: 'success',
      duration: 1500
    });
  },

  onSearchInput(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  doSearch() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    // 从allArticles中获取所有文章，并映射分类信息
    const categoryMap = {
      '0-6个月': 'age-0-1',
      '6-12个月': 'age-0-1',
      '1-3岁': 'age-1-3',
      '3-6岁': 'age-3-6',
      '通用': 'general'
    };

    let allArticles = knowledgeData.allArticles.map(article => {
      const categoryId = article.category ? (categoryMap[article.category] || 'general') : 'general';
      const category = knowledgeData.categories.find(cat => cat.id === categoryId);
      return {
        ...article,
        categoryName: category ? category.name : '通用知识',
        categoryId: categoryId
      };
    });

    // 搜索并计算相关度
    const results = allArticles.map(article => {
      const titleMatch = article.title && article.title.toLowerCase().includes(keyword.toLowerCase());
      const summaryMatch = article.summary && article.summary.toLowerCase().includes(keyword.toLowerCase());
      const descMatch = article.description && article.description.toLowerCase().includes(keyword.toLowerCase());
      const tagMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()));
      const categoryMatch = article.categoryName && article.categoryName.toLowerCase().includes(keyword.toLowerCase());

      let relevance = 0;
      if (titleMatch) relevance += 10;
      if (tagMatch) relevance += 5;
      if (categoryMatch) relevance += 4;
      if (descMatch) relevance += 3;
      if (summaryMatch) relevance += 2;

      return {
        ...article,
        relevance: relevance,
        isTopMatch: titleMatch,
        isRecommended: relevance >= 5
      };
    }).filter(article => article.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    // 获取相关文章推荐（取前3篇，排除当前搜索结果）
    const relatedArticles = allArticles
      .filter(article => !results.find(r => r.id === article.id))
      .slice(0, 3);

    this.setData({
      searchResults: results,
      searched: true,
      relatedArticles: relatedArticles
    });

    console.log('搜索结果:', results.length, '相关文章:', relatedArticles.length);
  },

  quickSearch(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword });
    this.doSearch();
  },

  readArticle(e) {
    const articleId = e.currentTarget.dataset.id;
    console.log('阅读文章:', articleId);

    wx.navigateTo({
      url: `/pages/article/article?id=${articleId}`,
      success: () => {
        console.log('跳转成功');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '打开文章失败',
          icon: 'none'
        });
      }
    });
  }
});
