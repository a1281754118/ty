// pages/monomer/monomer-details/monomer-update/monomer-update.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lenMore:0,
    imgs:[],
    options:{},
    updatevalue:'',
    // url: 'http://192.168.0.242:8081/emms_SDTY/', //接口url路径
    url: 'https://www.jjaq.com.cn/sdty/',
    fileAttaches:'',
    cookies: decodeURIComponent(wx.getStorageSync('cookies')) //解码cookie
  },
  //确认更新
  update(){
    if (this.data.updatevalue!=''){
      if (this.data.imgs != '') {
        wx.showModal({
          title: '',
          content: '请仔细核对信息无误',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                url: this.data.url + 'terminal/createBussScheduleAppProject.do',
                data: {
                  tmessage: {
                    "remark": this.data.updatevalue, //形象进度描述
                    "projectId": this.data.options.projectId, //项目ID
                    "projectName": this.data.options.projectName, //项目名称
                    "singleId": this.data.options.singleId,// 单体ID
                    "singleName": this.data.options.singleName, //单体名称
                    "fileAttaches": this.data.fileAttaches      //文件ID
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
                          url: '../../monomer'
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
      } else {
        wx.showToast({
          title: '图片未上传！',
          image: '/pages/img/cuowu.png',
          duration: 1000, //停留时间
        })
      }

    }else{
      wx.showToast({
        title: '描述未填写！',
        image: '/pages/img/cuowu.png',
        duration: 1000, //停留时间
      })
    }
    
  },
  //双向绑定input
  updatevalue(e){
    this.setData({
      updatevalue:e.detail.value
    })
  },
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:  (res)=>{
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        var that = this
        var imgs = that.data.imgs;
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: this.data.url + '/file-upload',      //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            cookie: this.data.cookies,
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            'user': 'test' , //其他额外的formdata，可不写
            'file_cat':'BUSS_SCHEDULE'
         
          },
          success:  (res)=> {
            console.log(JSON.parse(res.data).fileId);
            var fileId = JSON.parse(res.data).fileId
            if(this.data.fileAttaches==''){
              this.setData({
                fileAttaches: fileId
              })
            }else{
              this.setData({
                fileAttaches: this.data.fileAttaches + ',' + fileId
              })
            }
            
          },
          fail: function (res) {
            console.log(res);

          },
        })
        
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = getApp().globalData.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time,
      options: options,
      request: false,
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    });
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