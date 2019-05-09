// zh_jdgjb/pages/turnover_ti/turnover_ti.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = this,
      o = a.data.score_detail,
      t = a.data.seller_id,
      n = a.data.page;
    app.util.request({
      url: "entry/wxapp/SellerTxList",
      data: {
        seller_id: wx.getStorageSync("store_info").seller_id,
      },
      success: function (e) {
        console.log(e)
        a.setData({
          score_detail: e.data
        });

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

  onPullDownRefresh: function () {
    this.setData({
      score_detail: [],
      page: 1
    }), this.refresh(), wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    this.refresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})