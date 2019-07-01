// packageAct/coachdetails/coachdetails.js
const WXAPI = getApp().globalData.WXAPI;
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
    if (options.teacherId) {
      this.getCoachDetails(options.teacherId)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getCoachDetails(teacherId){
    WXAPI.activityTeacherDetail(teacherId).then(res => {
      console.log(res)
      //todo
      if (res.code == 0) {
        let portraitData=new Object();
        portraitData={
          headPicUrl:res.data.headPicUrl,
          name: res.data.name,
          labelList: res.data.labelList
        }
        this.setData({ coachDetails: res.data,portraitData: portraitData})
      } else {

      }
    })
  },
  // 跳转函数
  coachWinBack(e) {
    console.log(e)
    wx.redirectTo({
      url: `/packageAct/actdetails/actdetails?activityId=${e.detail.id}`
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