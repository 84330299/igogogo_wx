const util = require('../utils/util.js');
const api = require('../config/api.js');

//获取banner
function queryBanner(callback) {
  let url = api.queryBanner;
  console.log("获取banner:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryBanner
}