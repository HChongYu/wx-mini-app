// packageTree/message/message.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atIndex: 1,
    messageList: [],
    loading: false,
    hasNextPage: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    if (this.data.atIndex == 0) {
      this.setData({ messageList: [], hasNextPage1: true, loading1: true,length1:0})
      this.getMessageList()
    } else {
      this.setData({ messageReadList: [], hasNextPage2: true, loading2: true,length2:0})
      this.getMessageReadList()
    }
  },
  // 初始化函数
  getMessageList() {
    let nowDate = (new Date()).valueOf();
    let index = this.data.messageList.length;
    let query = {
      "currentPage": `${index + 1}`,
      "size": "20"
    }
    WXAPI.mineTips(query).then(res => {
      if (res.code == 0) {
        if (res.data.rows.length) {
          let hasNextPage = res.data.currentPage < res.data.totalPages ? true : false;
          res.data.rows.map(item => {
            item.createAt = UTIL.beforeTypeDate(item.createAt, nowDate)
          })
          this.setData({ [`messageList[${index}]`]: res.data.rows, hasNextPage1: hasNextPage, loading1: false,length1:index+1})
        }else if (res.code == 31000){
          that.setData({disable: true,disableHint: res.text,loading1:false})
        } else {
          this.setData({ hasNextPage1: false, loading1: false })
        }
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 获取未读函数
  getMessageReadList() {
    let nowDate = (new Date()).valueOf();
    let index = this.data.messageReadList.length;
    let query = {
      "currentPage": `${index + 1}`,
      "size": "20",
      "hasRead":false
    }
    WXAPI.mineTips(query).then(res => {
      if (res.code == 0) {
        if (res.data.rows.length) {
          let hasNextPage = res.data.currentPage < res.data.totalPages ? true : false;
          res.data.rows.map(item => {
            item.createAt = UTIL.beforeTypeDate(item.createAt, nowDate)
          })
          this.setData({ [`messageReadList[${index}]`]: res.data.rows, hasNextPage2: hasNextPage, loading2: false,length2:index+1})
        } else if (res.code == 31000){
          that.setData({disable: true,disableHint: res.text,loading2:false})
        }else {
          this.setData({ hasNextPage2: false, loading2: false })
        }
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 交互函数
  // 已读未读胶囊切换
  capsuleClick(e) {
    if (e.currentTarget.dataset.index != this.data.atIndex) {
      if (e.currentTarget.dataset.index == 0) {
        this.setData({ atIndex: e.currentTarget.dataset.index, messageList: [],loading1: true,hasNextPage1:true,length1:0})
        this.getMessageList()
      } else {
        this.setData({ atIndex: e.currentTarget.dataset.index, messageReadList: [],loading2:true,hasNextPage2:true,length2:0})
        this.getMessageReadList()
      }
    }
  },
  // 清空所有消息
  handleMessage() {
    let atIndex = this.data.atIndex;
    if (atIndex==0) {
      wx.showModal({
        content: `确定清空所有消息？`,
        confirmText: "确定",
        confirmColor: "#4FC981",
        cancelText: "取消",
        cancelColor: "#c5c5c5",
        success: function (res) {
          if (res.confirm) {
            WXAPI.mineDeleteAllTips().then(res => {
              if (res.code == 0) {
                this.setData({ messageReadList: [], messageList: [] })
                UTIL.commonToast("成功清空所有消息")
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
              } else {
                res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
              }
            })
          }
        },
      })
    } else {
      WXAPI.mineReadAllTips().then(res => {
        if (res.code == 0) {
          this.setData({atIndex:0,messageList:[],hasNextPage1: true, loading1: true})
          this.getMessageList();
        } else {
        }
      })
    }

  },
  // // 标记所有已读
  // transformRead(){

  // },
  // 跳转函数
  goTree(e) {
    wx.navigateTo({
      url: `/packageTree/treedetails/treedetails?subjectId=${e.currentTarget.dataset.viewid}`,
      success() {
      }
    })
  },
  /**
 * 页面上拉触底事件的处理函数
  */
  onReachBottom: function (e) {
    if(this.data.atIndex==0){
      if (this.data.hasNextPage1 && !this.data.loading1) {
        this.setData({loading1:true})
        this.getMessageList();
      }
    }else{
      if (this.data.hasNextPage2&& !this.data.loading2) {
        this.getMessageList({loading2:true})
      }
    }
  },
})