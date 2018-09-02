const util = require('../utils/util.js');
const api = require('../config/api.js');

//获取搜索关键词
function queryKeyword(callback) {
  let url = api.queryKeyword;
  console.log("获取搜索关键词:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryKeyword
}