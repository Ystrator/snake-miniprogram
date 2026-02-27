// 收藏页面 - 修复版
Page({
  data: {
    favorites: []
  },

  onShow() {
    this.loadFavorites();
  },

  loadFavorites() {
    // 尝试从全局加载
    const app = getApp();
    let favorites = [];
    
    if (app && app.loadFavorites) {
      favorites = app.loadFavorites();
    } else {
      // 从本地存储加载
      favorites = wx.getStorageSync('favorites') || [];
    }
    
    console.log('收藏列表:', favorites.length);
    this.setData({ favorites });
  },

  readArticle(e) {
    const articleId = e.currentTarget.dataset.id;
    console.log('阅读收藏文章:', articleId);
    
    wx.navigateTo({
      url: `/pages/article/article?id=${articleId}`,
      success: () => {
        console.log('跳转成功');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '文章加载失败',
          icon: 'none'
        });
      }
    });
  },

  removeFavorite(e) {
    const articleId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认取消',
      content: '确定要取消收藏这篇文章吗？',
      success: (res) => {
        if (res.confirm) {
          // 尝试使用全局方法
          const app = getApp();
          if (app && app.removeFavorite) {
            app.removeFavorite(articleId);
          } else {
            // 本地存储
            let favorites = wx.getStorageSync('favorites') || [];
            favorites = favorites.filter(f => f.id !== articleId);
            wx.setStorageSync('favorites', favorites);
          }
          
          this.loadFavorites();
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          });
        }
      }
    });
  }
});
