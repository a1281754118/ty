Page({
  data: {
    baseUrl: getApp().globalData.utils.baseUrl, //获取公用url路径
    showDialog: false,
    duang: '', //判断是确定还是修改
    receivingQuantity: '', //接收数量
    specificationsId: '', //修改id
    equipment: {}, //得到选中的设备
    modificationitem: '', //一开始修改的项
    relateId: '',
    pickerList: [], //设备清单
    pickerListIdx: 0,
    arr: [],
    display: 'none',
    display1: 'none',
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    adTitle: '', //搜索内容
    start: 0,
    objectMultiArray: [],
    pageSize: 999,
    addvalue: '',
    zcdb: false, //判断周材调拨
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    url: 'terminal/bussAllocationDetailAppProject.do?', //接口url路径
    addurl: 'terminal/bussAllocationCreateAppProject.do?', //扫描新增加接口
    slist: [{
        chargeModel: 0,
        name: "整车包运"
      },
      {
        chargeModel: 1,
        name: "过磅吨位"
      },
      {
        chargeModel: 2,
        name: "理论吨位"
      },
    ],
    patternup: false,
    patternlist: {
      chargeModel: 0,
      name: "整车包运"},
    patterninput: '', //输入单价
    tonnage: '', //吨位
    proportion: '', //比例
    money: "自动幻算", //运输金额
    arry1: [], //品名数组
    arry2: [], //规格数组
    text1: '', //选择的品名
    text2: '', //选择的规格
    state:'',//判断调出的还是调入
    showDialogtype:'',//判断是修改品名还是修改规格
  },
  //输入的单价
  patterninput(e) {
    this.setData({
      patterninput: e.detail.value,
      money: (this.data.tonnage * e.detail.value).toFixed(2)
    })

  },
  //输入的吨位
  tonnage(e) {
    if (this.data.patterninput != '') {
      this.setData({
        money: (this.data.patterninput * e.detail.value).toFixed(2)
      })
    }
    this.setData({
      tonnage: e.detail.value,
    })

  },
  //下拉菜单
  pattern() {
    this.setData({
      patternup: !this.data.patternup
    })
  },
  //获取选择项
  choicemode(e) {
    console.log(e.currentTarget.dataset.item)
    this.setData({
      patternup: false,
      patterninput: '',
      money: '自动幻算',
      tonnage: '',
      proportion: '',
      patternlist: e.currentTarget.dataset.item
    })
  },
  //新增单子
  add() {
    console.log(this.data.multiArray)
    this.setData({
      duang: 'xinzheng',
      dialogShow: true

    })
    console.log(this.data.equipment)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //判断点击修改第几个数据
  click: function(e) {
    console.log(e)
    var idi = e.currentTarget.dataset.index
    if (this.data.showDialogtype==0){
      var id = e.currentTarget.dataset.id
      var arr = this.data.arry1
      for (var i = 0; i < arr.length; i++) {
        arr[i].index = i
        if (arr[i].commodityId == id) {
          //得到选中的品名
          var list = this.data.arr
          console.log(list)
          var listarr = list.bussAllocationProject.bussAllocationDetailSet
          for (var a = 0; a < listarr.length; a++) {
            listarr[a].index = a
            
            if (listarr[a].index == this.data.modificationitem) {
              console.log(listarr[a])
              //修改选中的品名
              listarr[a].commodity = arr[i].commodity
              listarr[a].commodityId = arr[i].commodityId
              listarr[a].specfications = ''
              listarr[a].allocationCounts = ''
              //给修改的数据赋值渲染
              this.setData({
                arr: list,
                
              })
              console.log(list)
              console.log('你修改了品名规格清空')
            }
          }
          console.log(arr[i])
        }
      }
    } else if (this.data.showDialogtype == 1){
      console.log('你正在修改规格')
      var id = e.currentTarget.dataset.id
      var arr = this.data.arry2
      for (var i = 0; i < arr.length; i++) {
        arr[i].index = i
        if (arr[i].specificationsId == id) {
          console.log(arr[i])
          //得到选中的规格
          var list = this.data.arr
          var listarr = list.bussAllocationProject.bussAllocationDetailSet
          for (var a = 0; a < listarr.length; a++) {
            listarr[a].index = a
            if (listarr[a].index == this.data.modificationitem) {
              console.log(listarr[a])
              //修改选中的规格
              listarr[a].specfications = arr[i].specifications //规格
              listarr[a].specficationsId = arr[i].specificationsId //规格id
              listarr[a].secondConvertedQuantity = arr[i].secondConvertedQuantity 
              listarr[a].secondUnitConversion = arr[i].secondUnitConversion //单位
              listarr[a].measurementUnit = arr[i].firstUnitConversion  //辅助单位
              listarr[a].mnemonicCode = arr[i].mnemonics 
              listarr[a].allocationCounts=''              //清空接收数量重新输入
              this.setData({
                arr: list
              })
              console.log(list)
              console.log('你修改了品名规格清空')
            }
          }
          
        }
      }
    } else if (this.data.showDialogtype==2){
      var index = e.currentTarget.dataset.index
      var arr = this.data.arry1
      for (var i = 0; i < arr.length; i++) {
        arr[i].index = i
        if (arr[i].index == index) {
          //得到选中的品名
          console.log(arr[i])
          this.setData({
            text1:arr[i],
            text2:''
          })
        }
      }
    } else if (this.data.showDialogtype == 3) {
      var index = e.currentTarget.dataset.index
      var arr = this.data.arry2
      for (var i = 0; i < arr.length; i++) {
        arr[i].index = i
        if (arr[i].index == index) {
          //得到选中的品名
          console.log(arr[i])
          this.setData({
            text2: arr[i],
          })
        }
      }
    }
    
    this.setData({
      id:idi,
      showDialog: false,
      adTitle:'',
    })


  },

  radioChange: function(e) {
    console.log(e)
    var that = this
    that.setData({
      value: e.detail.value
    })

  },
  // //选择品名与规格
  // togg() {
  //   this.setData({
  //     duang: 'xinzheng',
  //     showDialog: true
  //   })
  // },
  //新增品名
  addCommodity(){
    this.setData({
      showDialogtype: 2,
      showDialog: !this.data.showDialog,
    })
  },
  //新增规格
  addSpecfications() {
    this.setData({
      showDialogtype: 3,
      showDialog: !this.data.showDialog,
    })
    wx.request({
      url: getApp().globalData.utils.baseUrl + 'terminal/newListMaterials.do?',
      data: {
        tmessage: {
          "query": {
            "start": this.data.start,
            "pageSize": this.data.pageSize,
            "commodityIds": this.data.text1.commodityId,
          }
        }
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res)
        this.setData({
          arry2: res.data.data,
        })
      }
    })
  },
  //修改接收数量
  upinput(e) {
    this.setData({
      duang: 'xiugaiinput',
      dialogShow: !this.data.showDialog,
      modificationitem: e.currentTarget.dataset.index
    })
  },
  //修改品名
  upCommodity(e){
    console.log(e)
    this.setData({
      showDialogtype: 0,
      showDialog: !this.data.showDialog,
      modificationitem: e.currentTarget.dataset.index
    })
  },
  //修改规格
  upSpecfications(e) {
    console.log(e)
    this.setData({
      showDialogtype: 1,
      showDialog: !this.data.showDialog,
      modificationitem: e.currentTarget.dataset.index
    })
    wx.request({
      url: getApp().globalData.utils.baseUrl + 'terminal/newListMaterials.do?',
      data: {
        tmessage: {
          "query": {
            "start": this.data.start,
            "pageSize": this.data.pageSize,
            "commodityIds": e.currentTarget.dataset.id,
          }
        }
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res)
        this.setData({
          arry2: res.data.data,
        })
      }
    })
    
  },
  //一开始点击修改的项
  toggleDialog(e) {
    console.log(e)
    this.setData({
      showDialog: !this.data.showDialog,
      modificationitem: e.currentTarget.dataset.index
    });
  },
  freeBack: function() {
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
  freetoBack: function() {
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
  bindPickerSale: function(e) {
    console.log(e)
    console.log(this.data.arr)
    this.setData({

      pickerListIdx: e.detail.value

    });
  },
  input(e) {
    var that = this
    if (e.detail.value.length < 1) {
      that.setData({
        adTitle: '',
        display1: 'none',
      })
      this.search()
    } else {
      that.setData({
        adTitle: e.detail.value,
        display1: 'block'
      })
    }

  },
  delt() {
    this.setData({
      adTitle: '',
      display1: 'none'
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
  load() {
    wx.request({
      url: this.data.baseUrl + 'terminal/newCommodityListMaterials.do?',
      data: {
        tmessage: {
          "query": {
            "start": this.data.start,
            "pageSize": this.data.pageSize,
            "keyword": this.data.adTitle,
          }
        }
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res.data.data)
        var listData = []
        var listData1 = []
        for (var i = 0; i < res.data.data.length; i++) {
          listData.push(res.data.data[i].commodity)
          listData1.push(res.data.data[i])
        }
        this.setData({
          arry1: res.data.data
        })
      }
    })
  },

  onLoad: function(options) {
    console.log(options)
    if (options.zcdb == 'ALLOCATION_PROJECT') {
      this.setData({
        zcdb: true,
      })
    }
    this.setData({
      value: 'show',
      
    })
    if (options.state){
      this.setData({
        state: options.state
      })
    }
    if (options.id) {
      this.setData({
        relateId: options.id,
        cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
      })
      this.getallocationdetailed()
    }
    //判断是不是扫描出来的数据
    if (options.display) {
      this.setData({
        display: options.display,
        arr: JSON.parse(options.arr),
        cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
        relateId: options.relateId,
      })
    }
    console.log(this.data.arr)
    this.load()
    if (this.data.arr.bussAllocationProject&&this.data.arr.bussAllocationProject.bussAllocationChargeSet.length != 0) {
      if (this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].chargeBear == '1') {
        if (this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].chargeModel == '0') {
          var obj = {
            chargeModel: 0,
            name: "整车包运"
          }
        }
        if (this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].chargeModel == '1') {
          var obj = {
            chargeModel: 1,
            name: "过磅吨位"
          }

        }
        if (this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].chargeModel == '2') {
          var obj = {
            chargeModel: 2,
            name: "理论吨位"
          }
        }
        
        this.setData({
          patternlist: obj, //默认模式
          patterninput: this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].unitPrice, //输入单价
          tonnage: this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].tonnage, //吨位
          proportion: this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].scale,
          money: this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].freight //运输金额
        })

      }
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
      duang: 'queding',
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    console.log(e.detail.item.text)
    if (e.detail.item.text == '确定') {
      if (this.data.duang == 'queding') {
        if (this.data.zcdb == true) {
          console.log('周材调拨新增成功')
          wx.request({
            url: getApp().globalData.utils.baseUrl + 'terminal/createBussAllocationAppProject.do?',
            data: {
              tmessage: {
                "query": {
                  "relateId": this.data.relateId,
                }
              }
            },
            header: {
              cookie: this.data.cookies
            },
            method: 'get',
            success: (res) => {
              wx.hideLoading()
              this.setData({
                showDialog: false,
                dialogShow: false,
              })
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

        } else {
          var that = this
          if (this.data.arr.bussAllocationProject.bussAllocationChargeSet.length!=0){
            if (this.data.arr.bussAllocationProject.bussAllocationChargeSet[0].chargeBear == '1') {
              var obj = [{
                "chargeModel": this.data.patternlist.chargeModel,
                "tonnage": this.data.tonnage,
                "unitPrice": this.data.patterninput,
                "freight": this.data.money,
                "chargeBear": '1',
                "scale": '100'
              }]

            } else {
              var obj = [this.data.arr.bussAllocationProject.bussAllocationChargeSet[0]]
            }
          }else{
            var obj=[]
          }
          

          getApp().globalData.utils.scanning(that, obj) //调用扫描后确认录入函数
          this.setData({
            dialogShow: false,

            receivingQuantity: ''
          })
        }

      }  else if (this.data.duang == 'xinzheng') {
        if (this.data.addvalue != '' && this.data.equipment != "{}") {
          console.log(111111111)
          var equipment = this.data.text2
          var list = this.data.arr
          var listarr = list.bussAllocationProject.bussAllocationDetailSet
          console.log(this.data.addvalue)
          var zongshu = parseInt(this.data.addvalue) *
            equipment.secondConvertedQuantity
          console.log(zongshu)
          console.log(parseInt(equipment.secondConvertedQuantity))
          var arr = {
            allocationCounts: this.data.addvalue,
            auxiliaryQuantity: "" + zongshu,
            busscatId: listarr[0].busscatId,
            commodity: equipment.materialsCommodity.commodity,
            commodityId: equipment.materialsCommodity.commodityId,
            measurementUnit: equipment.firstUnitConversion,
            mnemonicCode: equipment.mnemonics,
            projectId: listarr[0].projectId,
            secondConvertedQuantity: equipment.secondConvertedQuantity,
            secondUnitConversion: equipment.secondUnitConversion,
            specfications: equipment.specifications,
            specficationsId: equipment.specificationsId,
          }
          listarr.push(arr)
          console.log(listarr)
          console.log(arr)
          this.setData({
            arr: list,
            dialogShow: false,
            showDialog: false,
            text1: '',
            arry2: '',
            text2: '',
            addvalue: '',
            adTitle: '', //搜索内容
            equipment: {}
          })
        }

      } else if (this.data.duang == 'xiugaiinput') {
        if (this.data.receivingQuantity != '') {
          var list = this.data.arr
          console.log(list)
          var listarr = list.bussAllocationProject.bussAllocationDetailSet
          for (var i = 0; i < listarr.length; i++) {
            listarr[i].index = i
            if (listarr[i].index == this.data.modificationitem) {
              //修改选中的设备规格
              listarr[i].allocationCounts = this.data.receivingQuantity
              listarr[i].auxiliaryQuantity =
                parseInt(listarr[i].allocationCounts) *
                listarr[i].secondConvertedQuantity
              listarr[i].auxiliaryQuantity = listarr[i].auxiliaryQuantity.toFixed(2)
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
            showDialog: false,
            receivingQuantity: '',
            adTitle: '', //搜索内容
            equipment: {}
          })
        }

      }

    } else {
      this.setData({
        showDialog: false,
        dialogShow: false,
        arry2: '',
        text1: '',
        text2: '',
        addvalue: '',
        adTitle: '', //搜索内容
      })
    }

  },
  //接收input、
  addvalue(e) {
    this.setData({
      addvalue: e.detail.value
    })
  },
  receivinginput(e) {
    this.setData({
      receivingQuantity: e.detail.value
    })
  },
  goback() {
    wx.navigateBack({
      delta: 1 //向上返回一级
    })
  },
  getallocationdetailed() {
    var that = this
    getApp().globalData.utils.projectdetailed(that) //调用项目明细函数
  },
  modify(e) {
    console.log(e.currentTarget.dataset.arr.commodity)


    console.log(this.data.pickerList)
  },
  yesmodify(e) {
    console.log(e.detail.item.text)

    if (e.detail.item.text == '确定') {
      console.log('你确定了修改')

    }
    this.setData({
      dialogShow: false
    })
  }
})