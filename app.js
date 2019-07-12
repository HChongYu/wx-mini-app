//app.js
const WXAPI = require('/wxapi/main')
const UTIL = require('utils/util')
App({
  onLaunch: function () {
    wx.setStorageSync('yetGoLogin',false)
  },
  onShow() {
  },
  globalData: {
    // userInfo: null
    WXAPI: WXAPI,
    UTIL: UTIL
  }
})