// 首页逻辑 - 带调试版本
const app = getApp();

Page({
  data: {
    darkMode: false,
    hotArticles: [
      {
        id: '001',
        title: '新生儿睡眠指南',
        summary: '帮助宝宝建立良好的睡眠习惯，解决新生儿常见的睡眠问题。',
        categoryName: '0-1岁',
        categoryId: 'age-0-1',
        tags: ['睡眠', '新生儿'],
        publishDate: '2025-01-15'
      },
      {
        id: '002',
        title: '母乳喂养实用指南',
        summary: '从初乳到断奶，全面的母乳喂养知识和技巧。',
        categoryName: '0-1岁',
        categoryId: 'age-0-1',
        tags: ['喂养', '母乳'],
        publishDate: '2025-01-10'
      },
      {
        id: '003',
        title: '宝宝发育里程碑',
        summary: '了解0-12个月的重要发育节点。',
        categoryName: '0-1岁',
        categoryId: 'age-0-1',
        tags: ['发育', '成长'],
        publishDate: '2025-01-08'
      }
    ],
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
    // 加载夜间模式状态
    this.setData({
      darkMode: app.globalData.darkMode
    });
    wx.showToast({
      title: '欢迎回来',
      icon: 'success',
      duration: 1000
    });
  },

  onShow() {
    console.log('=== 首页显示 ===');
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

  // 切换夜间模式
  toggleDarkMode() {
    app.toggleDarkMode();
    wx.showToast({
      title: this.data.darkMode ? '已关闭夜间模式' : '已开启夜间模式',
      icon: 'success',
      duration: 1500
    });
  },

  // 跳转到搜索页
  goToSearch() {
    console.log('点击搜索框');
    wx.showToast({
      title: '跳转搜索...',
      icon: 'loading',
      duration: 500
    });
    
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/search/search',
        success: () => {
          console.log('搜索页跳转成功');
        },
        fail: (err) => {
          console.error('搜索页跳转失败:', err);
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    }, 500);
  },

  // 按关键词搜索
  searchKeyword(e) {
    const keyword = e.currentTarget.dataset.keyword;
    console.log('点击关键词按钮:', keyword);
    
    wx.showToast({
      title: `搜索: ${keyword}`,
      icon: 'loading',
      duration: 500
    });
    
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}`,
        success: () => {
          console.log('关键词搜索跳转成功:', keyword);
        },
        fail: (err) => {
          console.error('关键词搜索跳转失败:', err);
        }
      });
    }, 500);
  },

  // 跳转到分类页
  goToCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    console.log('点击分类卡片:', categoryId);
    
    wx.showToast({
      title: '打开分类...',
      icon: 'loading',
      duration: 500
    });
    
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/category/category?id=${categoryId}`,
        success: () => {
          console.log('分类页跳转成功:', categoryId);
        },
        fail: (err) => {
          console.error('分类页跳转失败:', err);
        }
      });
    }, 500);
  },

  // 阅读文章
  readArticle(e) {
    const articleId = e.currentTarget.dataset.id;
    console.log('点击文章卡片:', articleId);
    
    wx.showToast({
      title: '加载文章...',
      icon: 'loading',
      duration: 500
    });
    
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/article/article?id=${articleId}`,
        success: () => {
          console.log('文章页跳转成功:', articleId);
        },
        fail: (err) => {
          console.error('文章页跳转失败:', err);
        }
      });
    }, 500);
  },

  // 显示每日小贴士
  showDailyTip() {
    console.log('点击每日小贴士');
    
    const tips = [
      '🌟 宝宝的每一次哭泣都是在表达需求，请耐心倾听。',
      '💤 充足的睡眠有助于宝宝大脑发育，建立规律的作息非常重要。',
      '🤱 母乳是宝宝最好的食物，坚持母乳喂养至6个月。',
      '👶 多和宝宝说话、唱歌，有助于语言能力发展。',
      '🎵 给宝宝播放轻柔的音乐，可以安抚情绪，促进听觉发育。',
      '📚 亲子阅读是培养宝宝阅读兴趣的最好方式。',
      '🤗 拥抱和抚摸可以给宝宝安全感，促进情感发展。',
      '🎨 让宝宝自由探索，但要在安全的前提下。',
      '😴 白天多活动，晚上容易入睡，帮助宝宝建立昼夜节律。',
      '💡 父母的情绪稳定是宝宝最好的心理营养。'
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    console.log('随机小贴士:', randomTip);
    
    this.setData({
      dailyTip: randomTip,
      showTipModal: true
    });
  },

  // 隐藏小贴士
  hideDailyTip() {
    console.log('关闭小贴士弹窗');
    this.setData({
      showTipModal: false
    });
  },

  // 阻止冒泡
  stopPropagation() {
    console.log('阻止冒泡');
  },

  // 显示紧急情况指南
  showEmergencyGuide() {
    console.log('点击紧急情况指南');
    this.setData({
      showEmergencyModal: true
    });
  },

  // 隐藏紧急情况指南
  hideEmergencyGuide() {
    console.log('关闭紧急情况指南');
    this.setData({
      showEmergencyModal: false
    });
  }
});
