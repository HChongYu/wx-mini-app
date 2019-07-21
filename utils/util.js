// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }
// 时间加零
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 渐渐按格式返回
const dateTypeDate = function (number, format) {
  if (!number) return ''
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's', 'w'];
  var returnArr = [];
  //兼容时区
  var d = new Date();
  var localOffset = d.getTimezoneOffset() * 60;
  var utc = number + localOffset; //utc即GMT时间
  number = utc + 28800;
  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
// 时间按照 几天前返回
const beforeTypeDate = function (createDate, nowDate) {
  var countDate = ( nowDate - createDate) /1000  
  var result;
  switch (true) {
    case countDate > 2592000:
      result = dateTypeDate(createDate/1000,'Y-M-D h:m')
      break
    case countDate > 86400:
      result = `${Math.floor(countDate / 86400)}天前`
      break
    case countDate > 3600:
      result = `${Math.floor(countDate / 3600)}小时前`
      break
    case countDate > 60:
      result = `${Math.floor(countDate / 60)}分钟前`
      break
    default:
      result = `刚刚`
  };
  return result
}
const commonToast = (title = '', icon = 'none', duration = 1500) => {
  wx.showToast({
    title,
    icon,
    duration
  })
}
module.exports = {
  commonToast: commonToast,
  dateTypeDate: dateTypeDate,
  beforeTypeDate: beforeTypeDate
}