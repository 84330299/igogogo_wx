const util = require('../utils/util.js');
const api = require('../config/api.js');

//通过商品编号获取商品基础信息
function queryGoodBaseById(callback, itemId) {
  let url = api.queryGoodBaseById + itemId;
  console.log("通过商品编号获取商品基础信息:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

//通过商品编号获取商品图文详情
function queryGoodInfoById(callback, numIid) {
  let url = api.queryGoodInfoById + numIid;
  console.log("通过商品编号获取商品图文详情:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

//通过商品编号以及卖家编号获取商品评价
function queryGoodRatesByNumIidAndSellerId(callback, numIid, sellerId, page) {
  let url = api.queryGoodRatesByNumIidAndSellerId + numIid + "/" + sellerId + "/" + page;
  console.log("通过商品编号以及卖家编号获取商品评价:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

//通过商品标题获取优惠券信息
function queryGoodsListByKeyword(callback, postData) {
  let url = api.queryGoodsListByKeyword;
  console.log("通过商品标题获取优惠券信息:" + url);
  util.request(url, postData, "POST").then(function (res) {
    callback(res);
  });
}

//通过me获取优惠券信息
function queryGoodCouponByMe(callback, postData) {
  let url = api.queryGoodCouponByMe;
  console.log("通过me获取优惠券信息:" + url);
  util.request(url, postData, "POST").then(function (res) {
    callback(res);
  });
}

//通过商品名称、地址、logo生成商品优惠券
function queryGoodCouponByCondition(callback, postData) {
  let url = api.queryGoodCouponByCondition;
  console.log("通过商品名称、地址、logo生成商品优惠券:" + url);
  util.request(url, postData, "POST").then(function (res) {
    callback(res);
  });
}

//通过商品编号和数量获取关联商品
function queryItemsRelatedByNumIid(callback, numIid, count) {
  let url = api.queryItemsRelatedByNumIid + "numIid=" + numIid + "&count=" + count;
  console.log("通过商品编号和数量获取关联商品:" + url);
  util.request(url, null, "POST").then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryGoodBaseById,
  queryGoodInfoById,
  queryGoodRatesByNumIidAndSellerId,
  queryGoodsListByKeyword,
  queryGoodCouponByMe,
  queryGoodCouponByCondition,
  queryItemsRelatedByNumIid
}