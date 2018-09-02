const util = require('../utils/util.js');
const api = require('../config/api.js');

//通过时间获取淘抢购列表
function queryTqgListByTimeAndPage(callback, starttime, endtime, pageNo, pageSize) {
  let url = api.queryTqgListByTimeAndPage + "startTime=" + starttime + "&endTime=" + endtime + "&pageNo=" + pageNo + "&pageSize=" + pageSize;
  console.log("通过时间获取淘抢购列表:" + url);
  util.request(url, null, "POST").then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryTqgListByTimeAndPage
}