// zh_jdgjb/pages/cart_id/cart_id.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bint_name: function (e) {
    console.log(e)
    var value = e.detail.value;
    this.setData({
      name: value
    })
  },

  bint_card: function (e) {
    console.log(e)
    var value = e.detail.value;
    this.setData({
      card: value
    })
  },


  bindblur: function (e) {
    var value = e.detail.value;
    var regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!regName.test(value)) {
      this.setData({
        name_a: false
      })
    } else {
      this.setData({
        name_a: true
      })
    }
  },

  bindbb: function (e) {
    var value = e.detail.value;
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(value)) {
      this.setData({
        name_d: false
      })
    } else {
      this.setData({
        name_d: true
      })
    }
  },
  bindcc: function (e) {
    var value = e.detail.value;
    if (value == '') {
      this.setData({
        name_e: false
      })
    } else {
      this.setData({
        name_e: true
      })
    }
  },

  btn: function (e) {
    var that = this;
    var regName = /^[\u4e00-\u9fa5]{2,4}$/;
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (that.data.name == undefined && that.data.card == undefined && that.data.wx == undefined) {
      wx.showToast({
        title: "信息不能为空",
        image: "../img/images/icon-warning.png",
      });
      return false;
    }
    if (!regName.test(that.data.name)) {
      wx.showToast({
        title: "名字不正确",
        image: "../img/images/icon-warning.png",
      });
      return false;
    }
    if (!regIdNo.test(that.data.card)) {
      wx.showToast({
        title: "输入正确身份证",
        image: "../img/images/icon-warning.png",
      });
      return false;
    }
    var id;
    if (wx.getStorageSync("user_g")) {
      id = wx.getStorageSync("user_g")
    } else {
      id = wx.getStorageSync("userInfo").id
    }

    app.util.request({
      url: "entry/wxapp/Realname",
      data: {
        realname: that.data.name,
        card_code: that.data.card,
        user_id: id
      },
      success: function (res) {
        console.log(res);
        if (res.data == 1) {

          that.setData({
            name: ''
          })
          wx.showToast({
            title: '提交成功',
            icon: '',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) {
              setTimeout(function () {
                wx.reLaunch({
                  url: '../logs/logs',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              }, 2000)
            },
            fail: function (res) { },
            complete: function (res) { },

          })
        } else {
          wx.showToast({
            title: '提交失败',
            icon: '',
            image: '../img/images/icon-warning.png',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      complete: function (res) {

      },
    });


  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    app.util.request({
      url: "entry/wxapp/GetUser",
      data: {
        tel: '',
        realname: '',
        card_code: "",
        wx_code: "",
        img: "",
      },
      success: function (res) {
        console.log(res);
        var user_info = res.data;
        page.setData({
          user_info: user_info,
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
        });
      },
      complete: function (res) {
        wx.hideLoading();
      },
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

  }
})