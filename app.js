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
    formatTime: utils.formatTime
  }
})