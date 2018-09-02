const util = require('../utils/util.js');
const api = require('../config/api.js');

//获取人气推荐位
function queryHotRecommend(callback) {
  let url = api.queryHotRecommend;
  console.log("获取搜索关键词:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryHotRecommend
}