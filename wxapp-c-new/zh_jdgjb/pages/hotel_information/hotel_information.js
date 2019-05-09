// zh_jdgjb/pages/hotel_information/hotel_information.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.Load()
  },


  hotel() {
    wx.navigateTo({
      url: '../maintenance/maintenance1',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  Load(e) {
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/GetHotel",
      data: {
        storeid: wx.getStorageSync("store_info").seller_id,
      },
      success: function(res) {
        console.log(res);
        var img = res.data.roomInfo.img;
        var list = img.split(",");
        page.setData(res.data);
        page.setData({
          list_img: list
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });

    app.util.request({
      url: "entry/wxapp/GetHotelService",
      data: {
        storeid: wx.getStorageSync("store_info").seller_id,
      },
      success: function(res) {

        console.log(res);

        var facilities = res.data.facilities

        var arr = [];
        var service = [];
        var traffic = [];

        var wifi = [];

        for (let i in facilities) {
          arr.push(facilities[i]); //属性
        }

        for (let i in res.data.service) {
          service.push(res.data.service[i]); //属性
        }
        for (let i in res.data.traffic) {
          traffic.push(res.data.traffic[i]); //属性
        }

        for (let i in res.data.wifi) {
          wifi.push(res.data.wifi[i]); //属性
        }

        console.log(arr)

        page.setData({
          facilities: arr,
          service: service,
          traffic: traffic,
          wifi: res.data.wifi,
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