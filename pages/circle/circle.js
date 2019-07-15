//circle.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({
  data: {
    circleList:'',
    atIndex: 1,
    showNews: false,
    loading: false,
    hasNextPage: true
  },
  onLoad: function () {
    wx.hideShareMenu()
  },
  onShow: function () {
    // this.data.circleList=[];
    this.setData({circleList:[],hasNextPage:true,loading:true})
    this.getCircleList()
  },
  getCircleList() {
    let nowDate =(new Date()).valueOf();
    let index=this.data.circleList.length?this.data.circleList.length:0;
    let that=this;
    let query={    
      "currentPage": `${index+1}`,
      "size": "10"
    }  
    WXAPI.shudongSmallWord(query).then(res => {
      if (res.code == 0) {
        if(res.data.rows.length){
          let hasNextPage=res.data.currentPage<res.data.totalPages?true:false;
          res.data.rows.map(item=>{
            item.createAt = UTIL.beforeTypeDate(item.createAt,nowDate)
          })
          that.setData({[`circleList[${index}]`]:res.data.rows,hasNextPage:hasNextPage,loading:false,length:index+1}) 
        }else{
          that.setData({hasNextPage:false,loading:false})
        }
      } else {
        that.setData({hasNextPage:false,loading:false})
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 发布
  publishClick() {
    wx.navigateTo({
      url: '/packageTree/publish/publish'
    })
  },
  goTreeDetails(e) {
    wx.navigateTo({
      url: `/packageTree/treedetails/treedetails?subjectId=${e.currentTarget.dataset.id}`
    })
  },
  // bar回吊,
  circleBarBack(e) {
    this.setData({atIndex: e.detail.index})
  },
  /**
   * 页面上拉触底事件的处理函数
    */
  onReachBottom: function (e) {
    if(this.data.hasNextPage&&!this.data.loading){
      this.setData({loading:true})
      this.getCircleList();
    }
  },
})
