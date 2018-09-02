const util = require("../../utils/util.js");
const tqgService = require("../../services/tqgService.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeList: [
      {
        "time": "00:00",
        "val": 0
      },
      {
        "time": "08:00",
        "val": 8
      },
      {
        "time": "10:00",
        "val": 10
      },
      {
        "time": "11:00",
        "val": 11
      },
      {
        "time": "12:00",
        "val": 12
      },
      {
        "time": "13:00",
        "val": 13
      },
      {
        "time": "14:00",
        "val": 14
      },
      {
        "time": "15:00",
        "val": 15
      },
      {
        "time": "17:00",
        "val": 17
      },
      {
        "time": "19:00",
        "val": 19
      },
      {
        "time": "21:00",
        "val": 21
      },
      {
        "time": "22:00",
        "val": 22
      },
      {
        "time": "23:00",
        "val": 23
      }
    ],
    nowHour: 0,
    starttime: null,
    endtime: null,
    toView: "",
    page: 1,
    size: 5,
    goodsList: null
  },

  //切换时间段
  changeNav: function (e) {
    let that = this;
    that.setData({ toView: "h_" + e.currentTarget.dataset.val, page: 1 });
    let starttime = util.assembledTime("start", e.currentTarget.dataset.val);
    let endtime = util.assembledTime("end", that.getTimeIndex(e.currentTarget.dataset.val));

    console.log("starttime:" + starttime + "  endtime:" + endtime);
    tqgService.queryTqgListByTimeAndPage(function (res) {
      if (res.code == 200) {
        that.setData({ goodsList: res.data, starttime: starttime, endtime: endtime });
      }
    }, starttime, endtime, 1, that.data.size);
  },

  //获取下一个时间段
  getTimeIndex: function (time) {
    let that = this;
    let timeIndex = 0;
    let timeArr = that.data.timeList;
    for (var index in timeArr) {
      if (timeArr[index].val > time) {
        timeIndex = index;
        break;
      }
    }
    return timeArr[timeIndex].val;
  },

  //通过时间获取淘抢购列表
  queryTqgListByTimeAndPage: function (starttime, endtime, pageNo, pageSize) {
    let that = this;
    tqgService.queryTqgListByTimeAndPage(function (res) {
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
      }
    }, starttime, endtime, pageNo, pageSize);
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
    let hour = new Date().getHours();
    //避免空时间段,所以寻找下一个时间段
    let newhour = that.getTimeIndex(hour);
    let starttime = util.assembledTime("start", newhour);
    let endtime = util.assembledTime("end", that.getTimeIndex(newhour));
    console.log("starttime:" + starttime + "  endtime:" + endtime);
    that.queryTqgListByTimeAndPage(starttime, endtime, that.data.page, that.data.size);
    that.setData({ toView: "h_" + newhour, nowHour: newhour, starttime: starttime, endtime: endtime });
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
    console.log("starttime:" + that.data.starttime + "  endtime:" + that.data.endtime);
    that.queryTqgListByTimeAndPage(that.data.starttime, that.data.endtime, that.data.page, that.data.size);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})