//actlist.js
const WXAPI = getApp().globalData.WXAPI;
Page({
  data: {
    true: true,
    navbarData:[
      { name: '夏令营', type: 1 },
      { name: '研学旅行', type: 2 },
      { name: '成人拓展', type: 3 },
      { name: '企业团建', type: 4 },
      { name: '亲子旅行', type: 5 },
      { name: '体验式培训', type: 6 },
      { name: '青少年社会实践活动', type: 7 },
      { name: '军事魔训', type: 8 }
    ],
    atIndex:0
  },

  onLoad: function (options) {
    wx.hideShareMenu()
    if (options.type){
      let that=this;
      this.getActlist(options.type);
      let navbarData = this.data.navbarData
      navbarData.forEach(function (item, index) {
        console.log(item, index)
        if (item.type == options.type) {
          console.log(item, index)
          that.setData({ atIndex: index })
          // back
        }
      })
      
    }
  },
  getActlist(type){
    WXAPI.indexSearchActivitiesByType(type).then(res=>{
      console.log(res)
      //todo
      if(res.code==0){
        if(res.data.length>0){
          this.setData({actlistData:res.data})
        }
      }else{

      }
    })
  },
  // 交互函数
  actListNavBack(e){
    console.log(e)
    this.getActlist(e.detail.type);
  },
  // 跳转函数
  actlistWinBack(e) {
    wx.navigateTo({
      url: `/packageAct/actdetails/actdetails?activityId=${e.detail.id}`
    })
  },
})
