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
    value1: '0', //设备数量
    value2: '台', //设备单位默认
    value4: '',//日租金
    value5: '',//备案编号
    value6: '',//外租单位
    value7: '',//联系电话
    value8:'',//单位地址
    text1: ["10", "起重运输机械"], //设备类别
    text2: '', //设备型号
    text3:'',//单体
    title: '新增设备计划',
    attachId: 0, //上传文件ID
    attachName: '', //文件名称

  },
  //删除列表
  delt(e) {
    var equipmentdelt = this.data.equipmentdelt
    var xx = equipmentdelt.bussEquipDemandSet
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
        equipmentdelt.bussEquipDemandSet = []
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
  //设备类别
  bindPickerChange5(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array5.length; i++) {
      this.data.array5[i].index = i
      if (this.data.array5[i].index == e.detail.value) {
        console.log(this.data.array5[i])
        this.setData({
          text1: this.data.array5[i]
        })

      }
    }
  },
  //设备型号
  bindPickerChange6(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    for (var i = 0; i < this.data.array6.length; i++) {
      this.data.array6[i].index = i
      if (this.data.array6[i].index == e.detail.value) {
        console.log(this.data.array6[i])
        this.setData({
          text2: this.data.array6[i]
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
    var data = {
      "projectId": equipmentdelt.projectId, //项目Id
      "equipRentId": equipmentdelt.equipRentId,//主id
      "rentName": equipmentdelt.rentName,//外租单位
      "rentTel": equipmentdelt.rentTel,//联系电话
      "projectAddress": equipmentdelt.projectAddress,//项目地址
      "projectName": equipmentdelt.projectName, //项目名称
      "customerId": equipmentdelt.customerId, //施工单位Id(选择项目时带过来  unCustomId)
      "customerName": equipmentdelt.customerName, //施工单位名称(选择项目时带过来  unCustomName)
      "rentAddress": equipmentdelt.rentAddress,//单位地址
      // "quantity": this.data.value1, // 需求数量
      "belongToArea": equipmentdelt.belongToArea, //工程区域
      // "projectType": equipmentdelt.projectType, //工程类型
      // "planType": equipmentdelt.planType, //计划类型
      "bussEquipDemandSet": JSON.stringify(equipmentdelt.bussEquipDemandSet)
    }


    wx.request({
      url: this.data.baseUrl + 'terminal/bussEquipRentModifyAppProject.do?',
      data: data,
      header: {
        cookie: this.data.cookies,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      success: (res) => {
        console.log(res)
        if (res.data.success == true) {
          this.setData({
            duang: 'confirm',
            dialogShow: true,
            buttons: [{
              text: '返回菜单'
            }, {
              text: '确定提交'
            }],
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
  },
  //新增
  added() {
    this.setData({
      text1: ["10", "起重运输机械"], //设备类别
      duang: 'added',
      title: '新增设备计划',
      text2: '', //设备型号
      text3: '', //单体名称
      value2: '台', //设备单位
      value3: '',
      value4: '',//日租金
      value5: "",//备案编号
      attachId: '', //上传文件ID
      attachName: '', //文件名称
      imgs: [],
      startdate: '进场日期',
      enddate: '退场日期',
      dialogShow: true
    })
  },
  //修改列表
  modify(e) {
    console.log(e)
    var arr = e.currentTarget.dataset.item
    var text3 = {
      'singleId': arr.singleId,
      'singleName': arr.singleName
    }
    this.setData({
      duang: 'modify',
      title: '修改设备计划',
      dialogShow: true,
      text1: ['0', arr.equipGenericName], //设备类别 
      text2: ['0', arr.equipSpecificName], //设备型号
      value2: arr.unit, //单位
      value3: arr.quantity, //数量
      value4: arr.dailyRent,//日租金
      value5: arr.recordId,//备案编号
      startdate: arr.startDate, //进场时间
      enddate: arr.endDate, //退场时间
      text3: text3, //单体信息
      equipmentdeltindex: e.currentTarget.dataset.index //判断修改的项
    })
  },
  tapDialogButton(e) {
    if (e.detail.item.text == '确定' || e.detail.item.text == '确定提交' ) {
      if (this.data.duang == 'added') {
        if (this.data.text1 != '' && this.data.text2 != '' && this.data.value2 != '' &&
          this.data.value3 != '' && this.data.startdate != '' && this.data.enddate != '') {
          var index = this.data.index + 1
          this.setData({
            index: index
          })
          if (this.data.attachName != '') {
            var attachId = this.data.attachId
            var attachName = this.data.baseUrl + 'image/' + this.data.attachName
          } else {
            var attachName = ''
            var attachId = 0
          }
          var equipmentdelt = this.data.equipmentdelt
        
          var arrr = equipmentdelt.bussEquipDemandSet
         

          console.log(arrr)
          if (this.data.text3) {
            console.log('有单体')
            var obj = {
              "equipGenericName": this.data.text1[1], //设备类别
              "equipSpecificName": this.data.text2[1], //设备型号
              "quantity": this.data.value2, //单位
              "number": this.data.value3, //数量
              "dailyRent" :this.data.value4, //日租金
              "recordId" : this.data.value5, //备案编号
              "startDate": this.data.startdate, //预计进场时间
              "endDate": this.data.enddate, //预计退场时间
              "singleId": this.data.text3.singleId, //单体ID
              "singleName": this.data.text3.singleName, // 单体名称
              "index": index
            }
          } else {
            console.log('没有单体')
            var obj = {
              "equipGenericName": this.data.text1[1], //设备类别
              "equipSpecificName": this.data.text2[1], //设备型号
              "quantity": this.data.value2, //单位
              "number": this.data.value3, //数量
              "dailyRent": this.data.value4, //日租金
              "recordId": this.data.value5, //备案编号
              "startDate": this.data.startdate, //预计进场时间
              "endDate": this.data.enddate, //预计退场时间
              "singleId": '', //单体ID
              "singleName": '', // 单体名称
              "index": index
            }
          }
          console.log(obj)
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
            text1: ["10", "起重运输机械"], //设备类别
            text2: '', //设备型号
            text3: '', //单体名称
            value2: '台', //设备单位
            value3: '',
            value4: '',//日租金
            value5: "",//备案编号
            attachId: '', //上传文件ID
            attachName: '', //文件名称
            imgs: [],
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
        var arrr = equipmentdelt.bussEquipDemandSet
        for (var i = 0; i < arrr.length; i++) {
          arrr[i].index = i
          if (arrr[i].index == this.data.equipmentdeltindex) {
            console.log(arrr[i])
            arrr[i].equipGenericName = this.data.text1[1]
            arrr[i].equipSpecificName = this.data.text2[1]
            arrr[i].unit = this.data.value2, //单位
              arrr[i].quantity = this.data.value3, //数量
              arrr[i].dailyRent = this.data.value4, //日租金
              arrr[i].recordId = this.data.value5, //备案编号
              arrr[i].startDate = this.data.startdate, //预计进场时间
              arrr[i].endDate = this.data.enddate, //预计退场时间
              arrr[i].singleId = this.data.text3.singleId, //单体ID
              arrr[i].singleName = this.data.text3.singleName// 单体名称
            
            var y = 0
            for (var i = 0; i < arrr.length; i++) {
              y = y + parseInt(arrr[i].number)
            }
            this.setData({
              value1: y,
              equipmentdelt: equipmentdelt,
              dialogShow: false,
              text1: ["10", "起重运输机械"], //设备类别
              text2: '', //设备型号
              text3: '', //单体名称
              value2: '台', //设备单位
              value3: '',
              value4: '',//日租金
              value5: "",//备案编号
              attachId: '', //上传文件ID
              attachName: '', //文件名称
              imgs: [],
              startdate: '进场日期',
              enddate: '退场日期',
            })
            
          }
        }
      } else if (this.data.duang == 'confirm') {
        var equipmentdelt = this.data.equipmentdelt
        wx.request({
          url: this.data.baseUrl + 'terminal/bussPlanSubmitAppProject.do?',
          data: {
            tmessage: {
              "query": {
                "relateId": equipmentdelt.equipRentId,
                "relateModule": 'BUSS_EQUIP_RENT',
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
      if (this.data.duang == 'confirm') {
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
      this.setData({
        dialogShow: false,
        text1: ["10", "起重运输机械"], //设备类别
        text2: '', //设备型号
        text3: '', //单体名称
        value2: '台',
        value3: '',//需求量
        value4:'',//日租金
        value5:"",//备案编号
        startdate: '进场日期',
        enddate: '退场日期',
        attachId: '', //上传文件ID
        attachName: '', //文件名称
        imgs: []
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
    this.load(id)
  },
  load(id) {
    this.setData({
      cookies: decodeURIComponent(wx.getStorageSync('cookies')), //解码cookie
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
    wx.request({
      url: this.data.baseUrl + 'terminal/bussEquipRentDetailAppProject.do?',
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
        wx.request({
          url: this.data.baseUrl + 'terminal/permissionSingleAppProject.do?',
          method: 'get',
          data: {
            tmessage: {
              "query": {
                "start": this.data.start,
                "pageSize": this.data.pageSize,
                "keyword": '',
                'projectId': res.data.info.result.projectId
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
        var arrr = res.data.info.result.bussEquipDemandSet
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
      value3: e.detail.value
    })
  },
  //日租金
  value4(e) {
    this.setData({
      value4: e.detail.value
    })
  },
  //备案编号
  value5(e) {
    this.setData({
      value5: e.detail.value
    })
  },
  //外租单位
  value6(e) {
    var equipmentdelt = this.data.equipmentdelt
    equipmentdelt.rentName = e.detail.value
    this.setData({
      equipmentdelt: equipmentdelt
    })
  },
  //联系方式
  value7(e) {
    var equipmentdelt = this.data.equipmentdelt
    equipmentdelt.rentTel = e.detail.value
    this.setData({
      equipmentdelt: equipmentdelt
    })
  },
  //单位地址
  value8(e) {
    var equipmentdelt = this.data.equipmentdelt
    equipmentdelt.rentAddress = e.detail.value
    this.setData({
      equipmentdelt: equipmentdelt
    })
  },
})