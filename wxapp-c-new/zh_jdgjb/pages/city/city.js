// zh_jdgjb/pages/city/city.js
var app = getApp();

// 缓存时间
var timestamp = Date.parse(new Date());       //最开始执行时记下的时间
var expiration = timestamp + (60 * 24 * 1000);   //期望的缓存失效的时间
wx.setStorageSync('time', expiration);
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    scrollTopId: '',//置顶id     //
    scrollTop:"",
    showLetter: "",
    national:"",
    cityList:"",
    type:0,
    popular: [],
    inland:[],  //国内字母
    nation:[],  //国际字母

  },
  

  address: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  
  // 选中城市
  clickfn: function(e){
    var that=this
    var index = e.currentTarget.dataset.index;
    var text = e.currentTarget.dataset.text;
    console.log(text)
    app.util.requestnew({
      urlnew:"api/City/setHistoricCity",
      data:{
        uid:wx.getStorageSync("userInfo").id,
        type: that.data.type,
        cityname:text
      },
    })
    console.log(that.data.type)
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      address: text,
      addcity: text
    })
    wx.navigateBack();
  },
  
  // 点击历史城市
  clickhistory:function(e){
    var text = e.currentTarget.dataset.text;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      address: text,
      addcity: text,
    })
    wx.navigateBack();
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    console.log(options)
    that.setData({
      address: options.address,
      type:that.data.type
    });

    // 加载后获取屏幕高
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    that.setData({
      winHeight: winHeight
    })

    //设置缓存,请求所有城市
    var that=this
    var newexpiration = wx.getStorageSync('time')  // 获取缓存的开始执行时间
    var citys=wx.getStorageSync("cityList")
    if (citys) {
      console.log(citys)
      that.setData({
        cityList:citys
      })
    } else {
      wx.showLoading({
        title: "加载中..",
        mask: true,
      });
      console.log("无缓存数据，需请求获取")
      app.util.requestnew({
        urlnew: "api/City/getCity",
        data: {
          type: that.data.type,
        },
        success: (res) => {
          console.log(res);
          if (that.data.type == 0) {
            that.setData({
              cityList: res.data.responseData,
            })
            // wx.setStorageSync('cityList', that.data.cityList)
          } else {
            that.setData({
              national: res.data.responseData
            })
          }
        },
        complete: function (res) {
          wx.hideLoading();
        },
      });
    } 
    console.log(that.data.cityList,that.data.national)

  // 获取历史城市和热门城市
    wx.showLoading({
      title: "加载中..",
      mask: true,
    }),
    app.util.requestnew({
      urlnew: "api/City/getPHCity",
      data: {
        uid: wx.getStorageSync("userInfo").id,
        type: that.data.type,
      }, 
      success: function (res) {
        console.log(res);
        that.setData({
          History: res.data.responseData.history,
          popular: res.data.responseData.popular,
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },

  // 国内 
  indexbox1: function (e) {
    var that = this;
    var citys = wx.getStorageSync("cityList")
    that.setData({
      type: 0,
    });
    if (citys) {
      that.setData({
        cityList: citys
      });
      app.util.requestnew({
        urlnew: "api/City/getPHCity",
        data: {
          type: that.data.type,
          uid: wx.getStorageSync("userInfo").id,
        },
        success: (e) => {
          console.log(e);
          that.setData({
            History: e.data.responseData.history,
            popular: e.data.responseData.popular,
          })
        },
      })
    }else{
      app.util.requestnew({
        urlnew: "api/City/getCity",
        data: {
          type: 0,
        },
        success: (res) => {
          console.log(res);
          if (that.data.type == 0) {
            that.setData({
              cityList: res.data.responseData
            })
            // wx.setStorageSync('cityList', that.data.cityList)
          } else {
            that.setData({
              national: res.data.responseData
            })
          }
        },
        complete: function (res) {},
      }),
        app.util.requestnew({
          urlnew: "api/City/getPHCity",
          data: {
            type: that.data.type,
            uid: wx.getStorageSync("userInfo").id,
          },
          success: (e) => {
            console.log(e);
            that.setData({
              History: e.data.responseData.history,
              popular: e.data.responseData.popular,
            })
          },
        })
    }
    
  },

  // 国际
  indexbox2: function (e) {
    var that = this;
    var citys=wx.getStorageSync("national")
    that.setData({
      type: 1,
    });
    app.util.requestnew({
      urlnew: "api/City/getPHCity",
      data: {
        type: this.data.type,
        uid: wx.getStorageSync("userInfo").id,
      },
      success: (e) => {
        console.log(e);
        this.setData({
          History: e.data.responseData.history,
          popular: e.data.responseData.popular,
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
    if (citys){
      that.setData({
        national:citys
      })
    }else{
      wx.showLoading({
        title: "加载中..",
        mask: true,
      });
      app.util.requestnew({
        urlnew: "api/City/getCity",
        data: {
          type: this.data.type,
        },
        success: (e) => {
          console.log(e);
          this.setData({
            national: e.data.responseData
          })
          // wx.setStorageSync('national', this.data.national)
        },
        complete: function (res) {
          wx.hideLoading();
        },
      });
    }
  },

  // 点击右侧字母
  clickLetter: function (e) {
    var page=this
    var letters=[]
    var showLetter = e.currentTarget.dataset.key;
    page.setData({
      scrollTopId: showLetter,
      key: showLetter
    })
    console.log(showLetter)
  },

  // 字母颜色变回来
  disappear:function(){
    var page = this
    page.setData({
      key: "",
    })
  },

  // #回到顶部
  gotop: function () {
    this.setData({
      scrollTop: 0,
      key: "",
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