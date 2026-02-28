// components/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示加载
    show: {
      type: Boolean,
      value: false
    },
    // 加载文字
    text: {
      type: String,
      value: '加载中...'
    },
    // 是否显示进度条
    showProgress: {
      type: Boolean,
      value: false
    },
    // 进度值 0-100
    progress: {
      type: Number,
      value: 0
    },
    // 是否自动关闭（进度100%时）
    autoClose: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 设置进度
    setProgress(value) {
      this.setData({
        progress: Math.min(100, Math.max(0, value))
      });
      
      // 自动关闭
      if (this.data.autoClose && value >= 100) {
        setTimeout(() => {
          this.setData({ show: false });
        }, 500);
      }
    },
    
    // 显示加载
    showLoading(text = '加载中...') {
      this.setData({
        show: true,
        text: text
      });
    },
    
    // 隐藏加载
    hideLoading() {
      this.setData({
        show: false
      });
    }
  }
});
