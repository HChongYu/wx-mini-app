// pages/login/login.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

 
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.login();
  },
  login(title='验证小兵'){
    let that =this;
    wx.showLoading({
      title:`${title}`
    })
    wx.login({
      success(res) {
        console.log(res)
        // wx.setStorageSync('token', '004bf35819db4a30bded498e25afbf1f')
        // wx.navigateBack();
        WXAPI.uLogin(res.code).then(res => {
          wx.hideLoading({
          })
          console.log(res)
          if (res.code == 0) {
            if (res.data.signInToken) {
              that.data.signInToken=res.data.signInToken;
            } else if (res.data.token) {
              wx.setStorageSync('token', res.data.token)
              wx.setStorageSync('userInfo', res.data)
              // UTIL.commonToast("成功登陆")
              wx.navigateBack();
            }
          } else {
            res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
          }
        })
      },
      fail(){
        wx.hideLoading({
        })
        that.login();
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e)
    wx.showLoading({
      title: '登记小兵信息',
    })
    let dto ={
      "avatarUrl": e.detail.userInfo.avatarUrl,
      "gender": e.detail.userInfo.gender,
      "nickName": e.detail.userInfo.nickName,
      "signInToken": this.data.signInToken
    }
    WXAPI.uSignIn(dto).then(res => {
      if (res.code == 0) {
        // UTIL.commonToast("登记成功")
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo', res.data)
        wx.navigateBack();
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast('');
        this.login('请再次登陆')
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('yetGoLogin')
  },
})