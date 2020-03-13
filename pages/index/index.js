// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    baseUrl: getApp().globalData.utils.baseUrl,//获取公用url路径
    cookies: '',//获取用户cookie
  },
  //项目定位
  location(){
    wx.navigateTo({
      url: '/pages/location/location'
    })
  },
  //单体管理
  monomer(){
    wx.navigateTo({
      url: '/pages/monomer/monomer'
    })
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
    if (wx.getStorageSync('cookies')==''){
      wx.showLoading({
        title: '检测未登录',
        duration: 2000,
        mask: true,
        success: () => {
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }, 1000)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies'))//解码cookies
    })
    var success = wx.getStorageSync('success')
    this.load()
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
  //租赁合同
  lease: function (e) {
    wx.navigateTo({
      url: '../lease/lease'
    })
  },
  //退场管理
  exit: function (e) {
    wx.navigateTo({
      url: '../exit/exit'
    })
  },
  //进场管理
  entry() {
    wx.navigateTo({
      url: '../entry/entry',
    })
  },
  //调拨管理
  allocation() {
    wx.navigateTo({
      url: '../allocation/allocation',
    })
  },
  //丢失管理
  lose() {
    wx.navigateTo({
      url: '../lose/lose',
    })
  },
  //供需管理
  supply() {
    wx.navigateTo({
      url: '../supply/supply',
    })
  },
  load() {
    wx.request({
      url: this.data.baseUrl + 'terminal/userProjectNumberAppProject.do',
      data: '',
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
       
        if (res.data.success) {
          this.setData({
            arr: res.data.info.result[0]
          })
        } else {
          wx.showLoading({
            title: '登录超时',
            duration: 2000,
            mask: true,
            success: () => {
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }, 1000)
            }
          })
        }
      },
      info: (res) => {
        
      }
    })
  }
})