// 育儿知识大全 - 主程序
// 引入AI引擎和推荐引擎
const aiEngine = require('./utils/ai-engine.js');
const recommendationEngine = require('./utils/recommendation-engine.js');

App({
  onLaunch() {
    console.log('育儿知识大全启动');

    // 🔧 P0修复: 初始化AI引擎和推荐引擎
    this.initEngines();

    // 加载夜间模式设置
    this.loadDarkMode();
    // 检查是否需要自动开启夜间模式
    this.checkAutoDarkMode();
  },

  globalData: {
    userInfo: null,
    favorites: [],
    darkMode: false,
    babyInfo: null,  // { birthday: timestamp, name: string }
    // 暴露AI引擎和推荐引擎实例,方便所有页面访问
    aiEngine: null,
    recommendationEngine: null
  },

  /**
   * 🔧 P0修复: 初始化AI引擎和推荐引擎
   * 在应用启动时加载知识库数据
   */
  initEngines() {
    try {
      // 加载文章数据
      const articles = require('./data.js').allArticles;

      // 初始化AI引擎的知识库
      aiEngine.initKnowledgeBase(articles);
      console.log('✅ AI引擎初始化完成,知识库文章数:', articles.length);

      // 初始化推荐引擎
      recommendationEngine.init(articles);
      console.log('✅ 推荐引擎初始化完成,文章数:', articles.length);

      // 将引擎实例挂载到globalData,方便页面访问
      this.globalData.aiEngine = aiEngine;
      this.globalData.recommendationEngine = recommendationEngine;

    } catch (e) {
      console.error('❌ 引擎初始化失败:', e);
    }
  },

  // 夜间模式管理
  loadDarkMode() {
    const darkMode = wx.getStorageSync('darkMode') || false;
    this.globalData.darkMode = darkMode;
  },

  setDarkMode(enabled) {
    this.globalData.darkMode = enabled;
    wx.setStorageSync('darkMode', enabled);
    // 通知所有页面更新主题
    const pages = getCurrentPages();
    pages.forEach(page => {
      if (page.onThemeChange) {
        page.onThemeChange(enabled);
      }
    });
  },

  toggleDarkMode() {
    this.setDarkMode(!this.globalData.darkMode);
  },

  // 自动夜间模式（晚上10点-早上7点）
  checkAutoDarkMode() {
    const hour = new Date().getHours();
    const shouldDarkMode = hour >= 22 || hour < 7;
    // 只在没有手动设置时自动切换
    const manualSet = wx.getStorageSync('darkModeManual');
    if (!manualSet && shouldDarkMode !== this.globalData.darkMode) {
      this.setDarkMode(shouldDarkMode);
    }
  },

  // 收藏管理
  addFavorite(article) {
    const favorites = this.globalData.favorites;
    if (!favorites.find(f => f.id === article.id)) {
      favorites.push(article);
      wx.setStorageSync('favorites', favorites);
    }
  },

  removeFavorite(articleId) {
    this.globalData.favorites = this.globalData.favorites.filter(f => f.id !== articleId);
    wx.setStorageSync('favorites', this.globalData.favorites);
  },

  isFavorited(articleId) {
    return this.globalData.favorites.some(f => f.id === articleId);
  },

  // 读取收藏
  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.globalData.favorites = favorites;
    return favorites;
  },

  // ============ 宝宝档案管理 ============
  // 设置宝宝信息
  setBabyInfo(birthday, name = '宝宝') {
    const babyInfo = {
      birthday: birthday,
      name: name
    };
    this.globalData.babyInfo = babyInfo;
    wx.setStorageSync('babyInfo', babyInfo);
    console.log('宝宝信息已保存:', babyInfo);
  },

  // 获取宝宝信息
  getBabyInfo() {
    if (!this.globalData.babyInfo) {
      const babyInfo = wx.getStorageSync('babyInfo');
      this.globalData.babyInfo = babyInfo;
    }
    return this.globalData.babyInfo;
  },

  // 计算宝宝月龄
  calculateBabyAge() {
    const babyInfo = this.getBabyInfo();
    if (!babyInfo || !babyInfo.birthday) {
      return null;
    }

    const birthDate = new Date(babyInfo.birthday);
    const today = new Date();

    // 计算总天数（更准确）
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    
    // 基于天数计算月龄（更准确）
    const totalMonths = Math.floor(totalDays / 30);
    
    // 计算显示用的月和天
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;

    return {
      totalDays: totalDays,
      totalMonths: totalMonths,  // 统一使用基于天数的月龄
      months: months,
      days: days,
      text: `${months}个月${days}天`
    };
  },

  // 根据月龄获取推荐文章分类
  getRecommendedCategory() {
    const ageInfo = this.calculateBabyAge();
    if (!ageInfo) return null;

    const months = ageInfo.totalMonths;

    if (months < 12) {
      return 'age-0-1';  // 0-1岁
    } else if (months < 36) {
      return 'age-1-3';  // 1-3岁
    } else {
      return 'age-3-6';  // 3-6岁
    }
  }
});
