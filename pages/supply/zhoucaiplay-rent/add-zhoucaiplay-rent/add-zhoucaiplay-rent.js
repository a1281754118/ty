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
    text1: '', //项目名称
    text2: ['', ''], //工程区域
    text3: '', //外租单位
    projectId: '', //项目名称id
    value1: '',
    value2: '',
    value3: '',
    value4: '', //辅助数量
    value5:'',
    value6: '',
    value7: '',//日租金
    display1: 'none',
    adTitle: '',
    arr: [],
    arry: [],
    choiceitem: {}, //吧选择的项存下来
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
  //渲染
  confirm() {
    console.log(111)
    var ids = ''
    var arry = this.data.arry
    console.log(arry)
    if (this.data.arry != '') {
      for (var i = 0; i < arry.length; i++) {
        ids = ids + arry[i].commodityId + ','
      }
      ids = ids.substr(0, ids.length - 1)
      console.log(ids)
      wx.request({
        url: this.data.baseUrl + 'terminal/newListMaterials.do?',
        data: {
          tmessage: {
            "query": {
              "start": this.data.start,
              "pageSize": this.data.pageSize,
              "commodityIds": ids,
            }
          }
        },
        header: {
          cookie: this.data.cookies
        },
        method: 'get',
        success: (res) => {
          var arr = []
          var arrr = res.data.data
          console.log(arry)
          for (var a = 0; a < arrr.length; a++) {
            arrr[a].index = a
            for (var i = 0; i < arry.length; i++) {
              if (arrr[a].materialsCommodity.commodityId == arry[i].commodityId) {
                var obj = {
                  "commodityId": arrr[a].materialsCommodity.commodityId, //品名Id
                  "commodity": arrr[a].materialsCommodity.commodity, //品名
                  "specificationsId": arrr[a].specificationsId, //规格Id
                  "specifications": arrr[a].specifications, //规格
                  "unit": arrr[a].materialsCommodity.rentUnit, //单位
                  "dailyRent": arry[i].dailyRent, //日租金
                  "demandNum": 0, //需求数量
                  "auxiliaryUnit": arrr[a].materialsCommodity.compensationUnit, //辅助单位
                  "auxiliaryNum": '', //辅助数量(需求数量*换算系数)
                  "secondConvertedQuantity": arrr[a].secondConvertedQuantity, //换算系数
                  "startDate": arry[i].startDate, //预计进场时间
                  "endDate": arry[i].endDate //预计退场时间
                }
                arr.push(obj)
              }
            }

          }

          this.setData({
            arr: arr
          })

        }
      })
    } else {
      wx.showToast({
        title: '请先新增价格信息',
        icon: 'none',
        duration: 1000, //停留时间
      })
    }

  },
  //修改
  updata(e) {
    console.log(this.data.arr)
    console.log(e.currentTarget.dataset.index)
    this.setData({
      duang: 'xiugai',
      dialogShow: true,
      choiceitem: e.currentTarget.dataset.index //选择的项
    })

  },
  confirmx() {
    console.log(111)
    this.setData({
      duang: 'jiage',
      dialogShow: true
    })
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
  load() {
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
    console.log(this.data.text5.secondConvertedQuantity)
    this.setData({
      value3: e.detail.value,
      // value4: this.data.text5.secondConvertedQuantity * e.detail.value
    })

  },
  value4(e) {
    this.setData({
      value4: e.detail.value,

    })
  },
  value5(e) {
    this.setData({
      value5: e.detail.value,
    })
  },
  value6(e) {
    this.setData({
      value6: e.detail.value,
    })
  },
  value7(e) {
    this.setData({
      value7: e.detail.value,
    })
  },
  tapDialogButton(e) {
    console.log(e.detail.item.text)
    if (e.detail.item.text == '确定') {
      if (this.data.duang == 'tijiao') {
        var that = this.data
        if (this.data.text1 != '' && this.data.text2 != '' && this.data.value2 != '') {
          console.log(this.data)
          wx.request({
            url: this.data.baseUrl + 'terminal/createBussMaterialsRentAppProject.do?',
            data: {
              tmessage: {
                "title": "", //标题
                "projectId": this.data.text1.projectId, //项目Id
                "projectName": this.data.text1.projectName, //项目名称
                "rentAddress": this.data.value6, //单位地址
                "rentName": this.data.value2, //外租单位\
                "customerId": this.data.text1.unCustomId, //施工单位Id(选择项目时带过来  unCustomId)
                "customerName": this.data.text1.unCustomName, //施工单位名称(选择项目时带过来  unCustomName)
                "projectAddress": this.data.text1.address, //项目地址(选择项目时带过来  address)
                "rentId": this.data.text3[0], //外租单位id
                "belongToArea": this.data.text2[0], //工程区域
                "rentTel": this.data.value5, //联系方式
                "bussMaterialsFeeSet": this.data.arry,
                "bussMaterialsDemandSet": this.data.arr,

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
                  url: '../zhoucaiplay-rent'
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
      } else if (this.data.duang == 'jiage') {
        console.log(1111111)
        if (this.data.text5 != ''  && this.data.enddate != ''
         && this.data.startdate != ''&&this.data.value7) {
          var index = this.data.index + 1
          this.setData({
            index: index
          })
          var arrr = this.data.arry
          var obj = {
            "commodity": this.data.text5.commodity, //品名
            "commodityId": this.data.text5.commodityId, //品名Id
            "unit": this.data.text5.compensationUnit, //单位
            "startDate": this.data.startdate, //预计进场时间
            "endDate": this.data.enddate,
            "dailyRent": this.data.value7, //日租金
            "remark": this.data.value3, //备注
            "index": index
          }
          arrr.push(obj)
          this.setData({
            arry: arrr,
            dialogShow: false,
            text5: '',
            value3: '',
            startdate: '进场日期',
            enddate: '进场日期',
          })
        } else {
          wx.showToast({
            title: '请填写完整信息',
            icon: 'none',
            duration: 2000
          })
        }
      } else if (this.data.duang == 'xiugai') {
        console.log(1111111)
        if (this.data.value4 != '') {
          var arr = this.data.choiceitem
          var arry = this.data.arr //整个数组
          var auxiliaryNum = parseInt(this.data.value4) * parseInt(arry[i].secondConvertedQuantity)
          for (var i = 0; i < arry.length; i++) {
            if (arry[i].specificationsId == arr.specificationsId) {
              arry[i].demandNum = this.data.value4
              arry[i].auxiliaryNum = auxiliaryNum.toFixed(2)
            }
          }
          console.log(arry)
          this.setData({
            arr: arry,
            dialogShow: false,
            value4: '',
          })
        } else {
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
        value4: '',
        value7: '',
        startdate: '进场日期',
        enddate: '退场日期',
      })
    }

  },
  deltarr(e) {
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
  deltarry(e) {
    var xx = this.data.arry

    console.log(e.currentTarget.dataset.index)
    console.log(xx)
    for (var i = 0; i < xx.length; i++) {
      if (xx[i].index == e.currentTarget.dataset.index) {
        xx.splice(i, 1)
        console.log(xx[i])
      }
    }
    this.setData({
      arry: xx
    })
  },
  //选择品名与规格
  togg() {
    this.setData({
      // duang: 'xinzeng',
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