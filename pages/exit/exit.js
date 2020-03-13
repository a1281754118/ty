Page({
  data: {
    arr: [],
    start: '0', //起始条数（从第几条开始显示）
    pageSize: '15', //显示条数
    request: false,
    adTitle: '', //搜索内容
    display: 'none',
    url: 'terminal/bussRecycleListAppProject.do?', //接口url路径
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    selected: true,
    selected1: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      request: false,
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })

    this.search()
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
  //tap切换
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
    this.search()
  },

  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
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
    var that = this
    getApp().globalData.touchbottom(that) //调用上拉触底事件
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  input(e) {
    // var this = this
    if (e.detail.value.length < 1) {
      this.setData({
        adTitle: '',
        display: 'none',
      })
      this.search()
    } else {
      this.setData({
        adTitle: e.detail.value,
        display: 'block'
      })
    }

  },
  //跳转到明细
  detailed(e) {
    var id = e.currentTarget.dataset.id
    if (this.data.selected1==true){
      wx.navigateTo({
        url: './exit detailed/exit detailed?id=' + id + '&relateModule=' + 'CONTRACT_MATERIALS'
      })
    }else{
      wx.navigateTo({
        url: './exit detailed/exit detailed?id=' + id + '&relateModule=' + 'COMMERCIAL_CONTRACT'
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
    if (this.data.selected==true){
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })
      wx.request({
        url: getApp().globalData.utils.baseUrl + this.data.url,
        data: {
          tmessage: {
            "query": {
              "start": this.data.start,
              "pageSize": this.data.pageSize,
              "keyword": this.data.adTitle,
              "relateModule":'COMMERCIAL_CONTRACT'
            }
          }
        },
        header: {
          cookie: this.data.cookies
        },
        method: 'get',
        success: (result) => {
          console.log(result)
          if (result.data.success) {
            this.setData({
              arr: result.data.info.result
            })
            // console.log(this.data.arr)
          }
          else if (res.data.msg == "抱歉，数据处理异常! 请稍后再试或与管理员联系！") {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000,
            })
          }
          else {
            wx.showLoading({
              title: '登录超时',
              duration: 2000,
              mask: true,
              success: () => {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/login/login'
                  })
                }, 2000)
              }
            })
          }
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    } else if (this.data.selected1 == true){
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })
      wx.request({
        url: getApp().globalData.utils.baseUrl + this.data.url,
        data: {
          tmessage: {
            "query": {
              "start": this.data.start,
              "pageSize": this.data.pageSize,
              "keyword": this.data.adTitle,
              "relateModule": 'CONTRACT_MATERIALS'
            }
          }
        },
        header: {
          cookie: this.data.cookies
        },
        method: 'get',
        success: (result) => {
          console.log(result)
          if (result.data.success) {
            this.setData({
              arr: result.data.info.result
            })
            // console.log(this.data.arr)
          }
          else if (res.data.msg == "抱歉，数据处理异常! 请稍后再试或与管理员联系！") {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000,
            })
          }
          else {
            wx.showLoading({
              title: '登录超时',
              duration: 2000,
              mask: true,
              success: () => {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/login/login'
                  })
                }, 2000)
              }
            })
          }
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }
    
    // getApp().globalData.utils.projectget(this) //获取项目管理刷新函数
  },
  camera() {
    var that = this
    var manage = "RECYCLE_MANAGE"
    const load = (e) => {
      this.setData({
        code: e
      })
      wx.navigateTo({
        url: './exit detailed/exit detailed?arr=' + JSON.stringify(e) + '&display=' + 'block' + '&relateId='
          + this.data.relateId
      })
      console.log(e)
    };
    getApp().globalData.camera(manage, load, that) //获取扫描结果
  },
})