Page({
  data: {
    relateId: '',
    lenMore: 0,
    imgs: [],
    arr: {},
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    // url: 'http://192.168.0.242:8081/emms_SDTY/', //数据路径
    url: getApp().globalData.utils.baseUrl,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.id) {
      this.setData({
        relateId: options.id,
        cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
      })
      this.load()
    }
  },
  //进度更新
  update(){
    var arr=this.data.arr
    wx.navigateTo({
      url: './monomer-update/monomer-update?projectName=' + arr.projectName + '&singleName='
        + arr.singleName + '&projectId=' + arr.projectId + '&singleId=' + arr.singleId
    })
  },
  load(){
    console.log(parseInt(this.data.relateId))
    wx.request({
      url: getApp().globalData.utils.baseUrl + 'terminal/scheduleDetailAppProject.do',
      data: {
        tmessage: {
          "query": {
            "relateId": parseInt(this.data.relateId),
          }
        }
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res)
        if(res.data.success==true){
          var imgs = res.data.data[0].fileAttachesList;
          
          for (var i = 0; i < imgs.length; i++) {
            imgs[i] = 'https://www.jjaq.com.cn/sdty' + imgs[i]
            
          }
          this.setData({
            arr: res.data.data[0]
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
            duration: 2000
          })  

        }
        
      }
    })
  },
  //查看图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.arr.fileAttachesList
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
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