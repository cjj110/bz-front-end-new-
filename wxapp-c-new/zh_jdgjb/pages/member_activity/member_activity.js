const app = getApp();
// zh_jdgjb/pages/member_activity /member_activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    richang: '',
    huiyuan: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getUserInfo(function(e) {
      console.log(e)
    })
    this.loadData();
  },

  loadData: function() {
    var page = this;
    app.util.request({
      url: "entry/wxapp/GetUserActivity",
      data: {
        user_id: wx.getStorageSync("userInfo").id
      },
      success: function(res) {
        console.log(res)
        page.setData(res.data);
      },
      complete: function(res) {},
    });
  },

  receive1(e) {

    var page = this;
    var richang = page.data.richang
    var id = e.currentTarget.dataset.id;
    app.util.request({
      url: "entry/wxapp/GetScore",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        ac_id: e.currentTarget.dataset.id
      },
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: "+20加贝",
          icon: "none"
        })
        page.loadData();
      },
      complete: function(res) {},
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