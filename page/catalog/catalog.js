const util = require("../../utils/util.js");
const service = require("../../services/catalogService.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cateItems: null,
    curNav: 1,
    curIndex: 0,
    navHeight: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  // 跳转分类列表
  goCategory: function (e) {
    let parentid = e.target.dataset.parentid;
    let selfid = e.target.dataset.selfid;
    let keyword = e.target.dataset.keyword;
    wx.navigateTo({
      url: '/page/category/category?id=' + parentid + '&selfid=' + selfid + '&keyword=' + keyword
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类'
    })
    util.showToats("数据加载中...", "loading");
    let that = this;
    let wHeight = wx.getSystemInfoSync().windowHeight;
    //获取所有分类
    service.queryAllCatalog(function (res) {
      if (res.code == 200) {
        that.setData({ cateItems: res.data, navHeight: wHeight });
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