// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    darkMode: false,
    nickname: '',
    birthday: '',
    gender: '',
    babyAgeText: '',
    hasProfile: false
  },

  onLoad() {
    this.setData({
      darkMode: app.globalData.darkMode
    });
    this.loadProfile();
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

  // 加载档案
  loadProfile() {
    const profile = wx.getStorageSync('babyProfile');
    if (profile) {
      this.setData({
        nickname: profile.nickname || '',
        birthday: profile.birthday || '',
        gender: profile.gender || '',
        hasProfile: true
      });
      
      // 计算月龄
      if (profile.birthday) {
        const babyAge = this.calculateAge(profile.birthday);
        this.setData({
          babyAgeText: babyAge
        });
      }
    }
  },

  // 输入小名
  onNicknameInput(e) {
    this.setData({
      nickname: e.detail.value
    });
  },

  // 选择生日
  onBirthdayChange(e) {
    const birthday = e.detail.value;
    this.setData({
      birthday: birthday
    });
    
    // 实时计算月龄
    if (birthday) {
      const babyAge = this.calculateAge(birthday);
      this.setData({
        babyAgeText: babyAge
      });
    }
  },

  // 选择性别
  selectGender(e) {
    const gender = e.currentTarget.dataset.gender;
    this.setData({
      gender: gender
    });
  },

  // 计算月龄
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

  // 保存档案
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
      
      // 同步到全局数据
      app.setBabyInfo(birthday, nickname);
      
      this.setData({
        hasProfile: true
      });
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 延迟返回
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

  // 删除档案
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
  }
});
