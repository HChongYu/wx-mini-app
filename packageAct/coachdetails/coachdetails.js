// packageAct/coachdetails/coachdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dome2: [{
          id: 1,
          name: "下陆中学7天研学之旅",
          title: "下陆中学7天研学之旅下陆中学7天研学之旅",
          date: "2019-3-11",
          img: "/img/win1.png"
      }, {
          id: 2,
          name: "下陆中学7天研学之旅",
          title: "下陆中学7天研学之旅下陆中学7天研学之旅",
          date: "2019-3-11",
          img: "/img/win1.png"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
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
  // 跳转函数
  coachWinBack() {
    // 待解决
    // 重复跳转嵌套 会出现bug
    wx.navigateTo({
      url: '/packageAct/actdetails/actdetails'
    })
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

  }
})