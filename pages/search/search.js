// 搜索页面 - 🔧 P0修复: 集成AI智能引擎
const knowledgeData = require('../../data.js');
const app = getApp();

Page({
  data: {
    darkMode: false,
    keyword: '',
    searchResults: [],
    searched: false,
    searchHistory: [],
    refreshing: false,
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
    relatedArticles: [],
    // 月龄筛选
    ageFilters: [
      { id: 'all', name: '全部' },
      { id: 'age-0-1', name: '0-1岁' },
      { id: 'age-1-3', name: '1-3岁' },
      { id: 'age-3-6', name: '3-6岁' }
    ],
    currentAgeFilter: 'all',
    hasBabyInfo: false,
    babyAge: null
  },

  onLoad(options) {
    console.log('搜索页面加载', options);
    
    this.setData({
      darkMode: app.globalData.darkMode
    });
    
    this.loadSearchHistory();
    this.checkBabyInfo();
    
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

  // 检查宝宝信息
  checkBabyInfo() {
    const babyInfo = app.getBabyInfo();
    const babyAge = app.calculateBabyAge();
    
    if (babyInfo && babyAge) {
      let recommendedFilter = 'all';
      if (babyAge.totalMonths < 12) {
        recommendedFilter = 'age-0-1';
      } else if (babyAge.totalMonths < 36) {
        recommendedFilter = 'age-1-3';
      } else {
        recommendedFilter = 'age-3-6';
      }
      
      this.setData({
        hasBabyInfo: true,
        babyAge: babyAge,
        currentAgeFilter: recommendedFilter
      });
    }
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

  /**
   * 🔧 P0修复: 使用AI引擎进行智能搜索
   * 替换原来的简单字符串匹配为AI引擎的多维度相关度计算
   */
  doSearch() {
    const keyword = this.data.keyword.trim();
    
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return;
    }

    console.log('🔍 使用AI引擎搜索关键词:', keyword);
    wx.showLoading({
      title: '智能搜索中...'
    });

    // 使用AI引擎进行智能搜索
    setTimeout(() => {
      try {
        // 🔧 P0修复: 调用AI引擎的answer方法
        const aiResult = app.globalData.aiEngine.answer(keyword, {
          limit: 50,  // 获取更多结果,然后进行月龄筛选
          minScore: 0.1,
          boostByHistory: true  // 启用历史行为提升
        });

        console.log('AI引擎搜索结果数:', aiResult.total);

        // 月龄筛选
        let filteredResults = aiResult.results;
        const ageFilter = this.data.currentAgeFilter;

        if (ageFilter !== 'all') {
          filteredResults = aiResult.results.filter(article => {
            return article.categoryId === ageFilter;
          });
          console.log('月龄筛选后结果数:', filteredResults.length);
        }

        // 转换为页面需要的格式
        const results = filteredResults.map(article => {
          const categoryMap = {
            'feeding': '喂养',
            'sleep': '睡眠',
            'health': '健康',
            'care': '护理',
            'development': '发育',
            'education': '教育',
            'safety': '安全',
            'psychology': '心理',
            'age-0-1': '0-1岁',
            'age-1-3': '1-3岁',
            'age-3-6': '3-6岁',
            'general': '通用'
          };

          const categoryName = categoryMap[article.categoryId] || '综合';

          return {
            id: article.id,
            title: article.title,
            summary: article.summary || article.title,
            description: article.summary || article.description || article.title,
            categoryName: categoryName,  // ✅ 添加
            category: categoryName,
            categoryId: article.categoryId,
            tags: article.tags || [],
            content: article.content,
            ageRange: article.ageRange || null,
            relevanceScore: article.relevanceScore,
            highlightTitle: this.highlightKeyword(article.title, keyword),
            highlightSummary: this.highlightKeyword(
              article.summary || article.description || article.title, 
              keyword
            ),
            isTopMatch: article.relevanceScore > 0.8,
            isRecommended: article.relevanceScore > 0.5 && article.relevanceScore <= 0.8
          };
        });

        // 保存搜索历史
        this.saveSearchHistory(keyword);

        // 记录搜索行为到推荐引擎
        if (app.globalData.recommendationEngine) {
          app.globalData.recommendationEngine.recordSearch(keyword);
        }

        // 设置相关文章推荐
        let relatedArticles = [];
        if (results.length > 0) {
          relatedArticles = results
            .filter(a => a.categoryId !== results[0].categoryId)
            .slice(0, 3)
            .map(a => ({
              id: a.id,
              title: a.title
            }));
        }

        this.setData({
          searchResults: results,
          searched: true,
          relatedArticles: relatedArticles  // ✅ 添加
        });

        wx.hideLoading();

        // 显示搜索结果提示
        if (results.length === 0) {
          wx.showToast({
            title: '未找到相关内容',
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: `找到${results.length}条相关内容`,
            icon: 'success',
            duration: 1500
          });
        }

      } catch (e) {
        console.error('AI搜索失败:', e);
        wx.hideLoading();
        wx.showToast({
          title: '搜索失败,请重试',
          icon: 'none'
        });
      }
    }, 300);
  },

  // 高亮关键词
  highlightKeyword(text, keyword) {
    if (!text) return '';
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  },

  // 保存搜索历史
  saveSearchHistory(keyword) {
    let history = this.data.searchHistory;
    
    // 移除重复项
    history = history.filter(item => item !== keyword);
    
    // 添加到开头
    history.unshift(keyword);
    
    // 限制历史记录数量
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    this.setData({
      searchHistory: history
    });
    
    // 保存到本地存储
    try {
      wx.setStorageSync('searchHistory', history);
    } catch (e) {
      console.error('保存搜索历史失败:', e);
    }
  },

  // 加载搜索历史
  loadSearchHistory() {
    try {
      const history = wx.getStorageSync('searchHistory') || [];
      this.setData({
        searchHistory: history
      });
    } catch (e) {
      console.error('加载搜索历史失败:', e);
    }
  },

  // 清空搜索历史
  clearSearchHistory() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            searchHistory: []
          });
          try {
            wx.removeStorageSync('searchHistory');
          } catch (e) {
            console.error('清空搜索历史失败:', e);
          }
        }
      }
    });
  },

  // 点击历史记录
  clickHistoryItem(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      keyword: keyword
    });
    this.doSearch();
  },

  // 点击热门标签
  clickHotTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      keyword: tag
    });
    this.doSearch();
  },

  // 输入变化
  onInput(e) {
    this.setData({
      keyword: e.detail.value
    });
  },


  // 快速搜索（点击热门标签/搜索历史）
  quickSearch(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      keyword: keyword
    });
    this.doSearch();
  },

  // 清空输入
  clearInput() {
    this.setData({
      keyword: '',
      searchResults: [],
      searched: false
    });
  },

  // 切换月龄筛选
  switchAgeFilter(e) {
    const filter = e.currentTarget.dataset.id;
    this.setData({
      currentAgeFilter: filter
    });
    
    // 如果已经搜索过,重新搜索
    if (this.data.searched) {
      this.doSearch();
    }
  },

  // 阅读文章
  readArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`
    });
  },

  // 返回
  goBack() {
    wx.navigateBack();
  },

  // 语音搜索（占位实现）
  startVoiceSearch() {
    wx.showToast({
      title: '语音搜索即将上线',
      icon: 'none'
    });
  }
});
