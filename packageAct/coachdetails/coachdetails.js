// packageAct/coachdetails/coachdetails.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atIndex:0
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
        let navbarData1=[];
        let navbarData2=[];
        let newActivities=[];
        let activities =res.data.activities;
        for (let key in activities){
          console.log(key);
          navbarData1.push(key);
          newActivities.push(activities[key]);
        }
        for (let i = 0; i < navbarData1.length;i++){
          navbarData2.push({ name: navbarData1[i],index:i})
        }

        this.setData({ coachDetails: res.data,newActivities: newActivities, navbarData: navbarData2})
        console.log(navbarData2)
      } else {
        res.text? UTIL.commonToast(res.text): UTIL.commonToast("数据错误");
      }
    })
  },
  // 交互函数
  coachBarBasck(e){
    this.setData({atIndex: e.detail.index})
  },
  // 跳转函数
  coachWinBack(e) {
    let pages = getCurrentPages();
    let lastPages = pages[pages.length - 2]
    lastPages.setData({activityId:e.detail.id});
    wx.navigateBack({
      delta: 1
    })
  },
})