// const baseUrl ='http://192.168.0.237:8095/emms_SDTY/'//本地
const baseUrl = 'https://www.jjaq.com.cn/sdty/' //测试
var cookies = decodeURIComponent(wx.getStorageSync('cookies')) //解码cookie
//获取地理位置
const position= ()=>{
  wx.getLocation({
    isHighAccuracy: true,
    success: (res) => {
      console.log(res)
      wx.getLocation({
        isHighAccuracy: true,
        success: (res) => {
          console.log(res)
          this.setData({
            latitude: res.latitude,//维度
            longitude: res.longitude//经度
          })
          var myAmapFun = new amapFile.AMapWX({ key: '5f6088c04bd6ed321f5b5f8def5d9e28' } );
          myAmapFun.getRegeo({
            location: '' + res.longitude + ',' + res.latitude + '',//location的格式为'经度,纬度'
            success: (data) => {
              console.log(data[0]);
            },
            fail: (err) => {
              console.log(err)
            }
          });


        },
      })
    },
  })
}
//触底事件
const touchbottom = (that) => {
  if (that.data.request == false) {
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    var start = parseInt(that.data.start) + parseInt(that.data.pageSize);
    that.setData({
      start: start
    })
    wx.request({
      url: baseUrl + that.data.url,
      data: {
        tmessage: {
          "query": {
            "start": that.data.start,
            "pageSize": that.data.pageSize,
            "keyword": that.data.adTitle
          }
        }
      },
      header: {
        cookie: that.data.cookies,
        
      },
      method: 'get',
      success: (result) => {
        wx.hideLoading()
        //判断数据库还有无数据
        if (result.data.info.result != '') {
          //有数据就往数组里面增加
          result.data.info.result.forEach((err) => {
            that.data.arr.push(err)
            // console.log(that.data.arr)
          })
          that.setData({
            arr: that.data.arr,
          })
        } else {
          //没有了就返回一个true终止请求
          that.setData({
            arr: that.data.arr,
            request: true
          })
        }
      }
    })
  }
}
//进场 退场 调拨 丢失项目请求
const projectget = (that) => {
  wx.showLoading({
    title: '数据加载中',
    mask: true,
  })
  wx.request({
    url: baseUrl + that.data.url,
    data: {
      tmessage: {
        "query": {
          "start": that.data.start,
          "pageSize": that.data.pageSize,
          "keyword": that.data.adTitle
        }
      }
    },
    header: {
      cookie: that.data.cookies
    },
    method: 'get',
    success: (result) => {
      console.log(result)
      if (result.data.success) {
        that.setData({
          arr: result.data.info.result
        })
        // console.log(that.data.arr)
      } 
      else if (res.data.msg == "抱歉，数据处理异常! 请稍后再试或与管理员联系！") {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000,
        })
      } 
      else {
        wx.showLoading({
          title: '登录超时',
          duration: 2000,
          mask: true,
          success: () => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login'
              })
            }, 2000)
          }
        })
      }
    },
    complete: () => {
      wx.hideLoading()
    }
  })
}
//进场 退场 调拨 丢失 项目明细请求
const projectdetailed = (that) => {
  wx.showLoading({
    title: '数据加载中',
    mask: true,
  })
  wx.request({
    url: baseUrl + that.data.url,
    data: {
      tmessage: {
        "query": {
          "relateId": that.data.relateId
        }
      }
    },
    header: {
      cookie: that.data.cookies
    },
    method: 'GET',
    success: (res) => {
      console.log(res)
      //判断是否登录成功
      if (res.data.success) {
        // if (res.data.info.result.totalCompensation) {
        //   res.data.info.result.totalCompensation = (res.data.info.result.totalCompensation * 0.9).toFixed(2)
        // }
        if (res.data.info.result.bussLostCompenDetailSet) {
          var arr = res.data.info.result.bussLostCompenDetailSet
          for (var i = 0; i < arr.length; i++) {
            arr[i].jiuzhe = (arr[i].totalCosts * 0.9).toFixed(2)
          }
        }
        that.setData({
          arr: res.data.info.result
        })
      } 
      else if (res.data.msg == "抱歉，数据处理异常! 请稍后再试或与管理员联系！") {
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration: 3000,
        })
      } 
      else {
        wx.showLoading({
          title: '登录超时',
          duration: 2000,
          mask: true,
          success: () => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login'
              })
            }, 1000)
          }
        })
      }
    },
    complete: () => {
      wx.hideLoading()
    }
  })
}
//扫描方法
const camera = (e, load, that) => {
  wx.showLoading({
    title: '数据加载中',
    mask: true,
  })
  wx.scanCode({
    success(res) {
      var aa = res.result.replace(/[\s|\;|\{|\}]/g, "")
      var relateId = aa.replace(/[^\d]/g, '')
      var relateModule = aa.substring(aa.indexOf(':') + 1)
      var relateModule = relateModule.substring(relateModule.indexOf(':') + 1)
      var relateId = parseInt(relateId)
      console.log(res)
      // if ('BUSS_ALLOCATION_PROJECT' == e) {
      if (relateModule == e) {
        var cookies = decodeURIComponent(wx.getStorageSync('cookies')) //解码cookies
        //判断是不是调拨
        if (e == 'BUSS_ALLOCATION_PROJECT' || e == 'ALLOCATION_PROJECT') {
          console.log('这是调拨的' + relateModule)
          wx.request({
            url: baseUrl + 'terminal/projectQrcodeAppProject.do',
            data: {
              tmessage: {
                "query": {
                  "relateId": relateId,
                  // "relateModule": 'BUSS_ALLOCATION_PROJECT'
                  "relateModule": relateModule
                }
              }
            },
            header: {
              cookie: cookies
            },
            method: 'GET',
            success: (res) => {
              console.log(res)
              //判断请求成功与否
              if (res.data.success) {
                //判断是否有权限
                if (res.data.info.result[0].abc == false) {
                  wx.showToast({
                    title: '该条信息不在您权限范围内!!!',
                    icon: 'none',
                    duration: 3000,
                  })
                } else {
                  //判断该订单是否已确认新增过
                  if (res.data.info.result[0].nike == false) {
                    wx.showToast({
                      title: '该订单已确认,请勿重复扫描',
                      icon: 'none',
                      duration: 2000,
                    })
                  } else {
                    //判断该订单有无审批
                    console.log(res.data.info.result[0])
                    var list = res.data.info.result[0]
                    if (list.materialsPackage && (list.materialsPackage.applyforState) == '3' ||
                      list.bussAllocationProject && (list.bussAllocationProject.applyforState) == '3' ||
                      list.recycleManage && (list.recycleManage.applyforState) == '3' ||
                      list.lostCompensation && (list.lostCompensation.applyforState) == '3' ||
                      list.allocationProject && (list.allocationProject.applyforState) == '3' ) {
                      if (res.data.info.result[0].lostCompensationDetailSet) {
                        var arr = res.data.info.result[0].lostCompensationDetailSet
                        for (var i = 0; i < arr.length; i++) {
                          arr[i].jiuzhe = (arr[i].totalCosts * 0.9).toFixed(2)
                        }
                      }
                      // if (res.data.info.result[0].allCost) {
                      //   res.data.info.result[0].lostCompensation.totalCompensation =
                      //     (res.data.info.result[0].lostCompensation.totalCompensation * 0.9).toFixed(2)
                      // }
                      // if (res.data.info.result[0].lostCompensation) {
                      //   var arr = res.data.info.result[0].lostCompensation.lostCompensationDetailSet
                      //   for (var i = 0; i < arr.length; i++) {
                      //     arr[i].totalCosts = (arr[i].totalCosts * 0.9).toFixed(2)
                      //   }
                      // }
                      that.setData({
                        relateId: relateId
                      })
                      if (relateModule == 'ALLOCATION_PROJECT'){
                        console.log('你扫描了周材调拨')
                        load(res.data.info.result[0], relateModule)
                      }else{
                        console.log('你扫描了普通调拨')
                        load(res.data.info.result[0])
                      }
                      
                      wx.hideLoading()
                      wx.showToast({
                        title: '加载成功',
                      })
                    } else {
                      wx.showToast({
                        title: '该条订单未审批',
                        icon: 'none',
                        duration: 2000,
                      })
                    }

                  }
                }


              } else {
                if (res.data.msg == "抱歉，数据处理异常! 请稍后再试或与管理员联系！") {
                  wx.showToast({
                    title: '找不到该项目id',
                    image: '../img/cuowu.png',
                    duration: 3000,
                  })
                }
                else {
                  wx.showLoading({
                    title: '登录超时',
                    duration: 2000,
                    mask: true,
                    success: () => {
                      setTimeout(() => {
                        wx.redirectTo({
                          url: '/pages/login/login'
                        })
                      }, 1000)
                    }
                  })
                }

              }

            }
          })
        }else{
          console.log('这不是调拨')
          wx.request({
            url: baseUrl + 'terminal/projectQrcodeAppProject.do',
            data: {
              tmessage: {
                "query": {
                  "relateId": relateId,
                  "relateModule": relateModule
                }
              }
            },
            header: {
              cookie: cookies
            },
            method: 'GET',
            success: (res) => {
              console.log(res)
              //判断请求成功与否
              if (res.data.success) {
                //判断是否有权限
                if (res.data.info.result[0].abc == false) {
                  wx.showToast({
                    title: '该条信息不在您权限范围内!!!',
                    icon: 'none',
                    duration: 3000,
                  })
                } else {
                  //判断该订单是否已确认新增过
                  if (res.data.info.result[0].nike == "false") {
                    wx.showToast({
                      title: '该订单已确认,请勿重复扫描',
                      icon: 'none',
                      duration: 2000,
                    })
                  } else {
                    //判断该订单有无审批
                    console.log(res.data.info.result[0])
                    var list = res.data.info.result[0]
                    if (list.materialsPackage && (list.materialsPackage.applyforState) == '3' ||
                      list.allocationProject && (list.allocationProject.applyforState) == '3' ||
                      list.recycleManage && (list.recycleManage.applyforState) == '3' ||
                      list.lostCompensation && (list.lostCompensation.applyforState) == '3') {
                      if (res.data.info.result[0].lostCompensation) {
                        var arr = res.data.info.result[0].lostCompensation.lostCompensationDetailSet
                        for (var i = 0; i < arr.length; i++) {
                          arr[i].jiuzhe = (arr[i].totalCosts * 0.9).toFixed(2)
                        }
                      }
                      // if (res.data.info.result[0].allCost) {
                      //   res.data.info.result[0].lostCompensation.totalCompensation =
                      //     (res.data.info.result[0].lostCompensation.totalCompensation * 0.9).toFixed(2)
                      // }
                      // if (res.data.info.result[0].lostCompensation) {
                      //   var arr = res.data.info.result[0].lostCompensation.lostCompensationDetailSet
                      //   for (var i = 0; i < arr.length; i++) {
                      //     arr[i].totalCosts = (arr[i].totalCosts * 0.9).toFixed(2)
                      //   }
                      // }
                      that.setData({
                        relateId: relateId
                      })
                      load(res.data.info.result[0])
                      wx.hideLoading()
                      wx.showToast({
                        title: '加载成功',
                      })
                    } else {
                      wx.showToast({
                        title: '该条订单未审批',
                        icon: 'none',
                        duration: 2000,
                      })
                    }

                  }
                }


              } else {
                if (res.data.msg == "抱歉，数据处理异常! 请稍后再试或与管理员联系！") {
                  wx.showToast({
                    title: '找不到该项目id',
                    image: '../img/cuowu.png',
                    duration: 3000,
                  })
                } 
                else {
                  wx.showLoading({
                    title: '登录超时',
                    duration: 2000,
                    mask: true,
                    success: () => {
                      setTimeout(() => {
                        wx.redirectTo({
                          url: '/pages/login/login'
                        })
                      }, 1000)
                    }
                  })
                }

              }

            }
          })
        }
       
      } else {
        wx.showToast({
          title: '该二维码不属于该管理',
          icon: 'none',
          duration: 3000,
        })
      }
    },
    fail: (res) => {
      console.log(res);
      wx.showToast({
        title: '扫描失败',
        icon: 'none',
        duration: 3000
      })
    }
  })
}
//扫码确定 函数调用
const scanning = (that,obj) => {
  wx.showLoading({
    title: '数据加载中',
    mask: true,
  })
  //判断是不是调拨的
  if (that.data.arr.bussAllocationProject){
    wx.request({
      url: baseUrl + that.data.addurl,
      data: {
       
        "relateId": parseInt(that.data.relateId),
            // "relateId": 7,//本地
        "bussAllocationDetailSet": JSON.stringify(that.data.arr.bussAllocationProject.bussAllocationDetailSet),
        "bussAllocationChargeSet": JSON.stringify(obj)
      
      },
      header: {
        cookie: that.data.cookies,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      success: (res) => {
        wx.hideLoading()
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
  }else{
    wx.request({
      url: baseUrl + that.data.addurl,
      data: {
        tmessage: {
          "query": {
            "relateId": parseInt(that.data.relateId),
            // "relateId": 5,//本地
          }
        }
      },
      header: {
        cookie: that.data.cookies
      },
      method: 'get',
      success: (res) => {
        wx.hideLoading()
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
  }
  
}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  touchbottom: touchbottom,
  baseUrl: baseUrl,
  camera: camera,
  projectget: projectget,
  projectdetailed: projectdetailed,
  scanning: scanning,
  cookies: cookies,
  formatTime: formatTime
}