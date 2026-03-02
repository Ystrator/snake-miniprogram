// 个人中心页面 - 用户行为分析版
const app = getApp();
const recommendationEngine = require('../../utils/recommendation-engine.js');
const storageManager = require('../../utils/storage-manager.js');

Page({
  data: {
    darkMode: false,
    nickname: '',
    birthday: '',
    gender: '',
    babyAgeText: '',
    hasProfile: false,
    // 用户行为分析数据
    userProfile: null,
    stats: {
      totalViews: 0,
      favoriteCount: 0,
      totalSearches: 0,
      avgReadTime: 0
    },
    topTags: [],
    topCategories: [],
    recentActivity: []
  },

  onLoad() {
    this.setData({
      darkMode: app.globalData.darkMode
    });
    this.loadProfile();
    this.loadUserBehavior();
  },

  onShow() {
    this.setData({
      darkMode: app.globalData.darkMode
    });
    // 每次显示时刷新用户行为数据
    this.loadUserBehavior();
  },

  onThemeChange(enabled) {
    this.setData({
      darkMode: enabled
    });
  },

  /**
   * 加载档案
   */
  loadProfile() {
    const profile = wx.getStorageSync('babyProfile');
    if (profile) {
      this.setData({
        nickname: profile.nickname || '',
        birthday: profile.birthday || '',
        gender: profile.gender || '',
        hasProfile: true
      });
      
      if (profile.birthday) {
        const babyAge = this.calculateAge(profile.birthday);
        this.setData({
          babyAgeText: babyAge
        });
      }
    }
  },

  /**
   * 加载用户行为数据
   */
  loadUserBehavior() {
    // 获取用户画像
    const profile = recommendationEngine.getUserProfile();
    
    // 获取统计信息
    const behavior = storageManager.getUserBehavior();
    const stats = {
      totalViews: behavior.viewHistory ? behavior.viewHistory.length : 0,
      favoriteCount: behavior.favoriteArticles ? behavior.favoriteArticles.length : 0,
      totalSearches: behavior.searchHistory ? behavior.searchHistory.length : 0,
      avgReadTime: this._calculateAvgReadTime(behavior.viewHistory || [])
    };

    // 获取最近活动
    const recentActivity = this._getRecentActivity(behavior);

    // 获取热门标签和分类
    const topTags = profile.interests ? 
      Object.entries(profile.interests.tags || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag, score]) => ({ tag, score: (score * 100).toFixed(0) }))
      : [];

    const topCategories = profile.interests ?
      Object.entries(profile.interests.categories || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([catId, score]) => {
          const categoryNames = {
            'age-0-1': '0-1岁',
            'age-1-3': '1-3岁',
            'age-3-6': '3-6岁',
            'general': '通用知识'
          };
          return {
            catId,
            name: categoryNames[catId] || catId,
            score: (score * 100).toFixed(0)
          };
        })
      : [];

    this.setData({
      userProfile: profile,
      stats: stats,
      topTags: topTags,
      topCategories: topCategories,
      recentActivity: recentActivity.slice(0, 5)
    });

    console.log('用户行为数据加载完成:', stats);
  },

  /**
   * 计算平均阅读时长
   */
  _calculateAvgReadTime(viewHistory) {
    if (!viewHistory || viewHistory.length === 0) return 0;

    const totalTime = viewHistory.reduce((sum, record) => {
      return sum + (record.readDuration || 0);
    }, 0);

    return Math.floor(totalTime / viewHistory);
  },

  /**
   * 获取最近活动
   */
  _getRecentActivity(behavior) {
    const activities = [];

    // 添加浏览记录
    if (behavior.viewHistory && behavior.viewHistory.length > 0) {
      behavior.viewHistory.slice(-5).forEach(record => {
        activities.push({
          type: 'view',
          articleId: record.articleId,
          timestamp: record.timestamp,
          readDuration: record.readDuration
        });
      });
    }

    // 添加搜索记录
    if (behavior.searchHistory && behavior.searchHistory.length > 0) {
      behavior.searchHistory.slice(-3).forEach(record => {
        activities.push({
          type: 'search',
          query: record.query,
          timestamp: record.timestamp
        });
      });
    }

    // 按时间排序
    return activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);
  },

  /**
   * 格式化时间
   */
  formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) {
      return '刚刚';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}小时前`;
    } else {
      return `${Math.floor(diff / 86400000)}天前`;
    }
  },

  onNicknameInput(e) {
    this.setData({
      nickname: e.detail.value
    });
  },

  onBirthdayChange(e) {
    const birthday = e.detail.value;
    this.setData({
      birthday: birthday
    });
    
    if (birthday) {
      const babyAge = this.calculateAge(birthday);
      this.setData({
        babyAgeText: babyAge
      });
    }
  },

  selectGender(e) {
    const gender = e.currentTarget.dataset.gender;
    this.setData({
      gender: gender
    });
  },

  calculateAge(birthdayStr) {
    const birthday = new Date(birthdayStr);
    const today = new Date();
    
    const days = Math.floor((today - birthday) / (1000 * 60 * 60 * 24));
    
    if (days < 0) {
      return '生日不能大于今天';
    }
    
    if (days < 30) {
      return `${days}天`;
    }
    
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    
    if (months < 12) {
      return remainingDays > 0 ? `${months}个月${remainingDays}天` : `${months}个月`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths > 0) {
      return `${years}岁${remainingMonths}个月`;
    } else {
      return `${years}岁`;
    }
  },

  saveProfile() {
    const { nickname, birthday, gender } = this.data;
    
    if (!nickname) {
      wx.showToast({
        title: '请输入小名',
        icon: 'none'
      });
      return;
    }
    
    if (!birthday) {
      wx.showToast({
        title: '请选择生日',
        icon: 'none'
      });
      return;
    }
    
    if (!gender) {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      });
      return;
    }
    
    const profile = {
      nickname,
      birthday,
      gender
    };
    
    try {
      wx.setStorageSync('babyProfile', profile);
      app.setBabyInfo(birthday, nickname);
      
      this.setData({
        hasProfile: true
      });
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (e) {
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      });
    }
  },

  deleteProfile() {
    wx.showModal({
      title: '确认删除',
      content: '删除后需要重新填写宝宝信息',
      success: (res) => {
        if (res.confirm) {
          try {
            wx.removeStorageSync('babyProfile');
            app.globalData.babyInfo = null;
            
            this.setData({
              nickname: '',
              birthday: '',
              gender: '',
              babyAgeText: '',
              hasProfile: false
            });
            
            wx.showToast({
              title: '已删除',
              icon: 'success'
            });
          } catch (e) {
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  /**
   * 清空行为数据
   */
  clearBehaviorData() {
    wx.showModal({
      title: '确认清空',
      content: '清空后将重新学习您的阅读偏好',
      success: (res) => {
        if (res.confirm) {
          recommendationEngine.clearBehavior();
          this.loadUserBehavior();
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  }
});
