// 分类页面 - 动态加载版本
const knowledgeData = require('../../data.js');
const app = getApp();

Page({
  data: {
    darkMode: false,
    categories: [],
    selectedCategory: null
  },

  onLoad(options) {
    console.log('分类页面加载', options);

    // 从 data.js 加载分类数据
    const categories = knowledgeData.categories.map(category => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
      description: category.description,
      articles: category.articles || []
    }));

    this.setData({
      categories: categories,
      darkMode: app.globalData.darkMode
    });

    if (options.id) {
      this.selectCategoryById(options.id);
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

  selectCategoryById(categoryId) {
    const category = this.data.categories.find(c => c.id === categoryId);
    if (category) {
      this.setData({ selectedCategory: category });
      console.log('选择分类:', category.name, '文章数:', category.articles.length);
    } else {
      console.log('未找到分类:', categoryId);
    }
  },

  selectCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.selectCategoryById(categoryId);
  },

  readArticle(e) {
    const article = e.currentTarget.dataset.article;
    console.log('阅读文章:', article.id);
    wx.navigateTo({
      url: `/pages/article/article?id=${article.id}`,
      success: () => {
        console.log('文章页跳转成功');
      },
      fail: (err) => {
        console.error('文章页跳转失败:', err);
        wx.showToast({
          title: '打开文章失败',
          icon: 'none'
        });
      }
    });
  }
});
