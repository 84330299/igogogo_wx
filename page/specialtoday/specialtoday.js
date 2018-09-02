const util = require("../../utils/util.js");
const specialtodayService = require("../../services/specialtodayService.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryList: null,
    cids: 0,
    page: 1,
    size: 10,
    startprice: 1,
    endprice: 30,
    toView: '',
    goodsList: null,
    searchLoading: false,
    loadComplete: false
  },

  // 加载淘宝热门类目
  queryCategoryList: function () {
    let that = this;
    let categoryList = [
      { cid: 0, cname: "全部" },
      { cid: 16, cname: "女装" },
      { cid: 30, cname: "男装" },
      { cid: 50008165, cname: "母婴" },
      { cid: 50006843, cname: "女鞋" },
      { cid: 50011740, cname: "男鞋" },
      { cid: 50010788, cname: "美妆" },
      { cid: 50020808, cname: "家居" },
      { cid: 50008090, cname: "数码" },
      { cid: 50008075, cname: "美食" },
      { cid: 1625, cname: "内衣" },
      { cid: 2813, cname: "成人" }
    ];
    that.setData({ categoryList: categoryList });
  },

  //通过类目编号获取今日特价商品列表
  querySpecialtodayByCid: function (cids, page, size, startprice, endprice) {
    let that = this;
    specialtodayService.querySpecialtodayByCid(function (res) {
      if (res.code == 200) {
        if (res.data != null && res.data.length > 0) {
          if (that.data.goodsList == null) {
            that.setData({ goodsList: res.data, searchLoading: true });
          }
          else {
            let newGoodList = that.data.goodsList.concat(res.data);
            that.setData({ goodsList: newGoodList, searchLoading: true });
          }
        }
        else {
          that.setData({ searchLoading: false, loadComplete: true });
        }
        that.setData({ searchStatus: true });
      }
    }, cids, page, size, startprice, endprice);
  },

  //显示商品详情
  showDetail: function (e) {
    let numIid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/detail/detail?numIid=' + numIid
    })
  },

  //切换分类
  changeNav: function (e) {
    util.showToats("数据加载中...", "loading");
    let that = this;
    console.log("toView:" + e.target.dataset.id);
    that.setData({
      toView: "cate_" + e.target.dataset.id, cids: e.target.dataset.id, page: 1, goodsList: null, searchLoading: false,
      loadComplete: false
    });
    if (that.data.cids == 0) {
      that.data.cids = that.initCid();
    }
    that.querySpecialtodayByCid(that.data.cids, that.data.page, that.data.size, that.data.startprice, that.data.endprice);
  },

  //初始化类目编号
  initCid: function () {
    let that = this;
    let cids = null;
    for (let i = 0; i < that.data.categoryList.length; i++) {
      if (that.data.categoryList[i].cid != 0) {
        if (cids == null) {
          cids += that.data.categoryList[i].cid;
        }
        else {
          cids += "," + that.data.categoryList[i].cid;
        }
      }
    }
    return cids;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showToats("数据加载中...", "loading");
    wx.setNavigationBarTitle({
      title: '今日特价'
    });
    let that = this;
    // 加载淘宝热门类目
    that.queryCategoryList();
    //通过类目编号获取今日特价商品列表
    let cids = that.initCid();
    that.setData({ toView: "cate_" + that.data.categoryList[0].cid, cids: cids });
    that.querySpecialtodayByCid(cids, that.data.page, that.data.size, that.data.startprice, that.data.endprice);
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
    that.setData({ page: newpage });
    that.querySpecialtodayByCid(that.data.cids, newpage, that.data.size, that.data.startprice, that.data.endprice);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})