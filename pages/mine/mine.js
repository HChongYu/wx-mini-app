// pages/mine/mine.js
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
    wx.hideShareMenu()
    this.setData({userInfo:wx.getStorageSync('userInfo')})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMineTipNum()


  },          
  getMineTipNum(){
    let that =this;
    WXAPI.mineTipNum().then(res => {
      if (res.code == 0) {
        that.setData({hasMessage:res.data})
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 跳转函数
  // 树洞按钮
  treeClick() {
    wx.navigateTo({
      url: '/packageTree/treelist/treelist'
    })
  },
  // 收藏按钮
  collectClick() {
    wx.navigateTo({
      url: '/packageAct/collect/collect'
    })
  },
  // 消息跳转
  messageClick() {
    wx.navigateTo({
      url: '/packageTree/message/message'
    })
  },

})