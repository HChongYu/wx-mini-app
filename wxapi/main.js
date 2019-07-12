
const CONFIG = require('./config.js')
const API_BASE_URL = 'https://wx.junhaotuozhan.com/api/'
// const API_BASE_URL = 'http://47.105.135.127:8090/'
const request = (url, method, data = {}) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token')
    let header = {
      'content-type': 'application/json;charset=UTF-8'
    }
    if (token) {
      header.token = token
    }
    wx.request({
      url: _url,
      method: method,
      header: header,
      data: data,
      success(request) {
        if (request.statusCode == 401 && !wx.getStorageSync('yetGoLogin')) {
          wx.setStorageSync('yetGoLogin', true)
          wx.navigateTo({
            url: "/pages/login/login"
          })
        } else {
          resolve(request.data)
        }
      },
      fail(error) {
        reject(error)
      },
      // complete(request) {
      //   // 加载完成
      // }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  // 登陆
  jhLogin: () => {
    return request('/u/login', 'POST')
  },
  //首页
  indexIndexDetail: () => {
    return request('index/indexDetail', 'POST')
  },
  //分类活动列表
  indexSearchActivitiesByType: (type) => {
    return request(`index/searchActivitiesByType?type=${type}`, 'POST')
  },
  //搜索活动
  indexSearchActivitiesByTitle: (title) => {
    return request(`index/searchActivitiesByTitle?title=${title}`, 'POST')
  },
  //活动详情
  activityDetail: (activityId) => {
    return request(`activity/detail?activityId=${activityId}`, 'POST')
  },
  //教官详情
  activityTeacherDetail: (teacherId) => {
    return request(`activity/TeacherDetail?teacherId=${teacherId}`, 'POST')
  },
  // 文章详情
  articleDetail: (articleId) => {
    return request(`article/detail?articleId=${articleId}`, 'POST')
  },
  // 收藏文章
  articleStore: (articleId) => {
    return request(`article/store?articleId=${articleId}`, 'POST')
  },
  //取消收藏文章
  articleCancelStore: (articleId) => {
    return request(`article/cancelStore?articleId=${articleId}`, 'POST')
  },
  // 我的文章
  mineArticles: () => {
    return request('mine/articles', 'POST')
  },
  //shudong//
  // 树洞发布
  shudongAddSubject: (dto) => {
    return request('shudong/addSubject', 'POST', dto)
  },
  // 小世界
  shudongSmallWord: (query) => {
    return request('shudong/smallWorld', 'POST', query)
  },
  // 树洞详情
  shudongSubjectDetail: (subjectId) => {
    return request(`shudong/subjectDetail?subjectId=${subjectId}`, 'POST')
  },
  // 树洞详情评论分页
  shudongReplies: (query) => {
    return request(`shudong/replies`, 'POST', query)
  },
  // 点赞某个树洞
  shudongLikeOne: (subjectId) => {
    return request(`shudong/likeOne?subjectId=${subjectId}`, 'POST')
  },
  // 取消点赞
  shudongCancleLikeOne: (subjectId) => {
    return request(`shudong/cancleLikeOne?subjectId=${subjectId}`, 'POST')
  },
  // 举报某个树洞
  shudongReportSubjec: (subjectId, reason) => {
    return request(`shudong/reportSubject?reason=${reason}&subjectId=${subjectId}`, 'POST')
  },
  // 树洞评论
  shudongAddReply: (subjectId, content) => {
    return request('shudong/addReply', 'POST', { 'subjectId': subjectId, 'content': content })
  },

  // 举报某个评论
  shudongReportReply: (replyId, reason) => {
    return request(`shudong/reportReply?reason=${reason}&replyId=${replyId}`, 'POST')
  },
  // 删除某条品论
  shudongDeleteReply: (replyId) => {
    return request(`shudong/deleteReply?replyId=${replyId}`, 'POST')
  },
  // 删除某条树洞
  shudongDeleteSubject: (subjectId) => {
    return request(`shudong/deleteSubject?subjectId=${subjectId}`, 'POST')
  },
  // 我的树洞
  shudongMySubjects: () => {
    return request(`shudong/mySubjects`, 'POST')
  },
  // 我互动过的
  shudongMyReplie: () => {
    return request(`shudong/myReplies`, 'POST')
  },
  // 检查封禁状态
  mineValidShuDongStatus: () => {
    return request(`mine/validShuDongStatus`, 'POST')
  },
  // 我的消息
  mineTips: (query) => {
    return request(`mine/tips`, 'POST', query)
  },
  // 标记所有已读
  mineReadAllTips: () => {
    return request(`mine/readAllTips`, 'POST')
  },
  // 清空所有消息
  mineDeleteAllTips: () => {
    return request(`mine/deleteAllTips`, 'POST')
  },
  // 我的消息数量
  mineTipNum: () => {
    return request(`mine/tipNum`, 'POST')
  },
  // 用户登陆
  uLogin: (code) => {
    return request(`u/login?code=${code}`, 'POST')
  },

  // 用户注册
  uSignIn: (dto) => {
    return request(`u/signIn`, 'POST', dto)
  }
}