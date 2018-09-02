const hotrecommendService = require("../../services/hotrecommendService.js");

Component({
  options: {
    multipleSlots: true
  },
  data: {
    hotrecommendlist: null
  },

  attached: function () {
    let that = this;
    hotrecommendService.queryHotRecommend(function (res) {
      if (res.code == 200) {
        that.setData({ hotrecommendlist: res.data });
      }
    });

    //本地测试
    // let hotrecommendlist = [
    //   {
    //     id: 568962670150,
    //     src: "https://img.alicdn.com/imgextra/i1/71460541/TB2DUq_ppGWBuNjy0FbXXb4sXXa_!!71460541.jpg",
    //     title: "韩版夏装2018新款裙子雪纺吊带碎花连衣裙女夏中长两件套装裙背带"
    //   },
    //   {
    //     id: 567534085623,
    //     src: "https://gd4.alicdn.com/imgextra/i3/193502143/TB2numzlY9YBuNjy0FgXXcxcXXa_!!193502143.jpg_400x400.jpg",
    //     title: "2018夏装新款韩版一字露肩连衣裙女装夏季吊带裙子chic复古a字裙"
    //   },
    //   {
    //     id: 566777000938,
    //     src: "https://img.alicdn.com/imgextra/i1/2102481169/TB2qEm2hYuWBuNjSszgXXb8jVXa_!!2102481169.jpg",
    //     title: "蕾丝网纱连衣裙2018春夏季新款sukol少女心超仙仙女温柔裙子收腰"
    //   }
    // ];
    // that.setData({ hotrecommendlist: hotrecommendlist });
  },

  methods: {
    showDetail: function (e) {
      let numIid = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/page/detail/detail?numIid=' + numIid,
      })
    },
  }

})