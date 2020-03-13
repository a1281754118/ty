
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adTitle: '',
    display: 'none',
    baseUrl: getApp().globalData.utils.baseUrl,//获取公用url路径
    arr: [],
    start: '0',//起始条数（从第几条开始显示）
    pageSize: '15',//显示条数
    url:'terminal/bussMaterialsRentListAppProject.do?',
    qingqiu:true,
    buttons: [{
      text: '驳回'
    }, {
      text: '确定'
    }],
    duang:"",
    dialogShow: false,
    id: '',
    cookies: decodeURIComponent(wx.getStorageSync('cookies')) //解码cookies
  },
  //点击修改时跳转
  modify(e) {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: './equipment-rent-up/equipment-rent-up?id=' + e.currentTarget.dataset.item.equipRentId,
    })
    wx.hideLoading()
  },
  tapDialogButton(e) {
    console.log(e.detail.item.text)
    if (e.detail.item.text == '确定') {
      if (this.data.duang == 'examine') {
        wx.request({
          url: this.data.baseUrl + 'terminal/bussPlanAcceptAppProject.do?',
          data: {
            tmessage: {
              "query": {
                "relateId": this.data.id,
                "relateModule": 'BUSS_EQUIP_RENT',
                "state": '1'
              }
            }
          },
          header: {
            cookie: this.data.cookies
          },
          method: 'get',
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            })

          }

        })
      }
      //判断是不是点击审批
      else if (this.data.duang == 'approval') {
        wx.request({
          url: this.data.baseUrl + 'terminal/bussPlanApproveAppProject.do?',
          data: {
            tmessage: {
              "query": {
                "relateId": this.data.id,
                "relateModule": 'BUSS_EQUIP_RENT',
                "state": '1'
              }
            }
          },
          header: {
            cookie: this.data.cookies
          },
          method: 'get',
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            })

          }

        })
      }
      //判断是不是删除
      else if (this.data.duang == 'deltt') {
        wx.request({
          url: this.data.baseUrl + 'terminal/bussPlanDelAppProject.do?',
          data: {
            tmessage: {
              "query": {
                "relateId": this.data.id,
                "relateModule": 'BUSS_EQUIP_RENT'
              }

            }
          },
          header: {
            cookie: this.data.cookies
          },
          method: 'get',
          success: (res) => {
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            })
            console.log(res)
            this.load()
          }

        })
      }
      this.setData({
        dialogShow: false,
        id: ''
      })
      this.load()
    } else {
      //判断取消审核
      if (this.data.duang == 'examine') {
        wx.request({
          url: this.data.baseUrl + 'terminal/bussPlanAcceptAppProject.do?',
          data: {
            tmessage: {
              "query": {
                "relateId": this.data.id,
                "relateModule": 'BUSS_EQUIP_RENT',
                "state": '0'
              }
            }
          },
          header: {
            cookie: this.data.cookies
          },
          method: 'get',
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            })

            this.load()
          }

        })
      }
      //删除点击取消
      else if (this.data.duang == 'deltt') {

      }
      //审批点击取消
      else if (this.data.duang == 'approval') {
        wx.request({
          url: this.data.baseUrl + 'terminal/bussPlanApproveAppProject.do?',
          data: {
            tmessage: {
              "query": {
                "relateId": this.data.id,
                "relateModule": 'BUSS_EQUIP_RENT',
                "state": '0'
              }
            }
          },
          header: {
            cookie: this.data.cookies
          },
          method: 'get',
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            })
            this.load()
          }

        })
      }
      this.setData({
        dialogShow: false,
        id: ''
      })

    }

  },
  //审批
  approval(e) {
    this.setData({
      buttons: [{
        text: '驳回'
      }, {
        text: '确定'
      }],
      duang: 'approval',
      dialogShow: true,
      id: e.currentTarget.dataset.item.equipRentId
    })
  },
  //审核
  examine(e) {
    this.setData({
      buttons: [{
        text: '驳回'
      }, {
        text: '确定'
      }],
      duang: 'examine',
      dialogShow: true,
      id: e.currentTarget.dataset.item.equipRentId
    })
    console.log(e)


  },
  //删除
  deltt(e) {
    this.setData({
      buttons: [{
        text: '取消'
      }, {
        text: '确定'
      }],
      duang: 'deltt',
      dialogShow: true,
      id: e.currentTarget.dataset.item.equipRentId
    })

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
      url: this.data.baseUrl + 'terminal/bussEquipRentListAppProject.do?',
      data: {
        tmessage: { "query": { "start": this.data.start, "pageSize": this.data.pageSize, "projectName": this.data.adTitle } }
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res)
        this.setData({
          arr: res.data.data
        })
      }

    })

  },
  //需求计划明细
  equipmentdelt(e) {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: './equipment-rent-list/equipment-rent-list?id=' + e.currentTarget.dataset.id,
    })
    wx.hideLoading()
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
  onReachBottom: function () {
    // var that = this
    // getApp().globalData.touchbottom(that) //调用上拉触底事件
    // this.setData({
    //   start: parseInt(this.data.start)+15
    // })
    // this.load()
    if (this.data.qingqiu == true) {
      this.setData({
        'start': parseInt(this.data.start) + 15,//起始记录
        'pageSize': parseInt(this.data.pageSize) + 15, //获取记录数量
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: this.data.baseUrl + 'terminal/bussMaterialsRentListAppProject.do?',
        data: {
          tmessage: {
            'query': {
              'projectName': this.data.adTitle, //项目名称
              'start': this.data.start,//起始记录
              'pageSize': this.data.pageSize, //获取记录数量
            }

          }
        },
        header: {
          cookie: this.data.cookies
        },
        method: 'get',
        success: (res) => {
          wx.hideLoading()
          console.log(res)
          if (res.data.data.length!=0) {
            var fileatt = this.data.arr
            for (var i = 0; i < res.data.data.length; i++) {
              fileatt.push(res.data.data[i])
            }

            if (res.data.success) {
              this.setData({
                arr: fileatt
              })
            }
          } else {
            this.setData({
              qingqiu: false
            })
          }

        }
      })
    } else {
      wx.hideLoading()
      console.log(1111111)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  increase() {
    wx.navigateTo({
      url: './add-equipment-rent-list/add-equipment-rent-list',
    })
  }
})