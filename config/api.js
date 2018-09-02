// const ApiRootUrl = "http://localhost:1234/";
const ApiRootUrl = "https://www.5igogogo.com/api/";

module.exports = {
  //获取所有分类
  queryAllCatalog: ApiRootUrl + "category",
  //通过父类编号获取该类目的所有子类
  queryAllChildsCatalogByParentId: ApiRootUrl + "category/childrens/",
  //通过关键词获取商品列表
  queryGoodsListByKeyword: ApiRootUrl + "tbk/querycouponbykeyword",
  //通过商品编号获取商品基础信息
  queryGoodBaseById: ApiRootUrl + "tbk/itemdetail/",
  //通过商品编号以及卖家编号获取商品评价
  queryGoodRatesByNumIidAndSellerId: ApiRootUrl + "tbk/rate/",
  //通过商品编号、卖家编号、页码获取商品评价列表
  queryGoodRateList: ApiRootUrl + "tbk/rate/",
  //通过时间获取淘抢购列表
  queryTqgListByTimeAndPage: ApiRootUrl + "tbk/tqg?",
  //通过类目编号获取今日特价商品列表
  querySpecialtodayByCid: ApiRootUrl + "tbk/querymaterialbykeyword?",
  //获取搜索关键词
  queryKeyword: ApiRootUrl + "keyword",
  //获取banner
  queryBanner: ApiRootUrl + "banner",
  //获取人气推荐位
  queryHotRecommend: ApiRootUrl + "recommends",
  //通过商品编号和数量获取关联商品
  queryItemsRelatedByNumIid: ApiRootUrl + "tbk/queryitemsbykeypidrelated?"
}