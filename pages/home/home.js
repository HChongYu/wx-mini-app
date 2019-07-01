//index.js
//获取应用实例
const WXAPI = getApp().globalData.WXAPI;
// import { indexIndexDetail } from '/wxapi/main.js';
Page({
  data: {
    iconBar: [{
        icon: "/img/dome4.png",
        name: "成人拓展",
        type: 3
      },
      {
        icon: "/img/dome1.png",
        name: "企业团建",
        type: 4
      },
      {
        icon: "/img/dome5.png",
        name: "研修旅行",
        type: 2
      },
      {
        icon: "/img/dome3.png",
        name: "军事魔训",
        type: 8
      },
      {
        icon: "/img/dome2.png",
        name: "体验式培训",
        type: 6
      }
    ],
    navbarData: [
      { name: '往期精彩', type: 0 },
      { name: '即将开始', type: 1 },
    ],
    winAtType:0
  },

  onLoad: function() {
    wx.hideShareMenu()
  },
  onShow:function(){
    this.getHomeDetail();
  },
  // 初始化函数
  getHomeDetail(){
    // todo
    WXAPI.indexIndexDetail().then(res => {
      if (res.code==0){
        this.setData({homeDetail:res.data})
      }else{

      }
    })
  },
  //跳转函数
  // 交互函数
  //nav回调
  homeBarBack(e) {
    this.setData({ winAtType: e.detail.type })
  },
  //搜索
  searchClick() {
    wx.navigateTo({
      url: '/packageAct/search/search'
    })
  },
  // icon导航
  iconClik(e) {
    wx.navigateTo({
      url: `/packageAct/actlist/actlist?type=${e.currentTarget.dataset.type}`
    })
  },
  articleBarClick(e){
    wx.navigateTo({
      url: `/packageAct/article/article?articleId=${e.currentTarget.dataset.id}`
    })
  },
  // 
  homeWinBack(e){
    console.log(e)
    wx.navigateTo({
      url: `/packageAct/actdetails/actdetails?activityId=${e.detail.id}`
    })
  }
})