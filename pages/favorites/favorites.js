// 收藏页面逻辑 - P3优化版本（增强分类功能）
Page({
  data: {
    darkMode: false,
    favorites: [],
    categories: [],
    activeCategory: 'all',
    searchKeyword: '',
    sortBy: 'date',
    filteredFavorites: [],
    showAddCategoryModal: false,
    showMoveToModal: false,
    newCategoryName: '',
    selectedCategoryIcon: '📁',
    selectedCategoryColor: '#FF9EB5',
    selectedMoveCategory: 'uncategorized',
    movingArticleId: null,
    categoryIcons: ['📁', '📚', '💡', '⭐', '❤️', '🔖', '📌', '🎯', '💊', '👶'],
    categoryColors: ['#FF9EB5', '#88C9A8', '#F5B885', '#E88A85', '#9BB7D4', '#B8A5E0', '#7DD3FC', '#FDCB6E']
  },

  onLoad() {
    this.loadDarkMode();
    this.loadFavorites();
    this.loadCategories();
  },

  onShow() {
    this.loadFavorites();
    this.loadCategories();
  },

  // 加载暗黑模式
  loadDarkMode() {
    const darkMode = wx.getStorageSync('darkMode') || false;
    this.setData({ darkMode });
  },

  // 加载收藏数据
  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    // 添加收藏日期
    favorites.forEach(item => {
      if (!item.favoriteDate) {
        item.favoriteDate = this.formatDate(item.favoriteTime || Date.now());
      }
    });
    this.setData({ favorites });
    this.filterAndSortFavorites();
  },

  // 加载分类数据
  loadCategories() {
    const categories = wx.getStorageSync('favoriteCategories') || [];
    // 计算每个分类的文章数量
    const favorites = this.data.favorites;
    categories.forEach(category => {
      category.count = favorites.filter(f => f.categoryId === category.id).length;
    });
    this.setData({ categories });
  },

  // 格式化日期
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
    
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ activeCategory: category });
    this.filterAndSortFavorites();
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.filterAndSortFavorites();
  },

  // 排序字段
  sortByField(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ sortBy: field });
    this.filterAndSortFavorites();
  },

  // 筛选和排序收藏
  filterAndSortFavorites() {
    let { favorites, activeCategory, searchKeyword, sortBy } = this.data;
    let filtered = [...favorites];

    // 分类筛选
    if (activeCategory !== 'all') {
      filtered = filtered.filter(f => f.categoryId === activeCategory);
    }

    // 搜索筛选
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(f =>
        f.title.toLowerCase().includes(keyword) ||
        f.summary.toLowerCase().includes(keyword)
      );
    }

    // 排序
    if (sortBy === 'date') {
      filtered.sort((a, b) => (b.favoriteTime || 0) - (a.favoriteTime || 0));
    } else if (sortBy === 'category') {
      filtered.sort((a, b) => {
        const catA = a.categoryName || '未分类';
        const catB = b.categoryName || '未分类';
        return catA.localeCompare(catB, 'zh-CN');
      });
    }

    this.setData({ filteredFavorites: filtered });
  },

  // 阅读文章
  readArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`
    });
  },

  // 取消收藏
  removeFavorite(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认取消收藏',
      content: '确定要取消收藏这篇文章吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          let favorites = this.data.favorites.filter(f => f.id !== id);
          wx.setStorageSync('favorites', favorites);
          this.setData({ favorites });
          this.filterAndSortFavorites();
          this.loadCategories();
          
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          });
        }
      }
    });
  },

  // 显示添加分类弹窗
  showAddCategoryModal() {
    this.setData({
      showAddCategoryModal: true,
      newCategoryName: '',
      selectedCategoryIcon: '📁',
      selectedCategoryColor: '#FF9EB5'
    });
  },

  // 隐藏添加分类弹窗
  hideAddCategoryModal() {
    this.setData({ showAddCategoryModal: false });
  },

  // 输入分类名称
  onCategoryNameInput(e) {
    this.setData({ newCategoryName: e.detail.value });
  },

  // 选择分类图标
  selectCategoryIcon(e) {
    const icon = e.currentTarget.dataset.icon;
    this.setData({ selectedCategoryIcon: icon });
  },

  // 选择分类颜色
  selectCategoryColor(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({ selectedCategoryColor: color });
  },

  // 添加分类
  addCategory() {
    const { newCategoryName, selectedCategoryIcon, selectedCategoryColor } = this.data;
    
    if (!newCategoryName.trim()) {
      wx.showToast({
        title: '请输入分类名称',
        icon: 'none'
      });
      return;
    }

    const newCategory = {
      id: `category_${Date.now()}`,
      name: newCategoryName.trim(),
      icon: selectedCategoryIcon,
      color: selectedCategoryColor,
      count: 0,
      createTime: Date.now()
    };

    let categories = this.data.categories;
    categories.push(newCategory);
    wx.setStorageSync('favoriteCategories', categories);
    
    this.setData({ 
      categories,
      showAddCategoryModal: false
    });

    wx.showToast({
      title: '分类创建成功',
      icon: 'success'
    });
  },

  // 编辑分类
  editCategory() {
    const { activeCategory, categories } = this.data;
    const category = categories.find(c => c.id === activeCategory);
    
    if (!category) return;

    wx.showModal({
      title: '编辑分类',
      editable: true,
      placeholderText: '请输入新的分类名称',
      content: category.name,
      success: (res) => {
        if (res.confirm && res.content) {
          const newCategories = categories.map(c => {
            if (c.id === activeCategory) {
              return { ...c, name: res.content };
            }
            return c;
          });
          
          wx.setStorageSync('favoriteCategories', newCategories);
          this.setData({ categories: newCategories });
          
          wx.showToast({
            title: '分类已更新',
            icon: 'success'
          });
        }
      }
    });
  },

  // 删除分类
  deleteCategory() {
    const { activeCategory, categories } = this.data;
    
    wx.showModal({
      title: '确认删除',
      content: '删除分类后，该分类下的文章将移至"未分类"，确定要删除吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 移除分类
          const newCategories = categories.filter(c => c.id !== activeCategory);
          wx.setStorageSync('favoriteCategories', newCategories);
          
          // 更新文章分类ID为null
          let favorites = this.data.favorites.map(f => {
            if (f.categoryId === activeCategory) {
              return { ...f, categoryId: null };
            }
            return f;
          });
          wx.setStorageSync('favorites', favorites);
          
          this.setData({
            categories: newCategories,
            activeCategory: 'all',
            favorites
          });
          
          this.filterAndSortFavorites();
          this.loadCategories();
          
          wx.showToast({
            title: '分类已删除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 显示移动到分类弹窗
  showMoveToModal(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      showMoveToModal: true,
      movingArticleId: id,
      selectedMoveCategory: 'uncategorized'
    });
  },

  // 隐藏移动到分类弹窗
  hideMoveToModal() {
    this.setData({ showMoveToModal: false });
  },

  // 选择目标分类
  selectMoveCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedMoveCategory: category });
  },

  // 确认移动
  confirmMove() {
    const { movingArticleId, selectedMoveCategory, favorites } = this.data;
    
    let newFavorites = favorites.map(f => {
      if (f.id === movingArticleId) {
        return {
          ...f,
          categoryId: selectedMoveCategory === 'uncategorized' ? null : selectedMoveCategory
        };
      }
      return f;
    });
    
    wx.setStorageSync('favorites', newFavorites);
    this.setData({ 
      favorites: newFavorites,
      showMoveToModal: false
    });
    
    this.filterAndSortFavorites();
    this.loadCategories();
    
    wx.showToast({
      title: '已移动',
      icon: 'success'
    });
  },

  // 开始拖拽（简化版，仅作示意）
  startDrag(e) {
    const { index } = e.currentTarget.dataset;
    wx.showToast({
      title: '拖拽排序功能',
      icon: 'none'
    });
    // 完整的拖拽功能需要使用小程序的movable-area或第三方组件
  },

  // 阻止冒泡
  stopPropagation() {
    // 空函数
  }
});
