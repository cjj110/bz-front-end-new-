// zh_jdgjb/pages/choicenessJdList/choicenessJdList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var s = this;
    var c = s.data.page;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/ChoicenessJdList",
      data: {
        tag_id: options.tag_id,
        city: options.city,
        page: c,
      },
      success: function (t) {
        if (console.log(t), 0 < t.data.length) {
          s.setData({
            page: c + 1,
            hotel: t.data,
            none_more: 1
          })
        } else {
          s.setData({
            none_more: 0,
          });
        }
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });

  },

  conlist: function (t) {
    console.log(t), wx.navigateTo({
      url: "../hotel_list/hotel_info?hotel_id=" + t.currentTarget.dataset.id
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
  // onPullDownRefresh: function () {
  //   this.setData({
  //     page: 1,
  //     hotel: [],
  //   }),
  //     this.refresh(),
  //     wx.stopPullDownRefresh();
  // },

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
    var jingxuan_title = platform.shared_config.selected_columns.title
    var jingxuan_img = platform.shared_config.selected_columns.img
    return {
      title: jingxuan_title,
      imageUrl: "https://oss.bizhuhome.com/" + jingxuan_img,
      path: "/zh_jdgjb/pages/index/index?user_id=" + user_info.id,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  }
})