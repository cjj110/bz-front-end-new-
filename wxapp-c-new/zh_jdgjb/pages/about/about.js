// zh_jdgjb/pages/about/about.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: "至少5个字",
    min: 5, //最少字数
    max: 520,
    texts: '',
    phone: ''
  },

  //字数限制  
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "加油，够5个字可以得20积分哦"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  conts_input(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  cofim(e) {
    var page = this;
    console.log(page.data.texts)
    if (!page.data.texts) {
      wx.showToast({
        title: "请填写意见",
        image: "../img/images/icon-warning.png",
      });
      return false;
    }
    if (!/^[1]{1}[0-9]{10}/.test(page.data.phone)) {
      wx.showToast({
        title: "请填写手机",
        image: "../img/images/icon-warning.png",
      });
      return false;
    }

    if (this.data.my == 0) {
      var storeid = 0
    };
    if (this.data.my == 1) {
      var storeid = wx.getStorageSync("store_info").seller_id
    };

    app.util.request({
      url: "entry/wxapp/Feedback",
      data: {
        "user_id": wx.getStorageSync("userInfo").id,
        "content": page.data.texts,
        "tel": page.data.phone,
        storeid: storeid,
      },
      success: function(res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: "提交成功",
          });
          page.setData({
            phone: ''
          })
        }

      },
      complete: function(res) {

      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    var page = this;
    console.log(t)
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    this.setData({
      my: t.my
    })
    app.util.request({
      url: "entry/wxapp/GetFeedback",
      success: function(res) {
        console.log(res);
        page.setData({
          about: res.data.about
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})