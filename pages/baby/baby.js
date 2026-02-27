// 宝宝档案页面
const app = getApp();

Page({
  data: {
    darkMode: false,
    babyInfo: null,
    babyAge: null,
    hasBabyInfo: false,
    showDatePicker: false,
    tempDate: '2025-01-01',
    babyName: ''
  },

  onLoad() {
    this.setData({
      darkMode: app.globalData.darkMode
    });
    this.loadBabyInfo();
  },

  onShow() {
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

  // 加载宝宝信息
  loadBabyInfo() {
    const babyInfo = app.getBabyInfo();
    console.log('加载宝宝信息:', babyInfo);

    if (babyInfo && babyInfo.birthday) {
      const babyAge = app.calculateBabyAge();
      this.setData({
        babyInfo: babyInfo,
        babyAge: babyAge,
        hasBabyInfo: true,
        babyName: babyInfo.name || '宝宝'
      });
    } else {
      this.setData({
        hasBabyInfo: false
      });
    }
  },

  // 显示日期选择器
  showDatePicker() {
    this.setData({
      showDatePicker: true,
      tempDate: this.data.babyInfo ? this.formatDate(new Date(this.data.babyInfo.birthday)) : '2025-01-01'
    });
  },

  // 隐藏日期选择器
  hideDatePicker() {
    this.setData({
      showDatePicker: false
    });
  },

  // 日期改变
  onDateChange(e) {
    this.setData({
      tempDate: e.detail.value
    });
  },

  // 确认日期
  confirmDate() {
    const birthday = new Date(this.data.tempDate).getTime();
    const name = this.data.babyName.trim() || '宝宝';

    app.setBabyInfo(birthday, name);

    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });

    this.hideDatePicker();
    this.loadBabyInfo();
  },

  // 修改宝宝信息
  editBabyInfo() {
    this.showDatePicker();
  },

  // 删除宝宝信息
  deleteBabyInfo() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除宝宝档案吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.babyInfo = null;
          wx.removeStorageSync('babyInfo');

          wx.showToast({
            title: '已删除',
            icon: 'success'
          });

          this.setData({
            hasBabyInfo: false,
            babyInfo: null,
            babyAge: null
          });
        }
      }
    });
  },

  // 名字输入
  onNameInput(e) {
    this.setData({
      babyName: e.detail.value
    });
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 返回首页
  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
