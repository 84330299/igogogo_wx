const util = require('../utils/util.js');
const api = require('../config/api.js');

//通过类目编号获取今日特价商品列表
function querySpecialtodayByCid(callback, cid, page, size, startprice, endprice) {
  let url = api.querySpecialtodayByCid + "page=" + page + "&pagesize=" + size + "&cids=" + cid + "&startprice=" + startprice + "&endprice=" + endprice;
  console.log("通过类目编号获取今日特价商品列表:" + url);
  util.request(url,null,"POST").then(function (res) {
    callback(res);
  });
}

module.exports = {
  querySpecialtodayByCid
}