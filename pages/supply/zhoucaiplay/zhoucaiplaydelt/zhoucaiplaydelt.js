
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: getApp().globalData.utils.baseUrl,//获取公用url路径
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookies
    zhoucaiplaydelt: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
    var id = options.id
    this.load(id)
  },
  load(id) {
    wx.request({
      url: this.data.baseUrl + 'terminal/bussMaterialsPlanDetailAppProject.do?',
      data: {
        tmessage: { "query": { "relateId": id } } //设备id
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res)
        this.setData({
          zhoucaiplaydelt: res.data.info.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})