// zh_jdgjb/pages/poss_success/poss_success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  map: function (e) {
    var a = this,
      t = Number(a.data.order_info.coordinates.split(",")[0]),
      e = Number(a.data.order_info.coordinates.split(",")[1]);
    wx.openLocation({
      latitude: t,
      longitude: e,
      name: a.data.order_info.seller_name,
      address: a.data.order_info.seller_address
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.util.request({
      url: "entry/wxapp/orderdetails",
      data: {
        order_id: e.id
      },
      success: function (e) {
        console.log(e);
        var t = e.data;
        t.arrival_time = t.arrival_time.slice(5, 7) + "月" + t.arrival_time.slice(8, 10) + "日",
          t.departure_time = t.departure_time.slice(5, 7) + "月" + t.departure_time.slice(8, 10) + "日",
          o.setData({
            order_info: t
          });
      }
    })
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