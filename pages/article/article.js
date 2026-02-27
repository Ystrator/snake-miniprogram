// 文章详情页 - 带快速解答版
const articles = {
  '001': {
    id: '001',
    title: '新生儿睡眠指南',
    summary: '帮助宝宝建立良好的睡眠习惯，解决新生儿常见的睡眠问题。',
    quickAnswer: {
      title: '💤 30秒快速解答',
      tips: [
        '✅ 新生儿每天需要14-17小时睡眠',
        '✅ 保持室温20-22°C，使用硬质床垫',
        '✅ 建立睡前仪式：洗澡→抚触→轻音乐',
        '✅ 宝宝迷糊时放下，培养自主入睡'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '睡眠时间安排'
      },
      {
        type: 'bullet',
        items: [
          '新生儿（0-1个月）：每天睡眠14-17小时，昼夜无明显区分',
          '1-3个月：每天睡眠14-16小时，夜间睡眠逐渐延长',
          '3-6个月：每天睡眠12-15小时，可能开始睡整觉'
        ]
      },
      {
        type: 'heading',
        text: '睡眠环境'
      },
      {
        type: 'bullet',
        items: [
          '保持室温在20-22°C',
          '使用硬质床垫，避免枕头和厚重被褥',
          '保持房间安静、光线柔和',
          '仰卧睡眠，降低SIDS风险'
        ]
      },
      {
        type: 'heading',
        text: '建立睡眠习惯'
      },
      {
        type: 'numbered',
        items: [
          '固定作息时间：每天同一时间哄睡',
          '睡前仪式：洗澡、抚触、轻音乐',
          '分辨睡眠信号：揉眼睛、打哈欠、目光呆滞',
          '自主入睡：在宝宝迷糊但清醒时放下'
        ]
      },
      {
        type: 'heading',
        text: '常见问题'
      },
      {
        type: 'list',
        items: [
          { title: '夜醒频繁', desc: '检查饥饿、尿布、温度不适' },
          { title: '昼夜颠倒', desc: '白天多活动，晚上保持安静' },
          { title: '难以入睡', desc: '建立睡前程序，避免过度疲劳' }
        ]
      }
    ],
    tags: ['睡眠', '新生儿', '护理'],
    publishDate: '2025-01-15',
    categoryName: '0-1岁',
    categoryId: 'age-0-1'
  },
  '002': {
    id: '002',
    title: '母乳喂养实用指南',
    summary: '从初乳到断奶，全面的母乳喂养知识和技巧。',
    quickAnswer: {
      title: '🤱 30秒快速解答',
      tips: [
        '✅ 新生儿每天8-12次，按需喂养',
        '✅ 正确含乳：宝宝嘴巴张大，含住大部分乳晕',
        '✅ 喂奶后竖抱拍嗝，预防吐奶',
        '✅ 乳头皲裂？检查含乳姿势，涂抹羊脂膏'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '母乳的优势'
      },
      {
        type: 'bullet',
        items: [
          '含有完美营养配比，易于消化吸收',
          '富含抗体，增强宝宝免疫力',
          '促进母子情感联结',
          '降低母亲乳腺癌和卵巢癌风险'
        ]
      },
      {
        type: 'heading',
        text: '喂养频率'
      },
      {
        type: 'bullet',
        items: [
          '新生儿：每天8-12次，按需喂养',
          '1-3个月：每天7-9次，逐渐规律',
          '3-6个月：每天6-8次，可尝试规律作息'
        ]
      },
      {
        type: 'heading',
        text: '正确的含乳姿势'
      },
      {
        type: 'numbered',
        items: [
          '宝宝的鼻子对准乳头',
          '等待宝宝嘴巴张得很大',
          '将乳房塞入宝宝口中，含住大部分乳晕',
          '下巴紧贴乳房，嘴唇外翻'
        ]
      },
      {
        type: 'heading',
        text: '常见问题'
      },
      {
        type: 'list',
        items: [
          { title: '乳头皲裂', desc: '检查含乳姿势，涂抹羊脂膏' },
          { title: '堵奶', desc: '频繁喂奶，冷敷缓解，轻柔按摩' },
          { title: '奶量不足', desc: '增加喂养次数，保证充分休息和营养' }
        ]
      }
    ],
    tags: ['喂养', '母乳', '营养'],
    publishDate: '2025-01-10',
    categoryName: '0-1岁',
    categoryId: 'age-0-1'
  },
  '003': {
    id: '003',
    title: '宝宝发育里程碑0-12个月',
    summary: '了解宝宝在第一年的重要发育节点。',
    quickAnswer: {
      title: '👶 30秒快速解答',
      tips: [
        '✅ 0-3个月：抬头、微笑、发出咕咕声',
        '✅ 4-6个月：翻身、坐立、咿呀学语',
        '✅ 7-9个月：独坐、爬行、认生',
        '✅ 10-12个月：扶走、挥手、说单词'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '0-3个月'
      },
      {
        type: 'bullet',
        items: [
          '运动：抬头、转头、握拳',
          '社交：眼神接触、微笑',
          '语言：发出咕咕声、哭声不同化'
        ]
      },
      {
        type: 'heading',
        text: '4-6个月'
      },
      {
        type: 'bullet',
        items: [
          '运动：翻身、支撑坐立、抓握玩具',
          '社交：认出熟悉面孔、大笑',
          '语言：咿呀学语、对声音有反应'
        ]
      },
      {
        type: 'heading',
        text: '7-9个月'
      },
      {
        type: 'bullet',
        items: [
          '运动：独坐、爬行、扶站',
          '社交：认生、模仿声音',
          '语言：发出"ba/ma"音、理解简单词语'
        ]
      },
      {
        type: 'heading',
        text: '10-12个月'
      },
      {
        type: 'bullet',
        items: [
          '运动：扶走、独立站立、拇指食指对捏',
          '社交：挥手再见、玩躲猫猫',
          '语言：说1-2个有意义的词、理解简单指令'
        ]
      },
      {
        type: 'info',
        text: '每个宝宝发育速度不同，不必过分担心。如果明显落后于里程碑，建议咨询儿科医生。'
      }
    ],
    tags: ['发育', '里程碑', '成长'],
    publishDate: '2025-01-08',
    categoryName: '0-1岁',
    categoryId: 'age-0-1'
  },
  '101': {
    id: '101',
    title: '幼儿营养均衡饮食',
    summary: '如何为1-3岁幼儿提供均衡营养，培养良好饮食习惯。',
    quickAnswer: {
      title: '🍽️ 30秒快速解答',
      tips: [
        '✅ 每天三餐+两次加餐（水果、酸奶）',
        '✅ 蛋白质25-30g（肉、蛋、奶、豆制品）',
        '✅ 不强迫喂食，尊重宝宝食欲',
        '✅ 挑食？新食物需要尝试10-15次'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '每日营养需求'
      },
      {
        type: 'bullet',
        items: [
          '蛋白质：每天25-30g（肉、蛋、奶、豆制品）',
          '碳水化合物：占总能量50-60%（谷物、薯类）',
          '脂肪：占总能量30-35%（植物油、坚果）',
          '维生素和矿物质：丰富蔬果'
        ]
      },
      {
        type: 'heading',
        text: '培养良好饮食习惯'
      },
      {
        type: 'numbered',
        items: [
          '定时定量：每天固定时间吃饭',
          '不挑食不偏食：多种食物轮流提供',
          '自主进食：让宝宝学习自己吃饭',
          '限制零食：饭前1小时不吃零食'
        ]
      }
    ],
    tags: ['营养', '饮食', '健康'],
    publishDate: '2025-01-20',
    categoryName: '1-3岁',
    categoryId: 'age-1-3'
  },
  '102': {
    id: '102',
    title: '应对幼儿发脾气',
    summary: '理解并有效应对1-3岁幼儿的情绪爆发。',
    quickAnswer: {
      title: '😤 30秒快速解答',
      tips: [
        '✅ 保持冷静，不要生气',
        '✅ 确认情绪："我知道你很生气"',
        '✅ 安全前提下，不予理睬',
        '✅ 情绪平复后再沟通'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '为什么会发脾气？'
      },
      {
        type: 'bullet',
        items: [
          '语言能力有限：无法表达需求和情绪',
          '自我意识觉醒：想要独立但能力不足',
          '生理需求：饥饿、疲劳、不适',
          '环境刺激：过度兴奋或过度刺激'
        ]
      },
      {
        type: 'heading',
        text: '应对策略'
      },
      {
        type: 'numbered',
        items: [
          '保持规律作息：充足的睡眠和饮食',
          '提前预告：告知即将发生的变化',
          '给予选择权："你要穿红鞋子还是蓝鞋子？"',
          '设定明确界限：简单一致的规则'
        ]
      }
    ],
    tags: ['行为', '情绪', '心理'],
    publishDate: '2025-01-18',
    categoryName: '1-3岁',
    categoryId: 'age-1-3'
  },
  '103': {
    id: '103',
    title: '如厕训练指南',
    summary: '何时开始如厕训练，如何成功完成。',
    quickAnswer: {
      title: '🚽 30秒快速解答',
      tips: [
        '✅ 准备好的信号：尿布干燥2小时+',
        '✅ 18-24个月是最佳时机',
        '✅ 不要强迫，保持耐心',
        '✅ 意外正常，不要批评'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '准备好的信号'
      },
      {
        type: 'bullet',
        items: [
          '生理准备：尿布保持干燥2小时以上',
          '认知准备：能理解尿意和便意',
          '动作准备：能穿脱简单的裤子',
          '语言准备：能表达如厕需求'
        ]
      },
      {
        type: 'heading',
        text: '训练步骤'
      },
      {
        type: 'numbered',
        items: [
          '准备阶段：让宝宝熟悉便盆，读绘本',
          '观察阶段：记录排便规律，抓住时机',
          '练习阶段：每天固定时间坐便盆',
          '独立阶段：逐渐减少提醒，培养自主'
        ]
      }
    ],
    tags: ['如厕', '训练', '自理'],
    publishDate: '2025-01-12',
    categoryName: '1-3岁',
    categoryId: 'age-1-3'
  },
  '201': {
    id: '201',
    title: '培养孩子的社交能力',
    summary: '帮助3-6岁儿童建立良好的社交技能和人际关系。',
    quickAnswer: {
      title: '👫 30秒快速解答',
      tips: [
        '✅ 安排玩伴聚会，创造社交机会',
        '✅ 角色扮演游戏练习基本礼仪',
        '✅ 教导分享：轮流、合作、同理心',
        '✅ 亲自示范如何与人相处'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '社交发展里程碑'
      },
      {
        type: 'bullet',
        items: [
          '3岁：平行游戏，开始分享',
          '4岁：合作游戏，理解规则',
          '5岁：友谊关系，同理心发展',
          '6岁：团队协作，解决冲突'
        ]
      },
      {
        type: 'heading',
        text: '如何培养社交技能'
      },
      {
        type: 'numbered',
        items: [
          '角色扮演游戏：模拟日常社交场景',
          '练习问候、道歉、感谢：学习基本礼仪',
          '学习轮流和分享：通过游戏练习',
          '情绪教育：帮助认识情绪、教授表达方式'
        ]
      }
    ],
    tags: ['社交', '能力', '教育'],
    publishDate: '2025-01-22',
    categoryName: '3-6岁',
    categoryId: 'age-3-6'
  },
  '202': {
    id: '202',
    title: '学龄前儿童的情绪管理',
    summary: '帮助孩子认识和管理复杂情绪。',
    quickAnswer: {
      title: '💭 30秒快速解答',
      tips: [
        '✅ 帮助孩子命名情绪："你看起来很生气"',
        '✅ 接纳情绪："我理解你很失望"',
        '✅ 教授应对方法：深呼吸、数到十',
        '✅ 情绪平复后再讨论问题'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '情绪发展'
      },
      {
        type: 'bullet',
        items: [
          '情绪识别：能识别基本情绪',
          '情绪表达：语言表达能力增强',
          '情绪调节：开始学习自我安抚',
          '同理心：能理解他人感受'
        ]
      },
      {
        type: 'heading',
        text: '情绪教育步骤'
      },
      {
        type: 'numbered',
        items: [
          '命名情绪："你现在看起来很生气/伤心/兴奋..."',
          '确认感受："我理解你很失望，不能吃糖果..."',
          '设立界限："你可以生气，但不能打人"',
          '教授应对策略：深呼吸、数到十、画出感受'
        ]
      }
    ],
    tags: ['情绪', '心理', '教育'],
    publishDate: '2025-01-19',
    categoryName: '3-6岁',
    categoryId: 'age-3-6'
  },
  '203': {
    id: '203',
    title: '幼小衔接准备指南',
    summary: '为孩子进入小学做好全面准备。',
    quickAnswer: {
      title: '🏫 30秒快速解答',
      tips: [
        '✅ 培养专注力：15-25分钟逐渐延长',
        '✅ 生活自理：穿衣、吃饭、如厕独立',
        '✅ 社交能力：与同伴友好相处',
        '✅ 心理准备：正面谈论学校，减少焦虑'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '学习能力准备'
      },
      {
        type: 'bullet',
        items: [
          '专注力：逐步延长专注时间（15-25分钟）',
          '倾听能力：听指令、讲故事',
          '表达能力：清晰表达需求和想法',
          '好奇心：保护探索欲望'
        ]
      },
      {
        type: 'heading',
        text: '心理准备'
      },
      {
        type: 'bullet',
        items: [
          '正向引导：谈论学校的有趣之处',
          '参观学校：熟悉环境',
          '绘本阅读：读入学相关故事',
          '情感支持：接纳焦虑情绪'
        ]
      }
    ],
    tags: ['教育', '入学', '准备'],
    publishDate: '2025-01-25',
    categoryName: '3-6岁',
    categoryId: 'age-3-6'
  },
  '301': {
    id: '301',
    title: '儿童家庭安全指南',
    summary: '打造安全的家庭环境，预防意外伤害。',
    quickAnswer: {
      title: '🛡️ 30秒快速解答',
      tips: [
        '✅ 固定家具，使用安全插座保护盖',
        '✅ 清洁剂药品放高处，加锁保存',
        '✅ 热水放在宝宝够不到的地方',
        '✅ 学习CPR和海姆立克急救法'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '居家安全要点'
      },
      {
        type: 'bullet',
        items: [
          '客厅：固定家具防止倾倒、使用安全插座保护盖',
          '厨房：儿童安全锁锁住橱柜、锅柄转向内侧',
          '卫生间：防滑垫、马桶盖锁、药品上锁',
          '卧室：安全窗户锁、无绳窗帘、安全床围'
        ]
      },
      {
        type: 'heading',
        text: '意外预防'
      },
      {
        type: 'list',
        items: [
          { title: '窒息预防', desc: '避免小玩具、硬币、坚果；进食时坐立不跑动' },
          { title: '跌落预防', desc: '窗户安装限位器、阳台封闭、楼梯安装安全门' },
          { title: '烫伤预防', desc: '热水放在儿童够不到处、浴水先冷后热' }
        ]
      }
    ],
    tags: ['安全', '预防', '急救'],
    publishDate: '2025-01-05',
    categoryName: '通用知识',
    categoryId: 'general'
  },
  '302': {
    id: '302',
    title: '儿童常见疾病识别与护理',
    summary: '识别常见儿童疾病的症状，家庭护理方法。',
    quickAnswer: {
      title: '🤒 30秒快速解答',
      tips: [
        '✅ 发热>38.5°C：使用退烧药（布洛芬/对乙酰氨基酚）',
        '✅ 多喝水或稀释果汁，穿轻薄衣物',
        '✅ 3个月以下发热、>3天持续发热：立即就医',
        '✅ 按时接种疫苗，勤洗手，保持室内通风'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '发热'
      },
      {
        type: 'bullet',
        items: [
          '症状：体温>38°C，可能伴有乏力、食欲不振',
          '家庭护理：多喝水或稀释果汁、穿轻薄衣物、温水擦澡',
          '何时就医：3个月以下宝宝发热、发热超过3天'
        ]
      },
      {
        type: 'heading',
        text: '感冒'
      },
      {
        type: 'bullet',
        items: [
          '症状：流鼻涕、咳嗽、打喷嚏、低热',
          '家庭护理：充分休息、多喝水、加湿器帮助呼吸',
          '何时就医：呼吸困难、持续高热、症状超过10天'
        ]
      }
    ],
    tags: ['健康', '疾病', '护理'],
    publishDate: '2025-01-03',
    categoryName: '通用知识',
    categoryId: 'general'
  },
  '303': {
    id: '303',
    title: '建立良好的亲子关系',
    summary: '如何与孩子建立安全、信任的亲密关系。',
    quickAnswer: {
      title: '❤️ 30秒快速解答',
      tips: [
        '✅ 及时回应宝宝的需求和情绪信号',
        '✅ 每天15-30分钟专注的一对一时间',
        '✅ 多眼神交流和身体接触（拥抱、抚摸）',
        '✅ 尊重孩子的感受，避免否定情绪'
      ]
    },
    sections: [
      {
        type: 'heading',
        text: '建立依恋的关键'
      },
      {
        type: 'bullet',
        items: [
          '及时响应：回应宝宝的需求、关注情绪信号',
          '高质量陪伴：专注的互动时间、眼神交流',
          '情感可得性：可靠的在场、一致的回应'
        ]
      },
      {
        type: 'heading',
        text: '不同年龄段的需求'
      },
      {
        type: 'list',
        items: [
          { title: '婴儿期（0-1岁）', desc: '大量的身体接触、及时回应需求' },
          { title: '幼儿期（1-3岁）', desc: '尊重探索欲望、设定安全边界' },
          { title: '学龄前期（3-6岁）', desc: '倾听和交流、共同活动、正向强化' }
        ]
      }
    ],
    tags: ['关系', '心理', '家庭'],
    publishDate: '2025-01-01',
    categoryName: '通用知识',
    categoryId: 'general'
  }
};

Page({
  data: {
    article: {},
    isFavorited: false,
    darkMode: false
  },

  onLoad(options) {
    const articleId = options.id;
    console.log('文章页面加载', articleId);
    
    const article = articles[articleId];
    console.log('找到文章:', article ? article.id : '未找到');
    
    if (!article) {
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

    const app = getApp();
    this.setData({ 
      article,
      isFavorited: false,
      darkMode: app.globalData.darkMode
    });

    // 检查是否已收藏
    if (app && app.loadFavorites && app.isFavorited) {
      app.loadFavorites();
      this.setData({
        isFavorited: app.isFavorited(articleId)
      });
    }
  },

  onShow() {
    // 每次显示时更新夜间模式状态
    const app = getApp();
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
    const app = getApp();
    app.toggleDarkMode();
    this.setData({
      darkMode: app.globalData.darkMode
    });
    wx.showToast({
      title: this.data.darkMode ? '已关闭夜间模式' : '已开启夜间模式',
      icon: 'success',
      duration: 1500
    });
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  toggleFavorite() {
    const app = getApp();
    const article = this.data.article;

    // 检查 app 是否有收藏方法
    if (!app || !app.addFavorite || !app.removeFavorite) {
      wx.showToast({
        title: '收藏功能暂不可用',
        icon: 'none'
      });
      
      // 本地存储作为备用
      const favorites = wx.getStorageSync('favorites') || [];
      const isFav = favorites.some(f => f.id === article.id);
      
      if (isFav) {
        const newFav = favorites.filter(f => f.id !== article.id);
        wx.setStorageSync('favorites', newFav);
        this.setData({ isFavorited: false });
        wx.showToast({ title: '已取消收藏', icon: 'success' });
      } else {
        favorites.push(article);
        wx.setStorageSync('favorites', favorites);
        this.setData({ isFavorited: true });
        wx.showToast({ title: '收藏成功', icon: 'success' });
      }
      return;
    }

    // 使用全局收藏方法
    if (this.data.isFavorited) {
      app.removeFavorite(article.id);
      this.setData({ isFavorited: false });
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      });
    } else {
      app.addFavorite(article);
      this.setData({ isFavorited: true });
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
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
  }
});
