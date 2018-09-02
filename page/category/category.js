const util = require("../../utils/util.js");
const catalogService = require("../../services/catalogService.js");
const categoryService = require("../../services/categoryService.js");

Page({
  data: {
    navItems: [],
    toView: '',
    goodsList: [],
    scrollHeight: 0,
    searchLoading: false,
    loadComplete: false,
    selfid: 0,
    page: 1,
    size: 10,
    keyword: ""
  },

  //切换分类
  changeNav: function (e) {
    util.showToats("数据加载中...", "loading");
    let that = this;
    console.log("toView:" + e.target.dataset.id);
    that.setData({
      toView: "cate_" + e.target.dataset.id, selfid: e.target.dataset.id, page: 1, keyword: e.target.dataset.keyword, goodsList: null, searchLoading: false, loadComplete: false
    });
    let postData = { "pageNo": 1, "pageSize": that.data.size, "q": that.data.keyword };
    categoryService.queryGoodsListByKeyword(function (res) {
      if (res.code == 200) {
        that.setData({ goodsList: res.data });
      }
    }, postData);
  },


  //上拉加载更多
  lower: function (e) {
    let that = this;
    let newpage = that.data.page += 1;
    that.setData({ page: newpage });
    let postData = { "pageNo": newpage, "pageSize": that.data.size, "q": that.data.keyword };
    categoryService.queryGoodsListByKeyword(function (res) {
      if (res.code == 200) {
        if (res.data != null && res.data.length > 0) {
          let newGoodList = that.data.goodsList.concat(res.data);
          that.setData({ goodsList: newGoodList, searchLoading: true });
        }
        else {
          that.setData({ searchLoading: false, loadComplete: true });
        }
      }
    }, postData);
  },

  //显示商品详情
  showDetail: function (e) {
    let numIid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/detail/detail?numIid=' + numIid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showToats("数据加载中...", "loading");
    let that = this;
    //获取类目导航
    catalogService.queryAllChildsCatalogByParentId(function (res) {
      if (res.code == 200) {
        that.setData({ navItems: res.data, selfid: options.selfid, toView: "cate_" + options.selfid, keyword: options.keyword });
      }
    }, options.id);

    //获取商品列表
    let postData = { "pageNo": that.data.page, "pageSize": that.data.size, "q": options.keyword };
    categoryService.queryGoodsListByKeyword(function (res) {
      if (res.code == 200) {
        that.setData({ goodsList: res.data });
      }
    }, postData);

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})