Page({
  data: {
    showDialog: false,
    duang:'',//判断是确定还是修改
    receivingQuantity:'',//接收数量
    specificationsId:'',//修改id
    // id:'',//判断修改成什么型号
    equipment:{},//得到选中的设备
    modificationitem:'',//一开始修改的项
    relateId: '',
    pickerList: [],//设备清单
    pickerListIdx: 0,
    arr: [],
    display: 'none',
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    cookies: decodeURIComponent(wx.getStorageSync('cookies')),//解码cookie
    url: 'terminal/bussAllocationDetailAppProject.do?',//接口url路径
    addurl: 'terminal/bussAllocationCreateAppProject.do?'//扫描新增加接口
  },
  //新增单子
  add(){
    this.setData({
      duang:'xinzheng',
      dialogShow:true

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //判断点击修改第几个数据
  click: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < this.data.pickerList.length; i++) {
      this.data.pickerList[i].index = i
      if (this.data.pickerList[i].index == id) {
        //得到选中的设备规格
        this.setData({
          equipment:this.data.pickerList[i]
        })
        console.log(this.data.pickerList[i])
      }
    }
    this.setData({
      id: id,
      duang: 'xiugai',
      dialogShow: true
    })
  
  },
  
  radioChange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      value: e.detail.value
    })
   
  },
  //选择品名与规格
  togg(){
    this.setData({
      duang: 'xinzheng',
      showDialog: true
    })
  },
  //一开始点击修改的项
  toggleDialog(e) {
    console.log(e)
    this.setData({
      showDialog: !this.data.showDialog,
      modificationitem:e.currentTarget.dataset.index
    });
  },
  freeBack: function () {
    var that = this
    if (this.data.value == 'show') {
      wx.showModal({
        title: '提示',
        content: '你没有选择任何内容',
      })
    }
    that.setData({
      showDialog: !this.data.showDialog
    })
  },
  freetoBack: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '你没有选择任何内容',
    })
    that.setData({
      showDialog: !this.data.showDialog,
      value: 'show',
      checked: false,
    })
  },
  bindPickerSale: function (e) {
    console.log(e)
    console.log(this.data.arr)
    this.setData({

      pickerListIdx: e.detail.value

    });
  }, 

  onLoad: function (options) {
  
    this.setData({
      value: 'show'
    })
    if (options.id) {
      this.setData({
        relateId: options.id,
        cookies: decodeURIComponent(wx.getStorageSync('cookies')),//解码cookie
      })
      this.getallocationdetailed() 
    }
    //判断是不是扫描出来的数据
    if (options.display) {
      this.setData({
        display: options.display,
        arr: JSON.parse(options.arr),
        cookies: decodeURIComponent(wx.getStorageSync('cookies')),//解码cookie
        relateId: options.relateId,
      })
    }
    wx.request({
      url: 'https://www.jjaq.com.cn/sdty/terminal/newListMaterials.do?',
      data: '',
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res.data.data)
        // var listData = []
        // for (var i = 0; i < res.data.data.length; i++) {
        //   listData[i] = res.data.data[i]
        // }
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

  },
  confirm() {
    this.setData({
      duang: 'queding',
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    console.log(e.detail.item.text)
    if (e.detail.item.text == '确定') {
      if(this.data.duang=='queding'){
        var that = this
        getApp().globalData.utils.scanning(that)//调用扫描后确认录入函数
        this.setData({
          dialogShow: false,
          
          receivingQuantity: ''
        })
      }else{
        if(this.data.receivingQuantity!=''){
          var list = this.data.arr
          console.log(list)
          var listarr = list.bussAllocationProject.bussAllocationDetailSet
          for (var i = 0; i < listarr.length; i++) {
            listarr[i].index = i
            if (listarr[i].index == this.data.modificationitem) {
              //修改选中的设备规格
              listarr[i].commodity = this.data.equipment.materialsCommodity.commodity
              listarr[i].specfications = this.data.equipment.specifications
              listarr[i].allocationCounts = this.data.receivingQuantity
              listarr[i].auxiliaryQuantity = 
                parseInt(listarr[i].allocationCounts) * 
              parseInt(listarr[i].secondConvertedQuantity)
              listarr[i].auxiliaryQuantity = listarr[i].auxiliaryQuantity.toString()
              listarr[i].specificationsId = this.data.equipment.specificationsId
              list.bussAllocationProject.bussAllocationDetailSet = listarr
              //给修改的数据赋值渲染
              this.setData({
                arr: list
              })
              console.log(list)
              console.log('你修改了接收数量')
            }
          }
          this.setData({
            dialogShow: false,
            showDialog: !this.data.showDialog,
            receivingQuantity: ''
          })
        }
        
      }
    
    }else{
      this.setData({
        dialogShow: false,
        receivingQuantity: ''
      })
    }
    
  },
  //接收input、
  receivinginput(e){
    this.setData({
      receivingQuantity:e.detail.value
    })
  },
  goback() {
    wx.navigateBack({
      delta: 1//向上返回一级
    })
  },
  getallocationdetailed() {
    var that = this
    getApp().globalData.utils.projectdetailed(that)//调用项目明细函数
  },
  modify(e){
    console.log( e.currentTarget.dataset.arr.commodity)
    
    
    console.log(this.data.pickerList)
  },
  yesmodify(e){
    console.log(e.detail.item.text)
    
    if (e.detail.item.text == '确定') {
      console.log('你确定了修改')
     
    }
    this.setData({
      dialogShow: false
    })
  }
})