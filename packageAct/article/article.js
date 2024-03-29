// packageTree/article/article.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    if (options.articleId) {
      this.getArticleData(options.articleId)
    }
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {

  },
  // 初始化数据
  // 获取文章内容
  getArticleData(articleId) {
    WXAPI.articleDetail(articleId).then(res => {
      if (res.code == 0) {
        let article = res.data.content;
        let that = this;
        try {
          WxParse.wxParse('article', 'html', article, that, 20);
        } catch (err) {
          // yd.util.commonToast(err)
        }
        this.setData({ articleData: res.data})
      } else {
        res.text? UTIL.commonToast(res.text): UTIL.commonToast("数据错误");
      }
    })
  },
  //主动请求 
  // 收藏文章
  collectClick() {
    let articleId = this.data.articleData.articleId;
    WXAPI.articleStore(articleId).then(res => {
      if (res.code == 0) {
        this.getArticleData(articleId)
        UTIL.commonToast(`成功收藏${this.data.articleData.title}`);
      } else {
        res.text? UTIL.commonToast(res.text):UTIL.commonToast("数据错误");
      }
    })
  },
  //取消收藏
  cancelCollectClick(){
    let articleId = this.data.articleData.articleId;
    WXAPI.articleCancelStore(articleId).then(res => {
      if (res.code == 0) {
        this.getArticleData(articleId)
        UTIL.commonToast(`成功收藏${this.data.articleData.title}`);
      } else {
        res.text? UTIL.commonToast(res.text):UTIL.commonToast("数据错误");
      }
    })
  },
})