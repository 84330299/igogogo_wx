const util = require("../../utils/util.js");
const rateService = require("../../services/rateService.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    rateList: null,
    searchLoading: false,
    loadComplete: false,
    page: 1,
    lastPage: 0,
    itemid: 0,
    sellerid: 0
  },

  //通过商品编号、卖家编号、页码获取商品评价列表
  queryGoodRateList: function (itemId, sellId, pageNo) {
    let that = this;
    rateService.queryGoodRateList(function (res) {
      if (res.code == 200) {
        if (res.data.rateList != null) {
          if (that.data.rateList != null) {
            let newrateList = that.data.rateList.concat(res.data.rateList);
            that.setData({ rateList: newrateList });
          }
          else {
            that.setData({ rateList: res.data.rateList });
          }
        }
        console.log("评价总页数：" + res.data.paginator.lastPage);
        that.setData({ lastPage: res.data.paginator.lastPage });
      }
    }, itemId, sellId, pageNo);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showToats("数据加载中...", "loading");
    let that = this;
    that.setData({ itemid: options.itemid, sellerid: options.sellerid });
    that.queryGoodRateList(options.itemid, options.sellerid, 1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let newpage = that.data.page += 1;
    console.log("当前评价页数：" + newpage);
    that.setData({ searchLoading: true });
    if (newpage > that.data.lastPage) {
      that.setData({ loadComplete: true, searchLoading: false });
    }
    else {
      that.setData({ page: newpage });
      that.queryGoodRateList(that.data.itemid, that.data.sellerid, newpage);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})