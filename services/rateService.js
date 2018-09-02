const util = require('../utils/util.js');
const api = require('../config/api.js');

//通过商品编号、卖家编号、页码获取商品评价列表
function queryGoodRateList(callback, itemId, sellerId, pageNo) {
  let url = api.queryGoodRateList + itemId + "/" + sellerId + "/" + pageNo;
  console.log("通过商品编号、卖家编号、页码获取商品评价列表:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryGoodRateList
}