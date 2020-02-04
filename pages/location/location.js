// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //项目定位
    locationposition:'点击定位',
    arr:{},
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    // url:'http://192.168.0.242:8081/emms_SDTY/',
    url: 'https://www.jjaq.com.cn/sdty/',
    pickerListIdx: 0,
    pickerList: [],
    addname:'选择项目',//项目名称
    addid: ''//项目id
  },
  //选择项目
  bindPickerSale: function (e) {
    console.log(e)
    this.setData({

      pickerListIdx: e.detail.value

    });
    for (var i = 0; i < this.data.pickerList.length; i++) {
      this.data.pickerList[i].index = i
      if (this.data.pickerList[i].index == e.detail.value) {
        this.setData({
          addname: this.data.pickerList[i].projectName,
          addid: this.data.pickerList[i].projectId
        })
      }
    }
  }, 
  //确认
  yes(){
    wx.showModal({
      title: '',
      content: '请仔细核对信息无误',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: this.data.url + 'terminal/updateInfoAppProject.do',
            data: {
              tmessage: {
                "query":{
                  "relateId": this.data.addid,
                  "street": this.data.arr.latitude + ","+this.data.arr.longitude
                }
              }
            },
            header: {
              cookie: this.data.cookies
            },
            method: 'get',
            success: (res) => {
              console.log(res)
              wx.showLoading({
                title: res.data.msg,
                duration: 1000,
                mask: true,
                success: () => {
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  }, 1000)
                }

              })
              
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  ditu(){
    wx.chooseLocation({
      success:  (res)=> {
        console.log(res)
        this.setData({
          locationposition: res.name,
          arr:res
        })
      }
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
    wx.request({
      url: this.data.url + 'terminal/permissionProjectAppProject.do',
      method: 'get',
      header: {
        cookie: this.data.cookies
      },
      success: (res) => {
        console.log(res)
        this.setData({
          pickerList: res.data.data
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