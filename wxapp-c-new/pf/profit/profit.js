// zh_jdgjb/pages/profit/profit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  index() {
    wx.redirectTo({
      url: '/zh_jdgjb/pages/index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  my_profit: function (e) {
    wx.navigateTo({
      url: '../my_profit/my_profit',
    })
  },

  home: function (e) {
    wx.reLaunch({
      url: "../../zh_jdgjb/pages/index/index"
    });
  },

  wode: function (t) {
    wx.reLaunch({
      url: "../../zh_jdgjb/pages/logs/logs"
    });
  },

  profit_Record: function (t) {
    wx.navigateTo({
      url: "../profit_record/profit_record"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/WaScore",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
      },
      success: function (res) {
        console.log(res);
        page.setData(res.data)
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
    page.numbers()
  },


  numbers() {
    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/WaRank",
      data: {
        user_id: id
      },
      success: function (res) {
        console.log(res);
        page.setData({
          stor: res.data
        })

      },
      complete: function (res) {
        wx.hideLoading();
      },
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
    this.user();
  },
  user: function (e) {
    var n = this;
    app.getUserInfo(function (e) {
      console.log(e)
      if (0 == e.level_id)
        var t = "初始会员";
      else t = e.level_name;
      n.setData({
        level_name: t,
        score: e.score,
        userInfo: e
      });
    });
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
    var platform = wx.getStorageSync("platform")
    console.log(platform)
    var page = this;
    var user_info = wx.getStorageSync("userInfo");
    var shellfish_title = platform.shared_config.shellfish.title
    var shellfish_img = platform.shared_config.shellfish.img
    return {
      title: shellfish_title,
      imageUrl: "https://oss.bizhuhome.com/" + shellfish_img,
      path: "/zh_jdgjb/pages/index/index?user_id=" + user_info.id,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  }
})