const service = require("../../services/catalogService.js");

Component({
  options: {
    multipleSlots: true
  },
  data: {
    navbarlist: null
  },

  attached: function () {
    let that = this;
    //获取所有分类
    service.queryAllCatalog(function (res) {
      if (res.code == 200) {
        that.setData({ navbarlist: res.data });
      }
    });
  },

  methods: {
    showCategory: function (e) {
      let id = e.currentTarget.dataset.cid;
      let selfid = e.currentTarget.dataset.selfid;
      let keyword = e.currentTarget.dataset.keyword;
      wx.navigateTo({
        url: '/page/category/category?id=' + id + '&selfid=' + selfid + '&keyword=' + keyword,
      })
    },
  },





})