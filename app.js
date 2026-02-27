// 育儿知识大全 - 主程序
App({
  onLaunch() {
    console.log('育儿知识大全启动');
    // 加载夜间模式设置
    this.loadDarkMode();
    // 检查是否需要自动开启夜间模式
    this.checkAutoDarkMode();
  },

  globalData: {
    userInfo: null,
    favorites: [],
    darkMode: false
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
  }
});
