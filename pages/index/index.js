// 首页逻辑 - 🔧 P1修复: 使用推荐引擎进行个性化推荐
const app = getApp();

Page({
  data: {
    darkMode: false,
    babyName: '',
    babyAgeText: '',
    recommendedCategory: '',
    recommendedCategoryTitle: '',
    recommendedArticles: [],
    hotArticles: [],
    allArticles: [],
    showTipModal: false,
    dailyTip: '',
    showEmergencyModal: false,
    emergencyGuide: [
      {
        id: 'choking',
        title: '🍼 呛奶怎么办',
        steps: [
          '立即停止喂奶，保持宝宝直立',
          '轻拍宝宝背部，帮助排出奶液',
          '观察宝宝呼吸和脸色',
          '如果呼吸困难或脸色发紫，立即拨打120',
          '不要摇晃宝宝'
        ]
      },
      {
        id: 'fever',
        title: '🤒 宝宝发烧',
        steps: [
          '测量体温，确认发烧程度',
          '3个月以下宝宝超过38°C立即就医',
          '保持室内通风，不要穿太多',
          '多喂温水或奶液',
          '用温水擦拭身体帮助降温（不要用酒精）'
        ]
      },
      {
        id: 'crying',
        title: '😭 大哭不止',
        steps: [
          '检查是否饿了、尿布湿了、太热或太冷',
          '尝试安抚：轻拍、拥抱、白噪音',
          '检查是否有不适（尿布疹、衣物过紧）',
          '如果持续哭闹超过2小时，及时就医',
          '观察是否伴有其他症状（呕吐、发烧）'
        ]
      },
      {
        id: 'vomiting',
        title: '🤮 呕吐怎么办',
        steps: [
          '立即让宝宝侧卧，防止呛奶',
          '清理口腔，保持呼吸道通畅',
          '暂停喂奶，让胃休息30-60分钟',
          '少量多次喂水或奶液',
          '如果呕吐频繁或带血，立即就医'
        ]
      },
      {
        id: 'breathing',
        title: '😰 呼吸困难',
        steps: [
          '立即拨打120急救电话',
          '保持宝宝呼吸道通畅，清除口中异物',
          '让宝宝上半身稍微抬高',
          '保持冷静，观察宝宝脸色和意识',
          '不要喂食任何东西'
        ]
      }
    ]
  },

  onLoad() {
    console.log('=== 首页加载 ===');
    this.setData({
      darkMode: app.globalData.darkMode
    });
    this.loadArticles();
    this.loadBabyInfo();
  },

  onShow() {
    this.setData({
      darkMode: app.globalData.darkMode
    });
    this.loadBabyInfo();
  },

  /**
   * 加载文章数据
   * 将原始数据转换为推荐引擎需要的格式
   */
  loadArticles() {
    const knowledgeData = require('../../data.js');
    const allArticles = [];

    knowledgeData.allArticles.forEach(article => {
      let categoryId = 'general';
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
        'age-3-6': '3-6岁'
      };
      
      for (const [key, value] of Object.entries(categoryMap)) {
        if (article.category && article.category.includes(value)) {
          categoryId = key;
          break;
        }
      }

      allArticles.push({
        id: article.id,
        title: article.title,
        summary: article.summary || article.title,
        category: categoryMap[categoryId] || '综合',
        categoryId: categoryId,
        content: article.content,
        ageRange: article.ageRange || null,
        tags: article.tags || []
      });
    });

    this.setData({
      allArticles: allArticles,
      hotArticles: allArticles.slice(0, 10)
    });
  },

  /**
   * 🔧 P1修复: 使用推荐引擎生成个性化推荐
   * 替换原来的简单月龄筛选为多维度融合推荐
   */
  loadBabyInfo() {
    const babyInfo = app.getBabyInfo();
    const babyAge = app.calculateBabyAge();

    if (babyInfo && babyAge) {
      const months = babyAge.totalMonths;
      let recommendedCategory = '';
      let recommendedCategoryTitle = '';

      if (months < 12) {
        recommendedCategory = 'age-0-1';
        recommendedCategoryTitle = '0-1岁宝宝专属';
      } else if (months < 36) {
        recommendedCategory = 'age-1-3';
        recommendedCategoryTitle = '1-3岁宝宝专属';
      } else {
        recommendedCategory = 'age-3-6';
        recommendedCategoryTitle = '3-6岁宝宝专属';
      }

      // 🔧 P1修复: 使用推荐引擎获取个性化推荐
      let recommendedArticles = [];
      
      try {
        // 调用推荐引擎的个性化推荐方法
        const recommendations = app.globalData.recommendationEngine.getPersonalizedRecommendations({
          babyAgeMonths: months,
          limit: 4,
          excludeViewed: false  // 是否排除最近浏览过的文章
        });

        console.log('🎯 推荐引擎返回结果数:', recommendations.length);

        // 转换为页面需要的格式
        recommendedArticles = recommendations.map(article => {
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
            'age-3-6': '3-6岁'
          };

          return {
            id: article.id,
            title: article.title,
            summary: article.summary || article.title,
            category: categoryMap[article.categoryId] || '综合',
            categoryId: article.categoryId,
            content: article.content,
            ageRange: article.ageRange || null,
            recommendationScore: article.recommendationScore,
            recommendationScoreDisplay: article.recommendationScore ? Math.round(article.recommendationScore * 100) + '%' : '85%'
          };
        });

        // 如果推荐引擎返回的结果不足4篇,用月龄筛选补充
        if (recommendedArticles.length < 4) {
          console.log('推荐结果不足,使用月龄筛选补充');
          const ageFiltered = this.data.allArticles.filter(article => {
            return article.categoryId === recommendedCategory;
          });

          // 去重
          const existingIds = new Set(recommendedArticles.map(a => a.id));
          const supplement = ageFiltered
            .filter(a => !existingIds.has(a.id))
            .slice(0, 4 - recommendedArticles.length);

          recommendedArticles = [...recommendedArticles, ...supplement];
        }

      } catch (e) {
        console.error('❌ 推荐引擎调用失败,使用月龄筛选:', e);
        // 降级方案: 使用月龄筛选
        recommendedArticles = this.data.allArticles.filter(article => {
          return article.categoryId === recommendedCategory || 
                 article.title.includes(recommendedCategoryTitle.replace('宝宝专属', ''));
        }).slice(0, 4);
      }

      this.setData({
        babyName: babyInfo.name || '宝宝',
        babyAgeText: babyAge.text,
        recommendedCategory,
        recommendedCategoryTitle,
        recommendedArticles
      });
    } else {
      // 没有宝宝信息时,显示热门文章
      const hotArticles = this.data.allArticles.slice(0, 4);
      
      this.setData({
        babyName: '',
        babyAgeText: '',
        recommendedCategory: '',
        recommendedCategoryTitle: '热门推荐',
        recommendedArticles: hotArticles
      });
    }
  },

  // 主题切换
  toggleDarkMode() {
    app.toggleDarkMode();
    this.setData({
      darkMode: app.globalData.darkMode
    });
  },

  // 跳转到搜索
  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 搜索关键词
  searchKeyword(e) {
    const keyword = e.currentTarget.dataset.keyword;
    wx.navigateTo({
      url: `/pages/search/search?keyword=${keyword}`
    });
  },

  // 跳转到分类
  goToCategory(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/category/category?id=${id}`
    });
  },

  // 跳转到收藏
  goToFavorites() {
    wx.switchTab({
      url: '/pages/favorites/favorites'
    });
  },

  // 跳转到宝宝档案
  goToBaby() {
    wx.navigateTo({
      url: '/pages/baby/baby'
    });
  },

  // 跳转到发烧护理
  goToFever() {
    wx.navigateTo({
      url: '/pages/fever/fever'
    });
  },

  // 跳转到成长曲线
  goToGrowth() {
    wx.navigateTo({
      url: '/pages/growth/growth'
    });
  },

  // 跳转到疫苗提醒
  goToVaccine() {
    wx.navigateTo({
      url: '/pages/vaccine/vaccine'
    });
  },

  // 阅读文章
  readArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`
    });
  },

  // 显示紧急指南
  showEmergencyGuide() {
    this.setData({
      showEmergencyModal: true
    });
  },

  // 隐藏紧急指南
  hideEmergencyGuide() {
    this.setData({
      showEmergencyModal: false
    });
  },

  // 显示每日小贴士
  showDailyTip() {
    const tips = [
      '宝宝每次吃奶后都要拍嗝，防止吐奶',
      '新生儿每天睡眠时间可达16-18小时',
      '3个月内的宝宝不要枕头，防止颈部受伤',
      '宝宝发烧时，不要用酒精擦拭身体降温',
      '6个月后开始添加辅食，从单一食材开始',
      '1岁内的宝宝不要吃蜂蜜，防止肉毒杆菌中毒',
      '每天给宝宝做抚触按摩，促进发育',
      '保持室内湿度在50%-60%，宝宝更舒适',
      '宝宝哭闹时，先检查是否饿了或尿布湿了',
      '定期测量宝宝身高体重，记录成长曲线'
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    this.setData({
      dailyTip: randomTip,
      showTipModal: true
    });
  },

  // 隐藏每日小贴士
  hideDailyTip() {
    this.setData({
      showTipModal: false
    });
  },

  // 阻止冒泡
  stopPropagation() {
    return false;
  },

  // P3新增：跳转到专家问答
  goToExpert() {
    wx.navigateTo({
      url: '/pages/expert/expert'
    });
  },

  // P3新增：跳转到附近服务
  goToNearby() {
    wx.navigateTo({
      url: '/pages/nearby/nearby'
    });
  }
});
