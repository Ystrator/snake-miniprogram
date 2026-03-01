/**
 * 本地存储管理器
 * 功能: 统一管理本地数据存储、读取、清理
 */

class StorageManager {
  constructor() {
    this.keys = {
      USER_BEHAVIOR: 'userBehavior',
      AI_ENGINE_HISTORY: 'aiEngineHistory',
      SEARCH_HISTORY: 'searchHistory',
      FAVORITES: 'favorites',
      BABY_INFO: 'babyInfo',
      DARK_MODE: 'darkMode',
      LAST_UPDATE: 'lastUpdate'
    };
  }

  /**
   * 保存数据
   */
  set(key, data) {
    try {
      wx.setStorageSync(key, data);
      return true;
    } catch (e) {
      console.error('保存数据失败:', key, e);
      return false;
    }
  }

  /**
   * 读取数据
   */
  get(key, defaultValue = null) {
    try {
      const data = wx.getStorageSync(key);
      return data !== '' ? data : defaultValue;
    } catch (e) {
      console.error('读取数据失败:', key, e);
      return defaultValue;
    }
  }

  /**
   * 删除数据
   */
  remove(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      console.error('删除数据失败:', key, e);
      return false;
    }
  }

  /**
   * 清空所有数据
   */
  clear() {
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      console.error('清空数据失败:', e);
      return false;
    }
  }

  /**
   * 获取存储使用情况
   */
  getInfo() {
    try {
      return wx.getStorageInfoSync();
    } catch (e) {
      console.error('获取存储信息失败:', e);
      return null;
    }
  }

  /**
   * 保存用户行为数据
   */
  saveUserBehavior(behavior) {
    return this.set(this.keys.USER_BEHAVIOR, behavior);
  }

  /**
   * 读取用户行为数据
   */
  getUserBehavior() {
    return this.get(this.keys.USER_BEHAVIOR, {
      viewHistory: [],
      favoriteArticles: [],
      searchHistory: [],
      readTimeStats: {}
    });
  }

  /**
   * 保存AI引擎历史
   */
  saveAIHistory(history) {
    return this.set(this.keys.AI_ENGINE_HISTORY, history);
  }

  /**
   * 读取AI引擎历史
   */
  getAIHistory() {
    return this.get(this.keys.AI_ENGINE_HISTORY, []);
  }

  /**
   * 保存搜索历史
   */
  saveSearchHistory(history) {
    return this.set(this.keys.SEARCH_HISTORY, history);
  }

  /**
   * 读取搜索历史
   */
  getSearchHistory() {
    const history = this.get(this.keys.SEARCH_HISTORY, []);
    // 兼容处理：确保返回数组
    if (!Array.isArray(history)) {
      return [];
    }
    return history;
  }

  /**
   * 添加搜索记录
   */
  addSearchRecord(query) {
    let history = this.getSearchHistory();
    
    const record = {
      query: query,
      timestamp: Date.now(),
      date: new Date().toDateString()
    };

    // 去重
    const existingIndex = history.findIndex(h => h && h.query === query);
    if (existingIndex > -1) {
      history.splice(existingIndex, 1);
    }

    history.unshift(record);

    // 限制数量
    if (history.length > 50) {
      history.splice(50);
    }

    return this.saveSearchHistory(history);
  }

  /**
   * 清空搜索历史
   */
  clearSearchHistory() {
    return this.remove(this.keys.SEARCH_HISTORY);
  }

  /**
   * 获取数据统计
   */
  getStorageStats() {
    const info = this.getInfo();
    if (!info) return null;

    return {
      keys: info.keys,
      currentSize: info.currentSize,
      limitSize: info.limitSize,
      usagePercent: ((info.currentSize / info.limitSize) * 100).toFixed(2)
    };
  }

  /**
   * 检查并清理过期数据
   */
  cleanExpiredData(days = 30) {
    const now = Date.now();
    const expiredTime = now - (days * 24 * 60 * 60 * 1000);

    // 清理过期的浏览历史
    const behavior = this.getUserBehavior();
    if (behavior.viewHistory) {
      behavior.viewHistory = behavior.viewHistory.filter(
        record => record.timestamp > expiredTime
      );
      this.saveUserBehavior(behavior);
    }

    // 清理过期的搜索历史
    const searchHistory = this.getSearchHistory();
    const cleanedSearch = searchHistory.filter(
      record => record.timestamp > expiredTime
    );
    this.saveSearchHistory(cleanedSearch);

    // 清理过期的AI历史
    const aiHistory = this.getAIHistory();
    const cleanedAI = aiHistory.filter(
      record => record.timestamp > expiredTime
    );
    this.saveAIHistory(cleanedAI);

    console.log('已清理', days, '天前的过期数据');
  }

  /**
   * 导出数据(用于备份)
   */
  exportData() {
    const data = {};
    Object.values(this.keys).forEach(key => {
      data[key] = this.get(key);
    });
    return data;
  }

  /**
   * 导入数据(用于恢复)
   */
  importData(data) {
    let successCount = 0;
    Object.entries(data).forEach(([key, value]) => {
      if (this.set(key, value)) {
        successCount++;
      }
    });
    return successCount;
  }
}

const storageManager = new StorageManager();

module.exports = storageManager;
