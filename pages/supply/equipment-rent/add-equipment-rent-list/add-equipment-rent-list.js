Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: '0', //起始条数（从第几条开始显示）
    pageSize: '100', //显示条数
    lenMore: 0,
    imgs: [],
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    baseUrl: getApp().globalData.utils.baseUrl, //获取公用url路径
    startdate: '进场日期',
    enddate: '退场日期',
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
    array5: [
      ['10', '起重运输机械'],
      ['11', '塔机配件'],
      ['12', '电梯配件'],
      ['13', '井架配件']
    ], //设备类别
    array6: [
      ['10', 'QTZ31.5'],
      ['11', 'QTZ31.5A'],
      ['12', 'QTZ40'],
      ['13', 'QTZ63'],
      ['14', 'QTZ63A'],
      ['15', 'QTZ80'],
      ['16', 'QTZ125'],
      ['17', 'QTZ160'],
      ['18', 'QTZ200'],
      ['19', 'QTZ250'],
      ['20', 'SCD120/120'],
      ['21', 'SC200/200'],
      ['22', 'SC200井内'],
      ['23', 'SC200/200高变'],
      ['24', 'SS100/100'],
      ['25', 'QTZ100'],
      ['26', 'SC100/100']
    ], //设备类型
    array7: [
      ['1', '起重机械类'],
      ['2', '周转材料类'],
      ['3', '混凝土泵车类'],
      ['4', '爬架类'],
      ['5', '小型机械类']
    ], //资产属性
    text1: '', //项目名称
    text2: ['', ''], //工程区域
    text3: '', //计划类型
    text4: '', //工程类别
    dizhi: '', //工程地址
    text5: ["10", "起重运输机械"], //设备类别
    text6: '', //设备型号
    text7: '', //资产属性
    projectId: '', //项目名称id
    value1: '', //联系方式
    value2: '', //外租单位
    value3: '',
    value4: '',
    
    value5: "", //日租金
    value6:"台",//设备单位
    value7: "", //备案号
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
          array7: res.data.data,
          text7: res.data.data[0]
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
  onLoad: function(options) {
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
    //获取项目列表
    wx.request({
      url: this.data.baseUrl + 'terminal/permissionProjectAppProject.do?',
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
    //获取周材列表
    wx.request({
      url: 'https://www.jjaq.com.cn/sdty/terminal/newListMaterials.do?',
      data: {
        tmessage: {
          "query": {
            "start": this.data.start,
            "pageSize": this.data.pageSize,
            "keyword": '',
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
    //设备类bei
    wx.request({
      url: this.data.baseUrl + 'system/listCode.do?',
      data: {
        'codeId': "repertoryCategory"
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res.data)

      }

    })
    //设备型号
    wx.request({
      url: this.data.baseUrl + 'system/listCode.do?',
      data: {
        'codeId': "equipSpecific"
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res.data)

      }

    })
    //资产属性
    wx.request({
      url: this.data.baseUrl + 'system/listCode.do?',
      data: {
        'codeId': "assetsProperty"
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
  value5(e) {
    this.setData({
      value5: e.detail.value
    })
  },
  value6(e) {
    this.setData({
      value6: e.detail.value
    })
  },
  value7(e) {
    this.setData({
      value7: e.detail.value
    })
  },
  value4(e) {
    this.setData({
      value4: e.detail.value
    })
  },
  value3(e) {
    console.log(this.data.text5.secondConvertedQuantity)
    this.setData({
      value3: e.detail.value,
    })

  },
  tapDialogButton(e) {
    console.log(e.detail.item.text)
    if (e.detail.item.text == '确定') {
      if (this.data.duang == 'xinzeng') {
        console.log(this.data)
        if (this.data.text5 != '' && this.data.value3 != '' && this.data.value5 != '' && this.data.startdate != '' &&
          this.data.enddate != '') {
          var index = this.data.index + 1
          this.setData({
            index: index
          })
          var arrr = this.data.arr
          if (this.data.text7){
            var obj = {
              "equipGeneric": this.data.text5[0], //设备名称ID
              "equipGenericName": this.data.text5[1], //设备名称
              "equipSpecific": this.data.text6[0], //设备型号Id
              "equipSpecificName": this.data.text6[1], //设备型号
              "quantity": this.data.value3, // 数量
              "dailyRent": this.data.value5, //日租界
              "unit": this.data.value6, //单位
              "singleId": this.data.text7.singleId, //单体ID
              "singleName": this.data.text7.singleName, // 单体名称
              "startDate": this.data.startdate, //预计进场时间
              "endDate": this.data.enddate, //预计退场时间
              "recordId": this.data.value7,//备案号
              "index": index
            }
          }else{
            var obj = {
              "equipGeneric": this.data.text5[0], //设备名称ID
              "equipGenericName": this.data.text5[1], //设备名称
              "equipSpecific": this.data.text6[0], //设备型号Id
              "equipSpecificName": this.data.text6[1], //设备型号
              "quantity": this.data.value3, // 数量
              "dailyRent": this.data.value5, //日租界
              "unit": this.data.value6, //单位
              "singleId": '', //单体ID
              "singleName": '', // 单体名称
              "startDate": this.data.startdate, //预计进场时间
              "endDate": this.data.enddate, //预计退场时间
              "recordId": this.data.value7,//备案号
              "index": index
            }
          }
          
          console.log(obj)
          arrr.push(obj)
          this.setData({
            arr: arrr,
            dialogShow: false,
            text5: ["10", "起重运输机械"], //设备类别
            value3: '',
            value5: '',
            value6: '台',
            value7:'',
            startdate: '进场日期',
            enddate: '退场日期',
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
        if (this.data.text1 != ''  && this.data.value4 != '' &&
          this.data.arr != '' && this.data.value1 != '' && this.data.value2 != '') {
          console.log(this.data)
          wx.request({
            url: this.data.baseUrl + 'terminal/createBussEquipRentAppProject.do?',
            data: {
              tmessage: {
                "title": "", //标题
                "rentName": this.data.value2, //外租单位
                "rentTel": this.data.value1, //单位联系方式
                "rentAddress": this.data.value4, //单位地址
                "projectId": this.data.text1.projectId, //项目Id
                "projectName": this.data.text1.projectName, //项目名称
                "belongToArea": this.data.text2[0], //工程区域
                "customerId": this.data.text1.unCustomId, //施工单位Id(选择项目时带过来  unCustomId)
                "customerName": this.data.text1.unCustomName, //施工单位名称(选择项目时带过来  unCustomName)
                "projectAddress": this.data.text1.address, //项目地址(选择项目时带过来  address)
                "bussEquipDemandSet":this.data.arr
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
                  url: '../equipment-rent'
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
        text5: ["10", "起重运输机械"], //设备类别
        text6: '', //设备型号
        text7: '', //单体名称
        value2: '',
        value3: '',
        value5: '',
        value6: '台',
        value7:'',
        startdate: '进场日期',
        enddate: '退场日期',
      })
    }

  },
  delt(e) {
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
        console.log(this.data.pickerList[i])
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