// packageTree/treelist/treelist.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    true:true,
    navbarData: [
      { name: '我的', index: 0 },
      { name: '我互动过的', index: 1 },
    ],
    atIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.atIndex==0? this.getMyTree():this.getMyInteract();
  },
  // 初始化函数
  getMyTree(){
    this.setData({loading1:true})
    WXAPI.shudongMySubjects().then(res=>{
      if(res.code==0){
        if(res.data.length){
          let nowDate =(new Date()).valueOf();
          res.data.map(item=>{
            item.createAt = UTIL.beforeTypeDate(item.createAt,nowDate)
          })
          this.setData({ myTreeList: res.data, loading1:false})
        }else if (res.code == 31000){
          that.setData({disable: true, disableHint:res.text,loading1:false})
        }else{
          this.setData({ myTreeList: res.data, loading1:false})
        }
      }else{
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 我互动过的
  getMyInteract(){
    this.setData({loading2:true})
    WXAPI.shudongMyReplie().then(res=>{
      if(res.code==0){
        if(res.data.length){
          let nowDate =(new Date()).valueOf();
          res.data.map(item=>{
            item.createAt = UTIL.beforeTypeDate(item.createAt,nowDate)
          })
          this.setData({ myInteractList: res.data, loading2:false})
        }else if (res.code == 31000){
          that.setData({disable: true, disableHint:res.text,loading2:false})
        }else{
          this.setData({myInteractList: res.data, loading2:false})
        }
      }else{
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  deleteBack(e){
    let that = this;
    wx.showModal({
      content: `确定删除 #${e.detail.topic}# 这条树洞吗？`,
      confirmText: "确定",
      confirmColor: "#4FC981",
      cancelText: "取消",
      cancelColor: "#c5c5c5",
      success: function(res) {
        if (res.confirm) {
          WXAPI.shudongDeleteSubject(e.detail.id).then(res=>{
            if(res.code==0){
              UTIL.commonToast(`成功删除${e.detail.topic}这条树洞`)
              that.getMyTree();
            }else{
              res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
            }
          })
        } 
      },
    })
  },
  // 交互函数
  treelistBarBack(e){
    // console.log(e.detail.index)
    if(e.detail.index==0){
      this.setData({atIndex:e.detail.index,myTreeList:[],loading1:true})
      this.getMyTree();
    }else{
      this.setData({atIndex:e.detail.index,myTreeList:[],loading2:true})
      this.getMyInteract();
    }
  },
  // 跳转函数
  // 去树洞详情  
  goTreeDetails(e) {
    console.log(e)
    wx.navigateTo({
      url: `/packageTree/treedetails/treedetails?subjectId=${e.currentTarget.dataset.id}`
    })
  },
})