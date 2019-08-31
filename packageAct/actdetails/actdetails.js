// packageAct/actdetails/actdetails.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
let dayData= ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbarData: [
      // { name: 'DAY1', index: 0 },
    ],
    atIndex: 0,
    openStatus: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    if (options.activityId) {
      this.data.activityId=options.activityId
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.getActDetail(this.data.activityId)
   
  },
  // 初始化函数
  getActDetail(activityId){
    WXAPI.activityDetail(activityId).then(res=>{
      let activityDetail = res;
      console.log(activityDetail)
      if (typeof (activityDetail)=='string'){
        activityDetail = JSON.parse(activityDetail)
      }
      console.log(typeof (activityDetail));
      if (activityDetail.code==0){
        console.log("res.code:", activityDetail.code);
        let navbarData = new Array;
        if (activityDetail.data.contentList.length > 0) {
          for (let i = 0; i < activityDetail.data.contentList.length; i++) {
            navbarData[i] = { name: `第${dayData[i]}天`, index: i };
          }
        }
        this.setData({ actDetailData: activityDetail.data, navbarData: navbarData });
      }else{
        activityDetail.text ? UTIL.commonToast(activityDetail.text): UTIL.commonToast("数据错误");
      } 
    })
  },
  // 交互函数
  // 收拉框
  foldBack(){
    this.setData({ openStatus: !this.data.openStatus})
  },
  // 第几天选择
  actBarBasck(e){
    this.setData({atIndex: e.detail.index})
  },
  //跳转函数 
  coachItemClick(e) {
    wx.navigateTo({
      url: `/packageAct/coachdetails/coachdetails?teacherId=${e.detail}`,
    })
  },

})