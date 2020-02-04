// pages/lease/lease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adTitle: '',//搜索内容
    display: 'none',
    baseUrl: getApp().globalData.utils.baseUrl,//获取公用url路径
    cookies: '',//获取用户cookie
    arr: [],
    start: '0',//起始条数（从第几条开始显示）
    pageSize: '15',//显示条数
    request: false,
    cookies: decodeURIComponent(wx.getStorageSync('cookies'))//解码cookies
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      request: false,
      cookies: decodeURIComponent(wx.getStorageSync('cookies'))//解码cookies
    })
   
    
    this.search()
 

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
  onReachBottom: function (e) {
    if (this.data.request == false) {
      var start = parseInt(this.data.start) + parseInt(this.data.pageSize);
      this.setData({
        start: start
      })
      wx.request({
        url: this.data.baseUrl + 'terminal/commercialContractListAppProject.do?',
        data: {
          tmessage: { "query": { "start": this.data.start, "pageSize": this.data.pageSize, "keyword": this.data.adTitle } }
        },
        header: {
          cookie: this.data.cookies
        },
        method: 'get',
        success: (result) => {
          //判断数据库还有无数据
          console.log(result.data.info.result)
          if (result.data.info.result != '') {
            //有数据就往数组里面增加
            result.data.info.result.forEach((err) => {
              // console.log(err)
              this.data.arr.push(err)
            })
            this.setData({
              arr: this.data.arr,
            })
          } else {
            //没有了就返回一个true终止请求
            this.setData({
              arr: this.data.arr,
              request: true
            })
          }
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //双向绑定搜索内容
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
    var id = e.currentTarget.dataset.id
    console.log(e)
    if (e.currentTarget.dataset.type == "外部塔机合同" || e.currentTarget.dataset.type == "内部塔机合同") {
      wx.navigateTo({
        url: '../Equipment details/Equipment details?id=' + id
      })
    } else {
      wx.navigateTo({
        url: '../Material details/Material details?id=' + id,
      })
    }
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

    wx.request({
      url: this.data.baseUrl + 'terminal/commercialContractListAppProject.do?',
      data: {
        tmessage: { "query": { "start": this.data.start, "pageSize": this.data.pageSize, "keyword": this.data.adTitle } }
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (result) => {
        if (result.data.success) {
          this.setData({
            arr: result.data.info.result
          })
        }else{
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

      }

    })

  }


})