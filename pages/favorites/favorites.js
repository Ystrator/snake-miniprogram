// 收藏页面 - 优化版（支持搜索和筛选）
Page({
  data: {
    favorites: [],
    filteredFavorites: [],
    searchKeyword: '',
    selectedCategory: ''
  },

  onShow() {
    this.loadFavorites();
  },

  loadFavorites() {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    const app = getApp();
    let favorites = [];
    
    if (app && app.loadFavorites) {
      favorites = app.loadFavorites();
    } else {
      favorites = wx.getStorageSync('favorites') || [];
    }
    
    console.log('收藏列表:', favorites.length);
    this.setData({ 
      favorites,
      filteredFavorites: favorites
    });
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value.toLowerCase();
    this.setData({ searchKeyword: keyword });
    this.filterFavorites();
  },

  // 按分类筛选
  filterByCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: category });
    this.filterFavorites();
  },

  // 执行筛选
  filterFavorites() {
    const { favorites, searchKeyword, selectedCategory } = this.data;
    
    let filtered = favorites;
    
    // 按搜索关键词筛选
    if (searchKeyword) {
      filtered = filtered.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchKeyword)) ||
        (item.summary && item.summary.toLowerCase().includes(searchKeyword))
      );
    }
    
    // 按分类筛选
    if (selectedCategory) {
      filtered = filtered.filter(item => item.categoryId === selectedCategory);
    }
    
    this.setData({ filteredFavorites: filtered });
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
          const app = getApp();
          if (app && app.removeFavorite) {
            app.removeFavorite(articleId);
          } else {
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
