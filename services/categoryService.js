const util = require('../utils/util.js');
const api = require('../config/api.js');

//通过关键词获取商品列表
function queryGoodsListByKeyword(callback, postData) {
  let url = api.queryGoodsListByKeyword;
  console.log("通过关键词获取商品列表:" + url);
  util.request(url, postData, "POST").then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryGoodsListByKeyword
}