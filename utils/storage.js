// 本地存储工具类
const Storage = {
  // 设置数据
  set(key, data) {
    try {
      wx.setStorageSync(key, data);
      return true;
    } catch (e) {
      console.error('存储失败:', e);
      return false;
    }
  },

  // 获取数据
  get(key, defaultValue = null) {
    try {
      const data = wx.getStorageSync(key);
      return data !== '' ? data : defaultValue;
    } catch (e) {
      console.error('读取失败:', e);
      return defaultValue;
    }
  },

  // 删除数据
  remove(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      console.error('删除失败:', e);
      return false;
    }
  },

  // 清空所有数据
  clear() {
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      console.error('清空失败:', e);
      return false;
    }
  }
};

module.exports = Storage;
