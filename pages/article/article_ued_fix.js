// 文章详情页 - UED优化版
const knowledgeData = require('../../data.js');

const app = getApp();

Page({
  data: {
    article: {},
    isFavorited: false,
    darkMode: false,
    themeAnimating: false  // 主题动画状态
  },

  onLoad(options) {
    const articleId = options.id;
    console.log('文章页面加载, articleId:', articleId);

    // 从 data.js 中查找文章
    // 支持 article_001 和 001 两种格式
    let article = null;

    // 首先尝试直接匹配
    article = knowledgeData.allArticles.find(a => a.id === articleId);

    // 如果没找到，尝试带前缀的格式
    if (!article && !articleId.startsWith('article_')) {
      article = knowledgeData.allArticles.find(a => a.id === `article_${articleId}`);
    }

    // 如果还没找到，尝试去掉前缀
    if (!article && articleId.startsWith('article_')) {
      const numericId = articleId.replace('article_', '');
      article = knowledgeData.allArticles.find(a => a.id === numericId || a.id === `article_${numericId}`);
    }

    console.log('找到文章:', article ? article.title : '未找到');

    if (!article) {
      console.error('未找到文章:', articleId);
      wx.showToast({
        title: '文章不存在',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
      return;
    }

    // 查找分类信息
    const category = knowledgeData.categories.find(cat => cat.id === article.categoryId);

    this.setData({
      darkMode: app.globalData.darkMode
    });

    // 构建文章数据（兼容现有页面结构）
    const articleData = {
      id: article.id,
      title: article.title,
      summary: article.summary || article.description,
      publishDate: article.publishDate || new Date().toISOString().split('T')[0],
      categoryName: category ? category.name : '通用知识',
      categoryId: article.categoryId || 'general',
      tags: article.tags || [],
      quickAnswers: article.quickAnswers || [],
      content: article.content || []
    };

    this.setData({
      article: articleData
    });

    console.log('文章数据已加载:', articleData.title);

    // 检查是否已收藏
    this.checkFavorite(articleId);
  },

  // 检查收藏状态
  checkFavorite(articleId) {
    // 标准化ID格式（确保使用文章的实际ID）
    const standardId = this.data.article.id;
    
    // 尝试从本地存储读取
    try {
      const favorites = wx.getStorageSync('favorites') || [];
      // 检查多种ID格式
      const isFav = favorites.some(f => 
        f.id === standardId || 
        f.id === articleId ||
        f.id === `article_${articleId}` ||
        f.id === articleId.replace('article_', '')
      );
      this.setData({ isFavorited: isFav });
    } catch (e) {
      console.error('读取收藏失败:', e);
    }

    // 如果有全局收藏方法，也尝试使用
    if (app && app.loadFavorites && app.isFavorited) {
      try {
        app.loadFavorites();
        const isFav = app.isFavorited(standardId);
        this.setData({ isFavorited: isFav });
      } catch (e) {
        console.error('全局收藏方法调用失败:', e);
      }
    }
  },

  onShow() {
    // 每次显示时更新夜间模式状态
    this.setData({
      darkMode: app.globalData.darkMode
    });
  },

  // 主题切换回调
  onThemeChange(enabled) {
    this.setData({
      darkMode: enabled
    });
  },

  // 🔥 切换夜间模式 - 增强版（带动画反馈）
  toggleDarkMode() {
    // 触发图标旋转动画
    this.setData({ themeAnimating: true });
    
    // 切换主题
    app.toggleDarkMode();
    this.setData({
      darkMode: app.globalData.darkMode
    });
    
    // 显示更强的视觉反馈
    wx.showToast({
      title: this.data.darkMode ? '🌙 夜间模式已开启' : '☀️ 日间模式已开启',
      icon: 'none',
      duration: 1500
    });
    
    // 震动反馈（如果设备支持）
    wx.vibrateShort({
      type: 'light'
    });
    
    // 动画结束后重置状态
    setTimeout(() => {
      this.setData({ themeAnimating: false });
    }, 500);
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 切换收藏
  toggleFavorite() {
    const article = this.data.article;

    // 优先使用全局收藏方法
    if (app && app.addFavorite && app.removeFavorite) {
      try {
        if (this.data.isFavorited) {
          app.removeFavorite(article.id);
          this.setData({ isFavorited: false });
          wx.showToast({ 
            title: '💔 已取消收藏', 
            icon: 'none',
            duration: 1500 
          });
        } else {
          app.addFavorite(article);
          this.setData({ isFavorited: true });
          wx.showToast({ 
            title: '❤️ 收藏成功', 
            icon: 'success',
            duration: 1500 
          });
        }
        // 震动反馈
        wx.vibrateShort({ type: 'light' });
        return;
      } catch (e) {
        console.error('全局收藏方法失败:', e);
      }
    }

    // 备用：使用本地存储
    try {
      const favorites = wx.getStorageSync('favorites') || [];
      const isFav = favorites.some(f => f.id === article.id);

      if (isFav) {
        const newFav = favorites.filter(f => f.id !== article.id);
        wx.setStorageSync('favorites', newFav);
        this.setData({ isFavorited: false });
        wx.showToast({ title: '💔 已取消收藏', icon: 'none' });
      } else {
        favorites.push(article);
        wx.setStorageSync('favorites', favorites);
        this.setData({ isFavorited: true });
        wx.showToast({ title: '❤️ 收藏成功', icon: 'success' });
      }
    } catch (e) {
      console.error('本地收藏失败:', e);
      wx.showToast({
        title: '收藏失败',
        icon: 'none'
      });
    }
  },

  // 分享文章
  shareArticle() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 分享配置
  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: `/pages/article/article?id=${this.data.article.id}`,
      imageUrl: ''
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.data.article.title,
      imageUrl: ''
    };
  }
});
