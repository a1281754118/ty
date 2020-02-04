// pages/monomer/addmonomer/addmonomer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //项目名称
    addname: '选择项目',
    //单体名称
    mononmername: '',
    //单体高度
    mononmerheight: '',
    //单体面积
    mononmerm2: '',
    //单体层数
    mononmernumber: '',
    //单体层高
    mononmernumberheight: '',
    //单层面积
    area: '',
    // url:'http://192.168.0.242:8081/emms_SDTY/',
    url:'https://www.jjaq.com.cn/sdty/',
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    pickerListIdx: 0,
    pickerList:[],
    addid:''//项目id
  },
  //
  bindPickerSale: function (e) {
    console.log(e)
    this.setData({

      pickerListIdx: e.detail.value

    });
    for (var i = 0; i < this.data.pickerList.length;i++){
       this.data.pickerList[i].index=i
       if(this.data.pickerList[i].index==e.detail.value){
         this.setData({
           addname: this.data.pickerList[i].projectName,
           addid: this.data.pickerList[i].projectId
         })
       }
    }
  }, 

  //增加
  add() {
    wx.showModal({
      title: '',
      content: '请仔细核对信息无误',
      success:(res)=> {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: this.data.url + 'terminal/createSingleAppProject.do',
            data: {
              tmessage: {
                "area": this.data.mononmerm2, //面积
                "high": this.data.mononmerheight, //高度
                "projectId": this.data.addid, //项目ID
                "singleName": this.data.mononmername, //单体名称
                "layerArea": this.data.area, //单层面积
                "layerHigh": this.data.mononmernumberheight, //单层高度
                "layerNum": this.data.mononmernumber, //层数
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
                duration: 2000,
                mask: true,
                success: () => {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '../monomer'
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
  //单体名称
  mononmername(e) {

    this.setData({
      mononmername: e.detail.value
    })
  },
  //单体高度
  mononmerheight(e) {

    this.setData({
      mononmerheight: e.detail.value
    })
  },
  //单体面积
  mononmerm2(e) {

    this.setData({
      mononmerm2: e.detail.value
    })
  },
  //单体层数
  mononmernumber(e) {

    this.setData({
      mononmernumber: e.detail.value
    })
  },
  //单体层高
  mononmernumberheight(e) {

    this.setData({
      mononmernumberheight: e.detail.value
    })
  },
  //单层面积
  area(e) {

    this.setData({
      area: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
    //获取项目列表
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

  }
})