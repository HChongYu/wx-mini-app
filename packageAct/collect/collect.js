// packageTree/collect/collect.js
const WXAPI = getApp().globalData.WXAPI;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getCollect();
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //初始化函数
  getCollect(){
    WXAPI.mineArticles().then(res => {
      console.log(res)
      //todo
      if (res.code == 0) {
        this.setData({collectList:res.data})
      } else {

      }
    })
  },
  // 跳转函数
  collectClick(e){
    wx.navigateTo({
      url: `/packageAct/article/article?articleId=${e.currentTarget.dataset.id}`,
    })
  }
})