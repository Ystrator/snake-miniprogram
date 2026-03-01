/**
 * AI智能问答引擎
 * 功能: 关键词匹配、自然语言查询、相关度排序
 */

class AIQuestionEngine {
  constructor() {
    this.knowledgeBase = [];
    this.userHistory = [];
    this.searchWeights = {
      title: 3.0,
      tags: 2.5,
      summary: 2.0,
      content: 1.0,
      category: 1.5
    };
  }

  initKnowledgeBase(articles) {
    this.knowledgeBase = articles.map(article => ({
      ...article,
      searchIndex: this._buildSearchIndex(article)
    }));
    console.log('AI问答引擎初始化完成，知识库文章数:', this.knowledgeBase.length);
  }

  _buildSearchIndex(article) {
    const index = {
      keywords: new Set(),
      tokens: []
    };

    const titleWords = this._tokenize(article.title);
    titleWords.forEach(word => index.keywords.add(word));

    if (article.tags) {
      article.tags.forEach(tag => {
        index.keywords.add(tag.toLowerCase());
      });
    }

    if (article.category) {
      index.keywords.add(article.category.toLowerCase());
    }

    if (article.summary) {
      const summaryWords = this._tokenize(article.summary);
      summaryWords.forEach(word => index.keywords.add(word));
    }

    if (article.content && Array.isArray(article.content)) {
      article.content.forEach(section => {
        if (section.text) {
          const words = this._tokenize(section.text);
          words.forEach(word => index.keywords.add(word));
        }
      });
    }

    if (article.quickAnswers) {
      article.quickAnswers.forEach(qa => {
        const qWords = this._tokenize(qa.question);
        const aWords = this._tokenize(qa.answer);
        qWords.forEach(word => index.keywords.add(word));
        aWords.forEach(word => index.keywords.add(word));
      });
    }

    index.tokens = Array.from(index.keywords);
    return index;
  }

  _tokenize(text) {
    if (!text) return [];

    const cleanText = text
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const tokens = [];
    const chineseChars = cleanText.match(/[\u4e00-\u9fa5]/g);
    const englishWords = cleanText.match(/[a-zA-Z0-9]+/g);

    if (chineseChars) {
      for (let i = 0; i < chineseChars.length; i++) {
        tokens.push(chineseChars[i]);
        if (i < chineseChars.length - 1) {
          tokens.push(chineseChars[i] + chineseChars[i + 1]);
        }
      }
    }

    if (englishWords) {
      englishWords.forEach(word => {
        if (word.length >= 2) {
          tokens.push(word);
        }
      });
    }

    return tokens;
  }

  answer(query, options = {}) {
    if (!query || !query.trim()) {
      return {
        results: [],
        query: '',
        total: 0
      };
    }

    const {
      limit = 10,
      minScore = 0.1,
      boostByHistory = true
    } = options;

    const queryTokens = this._tokenize(query);
    console.log('查询分词:', queryTokens);

    const scoredArticles = this.knowledgeBase.map(article => {
      const score = this._calculateRelevance(article, queryTokens, query);
      return {
        ...article,
        relevanceScore: score
      };
    });

    let finalResults = scoredArticles;
    if (boostByHistory && this.userHistory.length > 0) {
      finalResults = this._boostByHistory(scoredArticles);
    }

    const filtered = finalResults
      .filter(item => item.relevanceScore >= minScore)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    this._recordQuery(query, filtered);

    return {
      results: filtered,
      query: query,
      total: filtered.length,
      suggestions: this._generateSuggestions(query, filtered)
    };
  }

  _calculateRelevance(article, queryTokens, originalQuery) {
    let totalScore = 0;
    const index = article.searchIndex;

    if (!index || !index.keywords) {
      return 0;
    }

    const keywordSet = index.keywords;

    const titleMatch = this._matchInText(article.title, queryTokens);
    totalScore += titleMatch.score * this.searchWeights.title;

    if (article.tags) {
      const tagMatch = this._matchInArray(article.tags, queryTokens);
      totalScore += tagMatch.score * this.searchWeights.tags;
    }

    if (article.category) {
      const categoryMatch = this._matchInText(article.category, queryTokens);
      totalScore += categoryMatch.score * this.searchWeights.category;
    }

    if (article.summary) {
      const summaryMatch = this._matchInText(article.summary, queryTokens);
      totalScore += summaryMatch.score * this.searchWeights.summary;
    }

    const contentMatch = this._matchInKeywords(keywordSet, queryTokens);
    totalScore += contentMatch.score * this.searchWeights.content;

    if (originalQuery && article.title.includes(originalQuery)) {
      totalScore += 2.0;
    }

    return totalScore;
  }

  _matchInText(text, tokens) {
    if (!text) return { score: 0, matches: [] };

    const lowerText = text.toLowerCase();
    let matchCount = 0;
    const matchedTokens = [];

    tokens.forEach(token => {
      if (lowerText.includes(token)) {
        matchCount++;
        matchedTokens.push(token);
      }
    });

    return {
      score: matchCount > 0 ? matchCount / tokens.length : 0,
      matches: matchedTokens
    };
  }

  _matchInArray(arr, tokens) {
    if (!arr || arr.length === 0) return { score: 0, matches: [] };

    let matchCount = 0;
    const matchedTokens = [];

    tokens.forEach(token => {
      arr.forEach(item => {
        if (item && item.toLowerCase().includes(token)) {
          matchCount++;
          matchedTokens.push(token);
        }
      });
    });

    return {
      score: matchCount > 0 ? Math.min(matchCount / tokens.length, 1.0) : 0,
      matches: matchedTokens
    };
  }

  _matchInKeywords(keywordSet, tokens) {
    let matchCount = 0;
    const matchedTokens = [];

    tokens.forEach(token => {
      if (keywordSet.has(token)) {
        matchCount++;
        matchedTokens.push(token);
      }
    });

    return {
      score: matchCount / tokens.length,
      matches: matchedTokens
    };
  }

  _boostByHistory(scoredArticles) {
    const interests = this._analyzeUserInterests();

    return scoredArticles.map(article => {
      let boost = 0;

      if (article.tags) {
        article.tags.forEach(tag => {
          if (interests.tags[tag]) {
            boost += interests.tags[tag] * 0.3;
          }
        });
      }

      if (interests.categories[article.categoryId]) {
        boost += interests.categories[article.categoryId] * 0.2;
      }

      return {
        ...article,
        relevanceScore: article.relevanceScore * (1 + boost)
      };
    });
  }

  _analyzeUserInterests() {
    const interests = {
      tags: {},
      categories: {}
    };

    this.userHistory.forEach(record => {
      if (record.tags) {
        record.tags.forEach(tag => {
          interests.tags[tag] = (interests.tags[tag] || 0) + 1;
        });
      }
      if (record.categoryId) {
        interests.categories[record.categoryId] =
          (interests.categories[record.categoryId] || 0) + 1;
      }
    });

    const totalTags = Object.values(interests.tags).reduce((a, b) => a + b, 0);
    if (totalTags > 0) {
      Object.keys(interests.tags).forEach(tag => {
        interests.tags[tag] = interests.tags[tag] / totalTags;
      });
    }

    const totalCats = Object.values(interests.categories).reduce((a, b) => a + b, 0);
    if (totalCats > 0) {
      Object.keys(interests.categories).forEach(cat => {
        interests.categories[cat] = interests.categories[cat] / totalCats;
      });
    }

    return interests;
  }

  _recordQuery(query, results) {
    if (results.length > 0) {
      const topResult = results[0];
      this.userHistory.push({
        query: query,
        articleId: topResult.id,
        title: topResult.title,
        tags: topResult.tags,
        categoryId: topResult.categoryId,
        timestamp: Date.now()
      });

      if (this.userHistory.length > 100) {
        this.userHistory = this.userHistory.slice(-100);
      }
    }
  }

  _generateSuggestions(query, results) {
    const suggestions = [];

    if (results.length < 3) {
      const relatedQueries = this.userHistory
        .filter(record => record.query.includes(query) || query.includes(record.query))
        .map(record => record.query)
        .filter((q, i, self) => self.indexOf(q) === i)
        .slice(0, 3);

      suggestions.push(...relatedQueries);
    }

    return suggestions;
  }

  getHotSearches(limit = 10) {
    const searchCount = {};

    this.userHistory.forEach(record => {
      const query = record.query;
      searchCount[query] = (searchCount[query] || 0) + 1;
    });

    return Object.entries(searchCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([query, count]) => ({ query, count }));
  }

  clearHistory() {
    this.userHistory = [];
  }

  getUserProfile() {
    return {
      interests: this._analyzeUserInterests(),
      totalQueries: this.userHistory.length,
      lastQuery: this.userHistory.length > 0
        ? this.userHistory[this.userHistory.length - 1]
        : null
    };
  }
}

const aiEngine = new AIQuestionEngine();

module.exports = aiEngine;
