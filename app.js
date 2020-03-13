//app.js
var utils = require("./utils/util.js")
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    utils: utils,
    camera: utils.camera,
    code: utils.code,
    touchbottom: utils.touchbottom,
    formatTime: utils.formatTime,
    url : 'http://192.168.0.242:8081/emms_SDTY/'//本地
// const baseUrl = 'https://www.jjaq.com.cn/sdty/' //测试
  }
})