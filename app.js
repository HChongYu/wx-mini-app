//app.js
const WXAPI = require('/wxapi/main')
App({
  onLaunch: function () {
    WXAPI.jhLogin().then(res=>{
      wx.setStorageSync('userInfo', res.data)
      wx.setStorageSync('token', res.data.token)
    })
  },
  globalData: {
    // userInfo: null
    WXAPI:WXAPI
  }
})