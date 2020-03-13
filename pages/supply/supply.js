// pages/supply/supply.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    openimg: "/pages/img/bottom.png",
    offimg: "/pages/img/top.png"
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
  opens1: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.isstart1) {
          this.setData({
            isstart1: false,
          });
        }
        else {
          this.setData({
            isstart1: true,
          });
        }
        break;
    }
  },
  //设备计划
  equipment(){
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: './equipment/equipment'
    })
    wx.hideLoading()
  },
  //周材计划
  logout(){
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: './zhoucaiplay/zhoucaiplay'
    })
    wx.hideLoading()
  },
  //设备外租
  switchUser(){
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: './equipment-rent/equipment-rent'
    })
    wx.hideLoading()
  },
  //周材外租
  logout1(){
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: './zhoucaiplay-rent/zhoucaiplay-rent'
    })
    wx.hideLoading()
  },
  onLoad: function (options) {

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