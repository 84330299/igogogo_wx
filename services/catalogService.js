const util = require('../utils/util.js');
const api = require('../config/api.js');

//获取所有类目
function queryAllCatalog(callback) {
  let url = api.queryAllCatalog;
  console.log("获取所有类目:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

//通过父类编号获取该类目的所有子类
function queryAllChildsCatalogByParentId(callback, id) {
  let url = api.queryAllChildsCatalogByParentId + id;
  console.log("通过父类编号获取该类目的所有子类:" + url);
  util.request(url).then(function (res) {
    callback(res);
  });
}

module.exports = {
  queryAllCatalog,
  queryAllChildsCatalogByParentId
}

