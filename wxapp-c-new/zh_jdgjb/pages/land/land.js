// hc_answer/pages/land/land.js
var app = getApp();
var code = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // classmaney: true,
    index: -1,
    model: false,
    area: [],
    sec: 60,
    password: true, //切换密码
    passwordlook: false, //判断眼睛展示
    is_blok: false, //密码类型状态判断  
    passwords: true, //切换密码
    passwordlooks: false, //判断眼睛展示
    is_bloks: false, //密码类型状态判断  
    is_phone: false,
    // model: true,11
    phone_error: true,
    code_name: '',
    code_id: '',
  },
  // 新用户
  btnname() {
    wx.navigateTo({
      url: '../cart_id/cart_id',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 新用户
  btnconcanss() {
    wx.redirectTo({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    });
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var area = this.data.area;
    this.setData({
      index: e.detail.value,
      code_id: area[e.detail.value].id
    })
  },
  // 手机号删除
  work_phone: function (e) {
    console.log(e)
    var is_phone = e.currentTarget.dataset.text;
    if (is_phone) {
      this.setData({
        value_phone: '',
        is_phone: false,
        phoneword: false,
        phone_error: true,
      });
    } else {
      this.setData({
        value_phone: '',
        is_phone: true,
        phoneword: false,
        phone_error: true,
      });
    }
  },

  // 验证码
  invitation_code: function (e) {
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

  // 获取手机号
  inputBlur: function (e) {
    var phone = e.detail.value;
    var king_names;
    var phone_error;
    if (e.detail.value == "") {
      king_names = false;
      phone_error = true
    } else {
      phone_error = true,
        king_names = true;
    }
    this.setData({
      phone: phone,
      phoneword: king_names,
      phone_error: phone_error,
    });
  },

  code_ma(e) {
    var code_name = e.detail.value;
    this.setData({
      code_name: code_name
    });
  },

  work_look: function (e) {
    console.log(e)
    var is_blok = e.currentTarget.dataset.text;
    if (is_blok) {
      this.setData({
        password: true,
        is_blok: false
      });
    } else {
      this.setData({
        password: false,
        is_blok: true
      });
    }
  },

  // 获取验证码
  getCode: function () {
    var _this = this;
    var time = _this.data.sec;
    var code_id = _this.data.code_id;
    console.log(code_id)
    _this.setData({
      remain: time,
    })
    if (!/^[1]{1}[0-9]{10}/.test(this.data.phone)) {
      // wx.showToast({
      //   image: '../img/images/icon-warning.png',
      //   title: '手机号码错误',
      // })
      _this.setData({
        phone_error: false
      })
      return;
    }
    if (code_id <= -1) {
      _this.setData({
        model: true,
        msg: "请选择区号",
        mg_title: '获取失败'
      })
      return;
    }
    //防止this对象的混杂，用一个变量来保存
    console.log(time)
    //获取最初的秒数
    code.getCode(_this, time);
    //调用倒计时函数
    _this.setData({
      VerifyCode_at: false,
      getCodes: '',
    })
    app.util.request({
      url: "entry/wxapp/Sendsms",
      cachetime: "0",
      data: {
        tel: this.data.phone,
        code_id: _this.data.code_id,
      },
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          _this.setData({
            sec: 60,
          })
        } else {
          wx.showToast({
            image: '../img/images/icon-warning.png',
            title: res.msg
          })
        }
      }
    })
  },

  formSubmit: function (e) {
    var t = this;
    if (e.detail.value.king2 == '') {
      wx.showModal({
        title: '登陆失败',
        content: '验证码错误',
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
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/BindMobile",
      method: "post",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        tel: e.detail.value.king1,
        code: e.detail.value.king2,
        code_id: t.data.code_id,
        openid: wx.getStorageSync("openid"),
        scene: t.data.scene,
      },
      success: function (a) {
        console.log(a)
        var classmaney;
        if (a.data.code == 1) {
          wx.setStorageSync("type_chenk", true)
          wx.setStorageSync("user_g", a.data.data.id)
          a.data.data.money == 1 ? t.setData({
            classmaney: true
          }) : wx.redirectTo({
            url: '../index/index',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          });
        } else {
          t.setData({
            model: true,
            msg: a.data.msg,
            mg_title: '登陆失败',
          })
        }
      },
    })
  },

  btnconcans(e) {
    this.setData({
      model: false,
    })
  },
  getDepart: function () {
    var a = this;
    app.util.request({
      url: "entry/wxapp/GetPhoneCode",
      method: "post",
      dataType: "json",
      data: {},
      success: function (t) {
        console.log(t)
        let k = t.data;
        for (let i in t.data) {
          k[i].name = t.data[i].cn_name + t.data[i].code;
          if (t.data[i].cn_name == '中国') {
            a.setData({
              code_id: t.data[i].id
            })
          }
        }
        a.setData({
          area: k
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene;
    var share_key = wx.getStorageSync("share_key");
    let page = this;
    let arr = [];
    if (options.scene) {
      console.log(options)
      console.log('这个是二维码')
      var str = options.scene;
      if (str.indexOf("sellerid") != -1) {
        arr = str.split("_");
        console.log(arr)
        let sellerid = arr[1];
        page.GetSellerName(sellerid);
        scene = decodeURIComponent(options.scene);
      } else {
        scene = decodeURIComponent(options.scene);
      }
    } else if (share_key) {
      console.log(share_key)
      console.log('这个是分享按钮')
      scene = share_key;
    }

    var path = '';
    var n = this;
    var battleid = 0;
    if (options.path) {
      path = options.path
    }
    if (options.battleid) {
      battleid = options.battleid
    }
    this.setData({
      path: path,
      battleid: battleid,
      scene: scene,
    });
    this.getDepart();
    this.bg();
  },

  GetSellerName(sellerid) {
    var a = this;
    app.util.request({
      url: "entry/wxapp/GetSellerName",
      method: "post",
      dataType: "json",
      data: {
        sellerid: sellerid
      },
      success: function (t) {
        a.setData({
          text: t.data.data
        });
      }
    });
  },


  bg() {
    var a = this;
    app.util.request({
      url: "entry/wxapp/GetLoginImg",
      method: "post",
      dataType: "json",
      data: {},
      success: function (t) {
        a.setData({
          bg: t.data.data
        });
      }
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
    var type_chenk = wx.getStorageSync("type_chenk");
    var n = this;
    var userInfo = wx.getStorageSync("userInfo")
    if (userInfo.tel) {
      wx.redirectTo({
        url: '../index/index',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      return false;
    }
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var _this = this,
      time = 0;
    code.getCode(_this, time);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var _this = this,
      time = 0;
    code.getCode(_this, time);
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
  onShareAppMessage: function (t) { }
})