//app.js
const WXAPI = require('/wxapi/main')
const UTIL = require('utils/util')
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    })
    wx.setStorageSync('yetGoLogin',false)
  },
  onShow() {
  },
  globalData: {
    // userInfo: null123
    WXAPI: WXAPI,
    UTIL: UTIL
  }
})