// zh_jdgjb/pages/follow/follow.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表

    })

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
      url: "entry/wxapp/GetWximg",
      success: function (res) {
        console.log(res);
        var arr = [];

        arr[0] = res.data.wxdyh_img
        arr[1] = res.data.wxqun_img
        arr[2] = res.data.wxqun1_img
        console.log(arr)
        page.setData({
          arr: arr
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