Page({
  data: {
    arr: [],
    start: '0', //起始条数（从第几条开始显示）
    pageSize: '15', //显示条数
    request: false,
    adTitle: '', //搜索内容
    display: 'none',
    url: 'terminal/bussMaterialsListAppProject.do?', //接口url路径
    cookies: decodeURIComponent(wx.getStorageSync('cookies')) //解码cookie
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      request: false,
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
      this.search()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    setTimeout(() => {
      wx.showToast({
        title: '刷新成功',
        duration: 500, //停留时间
      })
      this.search()
      wx.stopPullDownRefresh();
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    var that = this
    getApp().globalData.touchbottom(that) //调用上拉触底事件
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  input(e) {
    var that = this
    if (e.detail.value.length < 1) {
      that.setData({
        adTitle: '',
        display: 'none',
      })
      this.search()
    } else {
      that.setData({
        adTitle: e.detail.value,
        display: 'block'
      })
    }

  },
  //跳转到明细
  detailed(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './entry detailed/entry detailed?id=' + id
    })
    console.log(11111)
  },
  //删除搜索内容
  delt() {
    this.setData({
      adTitle: '',
      display: 'none'
    })
    this.search()
  },
  //点击完成按钮时触发
  search() {
    this.setData({
      start: '0',
      request: false
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.load()
  },
  //获取数据
  load() {
    var that = this
    getApp().globalData.utils.projectget(that) //获取项目管理刷新函数
  },
  camera() {
    var manage = "MATERIALS_PACKAGE" //进场管理
    var that = this
    const load = (e) => {
      this.setData({
        code: e
      })
      wx.navigateTo({
        url: './entry detailed/entry detailed?arr=' + JSON.stringify(e) + '&display=' + 'block' + '&relateId=' + this.data.relateId
      })
      console.log(e)
    };
    getApp().globalData.camera(manage, load, that) //获取扫描结果
  },
})