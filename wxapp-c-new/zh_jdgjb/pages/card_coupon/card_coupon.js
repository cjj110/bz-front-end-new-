// zh_jdgjb/pages/card_coupon/card_coupon.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titel: ["未使用", "已使用", "已过期",],
    coupon: "../img/coupon.png",
    couponcolse: "../img/couponcolse.png",
    index: 0,
    activeIndex: 0,
    page: 1,
    cp: [],
  },

  search(e) {
    console.log(e.detail.value)
    this.setData({
      number: e.detail.value
    })
  },
  back() {
    this.setData({
      exe: false
    })
  },
  home(e) {
    wx.navigateTo({
      url: '/zh_jdgjb/pages/index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  exchange(e) {
    let number = this.data.number;
    let that = this;
    // that.setData({
    //   exe: true
    // })
    app.util.request({
      url: "entry/wxapp/ExchangeCoupons",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        coupons: number,
      },
      method: "post",
      success: function (res) {
        console.log(res)
        let data = res.data.data;
        if (res.data.responseData == '01') {
          that.coupun(1);
          that.setData({
            sceen: true,
            exe: true
          })
        } else {
          that.setData({
            sceen: false,
            exe: true,
            responseMessage: res.data.responseMessage
          })
        }
      }
    })
  },

  // 首页右下角图片
  jieliimg() {
    let p = this;
    app.util.request({
      url: "entry/wxapp/jieliImg",
      success: function (t) {
        console.log(t)
        let data = t.data.data;
        p.setData({
          rightdata: data,
        })
      }
    })
  },

  tabClick: function (e) {
    console.log(e),
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        index: e.currentTarget.dataset.index,
      })
    this.coupun(e.currentTarget.dataset.index + 1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.numberleng();
    this.coupun(1);
    this.jieliimg();
  },

  coupun(e) {
    wx.showLoading({
      title: '正在加载',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    });
    let c = this;
    var n = c.data.page;
    app.util.request({
      url: "entry/wxapp/MyJlCoupons",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        status: e,
        page: c.data.page
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
        if (res.data.code == 1) {
          c.setData({
            cp: res.data.data,
          })
        } else {
          wx.showToast({
            title: '请求错误',
            icon: 'none',
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      complete: function (res) { },
    });
  },

  //  监听数字长度
  numberleng(e) {
    var num = 80;
    this.setData({
      num: num,
      numlength: (num + '').length
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
    // this.refresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})