// pages/mine/mine.js
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
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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