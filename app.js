// 育儿知识大全 - 主程序
App({
  onLaunch() {
    console.log('育儿知识大全启动');
  },

  globalData: {
    userInfo: null,
    favorites: []
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
