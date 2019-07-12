// packageAct/search/search.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atText:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getSearch();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  // 初始化函数
  getSearch(title=''){
    WXAPI.indexSearchActivitiesByTitle(title).then(res => {
      //todo
      if (res.code == 0) {
        if (title){
          this.setData({ searchData: res.data.searchList })
        }else{
          this.setData({ hotList: res.data.hotList })
        }
      } else {
        res.text? UTIL.commonToast(res.text):UTIL.commonToast("数据错误");
      }
    })
  },
  // 交互函数
  inputSearch(e){
    if (e.detail.value){
      this.setData({atText:e.detail.value})
      this.getSearch(e.detail.value);
    }
  },
  // 跳转函数
  // 去活动
  actTextClick(e) {
    wx.navigateTo({
      url: `/packageAct/actdetails/actdetails?activityId=${e.currentTarget.dataset.id}`
    })
  },
})