const componentService = require("../../services/componentService.js");

Component({
  options: {
    multipleSlots: true
  },
  data: {
    hostsale: null
  },

  attached: function () {
    let that = this;
    let postData = { pageNo: 1, pageSize: 10 };
    componentService.queryHostSale(function (res) {
      if (res.code == 200) {
        that.setData({ hostsale: res.data });
      }
    }, postData);
  },

  methods: {
    showDetail: function (e) {
      let numIid = e.currentTarget.dataset.numiid;
      wx.navigateTo({
        url: '/page/detail/detail?numIid=' + numIid,
      })
    },
    showHotSaleList:function(){
      wx.navigateTo({
        url: '/page/hotsalelist/hotsalelist',
      })
    }
  }




})