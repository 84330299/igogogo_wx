const util = require('../utils/util.js');
const api = require('../config/api.js');

//获取热卖商品
function queryHostSale(callback, postData) {
  let url = api.queryGoodsListByKeyword;
  console.log("获取热卖商品:" + url);
  util.request(url, postData, "POST").then(function (res) {
    callback(res);
  });
}


module.exports = {
  queryHostSale
}