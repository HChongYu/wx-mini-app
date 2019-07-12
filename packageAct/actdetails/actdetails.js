// packageAct/actdetails/actdetails.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbarData: [
      // { name: 'DAY1', index: 0 },
    ],
    atIndex:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    if (options.activityId){
      this.getActDetail(options.activityId)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  // 初始化函数
  getActDetail(activityId){
    WXAPI.activityDetail(activityId).then(res=>{
      if (res.code == 0) {
        let navbarData=new Array;
        if (res.data.contentList.length>0){
          for (let i=0; i <res.data.contentList.length;i++){
            navbarData[i]={name:`DAY${i+1}`, index:i}
          }
        }
        this.setData({ actDetailData:res.data,navbarData: navbarData})
      } else {
        res.text? UTIL.commonToast(res.text): UTIL.commonToast("数据错误");
      } 
    })
  },
  // 交互函数
  // 收拉框
  foldBack(e){
    console.log(e)
    this.setData({ openStatus: e.detail})
  },
  // 
  actBarBasck(e){
    this.setData({atIndex: e.detail.index})
  },
  //跳转函数 
  coachItemClick(e) {
    wx.redirectTo({
      url: `/packageAct/coachdetails/coachdetails?teacherId=${e.detail}`
    })
  },

})