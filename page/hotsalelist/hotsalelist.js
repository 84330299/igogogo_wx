const util = require("../../utils/util.js");
const componentService = require("../../services/componentService.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hostsale: null,
    size: 10,
    page: 1
  },

  queryHotSaleList: function () {
    let that = this;
    let postData = { pageNo: that.data.page, pageSize: that.data.size };
    componentService.queryHostSale(function (res) {
      if (res.code == 200) {
        that.setData({ hostsale: res.data });
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
    wx.setNavigationBarTitle({
      title: '热销排行'
    });
    let that = this;
    that.queryHotSaleList();
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
    let newpage = that.data.page + 1;
    let postData = { pageNo: newpage, pageSize: that.data.size };
    componentService.queryHostSale(function (res) {
      if (res.code == 200) {
        if (res.data != null && res.data.length > 0) {
          let newHotSaleList = that.data.hostsale.concat(res.data);
          that.setData({ hostsale: newHotSaleList, searchLoading: true });
        }
        else {
          that.setData({ searchLoading: false, loadComplete: true });
        }
      }
    }, postData);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})