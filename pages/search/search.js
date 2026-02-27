// 搜索页面 - 完整数据版
const allArticles = [
  {
    id: '001',
    title: '新生儿睡眠指南',
    summary: '帮助宝宝建立良好的睡眠习惯。',
    categoryName: '0-1岁',
    categoryId: 'age-0-1'
  },
  {
    id: '002',
    title: '母乳喂养实用指南',
    summary: '从初乳到断奶的全面知识。',
    categoryName: '0-1岁',
    categoryId: 'age-0-1'
  },
  {
    id: '003',
    title: '宝宝发育里程碑',
    summary: '了解0-12个月的重要发育节点。',
    categoryName: '0-1岁',
    categoryId: 'age-0-1'
  },
  {
    id: '101',
    title: '幼儿营养均衡饮食',
    summary: '如何为1-3岁幼儿提供均衡营养。',
    categoryName: '1-3岁',
    categoryId: 'age-1-3'
  },
  {
    id: '102',
    title: '应对幼儿发脾气',
    summary: '理解并有效应对1-3岁幼儿的情绪爆发。',
    categoryName: '1-3岁',
    categoryId: 'age-1-3'
  },
  {
    id: '103',
    title: '如厕训练指南',
    summary: '何时开始如厕训练，如何成功完成。',
    categoryName: '1-3岁',
    categoryId: 'age-1-3'
  },
  {
    id: '201',
    title: '培养孩子的社交能力',
    summary: '帮助3-6岁儿童建立良好的社交技能。',
    categoryName: '3-6岁',
    categoryId: 'age-3-6'
  },
  {
    id: '202',
    title: '学龄前儿童的情绪管理',
    summary: '帮助孩子认识和管理复杂情绪。',
    categoryName: '3-6岁',
    categoryId: 'age-3-6'
  },
  {
    id: '203',
    title: '幼小衔接准备指南',
    summary: '为孩子进入小学做好全面准备。',
    categoryName: '3-6岁',
    categoryId: 'age-3-6'
  },
  {
    id: '301',
    title: '儿童家庭安全指南',
    summary: '打造安全的家庭环境，预防意外伤害。',
    categoryName: '通用知识',
    categoryId: 'general'
  },
  {
    id: '302',
    title: '儿童常见疾病识别与护理',
    summary: '识别常见儿童疾病的症状，家庭护理方法。',
    categoryName: '通用知识',
    categoryId: 'general'
  },
  {
    id: '303',
    title: '建立良好的亲子关系',
    summary: '如何与孩子建立安全、信任的亲密关系。',
    categoryName: '通用知识',
    categoryId: 'general'
  }
];

const app = getApp();

Page({
  data: {
    darkMode: false,
    keyword: '',
    searchResults: [],
    searched: false,
    hotTags: [
      { tag: '睡眠' },
      { tag: '喂养' },
      { tag: '发育' },
      { tag: '营养' },
      { tag: '行为' },
      { tag: '情绪' },
      { tag: '教育' },
      { tag: '安全' },
      { tag: '健康' },
      { tag: '社交' }
    ]
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

    const results = allArticles.filter(article => {
      const searchText = `${article.title} ${article.summary} ${article.categoryName}`.toLowerCase();
      return searchText.includes(keyword.toLowerCase());
    });

    this.setData({
      searchResults: results,
      searched: true
    });

    console.log('搜索结果:', results.length);
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
      }
    });
  }
});
