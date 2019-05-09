// zh_jdgjb/pages/password/password.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: true, //切换密码
    passwordlook: false, //判断眼睛展示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 验证码
  bindpassword: function (e) {
    let king_names;
    let page = this;
    console.log(e)
    if (e.detail.value == "") {
      king_names = false
    } else {
      king_names = true
    }
    page.setData({
      passwordlook: king_names,
    });
  },
  formSubmit: function (e) {
    var t = this;
    if (e.detail.value.king3 != e.detail.value.king4) {
      wx.showModal({
        title: '设置失败',
        content: '您的输入的两次密码不相同',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#ec6464',
        success: function (res) {
          if (res.confirm) { }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false;
    }

    if (e.detail.value.king3.length < 6 || e.detail.value.king4.length < 6) {
      wx.showModal({
        title: '设置失败',
        content: '您的密码长度小于6',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#ec6464',
        success: function (res) {
          if (res.confirm) { }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false;
    }



    app.util.request({
      url: "entry/wxapp/SetTradepwd",
      method: "post",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        // tel: e.detail.value.king1,
        // code: e.detail.value.king2,
        openid: wx.getStorageSync("openid"),
        password: e.detail.value.king3,
        newpassword: e.detail.value.king4,
        // scene: t.data.scene
      },
      success: function (a) {
        if (a.data == 1) {
          wx.showToast({
            title: '设置成功',
            icon: 'none',
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          setTimeout(function () {
            wx.setStorageSync("type_chenk", true)
            wx.navigateBack({
              delta: 1,
            })
          }, 2000)
        } else {
          wx.showToast({
            title: a.data.msg,
            icon: 'none',
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }



      },
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