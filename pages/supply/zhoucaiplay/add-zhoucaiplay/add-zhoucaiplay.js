Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: '0', //起始条数（从第几条开始显示）
    pageSize: '999', //显示条数
    lenMore: 0,
    imgs: [],
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    baseUrl: getApp().globalData.utils.baseUrl, //获取公用url路径
    startdate: '',
    array1: [], //项目列表
    array2: [
      ['14', '济南片区'],
      ['15', '青岛片区'],
      ['16', '郯城'],
      ['17', '市外区域'],
      ['18', '省外区域'],
      ['19', '兰陵县'],
      ['20', '临港区'],
      ['21', '莒南县'],
      ['22', '费县'],
      ['23', '沂南县'],
      ['24', '沂水县'],
      ['25', '临沭县'],
      ['26', '平邑县'],
      ['27', '蒙阴县'],
      ['28', '兰山区'],
      ['29', '河东区'],
      ['30', '罗庄区'],
      ['31', '南坊'],
      ['32', '京津冀']
    ],
    array3: [
      ['1', '阶段性需求'],
      ['2', '需求总计划']
    ], //计划类型
    array4: [
      ['10', '工业建筑'],
      ['11', '民用住宅'],
      ['12', '公用建筑'],
      ['13', '装饰工程'],
      ['14', '道路桥梁']
    ], //工程类别

    text1: '', //项目名称
    text2: ['', ''], //工程区域
    text3: '', //计划类型
    text4: '', //工程类别
    dizhi: '', //工程地址
    text5: '', //pm品名
    text6: [], //规格
    text7: '', //资产属性
    projectId: '', //项目名称id
    value1: '',
    value2: '',
    value3: '',
    value4:'',
    display1:'none',
    adTitle:'',
    arr: [],
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    index: 0,
    pickerList: [],
    showDialog: false,
  },
  confirm() {
    console.log(111)
    if (this.data.text1 != '') {
      this.setData({
        duang: 'xinzeng',
        dialogShow: true
      })
    } else {
      wx.showToast({
        title: '请先选择项目',
        icon: 'none',
        duration: 1000, //停留时间
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  //选择开始与结束日期
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindDateChangeEnd: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  //选择流程项目名称
  bindPickerChange1(e) {
    this.setData({
      arr: [],
      text2: ['', ''], //工程区域
    })
    var arr = this.data.array1
    var xx = this.data.array2
    console.log('picker发送选择改变，携带值为', e.detail.value)
    for (var i = 0; i < arr.length; i++) {
      arr[i].index = i
      if (arr[i].index == e.detail.value) {
        console.log(arr[i])
        this.setData({
          projectId: arr[i].projectId,
          text1: arr[i],
          dizhi: arr[i].address
        })
        for (var a = 0; a < xx.length; a++) {
          if (arr[i].belongToArea == xx[a][0]) {
            console.log(xx[i])
            this.setData({
              text2: xx[i]
            })
          }
        }
      }
    }
    wx.request({
      url: this.data.baseUrl + 'terminal/permissionSingleAppProject.do?',
      method: 'get',
      data: {
        tmessage: {
          "query": {
            "start": this.data.start,
            "pageSize": this.data.pageSize,
            "keyword": '',
            'projectId': this.data.text1.projectId
          }
        }
      },
      header: {
        cookie: this.data.cookies
      },
      success: (res) => {
        console.log(res)
        this.setData({
          array7: res.data.data
        })

      }
    })
  },
  bindPickerChange2(e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    for (var i = 0; i < this.data.array2.length; i++) {
      this.data.array2[i].index = i
      if (this.data.array2[i].index == e.detail.value) {
        console.log(this.data.array2[i])
        this.setData({
          text2: this.data.array2[i]
        })

      }
    }

  },
  bindPickerChange3(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array3.length; i++) {
      this.data.array3[i].index = i
      if (this.data.array3[i].index == e.detail.value) {
        console.log(this.data.array3[i])
        this.setData({
          text3: this.data.array3[i]
        })

      }
    }
  },
  bindPickerChange4(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array4.length; i++) {
      this.data.array4[i].index = i
      if (this.data.array4[i].index == e.detail.value) {
        console.log(this.data.array4[i])
        this.setData({
          text4: this.data.array4[i]
        })

      }
    }
  },
  bindPickerChange5(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array5.length; i++) {
      this.data.array5[i].index = i
      if (this.data.array5[i].index == e.detail.value) {
        console.log(this.data.array5[i])
        this.setData({
          text5: this.data.array5[i]
        })

      }
    }
  },
  bindPickerChange6(e) {
    console.log(this.data.text6)
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array6.length; i++) {
      this.data.array6[i].index = i
      if (this.data.array6[i].index == e.detail.value) {
        console.log(this.data.array6[i])
        this.setData({
          text6: this.data.array6[i]
        })

      }
    }
  },
  bindPickerChange7(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array7.length; i++) {
      this.data.array7[i].index = i
      if (this.data.array7[i].index == e.detail.value) {
        console.log(this.data.array7[i])
        this.setData({
          text7: this.data.array7[i]
        })

      }
    }
  },
  //一开始点击修改的项
  toggleDialog(e) {
    console.log(e)
    this.setData({
      showDialog: !this.data.showDialog,
      modificationitem: e.currentTarget.dataset.index
    });
  },
  delt() {
    this.setData({
      adTitle: '',
      display1: 'none'
    })
    this.search()
  },
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
  load(){
    //获取周材列表
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
        // var listData = []
        // for (var i = 0; i < res.data.data.length; i++) {
        //   listData[i] = res.data.data[i]
        // }
        this.setData({
          pickerList: res.data.data
        })

        console.log(this.data.zcdb)
      }
    })
  },
  onLoad: function(options) {
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
    this.load()
    //获取项目列表
    wx.request({
      url: this.data.baseUrl + 'terminal/permissionProjectAppProject.do',
      method: 'get',
      data: {
        tmessage: {
          "query": {
            "start": this.data.start,
            "pageSize": this.data.pageSize,
            "keyword": ''
          },
        }
      },
      header: {
        cookie: this.data.cookies
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          array1: res.data.data
        })

      }
    })
    //工程区域
    wx.request({
      url: this.data.baseUrl + 'system/listCode.do?',
      data: {
        'codeId': "belongToArea"
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res.data)

      }

    })
    
    //获取计划类型
    wx.request({
      url: this.data.baseUrl + 'system/listCode.do?',
      data: {
        'codeId': "planType"
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res.data)

      }

    })
    //工程类别
    wx.request({
      url: this.data.baseUrl + 'system/listCode.do?',
      data: {
        'codeId': "projectType"
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res.data)

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
    this.onLoad()
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
  chucha(e) {
    this.setData({
      text3: e.detail.value
    })
  },
  xiangxi(e) {
    this.setData({
      text4: e.detail.value
    })
  },
  cclist(e) {
    console.log(e)
    if (this.data.flowid != '') {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      wx.navigateTo({
        url: './CClist/CClist?id=' + e.currentTarget.dataset.id + '&flowid=' + this.data.flowid
      })
      wx.hideLoading()
    } else {
      wx.showToast({
        title: '请先选择流程',
        icon: 'none',
        duration: 2000
      })
    }

  },
  tijiao() {
    this.setData({
      duang: 'tijiao',
      dialogShow: true
    })

  },
  value1(e) {
    this.setData({
      value1: e.detail.value
    })

  },
  value2(e) {
    this.setData({
      value2: e.detail.value
    })
  },
  value3(e) {
    console.log(this.data.text6)
    this.setData({
      value3: e.detail.value,
      value4: (this.data.text6.secondConvertedQuantity * e.detail.value).toFixed(2)
    })

  },
  tapDialogButton(e) {
    console.log(e.detail.item.text)
    if (e.detail.item.text == '确定') {
      if (this.data.duang == 'xinzeng') {
        console.log(1111111)
        if (this.data.text6 != '' && this.data.value3 != '' 
          && this.data.value4 != ''&& this.data.startdate != '' ) {
          var index = this.data.index + 1
          this.setData({
            index: index
          })
          var arrr = this.data.arr
          var obj = {
            "commodity": this.data.text6.materialsCommodity.commodity, //品名
            "commodityId": this.data.text6.materialsCommodity.commodityId, //品名Id
            "mnemonicCode": this.data.text6.mnemonics, //助记码
            "specifications": this.data.text6.specifications, //规格
            "unit": this.data.text6.firstUnitConversion, //单位
            "demandNum": this.data.value3, ///需求数量
            "auxiliaryUnit": this.data.text6.secondUnitConversion, //辅助单位
            "convertedQuantity": this.data.text6.secondConvertedQuantity, //换算数量
            "auxiliaryNum": this.data.value4, // 辅助数量(需求数量*换算数量)
            "startDate": this.data.startdate, //预计进场时间
            "index": index
          }
          arrr.push(obj)
          this.setData({
            arr: arrr,
            dialogShow: false,
            text5:'',
            value3: '',
            text6:'',
            array6:'',
            startdate: '进场日期',
          })
        } else {
          wx.showToast({
            title: '请填写完整信息',
            icon: 'none',
            duration: 2000
          })
        }

      } else if (this.data.duang == 'tijiao') {
        var that = this.data
        if (this.data.text1 != ''  && 
         this.data.arr != '' && this.data.text4!= '') {
          console.log(this.data)
          wx.request({
            url: this.data.baseUrl + 'terminal/createBussMaterialsPlanAppProject.do?',
            data: {
              tmessage: {
                "projectId": this.data.text1.projectId, //项目Id
                "projectName": this.data.text1.projectName, //项目名称
                "customerId": this.data.text1.unCustomId, //施工单位Id(选择项目时带过来  unCustomId)
                "customerName": this.data.text1.unCustomName, //施工单位名称(选择项目时带过来  unCustomName)
                "address": this.data.dizhi, //项目地址
                // "assetsProperty":this.data.text7[0],//资产属性
                "belongToArea": this.data.text2[0], //工程区域
                "planType": this.data.text3[0], //计划类型
                "projectType": this.data.text4[0], //工程类型
                "bussDemandDetailSet": this.data.arr
              }

            },
            header: {
              cookie: this.data.cookies
            },
            method: 'get',
            success: (res) => {
              console.log(res)
              wx.showToast({
                title: '操作成功',
                duration: 2000
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '../zhoucaiplay'
                })
              }, 2000)

            }
          })
        } else {
          console.log(this.data)
          wx.showToast({
            title: '请填写完整信息',
            icon: 'none',
            duration: 2000
          })
        }
      }

    } else {
      this.setData({
        dialogShow: false,
        text5: '', //设备类别
        text6: '', //设备型号
        text7: '', //单体名称
        value2: '',
        value3: '',
        array6:'',
        startdate: '进场日期',
        enddate: '退场日期',
      })
    }

  },
  delt1(e) {
    var xx = this.data.arr
    console.log(e.currentTarget.dataset.index)
    console.log(xx)
    for (var i = 0; i < xx.length; i++) {
      if (xx[i].index == e.currentTarget.dataset.index) {
        xx.splice(i, 1)
        console.log(xx[i])
      }
    }
    this.setData({
      arr: xx
    })
  },
  //选择品名与规格
  togg() {
    this.setData({
      duang: 'xinzeng',
      showDialog: true,

    })
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
  //判断点击修改第几个数据
  click: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < this.data.pickerList.length; i++) {
      this.data.pickerList[i].index = i
      if (this.data.pickerList[i].index == id) {
        //得到选中的设备规格
        this.setData({
          text5: this.data.pickerList[i]
        })
        wx.request({
          url: this.data.baseUrl + 'terminal/newListMaterials.do?',
          data: {
            tmessage: {
              "query": {
                "start": this.data.start,
                "pageSize": this.data.pageSize,
                "commodityIds": this.data.pickerList[i].commodityId,
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
              array6: res.data.data
            })

          }
        })
        
      }
    }
    if (this.data.duang == 'xinzeng') {
      console.log(this.data.text5)
      this.setData({
        dialogShow: true,
        showDialog: false,
      })

    } else {
      this.setData({
        id: id,
        dialogShow: true,
        showDialog: false,
      })
    }


  },

  radioChange: function(e) {
    console.log(e)
    var that = this
    that.setData({
      value: e.detail.value
    })

  },
})