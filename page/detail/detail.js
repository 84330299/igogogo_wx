const util = require("../../utils/util.js");
const detailService = require("../../services/detailService.js");
const componentService = require("../../services/componentService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: null,
    rateInfo: null,
    rateCount: 0,
    couponAfterPrice: 0
    // relatedGoods: null,
    // count: 10
  },

  //返回首页
  gohome: function () {
    wx.switchTab({
      url: '/page/index',
    })
  },

  //显示所有评价
  showAllRate: function (e) {
    wx.navigateTo({
      url: '/page/ratelist/ratelist?itemid=' + e.currentTarget.dataset
        .itemid + "&sellerid=" + e.currentTarget.dataset
        .sellerid,
    })
  },

  // 领取优惠券
  getCoupon: function () {
    let that = this;
    let gourl = null;
    let tips = null;
    let code = that.data.goods.code;
    if (code == null) {
      gourl = that.data.goods.itemBase.itemUrl;
      tips = '打开浏览器复制链接抢购';
    }
    else {
      gourl = that.data.goods.code.model;
      tips = '打开"淘宝App"下单享优惠';
    }
    wx.setClipboardData({
      data: gourl,
      success: function (res) {
        wx.showModal({
          title: '温馨提示',
          content: tips,
          showCancel: false,
          success: function (res) {
            //TODO
          }
        })
      }
    })
  },

  //商品基础信息
  queryGoodBaseById: function (numIids) {
    let that = this;
    detailService.queryGoodBaseById(function (res) {
      if (res.code == 200) {
        if (res.data.couponInfo != null) {
          that.setData({
            goods: res.data,
            couponAfterPrice: (res.data.itemBase.zkFinalPrice - res.data.couponInfo.couponAmount).toFixed(2)
          });
        }
        else {
          that.setData({
            goods: res.data
          });
        }

        //商品评价
        that.queryGoodRatesByNumIidAndSellerId(res.data.itemBase.numIid, res.data.itemBase.sellerId, 1);
      }
    }, numIids);
  },

  //商品评价
  queryGoodRatesByNumIidAndSellerId: function (numIid, sellerId, page) {
    let that = this;
    detailService.queryGoodRatesByNumIidAndSellerId(function (res) {
      if (res.code == 200 && res.data.rateList != null && res.data.rateList.length > 0) {
        that.setData({
          rateInfo: res.data.rateList[0],
          rateCount: res.data.rateCount.total
        });
      }
    }, numIid, sellerId, 1);
  },

  //通过商品编号和数量获取关联商品
  // queryItemsRelatedByNumIid: function (numIid, count) {
  //   let that = this;
  //   detailService.queryItemsRelatedByNumIid(function (res) {
  //     if (res.code == 200) {
  //       that.setData({ relatedGoods: res.data });
  //     }
  //   }, numIid, count);
  // },

  // showDetail: function (e) {
  //   let numIid = e.currentTarget.dataset.numiid;
  //   wx.navigateTo({
  //     url: '/page/detail/detail?numIid=' + numIid,
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showToats("数据加载中...", "loading");
    let that = this;
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
    //商品基础信息
    that.queryGoodBaseById(options.numIid);
    //通过商品编号和数量获取关联商品
    // that.queryItemsRelatedByNumIid(options.numIid, that.data.count);
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