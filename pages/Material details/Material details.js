Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    commercialId: '',
    cookies: '',
    baseUrl: getApp().globalData.utils.baseUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cookies = decodeURIComponent(wx.getStorageSync('cookies'))//解码cookies
    this.setData({
      cookies: cookies,
      commercialId: options.id
    })
   

      this.load()
    

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

  },
  load() {
    wx.request({
      url: this.data.baseUrl + 'terminal/commercialContractDetailAppProject.do',
      data: {
        tmessage: { "query": { "commercialId": this.data.commercialId } }
      },
      header: {
        cookie: this.data.cookies
      },
      success: (result) => {
        console.log(result)
        this.setData({
          listData: result.data.info.result
        })
      }
    })
  }
})