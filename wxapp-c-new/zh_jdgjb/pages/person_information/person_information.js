// weixinmao_house/pages/person_information/person_information.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['未知', '男', '女',],
    headUrl: '',
    region: '',
    addr: '请选择',
    // index:1,
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  bindwx: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var wxchenk;
    if (e.detail.value) {
      wxchenk = true
    } else {
      wxchenk = false
    }
    this.setData({
      wxd: e.detail.value,
      wxchenk: wxchenk
    })
  },

  invitation_ma: function () {
    wx.navigateTo({
      url: '../invitation_ma/invitation_ma',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  password: function () {
    wx.navigateTo({
      url: '../password/password',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {


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
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    var id = wx.getStorageSync("userInfo").id
    console.log(id)
    app.util.request({
      url: "entry/wxapp/GetUser",
      data: {
        user_id: wx.getStorageSync("userInfo").id
      },
      success: function (res) {
        var user_info = res.data;
        page.setData({
          user_info: user_info,
          index: user_info.sex
        });
        if (user_info.city) {
          page.setData({
            addr: user_info.province + ',' + user_info.city + ',' + user_info.area,
          });
        }
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },


  //提交表单
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value.nickname)
    wx.showLoading({
      title: "正在提交..",
      mask: true,
    });

    var id = wx.getStorageSync("userInfo").id
    app.util.request({
      url: "entry/wxapp/Realname",
      data: {
        tel: e.detail.value.phone,
        name: e.detail.value.nickname,
        sex: that.data.index,
        user_id: id,
        wx_code: e.detail.value.wx,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data == 1) {
          wx.showToast({
            title: '保存成功',
            duration: 1500,
          });
        } else {
          wx.showModal({
            title: '提示',
            content: "保存失败",
            showCancel: false,
          })
        }
      },
      complete: function (res) {

      },
    });
  },




  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // var page = this;
    // var phone = page.data.phone
    // app.util.request({
    //   url: "entry/wxapp/Realname",
    //   data: {
    //     tel: phone,
    //     "realname": "",
    //     "card_code": "",
    //     "wx_code": "",
    //     "img": ""
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     var user_info = res.data;
    //     page.setData({
    //       user_info: user_info,
    //     });
    //     if (user_info.city) {
    //       page.setData({
    //         addr: user_info.province + ',' + user_info.city + ',' + user_info.area,
    //       });
    //     }
    //   },
    //   complete: function (res) {
    //     wx.hideLoading();
    //   },
    // });

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

  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })

  },



  chagePic(e) {

    var image_photo = e.currentTarget.dataset.img;

    wx.navigateTo({
      url: '../head_portrait/head_portrait?img=' + image_photo,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

})