// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: wx.getStorageSync('user'),
    isstart: false,
    openimg: "/pages/img/bottom.png",
    offimg: "/pages/img/top.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      start: wx.getStorageSync('user'),
    })
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
  logout(){
    wx.setStorageSync('login', '')
    wx.setStorageSync('RememberPassword', '')
    wx.setStorageSync('password', '')
    wx.setStorageSync('user', '')
    wx.setStorageSync('cookies', '')
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  opens: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.isstart) {
          this.setData({
            isstart: false,
          });
        }
        else {
          this.setData({
            isstart: true,
          });
        }
        break;
    }
  },
  switchUser(e) {
    wx.setStorageSync('login', '')
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})