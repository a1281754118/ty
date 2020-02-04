// pages/login/login.js
const md5 = require('../../utils/md5.js')
const base64 = require('../../utils/base64.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: wx.getStorageSync('user'),
    password: '',
    display: 'none',
    baseUrl: getApp().globalData.utils.baseUrl, //获取公用url路径
    checkedPassword: wx.getStorageSync('RememberPassword'),
    checkedLogin: wx.getStorageSync('login')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      checkedPassword: wx.getStorageSync('RememberPassword'),
      checkedLogin: wx.getStorageSync('login')
    })
    if (wx.getStorageSync('RememberPassword')){
      this.setData({
        password: wx.getStorageSync('password')
      })
    }
    if (wx.getStorageSync("login")){
      wx.showLoading({
        title: '自动登录',
        mask: true
      })
      setTimeout(()=>{
        
        this.denglu()
      },1000)
      
    }
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
    this.setData({
      mobile: wx.getStorageSync('user'),
    })
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
  denglu: function (e) {
    wx.hideKeyboard()
    wx.showLoading({
      title: '登录中...',
      mask: true
    });
    var loginData = {
      mobile: this.data.mobile, //测试
      password: base64.hex2b64(md5.hex_md5(this.data.password)).toString(), //测试
    }
    console.log(loginData)
    if (this.data.mobile != '' && this.data.password != '') {
      wx.request({
        
        url: this.data.baseUrl + 'loginMiniProgram.do?', //测试接口
        data: loginData,
        method: 'get',
        success: (result) => {
          console.log(result)
          var cookies = result.header["Set-Cookie"].split(";")[0] //测试
          // console.log(cookies)
          wx.setStorageSync('cookies', encodeURIComponent(cookies)) //对cookies进行加码
          if (result.data.success) {
            wx.showToast({
              title: '登录成功',
              duration: 2000
            })
            //记住账号
            wx.setStorageSync('user', this.data.mobile)
            //判断是否记住密码
            if (wx.getStorageSync('RememberPassword')){
              wx.setStorageSync('password', this.data.password )
            }else{
              wx.setStorageSync('password', '')
            }
            wx.switchTab({
                url: '/pages/index/index'
              })
          } else {
            wx.setStorageSync('password', '')
            setTimeout(function () {
              wx.showToast({
                title: result.data.msg,
                icon: 'none', 
                duration: 2000, //停留时间
              })
            }, 300)
          }
        },
        fail: () => {
          wx.hideLoading()
        }
      })
    } else {
      setTimeout(function () {
        wx.showToast({
          title: '请输入账号密码',
          icon: 'loading', 
          image: '../img/cuowu.png',
          duration: 1000, //停留时间
        })
      }, 300)
    }
  },
  mobile(e) {
    //接收输入框的值判断有没有输入并且更新data数据实现双向绑定
    this.setData({
      mobile: e.detail.value
    })
    if (e.detail.value.length < 1) {
      this.setData({
        display: 'none'
      })
    } else {
      this.setData({
        display: 'block'
      })
    }

  },
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  delt() {
    //点小图标删除时候把值给清空
    this.setData({
      mobile: '',
      display: 'none'
    })
  },
  hide() {
    this.setData({
      display: 'none'
    })
  },
  display() {
    if (this.data.mobile != '') {
      this.setData({
        display: 'block'
      })
    }
  },
  //处理记住密码以及自动函数
  checkboxChange: function (e) {
    console.log(e.detail.value)
    if (e.detail.value=="password"){
      wx.setStorageSync('RememberPassword','true')
    }else{
      wx.setStorageSync('RememberPassword', '')
    }
     if (e.detail.value == "login"){
      wx.setStorageSync('login', 'true')
       wx.setStorageSync('RememberPassword', 'true')
       this.setData({
         checkedPassword:true
       })
    }else{
       wx.setStorageSync('login', '')
    }
    if(e.detail.value.length==2){
      wx.setStorageSync('login', 'true')
      wx.setStorageSync('RememberPassword', 'true')
    }
    
  }
})