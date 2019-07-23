// packageTree/treedetails/treedetails.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 固定写死 BL值
    true: true,
    // 是否打开投诉框
    voteShow: false,
    // 评论列表
    treeReplyList: [],
    loading: false,
    hasNextPage: true,
    voteType: '1',
    replyFocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    if (options.subjectId) {
      this.getTreeDetails(options.subjectId);
      this.getTreeReplyList(options.subjectId);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 获取树洞详情
  getTreeDetails(subjectId) {
    WXAPI.shudongSubjectDetail(subjectId).then(res => {
      if (res.code == 0) {
        let treeDetailsData= res.data;
        console.log(treeDetailsData)
        // let treeDetailsData=;
        let createAt=new Date(treeDetailsData.createAt) ;
        treeDetailsData.parseYear=createAt.getFullYear();
        treeDetailsData.parseMonth=createAt.getMonth() + 1;
        treeDetailsData.parseDay=createAt.getDate();
        treeDetailsData.parseWeek=createAt.getDay();
        console.log(treeDetailsData)
        this.setData({ treeDetailsData: treeDetailsData })
      }else if (res.code == 31000){
        that.setData({disable: true, disableHint:res.text,loading1:false})
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  getTreeReplyList(subjectId) {
    let nowDate =(new Date()).valueOf();
    let index = this.data.treeReplyList.length;
    let query = {
      "currentPage": `${index + 1}`,
      "size": "20",
      "subjectId": subjectId
    }
    WXAPI.shudongReplies(query).then(res => {
      if (res.code == 0) {
        if (res.data) {
          let hasNextPage = res.data.currentPage < res.data.totalPages ? true : false;
          res.data.rows.map(item=>{
            item.createAt = UTIL.beforeTypeDate(item.createAt,nowDate)
          })
          this.setData({ [`treeReplyList[${index}]`]: res.data.rows, hasNextPage: hasNextPage, loading: false })
        } else {
          this.setData({ hasNextPage: false, loading: false })
        }
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 点赞
  handleLick() {
    let that = this;
    WXAPI.shudongLikeOne(this.data.treeDetailsData.subjectId).then(res => {
      if (res.code === 0) {
        UTIL.commonToast('成功点赞此条树洞')
        that.getTreeDetails(that.data.treeDetailsData.subjectId)
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 取消点赞
  handleCancelLick() {
    let that = this;
    WXAPI.shudongCancleLikeOne(this.data.treeDetailsData.subjectId).then(res => {
      if (res.code === 0) {
        UTIL.commonToast('成功取消点赞此条树洞')
        that.getTreeDetails(that.data.treeDetailsData.subjectId)
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 评论
  handleReply() {
    // let that = this;
    this.setData({replyFocus:true})
  },
  choseSendReply(){
    this.setData({replyFocus:false})
  },
  // 虚拟键盘按钮
  confirmReply(e){
    let that =this;
    if(!e.detail.value){
      UTIL.commonToast("请输入评论")
      return
    }
    WXAPI.shudongAddReply(this.data.treeDetailsData.subjectId, `${e.detail.value}`).then(res => {
      if (res.code === 0) {
        that.choseSendReply();
        UTIL.commonToast('成功发出了您的评论')
        that.setData({treeReplyList:[]})
        that.getTreeDetails(that.data.treeDetailsData.subjectId)
        that.getTreeReplyList(that.data.treeDetailsData.subjectId)
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 实际键盘按钮
  formSubmit(e){
    let that =this;
    if(!e.detail.value.reply){
      UTIL.commonToast("请输入评论")
      return
    }
    WXAPI.shudongAddReply(this.data.treeDetailsData.subjectId, `${e.detail.value.reply}`).then(res => {
      if (res.code === 0) {
        that.choseSendReply();
        UTIL.commonToast('成功发出了您的评论')
        that.setData({treeReplyList:[]})
        that.getTreeDetails(that.data.treeDetailsData.subjectId)
        that.getTreeReplyList(that.data.treeDetailsData.subjectId)
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 删除某条评论
  repliesDelete(e) {
    let that = this;
    WXAPI.shudongDeleteReply(e.currentTarget.dataset.id).then(res => {
      if (res.code === 0) {
        UTIL.commonToast('成功删除了一条评论')
        that.setData({treeReplyList:[]})
        that.getTreeDetails(that.data.treeDetailsData.subjectId);
        that.getTreeReplyList(that.data.treeDetailsData.subjectId)
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 交互操作,
  // 举报树洞
  handleInform() {
    this.setData({ voteShow: true, voteId: '1', voteText: this.data.treeDetailsData.content })
  },
  // 举报树洞评论
  repliesReport(e) {
    this.setData({ voteShow: true, voteId: e.currentTarget.dataset.id, voteText: this.data.treeDetailsData.content })
  },
  // 举报树洞回调
  informCall(e) {
    if (e.detail.voteId == '1') {
      WXAPI.shudongReportSubjec(this.data.treeDetailsData.subjectId, e.detail.reason).then(res => {
        if (res.code === 0) {
          UTIL.commonToast('成功举报当前树洞')
          // setTimeout(function(){
          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }, 1500)
        } else {
          res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
        }
      })
    } else {
      WXAPI.shudongReportReply(e.detail.voteId,e.detail.reason).then(res => {
        if (res.code === 0) {
          UTIL.commonToast('成功举报当前评论')
        } else {
          res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
        }
      })
    }

  },
  // 删除树洞
  handleDelete(e) {
    WXAPI.shudongDeleteSubject(this.data.treeDetailsData.subjectId).then(res => {
      if (res.code === 0) {
        UTIL.commonToast('成功删除当前树洞')
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
    */
  onReachBottom: function (e) {
    if (this.data.hasNextPage && !this.data.loading) {
      this.getTreeReplyList(this.data.treeDetailsData.subjectId);
    }
  },
})