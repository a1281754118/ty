Page({
  data: {
    cookies: '',
    relateId: 0,
    arr: [],
    display: 'none',
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      
      text: '确定'
    }],
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    url: 'terminal/bussMaterialsDetailAppProject.do?', //进场明细url
    addurl: 'terminal/bussMaterialsCreateAppProject.do?', //扫描新增加url
    slist: [
      { chargeModel: 1, name: "按照过磅吨位" },
      { chargeModel: 2, name: "按照理论吨位" },
      { chargeModel: 0, name: "按照整车包运" },
    ],
    patternup:false,
    patternlist:{},
    patterninput:'',//输入单价
    money:"自动幻算"//运输金额
  },
  //输入的单价
  patterninput(e){
    if (this.data.patternlist.chargeModel=='1'){
      this.setData({
        patterninput: e.detail.value,
        money: (this.data.arr.materialsPackage.packageWeighSet[0].netWeight * e.detail.value).toFixed(2)
      })
    } else if (this.data.patternlist.chargeModel == '2'){
      this.setData({
        patterninput: e.detail.value,
        money: (this.data.arr.materialsPackage.packageWeighSet[0].theoryWeight * e.detail.value).toFixed(2)
      })
    } else if (this.data.patternlist.chargeModel == '0') {
      this.setData({
        patterninput: e.detail.value,
      })
    }
    
  },
  //下拉菜单
  pattern(){
    this.setData({
      patternup:!this.data.patternup
    })
  },
  //获取选择项
  choicemode(e){
    console.log(e.currentTarget.dataset.item)
    this.setData({
      patternup: false,
      patterninput:'',
      money:'自动幻算',
      patternlist: e.currentTarget.dataset.item
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(JSON.parse(options.arr))
    this.setData({
      patternlist: { chargeModel: 0, name: "按照整车包运" },
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
    if (options.id) {
      this.setData({ 
        relateId: options.id,
      })
      this.getentrydetailed()
    }

    if (options.display) {
      var arrr = JSON.parse(options.arr)
      arrr.materialsPackage.packageWeighSet[0].netWeight=(arrr.materialsPackage.packageWeighSet[0].netWeight / 1000).toFixed(2)
      arrr.materialsPackage.packageWeighSet[0].theoryWeight=(arrr.materialsPackage.packageWeighSet[0].theoryWeight/1000).toFixed(2)
      this.setData({
        display: options.display,
        arr: arrr,
        relateId: options.relateId,
      })

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  confirm() {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    if (e.detail.item.text == '确定') {
      if(this.data.patterninput!=''){
        if (this.data.patternlist.chargeModel == '1') {
          var obj = [{
            "chargeModel": this.data.patternlist.chargeModel,
            "tonnage": this.data.arr.materialsPackage.packageWeighSet[0].netWeight/1000,
            "unitPrice": this.data.patterninput,
            "freight": this.data.money
          }]
        } else if (this.data.patternlist.chargeModel == '2') {
          var obj = [{
            "chargeModel": this.data.patternlist.chargeModel,
            "tonnage": this.data.arr.materialsPackage.packageWeighSet[0].theoryWeight/1000,
            "unitPrice": this.data.patterninput,
            "freight": this.data.money
          }]
        } else if (this.data.patternlist.chargeModel == '0') {
          var obj = [{
            "chargeModel": this.data.patternlist.chargeModel,
            "tonnage": 0,
            "unitPrice": 0,
            "freight": this.data.patterninput
          }]
        }

        // getApp().globalData.utils.scanning(that) //调用扫描后确认录入函数
        wx.request({
          url: getApp().globalData.utils.baseUrl + this.data.addurl,
          data: {
            tmessage: {
              "query": {
                "relateId": parseInt(this.data.relateId),
                "bussPackChargeSet": obj
              }
            }
          },
          header: {
            cookie: this.data.cookies
          },
          method: 'get',
          success: (res) => {
            wx.hideLoading()
            if (res.data.masg == "操作成功。") {
              wx.showToast({
                title: res.data.msg,
                iconL: '',
                duration: 3000, //停留时间
              })

            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000, //停留时间
              })
            }
            setTimeout(() => {
              wx.navigateBack({
                delta: 1 //向上返回一级
              })
            }, 1500)
          }
        })
      }else{
        wx.showToast({
          title: '检测到部分信息未确认',
          icon: 'none',
          duration: 3000, //停留时间
        })
      }
      
    }
    this.setData({
      dialogShow: false
    })
  },
  goback() {
    wx.navigateBack({
      delta: 1 //向上返回一级
    })
  },
  getentrydetailed() {
    var that = this
    getApp().globalData.utils.projectdetailed(that) //调用项目明细函数
  }
})