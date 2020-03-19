Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: getApp().globalData.utils.baseUrl, //获取公用url路径
    cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookies
    equipmentdelt: {},
    imgs: [],
    start: '0', //起始条数（从第几条开始显示）
    pageSize: '100', //显示条数
    startdate: '进场日期',
    enddate: '退场日期',
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    duang: '',
    array1: [],
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
    ], //工程区域
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
    value1: '0', //设备数量
    value2: '台', //设备单位默认
    value4:'自动换算',//辅助数量
    display: 'none',
    text1: {}, //品名
    text2: '', //规格
    title: '新增周材计划',
    dialogShow: false,//控制选择品名规格的
    pickerList: [],//z周材列表
  },
 
  //删除列表
  delt(e) {
    var equipmentdelt = this.data.equipmentdelt
    console.log(equipmentdelt)
    var xx = equipmentdelt.bussDemandDetailSet
    console.log(e.currentTarget.dataset.index)
    console.log(xx)
    for (var i = 0; i < xx.length; i++) {
      xx[i].index = i
      if (xx[i].index == e.currentTarget.dataset.index) {
        xx.splice(i, 1)
        console.log(xx[i])
      }
    }
    var y = 0
    for (var i = 0; i < xx.length; i++) {
      y = y + parseInt(xx[i].number)
    }
    this.setData({
      equipmentdelt: equipmentdelt,
      value1: y
    })
  },
  //修改项目名称和工程区域地址
  bindPickerChange1(e) {
    this.setData({
      arr: [],

    })
    var arr = this.data.array1
    var xx = this.data.array2
    console.log('picker发送选择改变，携带值为', e.detail.value)
    for (var i = 0; i < arr.length; i++) {
      arr[i].index = i
      if (arr[i].index == e.detail.value) {
        console.log(arr[i])
        var equipmentdelt = this.data.equipmentdelt
        equipmentdelt.projectName = arr[i].projectName
        equipmentdelt.projectId = arr[i].projectId
        equipmentdelt.projectAddress = arr[i].address
        equipmentdelt.belongToAreaName = ''
        equipmentdelt.belongToArea = '',
          equipmentdelt.bussDemandDetailSet = []
        this.setData({
          projectId: arr[i].projectId,
          equipmentdelt: equipmentdelt
        })
        for (var a = 0; a < xx.length; a++) {
          if (arr[i].belongToArea == xx[a][0]) {
            console.log(xx[a])
            var equipmentdelt = this.data.equipmentdelt
            equipmentdelt.belongToAreaName = xx[a][1]
            equipmentdelt.belongToArea = xx[a][0]
            this.setData({

              equipmentdelt: equipmentdelt
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
            'projectId': this.data.projectId
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
          text3: res.data.data[0]
        })

      }
    })
  },
  //修改计划类型
  bindPickerChange3(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    var arr = this.data.array3
    for (var i = 0; i < arr.length; i++) {
      arr[i].index = i
      if (arr[i].index == e.detail.value) {
        var equipmentdelt = this.data.equipmentdelt
        equipmentdelt.planTypeName = arr[i][1]
        equipmentdelt.planType = arr[i][0]
        console.log(arr[i])
        this.setData({
          equipmentdelt: equipmentdelt
        })

      }
    }
  },
  //修改工程类别
  bindPickerChange4(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    var arr = this.data.array4
    for (var i = 0; i < arr.length; i++) {
      arr[i].index = i
      if (arr[i].index == e.detail.value) {
        var equipmentdelt = this.data.equipmentdelt
        equipmentdelt.projectTypeName = arr[i][1]
        equipmentdelt.projectType = arr[i][0]
        console.log(arr[i])
        this.setData({
          equipmentdelt: equipmentdelt
        })

      }
    }
  },
  // //设备类别
  // bindPickerChange5(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail)
  //   for (var i = 0; i < this.data.array5.length; i++) {
  //     this.data.array5[i].index = i
  //     if (this.data.array5[i].index == e.detail.value) {
  //       console.log(this.data.array5[i])
  //       this.setData({
  //         text1: this.data.array5[i]
  //       })

  //     }
  //   }
  // },
  //设备型号
  bindPickerChange6(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array6.length; i++) {
      this.data.array6[i].index = i
      if (this.data.array6[i].index == e.detail.value) {
        console.log(this.data.array6[i])
        this.setData({
          text2: this.data.array6[i],
          value3: 1,//将需求数量初值默认为一
          value4: (this.data.array6[i].secondConvertedQuantity * 1).toFixed(2)
        })

      }
    }
  },
  //设备型号
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

  //提交修改
  confirm() {
    
    var equipmentdelt = this.data.equipmentdelt
    console.log(equipmentdelt)
    if (equipmentdelt.customerId) {
      var data = {
        "materialsPlanId": equipmentdelt.materialsPlanId, //项目Id
        "projectId": equipmentdelt.projectId,//主id
        "projectAddress": equipmentdelt.projectAddress,
        "projectName": equipmentdelt.projectName, //项目名称
        "customerId": equipmentdelt.customerId, //施工单位Id(选择项目时带过来  unCustomId)
        "customerName": equipmentdelt.customerName, //施工单位名称(选择项目时带过来  unCustomName)
        "address": equipmentdelt.address, //项目地址
        "belongToArea": equipmentdelt.belongToArea, //工程区域
        "projectType": equipmentdelt.projectType, //工程类型
        "planType": equipmentdelt.planType, //计划类型
        "bussDemandDetailSet": JSON.stringify(equipmentdelt.bussDemandDetailSet)
      }
    } else {
      var data = {
        "materialsPlanId": equipmentdelt.materialsPlanId, //项目Id
        "projectId": equipmentdelt.projectId,//主id
        "projectAddress": equipmentdelt.projectAddress,
        "projectName": equipmentdelt.projectName, //项目名称
        "customerId": '', //施工单位Id(选择项目时带过来  unCustomId)
        "customerName": '', //施工单位名称(选择项目时带过来  unCustomName)
        "address": equipmentdelt.address, //项目地址
        "belongToArea": equipmentdelt.belongToArea, //工程区域
        "projectType": equipmentdelt.projectType, //工程类型
        "planType": equipmentdelt.planType, //计划类型
        "bussDemandDetailSet": JSON.stringify(equipmentdelt.bussDemandDetailSet)
      }
    }

    wx.request({
      url: this.data.baseUrl + 'terminal/bussMaterialsPlanModifyAppProject.do?',
      data: data,
      header: {
        cookie: this.data.cookies,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      success: (res) => {
        console.log(res)
        if(res.data.success==true){
          this.setData({
            duang: 'confirm',
            dialogShow: true,
            buttons: [{
              text: '返回菜单'
            }, {
              text: '确定提交'
            }],
          })
        }else{
          wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration: 2000
        })
        }
        
      }
    })
    
  },
  //新增
  added() {
    this.setData({
      value3:'',
      duang: 'added',
      text1: '', //品名
      text2: '', //设备型号
      text3: '', //单体名称
      value2: '', //设备单位
      value4: '自动换算',
      startdate: '进场日期',
      title: '新增周材计划',
      dialogShow: true
    })
  },
  //修改列表
  modify(e) {
    console.log(e)
    var arr = e.currentTarget.dataset.item
    // var text3 = {
    //   'singleId': arr.singleId,
    //   'singleName': arr.singleName
    // }
    this.setData({
      duang: 'modify',
      title: '修改周材计划',
      dialogShow: true,
      text1: arr, //品名
      text2: arr, //设备型号
      value2: arr.unit, //单位
      value3: arr.demandNum, //数量
      value4: arr.auxiliaryNum,//辅助数量
      startdate: arr.startDate, //进场时间
      enddate: arr.endDate, //退场时间
      equipmentdeltindex: e.currentTarget.dataset.index //判断修改的项
    })
    wx.request({
      url: this.data.baseUrl + 'terminal/newListMaterials.do?',
      data: {
        tmessage: {
          "query": {
            "start": this.data.start,
            "pageSize": this.data.pageSize,
            "commodityIds": arr.commodityId,
          }
        }
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        for(var i=0;i<res.data.data.length;i++){
          if (res.data.data[i].specifications == arr.specifications){
            console.log(res.data.data[i])
            this.setData({
              text2: res.data.data[i]
            })
          }
        }
        console.log(res)
        this.setData({
          array6: res.data.data
        })

      }
    })
  },
  tapDialogButton(e) {
    if (e.detail.item.text == '确定' || e.detail.item.text == '确定提交' ) {
      if (this.data.duang == 'added') {
        if (this.data.text1 != '' && this.data.text2 != '' && this.data.value4 != '' &&
          this.data.value3 != '' && this.data.startdate != '') {
          var index = this.data.index + 1
          this.setData({
            index: index
          })
          var equipmentdelt = this.data.equipmentdelt
          var arrr = equipmentdelt.bussDemandDetailSet
          var obj = {
            "commodity": this.data.text1.commodity,//品名
            "commodityId": this.data.text1.commodityId, //品名id
            "unit": this.data.text2.firstUnitConversion, //单位
            "mnemonicCode": this.data.text2.mnemonics,//助记码
            "specifications": this.data.text2.specifications,//规格
            "demandNum": this.data.value3, //需求数量
            "convertedQuantity": this.data.text2.secondConvertedQuantity,//换算数量
            "auxiliaryUnit": this.data.text2.secondUnitConversion, //辅助单位
            "startDate": this.data.startdate, //预计进场时间
            "auxiliaryNum": this.data.value4 //辅助数量
          }
          arrr.push(obj)
          var y = 0
          for (var i = 0; i < arrr.length; i++) {
            y = y + parseInt(arrr[i].number)
          }
          console.log(arrr)
          this.setData({
            value1: y
          })
          console.log(arrr)
          this.setData({
            equipmentdelt: equipmentdelt,
            dialogShow: false,
            text1: '', //品名
            text2: '', //设备型号
            text3: '', //单体名称
            value2: '', //设备单位
            value3: '',
            value4: '',
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
      } else if (this.data.duang == 'modify') {
        var equipmentdelt = this.data.equipmentdelt
        var arrr = equipmentdelt.bussDemandDetailSet
        console.log(equipmentdelt)
        for (var i = 0; i < arrr.length; i++) {
          arrr[i].index = i
          console.log(arrr)
          console.log('这是选择的index'+this.data.equipmentdeltindex)
          if (arrr[i].index == this.data.equipmentdeltindex) {
            arrr[i].commodity = this.data.text1.commodity //品名
            arrr[i].commodityId = this.data.text1.commodityId //品名id
            arrr[i].unit = this.data.text2.firstUnitConversion, //单位
            arrr[i].mnemonicCode = this.data.text2.mnemonics//助记码
            arrr[i].specifications = this.data.text2.specifications//规格
            arrr[i].demandNum = this.data.value3, //需求数量
            arrr[i].convertedQuantity = this.data.text2.secondConvertedQuantity//换算数量
            arrr[i].auxiliaryUnit = this.data.text2.secondUnitConversion, //辅助单位
            arrr[i].startDate = this.data.startdate, //预计进场时间
            arrr[i].auxiliaryNum = this.data.value4 //辅助数量
            var y = 0
            for (var i = 0; i < arrr.length; i++) {
              y = y + parseInt(arrr[i].number)
            }
            console.log(arrr[i])
            this.setData({
              value1: y,
              equipmentdelt: equipmentdelt,
            })
          }
        }
      } else if (this.data.duang == 'confirm') {
        console.log(111111111)
        var equipmentdelt=this.data.equipmentdelt
        wx.request({
          url: this.data.baseUrl + 'terminal/bussPlanSubmitAppProject.do?',
          data: {
            tmessage: {
              "query": {
                "relateId": equipmentdelt.materialsPlanId,
                "relateModule": 'BUSS_MATERIALS_PLAN',
              }
              }
          },
          header: {
            cookie: this.data.cookies,
          },
          method: 'get',
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1 //向上返回一级
              })
            }, 2000)
            
          }
        })
      }
    } else {
      if (this.data.duang == 'confirm'){
        // wx.showToast({
        //   title: '信息错误',
        //   duration: 2000
        // })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1 //向上返回一级
          })
        }, 2000)
      }
      console.log('清除')
      this.setData({
        dialogShow: false,
        text1: '', //品名
        text2: '', //设备型号
        text3: '', //单体名称
        value2: '台',
        value3: '',
        value4: '',
        startdate: '进场日期',
      })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
    var id = options.id
    //加载详情
    wx.request({
      url: this.data.baseUrl + 'terminal/bussMaterialsPlanDetailAppProject.do?',
      data: {
        tmessage: {
          "query": {
            "relateId": id
          }
        } //设备id
      },
      header: {
        cookie: this.data.cookies
      },
      method: 'get',
      success: (res) => {
        console.log(res)
        var arrr = res.data.info.result.bussDemandDetailSet
        var y = 0
        for (var i = 0; i < arrr.length; i++) {
          y = y + parseInt(arrr[i].number)
        }
        console.log(arrr)
        this.setData({
          value1: y
        })
        this.setData({
          equipmentdelt: res.data.info.result
        })
      }
    })
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
    this.load()
  },
  load(id) {
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
    })
    
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
  // //图片上传显示
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
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        var that = this
        var imgs = that.data.imgs;
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: this.data.baseUrl + 'file-upload', //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            cookie: this.data.cookies,
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..' //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            'user': 'test', //其他额外的formdata，可不写
            'file_cat': 'BUSS_EQUIP_DETAIL'

          },
          success: (res) => {
            console.log(res)
            console.log(JSON.parse(res.data).fileId);
            var fileId = JSON.parse(res.data).fileId
            var attachName = JSON.parse(res.data).filePath
            if (this.data.fileAttaches == '') {
              this.setData({
                fileAttaches: fileId,
                attachName: attachName,
                attachId: fileId
              })
            } else {
              this.setData({
                fileAttaches: this.data.fileAttaches + ',' + fileId,
                attachName: attachName,
                attachId: fileId
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
  //选择开始与结束日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindDateChangeEnd: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  //需求数量
  value3(e) {
    this.setData({
      value3: e.detail.value,
      value4: (this.data.text2.secondConvertedQuantity * e.detail.value).toFixed(2)
    })
  },
  //选择品名
  togg() {
    this.setData({
      showDialog: true,
    })
  },
  //判断点击修改第几个数据
  click: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.index
    if (this.data.showDialogtype==2){
      var index = e.currentTarget.dataset.index
      for (var i = 0; i < this.data.pickerList.length; i++) {
        this.data.pickerList[i].index = i
        if (this.data.pickerList[i].index == index) {
          console.log(this.data.pickerList[i])
          //得到选中的设备规格
          this.setData({
            text1: this.data.pickerList[i],
            text2: '',
            value2: this.data.pickerList[i].rentUnit,
            value3: '',
            value4: '自动换算'
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
                array6: res.data.data,

              })

            }
          })

        }
      }
    } else if (this.data.showDialogtype==3){
      var index = e.currentTarget.dataset.index
      var arr =this.data.array6
      for(var i=0;i<arr.length;i++){
        arr[i].index=i
        if(arr[i].index==index){
          console.log(arr[i])
          this.setData({
            text2:arr[i]
          })
        }
      }
    }
    
    if (this.data.duang == 'xinzeng') {
      console.log(this.data.text1)
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
  //一开始点击修改的项
  toggleDialog(e) {
    console.log(e)
    this.setData({
      showDialog: !this.data.showDialog,
      modificationitem: e.currentTarget.dataset.index
    });
  },
  delt1() {
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
  //选择品名与规格
  togg() {
    this.setData({
      showDialogtype: 2,
      showDialog: true,

    })
  },
  upgg() {
    this.setData({
      showDialogtype: 3,
      showDialog: true,

    })
  },
})