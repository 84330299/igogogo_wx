const util = require("../../utils/util.js");
const bannerService = require("../../services/bannerService.js");

Component({
  options: {
    multipleSlots: true
  },
  data: {
    banners: null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    inputShowed: false,
    inputVal: ""
  },

  attached: function () {
    let that = this;
    bannerService.queryBanner(function (res) {
      if (res.code == 200) {
        that.setData({ banners: res.data });
      }
    });

    //本地测试
    // let banners = [
    //   { img: "https://img.alicdn.com/imgextra/i3/2014023958/TB2kOSobm8YBeNkSnb4XXaevFXa_!!2014023958.jpg", numIid: 566376795961 },
    //   { img: "https://img.alicdn.com/imgextra/i2/893921871/TB2UVv9iCCWBuNjy0FhXXb6EVXa_!!893921871.jpg", numIid: 567083970384 },
    //   { img: "https://img.alicdn.com/imgextra/i1/1648683338/TB208XceiCYBuNkSnaVXXcMsVXa_!!1648683338.jpg", numIid: 567690812025 }
    // ];
    // that.setData({ banners: banners });
  },


  methods: {
    showSearch: function () {
      wx.navigateTo({
        url: '/page/searchbar/searchbar',
      })
    },
  }

})