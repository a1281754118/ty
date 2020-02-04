Page({
  data: {
    relateId: '',
    arr: [],
    display: 'none',
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    url: 'terminal/bussRecycleDetailAppProject.do?', //数据路径
    addurl: 'terminal/bussRecycleCreateAppProject.do?' //扫描新增加url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    if (options.id) {
      this.setData({
        relateId: options.id,
        cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
      })
      this.getexitdetailed()
    }

    if (options.display) {
      this.setData({
        cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
        relateId: options.relateId,
        display: options.display,
        arr: JSON.parse(options.arr),
      })
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  confirm() {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    if (e.detail.item.text == '确定') {
      var that = this
      getApp().globalData.utils.scanning(that) //调用扫描后确认录入函数
    }
    this.setData({
      dialogShow: false
    })
  },
  goback() {
    wx.navigateBack({
      delta: 1 //向上返回一级
    })
  },
  getexitdetailed() {
    var that = this
    getApp().globalData.utils.projectdetailed(that) //调用项目明细函数
  }
})