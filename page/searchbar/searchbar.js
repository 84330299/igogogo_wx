const util = require("../../utils/util.js");
const categoryService = require("../../services/categoryService.js");
const keywordService = require("../../services/keywordService.js")

Page({
  data: {
    keyword: '',
    searchStatus: false,
    goodsList: null,
    categoryFilter: false,
    defaultKeyword: {},
    hotKeyword: [],
    page: 1,
    size: 10,
    searchLoading: false,
    loadComplete: false
  },

  //显示商品详情
  showDetail: function (e) {
    let numIid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/detail/detail?numIid=' + numIid
    })
  },

  //事件处理函数
  doSearch: function () {
    let that = this;
    this.setData({
      searchStatus: false,
      goodsList: null,
      searchLoading: false,
      loadComplete: false
    });
    this.queryGoodsListByKeyword(1, that.data.size, that.data.keyword);
  },

  //清空搜索关键词
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false,
      goodsList: null,
      searchLoading: false,
      loadComplete: false
    });
  },

  //获取搜索关键词
  queryKeyword: function () {
    let that = this;
    keywordService.queryKeyword(function (res) {
      if (res.code == 200) {
        that.setData({ hotKeyword: res.data });
      }
    });
  },

  onLoad: function () {
    let that = this;
    that.queryKeyword();
    that.setData({
      defaultKeyword: { keyword: '请输入关键词' }
    });
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    let that = this;
    let newpage = that.data.page += 1;
    that.setData({ page: newpage });
    that.queryGoodsListByKeyword(that.data.page, that.data.size, that.data.keyword);
  },

  //搜索框内容发生改变
  inputChange: function (e) {
    this.setData({
      keyword: e.detail.value,
      searchStatus: false,
      searchLoading: false,
      loadComplete: false
    });
  },


  //搜索框获取焦点
  inputFocus: function () {
    this.setData({
      searchStatus: false,
      goodsList: null,
      searchLoading: false,
      loadComplete: false
    });
  },

  //通过关键词获取商品列表
  queryGoodsListByKeyword: function (page, size, keyword) {
    let that = this;
    let postData = { "pageNo": page, "pageSize": size, "q": keyword };
    categoryService.queryGoodsListByKeyword(function (res) {
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

    }, postData);

  },



  //更新关键词并清空历史搜索结果
  getSearchResult(keyword) {
    let that = this;
    that.setData({
      keyword: keyword
    });
    //获取搜索结果列表
    this.queryGoodsListByKeyword(1, that.data.size, keyword);
  },

  //通过热门关键词或历史记录搜索结果
  onKeywordTap: function (event) {
    this.getSearchResult(event.target.dataset.keyword);
  },

  //文件框确认后搜索结果
  onKeywordConfirm(event) {
    this.getSearchResult(event.detail.value);
  },


})