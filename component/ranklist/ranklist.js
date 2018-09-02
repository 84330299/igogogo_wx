const componentService = require("../../services/componentService.js");

Component({
  options: {
    multipleSlots: true
  },
  data: {
    hostsale: null,
    page: 0
  },

  attached: function () {
    let that = this;
    let postData = { pageNo: 2, pageSize: 20 };
    componentService.queryHostSale(function (res) {
      if (res.code == 200) {
        that.setData({ hostsale: res.data, page: 2 });
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
  },





})