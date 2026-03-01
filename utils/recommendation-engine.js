/**
 * 个性化推荐引擎
 * 功能: 根据宝宝月龄、用户行为、兴趣偏好进行智能推荐
 */

class RecommendationEngine {
  constructor() {
    this.userBehavior = {
      viewHistory: [],
      favoriteArticles: [],
      searchHistory: [],
      readTimeStats: {}
    };
    this.articles = [];
  }

  /**
   * 初始化推荐引擎
   */
  init(articles) {
    this.articles = articles;
    this._loadBehaviorData();
    console.log('推荐引擎初始化完成，文章数:', articles.length);
  }

  /**
   * 加载用户行为数据
   */
  _loadBehaviorData() {
    try {
      const behaviorData = wx.getStorageSync('userBehavior');
      if (behaviorData) {
        this.userBehavior = behaviorData;
      }
    } catch (e) {
      console.error('加载用户行为数据失败:', e);
    }
  }

  /**
   * 保存用户行为数据
   */
  _saveBehaviorData() {
    try {
      wx.setStorageSync('userBehavior', this.userBehavior);
    } catch (e) {
      console.error('保存用户行为数据失败:', e);
    }
  }

  /**
   * 记录浏览行为
   */
  recordView(articleId, readDuration = 0) {
    const viewRecord = {
      articleId: articleId,
      timestamp: Date.now(),
      readDuration: readDuration,
      date: new Date().toDateString()
    };

    this.userBehavior.viewHistory.push(viewRecord);

    // 更新阅读时长统计
    if (!this.userBehavior.readTimeStats[articleId]) {
      this.userBehavior.readTimeStats[articleId] = {
        totalTime: 0,
        viewCount: 0
      };
    }
    this.userBehavior.readTimeStats[articleId].totalTime += readDuration;
    this.userBehavior.readTimeStats[articleId].viewCount += 1;

    // 限制历史记录数量
    if (this.userBehavior.viewHistory.length > 200) {
      this.userBehavior.viewHistory = this.userBehavior.viewHistory.slice(-200);
    }

    this._saveBehaviorData();
  }

  /**
   * 记录收藏行为
   */
  recordFavorite(articleId) {
    if (!this.userBehavior.favoriteArticles.includes(articleId)) {
      this.userBehavior.favoriteArticles.push(articleId);
      this._saveBehaviorData();
    }
  }

  /**
   * 取消收藏
   */
  removeFavorite(articleId) {
    const index = this.userBehavior.favoriteArticles.indexOf(articleId);
    if (index > -1) {
      this.userBehavior.favoriteArticles.splice(index, 1);
      this._saveBehaviorData();
    }
  }

  /**
   * 记录搜索行为
   */
  recordSearch(query) {
    const searchRecord = {
      query: query,
      timestamp: Date.now(),
      date: new Date().toDateString()
    };

    this.userBehavior.searchHistory.push(searchRecord);

    // 限制搜索历史
    if (this.userBehavior.searchHistory.length > 100) {
      this.userBehavior.searchHistory = this.userBehavior.searchHistory.slice(-100);
    }

    this._saveBehaviorData();
  }

  /**
   * 获取个性化推荐(多维度融合)
   */
  getPersonalizedRecommendations(options = {}) {
    const {
      babyAgeMonths = null,
      limit = 10,
      excludeViewed = false
    } = options;

    // 计算每篇文章的推荐分数
    const scoredArticles = this.articles.map(article => {
      const score = this._calculateRecommendationScore(article, babyAgeMonths);
      return {
        ...article,
        recommendationScore: score
      };
    });

    // 过滤已浏览的文章
    let filtered = scoredArticles;
    if (excludeViewed) {
      const viewedIds = this._getRecentlyViewedIds(50);
      filtered = scoredArticles.filter(a => !viewedIds.includes(a.id));
    }

    // 排序并限制数量
    const recommendations = filtered
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, limit);

    return recommendations;
  }

  /**
   * 计算推荐分数(多维度加权)
   */
  _calculateRecommendationScore(article, babyAgeMonths) {
    let score = 0;

    // 1. 年龄匹配度 (权重: 0.3)
    const ageScore = this._getAgeMatchScore(article, babyAgeMonths);
    score += ageScore * 0.3;

    // 2. 兴趣匹配度 (权重: 0.4)
    const interestScore = this._getInterestMatchScore(article);
    score += interestScore * 0.4;

    // 3. 热度分数 (权重: 0.2)
    const popularityScore = this._getPopularityScore(article);
    score += popularityScore * 0.2;

    // 4. 新鲜度分数 (权重: 0.1)
    const freshnessScore = this._getFreshnessScore(article);
    score += freshnessScore * 0.1;

    return score;
  }

  /**
   * 年龄匹配分数
   */
  _getAgeMatchScore(article, babyAgeMonths) {
    if (!babyAgeMonths) return 0.5; // 没有年龄信息，返回中等分数

    const categoryAgeMap = {
      'age-0-1': [0, 12],
      'age-1-3': [12, 36],
      'age-3-6': [36, 72],
      'general': [0, 72]
    };

    const ageRange = categoryAgeMap[article.categoryId];
    if (!ageRange) return 0.5;

    const [minAge, maxAge] = ageRange;

    if (babyAgeMonths >= minAge && babyAgeMonths <= maxAge) {
      // 在范围内，根据位置给分
      const midAge = (minAge + maxAge) / 2;
      const distance = Math.abs(babyAgeMonths - midAge);
      return Math.max(0.6, 1.0 - distance / (maxAge - minAge));
    } else {
      // 不在范围内，根据距离降低分数
      const distance = babyAgeMonths < minAge
        ? minAge - babyAgeMonths
        : babyAgeMonths - maxAge;
      return Math.max(0, 0.5 - distance / 12);
    }
  }

  /**
   * 兴趣匹配分数
   */
  _getInterestMatchScore(article) {
    const interests = this._analyzeInterests();
    let score = 0;

    // 标签兴趣匹配
    if (article.tags && interests.tags) {
      article.tags.forEach(tag => {
        if (interests.tags[tag]) {
          score += interests.tags[tag] * 0.5;
        }
      });
    }

    // 分类兴趣匹配
    if (interests.categories && interests.categories[article.categoryId]) {
      score += interests.categories[article.categoryId] * 0.5;
    }

    return Math.min(score, 1.0);
  }

  /**
   * 热度分数
   */
  _getPopularityScore(article) {
    const stats = this.userBehavior.readTimeStats[article.id];
    if (!stats) return 0.5;

    // 基于浏览次数和平均阅读时长
    const viewScore = Math.min(stats.viewCount / 10, 1.0);
    const timeScore = Math.min((stats.totalTime / stats.viewCount) / 120, 1.0);

    return (viewScore + timeScore) / 2;
  }

  /**
   * 新鲜度分数
   */
  _getFreshnessScore(article) {
    const views = this.userBehavior.viewHistory.filter(
      v => v.articleId === article.id
    );

    if (views.length === 0) return 1.0;

    // 最近浏览过的新鲜度低
    const lastView = views[views.length - 1];
    const daysSinceLastView = (Date.now() - lastView.timestamp) / (1000 * 60 * 60 * 24);

    if (daysSinceLastView > 30) return 1.0;
    if (daysSinceLastView > 7) return 0.7;
    if (daysSinceLastView > 1) return 0.4;
    return 0.2;
  }

  /**
   * 分析用户兴趣
   */
  _analyzeInterests() {
    const interests = {
      tags: {},
      categories: {}
    };

    // 从浏览历史分析
    this.userBehavior.viewHistory.forEach(record => {
      const article = this.articles.find(a => a.id === record.articleId);
      if (article) {
        // 标签兴趣
        if (article.tags) {
          article.tags.forEach(tag => {
            const weight = Math.min(record.readDuration / 60, 5); // 阅读时长作为权重
            interests.tags[tag] = (interests.tags[tag] || 0) + weight;
          });
        }

        // 分类兴趣
        if (article.categoryId) {
          const weight = Math.min(record.readDuration / 60, 5);
          interests.categories[article.categoryId] =
            (interests.categories[article.categoryId] || 0) + weight;
        }
      }
    });

    // 从收藏分析(额外加分)
    this.userBehavior.favoriteArticles.forEach(articleId => {
      const article = this.articles.find(a => a.id === articleId);
      if (article) {
        if (article.tags) {
          article.tags.forEach(tag => {
            interests.tags[tag] = (interests.tags[tag] || 0) + 3;
          });
        }
        if (article.categoryId) {
          interests.categories[article.categoryId] =
            (interests.categories[article.categoryId] || 0) + 3;
        }
      }
    });

    // 归一化
    this._normalizeInterests(interests);

    return interests;
  }

  /**
   * 归一化兴趣分数
   */
  _normalizeInterests(interests) {
    const maxTagScore = Math.max(...Object.values(interests.tags), 1);
    Object.keys(interests.tags).forEach(tag => {
      interests.tags[tag] = interests.tags[tag] / maxTagScore;
    });

    const maxCatScore = Math.max(...Object.values(interests.categories), 1);
    Object.keys(interests.categories).forEach(cat => {
      interests.categories[cat] = interests.categories[cat] / maxCatScore;
    });
  }

  /**
   * 获取最近浏览的文章ID
   */
  _getRecentlyViewedIds(limit) {
    return this.userBehavior.viewHistory
      .slice(-limit)
      .map(record => record.articleId);
  }

  /**
   * 获取根据月龄的推荐
   */
  getAgeBasedRecommendations(babyAgeMonths, limit = 10) {
    let categoryId;

    if (babyAgeMonths < 6) {
      categoryId = 'age-0-1';
    } else if (babyAgeMonths < 12) {
      categoryId = 'age-0-1';
    } else if (babyAgeMonths < 36) {
      categoryId = 'age-1-3';
    } else {
      categoryId = 'age-3-6';
    }

    const ageArticles = this.articles.filter(a => a.categoryId === categoryId);

    // 结合兴趣分数排序
    const scored = ageArticles.map(article => ({
      ...article,
      score: this._getInterestMatchScore(article)
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * 获取热门文章
   */
  getTrendingArticles(limit = 10) {
    const articleStats = {};

    this.userBehavior.viewHistory.forEach(record => {
      if (!articleStats[record.articleId]) {
        articleStats[record.articleId] = {
          views: 0,
          totalReadTime: 0
        };
      }
      articleStats[record.articleId].views += 1;
      articleStats[record.articleId].totalReadTime += record.readDuration;
    });

    const trending = Object.entries(articleStats)
      .map(([articleId, stats]) => {
        const article = this.articles.find(a => a.id === articleId);
        return {
          ...article,
          trendScore: stats.views * 0.6 + (stats.totalReadTime / 60) * 0.4
        };
      })
      .filter(a => a.id)
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit);

    return trending;
  }

  /**
   * 获取用户画像
   */
  getUserProfile() {
    return {
      interests: this._analyzeInterests(),
      totalViews: this.userBehavior.viewHistory.length,
      favoriteCount: this.userBehavior.favoriteArticles.length,
      totalSearches: this.userBehavior.searchHistory.length,
      topCategories: this._getTopCategories(),
      topTags: this._getTopTags()
    };
  }

  /**
   * 获取热门分类
   */
  _getTopCategories(limit = 3) {
    const interests = this._analyzeInterests();
    return Object.entries(interests.categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([catId, score]) => ({ catId, score }));
  }

  /**
   * 获取热门标签
   */
  _getTopTags(limit = 5) {
    const interests = this._analyzeInterests();
    return Object.entries(interests.tags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag, score]) => ({ tag, score }));
  }

  /**
   * 清空行为数据
   */
  clearBehavior() {
    this.userBehavior = {
      viewHistory: [],
      favoriteArticles: [],
      searchHistory: [],
      readTimeStats: {}
    };
    this._saveBehaviorData();
  }
}

const recommendationEngine = new RecommendationEngine();

module.exports = recommendationEngine;
