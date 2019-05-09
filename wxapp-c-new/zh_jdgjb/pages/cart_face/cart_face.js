// zh_jdgjb/pages/cart_face/cart_face.js
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
    var that = this

  },

  takePhoto() {

    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })

        wx.uploadFile({
          url: 'http://www.anweimin.top/miniprgram-php/server/index.php/home/index/login',
          filePath: this.data.src,
          name: 'file',
          success: (res) => {
            var data = res.data;
            console.log(data);
            wx.navigateTo({
              url: '../test_success/test_success',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })


          }

        })

      }

    })

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