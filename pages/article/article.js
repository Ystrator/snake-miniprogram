// 文章详情页 - 集成行为追踪
const knowledgeData = require('../../data.js');
const recommendationEngine = require('../../utils/recommendation-engine.js');
const storageManager = require('../../utils/storage-manager.js');

const app = getApp();

Page({
  data: {
    article: {},
    isFavorited: false,
    darkMode: false,
    themeAnimating: false,
    readStartTime: null,
    relatedArticles: []
  },

  onLoad(options) {
    const articleId = options.id;
    console.log('文章页面加载, articleId:', articleId);

    // 记录阅读开始时间
    this.setData({
      readStartTime: Date.now()
    });

    let article = null;

    article = knowledgeData.allArticles.find(a => a.id === articleId);

    if (!article && !articleId.startsWith('article_')) {
      article = knowledgeData.allArticles.find(a => a.id === `article_${articleId}`);
    }

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

    const category = knowledgeData.categories.find(cat => cat.id === article.categoryId);

    this.setData({
      darkMode: app.globalData.darkMode
    });

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

    this.checkFavorite(articleId);
    
    // 加载相关推荐
    this.loadRelatedArticles(article);
  },

  /**
   * 加载相关文章推荐
   */
  loadRelatedArticles(currentArticle) {
    const related = recommendationEngine.getPersonalizedRecommendations({
      babyAgeMonths: null,
      limit: 5,
      excludeViewed: false
    }).filter(a => 
      a.id !== currentArticle.id && 
      a.categoryId === currentArticle.categoryId
    ).slice(0, 3);

    this.setData({
      relatedArticles: related
    });

    console.log('相关文章推荐:', related.length, '篇');
  },

  checkFavorite(articleId) {
    const standardId = this.data.article.id;
    
    try {
      const favorites = wx.getStorageSync('favorites') || [];
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
    this.setData({ themeAnimating: true });
    
    app.toggleDarkMode();
    this.setData({
      darkMode: app.globalData.darkMode
    });
    
    wx.showToast({
      title: this.data.darkMode ? '🌙 夜间模式已开启' : '☀️ 日间模式已开启',
      icon: 'none',
      duration: 1500
    });
    
    wx.vibrateShort({
      type: 'light'
    });
    
    setTimeout(() => {
      this.setData({ themeAnimating: false });
    }, 500);
  },

  goBack() {
    this._recordReadDuration();
    wx.navigateBack();
  },

  /**
   * 记录阅读时长
   */
  _recordReadDuration() {
    if (!this.data.readStartTime) return;

    const readDuration = Math.floor((Date.now() - this.data.readStartTime) / 1000);
    
    if (readDuration > 0) {
      // 记录到推荐引擎
      recommendationEngine.recordView(this.data.article.id, readDuration);
      
      console.log('记录阅读时长:', readDuration, '秒');
      
      // 如果阅读时长超过30秒，认为是高质量阅读
      if (readDuration > 30) {
        wx.getStorage({
          key: 'userBehavior',
          success: (res) => {
            const behavior = res.data || { viewHistory: [] };
            behavior.viewHistory.push({
              articleId: this.data.article.id,
              timestamp: Date.now(),
              readDuration: readDuration,
              quality: 'high'
            });
            wx.setStorage({
              key: 'userBehavior',
              data: behavior
            });
          }
        });
      }
    }
  },

  /**
   * 页面卸载时记录阅读时长
   */
  onUnload() {
    this._recordReadDuration();
  },

  toggleFavorite() {
    const article = this.data.article;

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
          
          // 记录取消收藏行为
          recommendationEngine.removeFavorite(article.id);
        } else {
          app.addFavorite(article);
          this.setData({ isFavorited: true });
          wx.showToast({ 
            title: '❤️ 收藏成功', 
            icon: 'success',
            duration: 1500 
          });
          
          // 记录收藏行为
          recommendationEngine.recordFavorite(article.id);
        }
        
        wx.vibrateShort({ type: 'light' });
        return;
      } catch (e) {
        console.error('全局收藏方法失败:', e);
      }
    }

    try {
      const favorites = wx.getStorageSync('favorites') || [];
      const isFav = favorites.some(f => f.id === article.id);

      if (isFav) {
        const newFav = favorites.filter(f => f.id !== article.id);
        wx.setStorageSync('favorites', newFav);
        this.setData({ isFavorited: false });
        wx.showToast({ title: '💔 已取消收藏', icon: 'none' });
        
        recommendationEngine.removeFavorite(article.id);
      } else {
        favorites.push(article);
        wx.setStorageSync('favorites', favorites);
        this.setData({ isFavorited: true });
        wx.showToast({ title: '❤️ 收藏成功', icon: 'success' });
        
        recommendationEngine.recordFavorite(article.id);
      }
    } catch (e) {
      console.error('本地收藏失败:', e);
      wx.showToast({
        title: '收藏失败',
        icon: 'none'
      });
    }
  },

  shareArticle() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: `/pages/article/article?id=${this.data.article.id}`,
      imageUrl: ''
    };
  },

  onShareTimeline() {
    return {
      title: this.data.article.title,
      imageUrl: ''
    };
  },

  /**
   * 阅读相关文章
   */
  readRelatedArticle(e) {
    const articleId = e.currentTarget.dataset.id;
    console.log('阅读相关文章:', articleId);
    
    // 记录当前文章阅读时长
    this._recordReadDuration();
    
    wx.redirectTo({
      url: `/pages/article/article?id=${articleId}`
    });
  }
});
