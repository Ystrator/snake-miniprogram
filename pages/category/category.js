// 分类页面 - 简化版
const app = getApp();

Page({
  data: {
    darkMode: false,
    categories: [
      {
        id: 'age-0-1',
        name: '0-1岁',
        icon: '👶',
        description: '新生儿护理与早期发育',
        articles: [
          {
            id: '001',
            title: '新生儿睡眠指南',
            summary: '帮助宝宝建立良好的睡眠习惯。',
            tags: ['睡眠', '新生儿'],
            publishDate: '2025-01-15'
          },
          {
            id: '002',
            title: '母乳喂养实用指南',
            summary: '从初乳到断奶的全面知识。',
            tags: ['喂养', '母乳'],
            publishDate: '2025-01-10'
          },
          {
            id: '003',
            title: '宝宝发育里程碑',
            summary: '了解0-12个月的重要发育节点。',
            tags: ['发育', '成长'],
            publishDate: '2025-01-08'
          }
        ]
      },
      {
        id: 'age-1-3',
        name: '1-3岁',
        icon: '🧒',
        description: '幼儿期营养与行为习惯',
        articles: [
          {
            id: '101',
            title: '幼儿营养均衡饮食',
            summary: '如何为1-3岁幼儿提供均衡营养。',
            tags: ['营养', '饮食'],
            publishDate: '2025-01-20'
          },
          {
            id: '102',
            title: '应对幼儿发脾气',
            summary: '理解并有效应对1-3岁幼儿的情绪爆发。',
            tags: ['行为', '情绪'],
            publishDate: '2025-01-18'
          },
          {
            id: '103',
            title: '如厕训练指南',
            summary: '何时开始如厕训练，如何成功完成。',
            tags: ['如厕', '训练'],
            publishDate: '2025-01-12'
          }
        ]
      },
      {
        id: 'age-3-6',
        name: '3-6岁',
        icon: '👦',
        description: '学龄前教育与社交发展',
        articles: [
          {
            id: '201',
            title: '培养孩子的社交能力',
            summary: '帮助3-6岁儿童建立良好的社交技能。',
            tags: ['社交', '能力'],
            publishDate: '2025-01-22'
          },
          {
            id: '202',
            title: '学龄前儿童的情绪管理',
            summary: '帮助孩子认识和管理复杂情绪。',
            tags: ['情绪', '心理'],
            publishDate: '2025-01-19'
          },
          {
            id: '203',
            title: '幼小衔接准备指南',
            summary: '为孩子进入小学做好全面准备。',
            tags: ['教育', '入学'],
            publishDate: '2025-01-25'
          }
        ]
      },
      {
        id: 'general',
        name: '通用知识',
        icon: '📚',
        description: '安全、健康与家庭关系',
        articles: [
          {
            id: '301',
            title: '儿童家庭安全指南',
            summary: '打造安全的家庭环境，预防意外伤害。',
            tags: ['安全', '预防'],
            publishDate: '2025-01-05'
          },
          {
            id: '302',
            title: '儿童常见疾病识别与护理',
            summary: '识别常见儿童疾病的症状，家庭护理方法。',
            tags: ['健康', '疾病'],
            publishDate: '2025-01-03'
          },
          {
            id: '303',
            title: '建立良好的亲子关系',
            summary: '如何与孩子建立安全、信任的亲密关系。',
            tags: ['关系', '心理'],
            publishDate: '2025-01-01'
          }
        ]
      }
    ],
    selectedCategory: null
  },

  onLoad(options) {
    console.log('分类页面加载', options);
    this.setData({
      darkMode: app.globalData.darkMode
    });
    if (options.id) {
      this.selectCategoryById(options.id);
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
    app.toggleDarkMode();
    wx.showToast({
      title: this.data.darkMode ? '已关闭夜间模式' : '已开启夜间模式',
      icon: 'success',
      duration: 1500
    });
  },

  selectCategoryById(categoryId) {
    const category = this.data.categories.find(c => c.id === categoryId);
    if (category) {
      this.setData({ selectedCategory: category });
      console.log('选择分类:', category.name);
    }
  },

  selectCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.selectCategoryById(categoryId);
  },

  readArticle(e) {
    const article = e.currentTarget.dataset.article;
    wx.navigateTo({
      url: `/pages/article/article?id=${article.id}`
    });
  }
});
