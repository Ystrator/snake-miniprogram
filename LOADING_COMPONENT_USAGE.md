# 加载组件快速使用指南

## 组件路径
```
components/loading/loading
```

## 基础用法

### 1. 页面配置
在需要使用的页面 JSON 文件中引入：

```json
{
  "usingComponents": {
    "loading": "/components/loading/loading"
  }
}
```

### 2. 页面模板
```xml
<loading 
  show="{{isLoading}}" 
  text="加载中...">
</loading>
```

### 3. 页面逻辑
```javascript
Page({
  data: {
    isLoading: false
  },
  
  loadData() {
    this.setData({ isLoading: true });
    
    // 模拟异步请求
    setTimeout(() => {
      this.setData({ isLoading: false });
    }, 2000);
  }
});
```

## 完整属性列表

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | Boolean | false | 是否显示加载 |
| text | String | '加载中...' | 加载提示文字 |
| showProgress | Boolean | false | 是否显示进度条 |
| progress | Number | 0 | 进度值 0-100 |
| autoClose | Boolean | true | 进度100%时自动关闭 |

## 使用场景示例

### 场景1：数据加载
```xml
<loading show="{{loadingData}}" text="正在加载数据..."></loading>
```

```javascript
Page({
  data: { loadingData: false },
  
  fetchArticles() {
    this.setData({ loadingData: true });
    
    wx.request({
      url: 'https://api.example.com/articles',
      success: (res) => {
        this.setData({ articles: res.data });
      },
      complete: () => {
        this.setData({ loadingData: false });
      }
    });
  }
});
```

### 场景2：文件上传带进度
```xml
<loading 
  show="{{uploading}}" 
  text="上传中..." 
  showProgress="{{true}}"
  progress="{{uploadProgress}}">
</loading>
```

```javascript
Page({
  data: { 
    uploading: false,
    uploadProgress: 0 
  },
  
  uploadFile() {
    this.setData({ 
      uploading: true,
      uploadProgress: 0 
    });
    
    const uploadTask = wx.uploadFile({
      url: 'https://api.example.com/upload',
      filePath: tempFilePath,
      name: 'file',
      success: (res) => {
        console.log('上传成功');
      }
    });
    
    uploadTask.onProgressUpdate((res) => {
      this.setData({
        uploadProgress: res.progress
      });
    });
  }
});
```

### 场景3：表单提交
```xml
<loading show="{{submitting}}" text="正在提交..."></loading>
```

```javascript
Page({
  data: { submitting: false },
  
  submitForm(formData) {
    this.setData({ submitting: true });
    
    wx.cloud.callFunction({
      name: 'submitForm',
      data: formData,
      success: () => {
        wx.showToast({ title: '提交成功' });
      },
      complete: () => {
        this.setData({ submitting: false });
      }
    });
  }
});
```

## 全局加载（推荐）

如果需要在多个页面使用，可以封装成全局方法：

### app.js
```javascript
App({
  globalData: {
    loadingComponent: null
  },
  
  // 注册加载组件
  registerLoading(component) {
    this.globalData.loadingComponent = component;
  },
  
  // 全局显示加载
  showLoading(text = '加载中...') {
    if (this.globalData.loadingComponent) {
      this.globalData.loadingComponent.showLoading(text);
    }
  },
  
  // 全局隐藏加载
  hideLoading() {
    if (this.globalData.loadingComponent) {
      this.globalData.loadingComponent.hideLoading();
    }
  }
});
```

### 页面中使用
```javascript
const app = getApp();

Page({
  onLoad() {
    // 注册加载组件
    app.registerLoading(this.selectComponent('#globalLoading'));
  },
  
  fetchData() {
    app.showLoading('加载中...');
    
    // 数据请求
    setTimeout(() => {
      app.hideLoading();
    }, 2000);
  }
});
```

## 样式自定义

如需修改加载组件样式，编辑 `components/loading/loading.wxss`：

```css
/* 修改主色调 */
.spinner-dot {
  background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
}

/* 修改容器大小 */
.loading-wrapper {
  padding: 48rpx 64rpx; /* 调整内边距 */
  min-width: 320rpx;     /* 调整最小宽度 */
}
```

## 注意事项

1. **及时关闭**：记得在数据加载完成后关闭加载状态
2. **错误处理**：在网络请求失败时也要关闭加载状态
3. **性能优化**：避免频繁显示/隐藏加载状态
4. **用户体验**：加载文字要清晰明确

## 常见问题

**Q：为什么加载状态不显示？**
A：检查 `show` 属性是否正确绑定，确保值为 `true`

**Q：如何修改动画速度？**
A：编辑 `loading.wxss` 中的 `animation-duration` 属性

**Q：支持自定义加载图标吗？**
A：可以修改 `loading.wxml` 添加自定义图标元素

**Q：深色模式下颜色不对？**
A：组件已自动适配深色模式，如需调整请修改 `loading.wxss` 中的深色模式样式
