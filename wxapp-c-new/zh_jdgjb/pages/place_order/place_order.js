var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
  } : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  },
  app = getApp();

Page({
  data: {
    time: "20:00",
    num: 1,
    see_price: !1,
    red_bag: 0,
    red_bag_id: 0,
    mode1: "success",
    mode2: "clear",
    mode3: "clear",
    pay_mode: !1,
    refrer_to: "确认支付",
    type: 1,
    pay_num: 1,
    coupontext: '请选择优惠劵',
    cp: [{
        chenk: true,
        name: '20元现金抵用劵'
      },
      {
        chenk: false,
        name: '30元现金抵用劵',
      },
    ],
    cp_hidden: false,
  },
  binpeople(e) {
    this.setData({
      "userInfo.name": e.detail.value
    })
  },
  bintel(e) {
    this.setData({
      "userInfo.tel": e.detail.value
    })
  },

  coupon_chiose(e) {
    var cp_hidden = this.data.cp_hidden;
    !cp_hidden ? cp_hidden = true : cp_hidden = false;
    this.setData({
      cp_hidden: cp_hidden
    })
  },

  coupon_js(z_price) {
    var p = this;
    //console.log(z_price)
    app.util.request({
      url: "entry/wxapp/CaCoupons",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        status: 1,
      },
      success: function(res) {
        wx.hideLoading();
        // console.log(res)
        if (res.data.code == 1) {
          let lo = true;
          let cp = res.data.data;
          for (let i in cp) {
            let n = Math.max(Number(cp[i].money))
            // console.log(n)
            if (n >= Number(z_price)) {
              lo = false
            }
          }
          p.setData({
            cp: cp,
            lo: lo
          })
        } else {
          wx.showToast({
            title: '请求错误',
            icon: 'none',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      complete: function(res) {},
    });
  },

  coupon(e) {
    let index = e.currentTarget.dataset.index,
      cp = this.data.cp;
    // console.log(e)
    let couponmoney;
    let g, text, d, Is, settlement;
    if (cp[index].chenk == true) {
      cp[index].chenk = false;
      Is = Number(cp[index].money)
      settlement = this.data.settlement;
      d = Number(settlement) + Number(Is)
      g = d.toFixed(2);
      text = '请选择优惠劵';
      couponmoney = 0;
    } else {
      for (let i in cp) {
        if (cp[i].chenk) {
          Is = cp[i].money;
          // console.log(Is)
          cp[i].chenk = false;
        }
      }
      // console.log(Is)
      if (Is == undefined) {
        Is = 0
      }
      cp[index].chenk = true;
      settlement = Number(this.data.settlement) + Number(Is);
      //console.log(settlement)
      couponmoney = cp[index].money
      d = Number(settlement) - Number(cp[index].money)
      g = d.toFixed(2);
      text = '-' + cp[index].money + '元';
    }
    this.setData({
      settlement: g,
      settlement_d: settlement,
      cp: cp,
      coupons_id: cp[index].coupons_id,
      couponmoney: couponmoney,
      coupontext: text,
      cp_hidden: false
    })
  },

  addpel(e) {
    //console.log('这个是通讯录')
    wx.addPhoneContact({
      success: function(e) {
        //console.log(e)
      }
    })
  },


  next() {
    wx.navigateTo({
      url: '../order_success/order_success',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  switch1Change: function(e) {
    //console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var Change = e.detail.value,
      page = this;
    page.setData({
      Change: Change
    })
    page.cost();
  },

  onLoad: function(o) {
    //console.log(o)
    var t = this;
    t.setData({
      color: wx.getStorageSync("platform").color
    });
    var e = o.room_id,
      a = o.hotel_id,
      n = wx.getStorageSync("day1"),
      s = wx.getStorageSync("day2"),
      c = wx.getStorageSync("day"),
      tm = wx.getStorageSync("time");
    t.setData({
      conttime: o.time,
      conttime: tm,
      room_id: e,
      hotel_id: a,
      day1: n,
      day2: s,
      day: c,
      coupon: 0,
      condition: 0,
      coupons_id: -1,
      form_d: o.form_d,
      grade: wx.getStorageSync("platform").open_member,
      system: wx.getStorageSync("platform")
    });
    var r = 0;
    app.util.request({
      url: "entry/wxapp/GetRoomCost",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        room_id: e,
        start: n,
        end: s
      },
      success: function(o) {
        for (var e in console.log(o), o.data) r += Number(o.data[e].mprice);
        //console.log(r),
        t.setData({
            z_price: r,
            price_infos: o.data
          }),
          t.coupon_js(r)
        t.refresh(),
          t.room_num();
        t.Dkjb();
      }
    });
  },

  Dkjb(l) {
    var id = wx.getStorageSync("userInfo").id
    var page = this;
    var z_price = page.data.z_price;
    if (l) {
      z_price = l;
    } else {
      z_price
    }
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/Dkjb",
      data: {
        user_id: id,
        price: z_price
      },
      success: function(res) {
        //console.log(res);
        page.setData({
          jb: res.data.jb,
          jb_cost: res.data.jb_cost,
          kg: res.data.jb_cost
        })
        page.cost(res.data.jb_cost)
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });
  },

  userinfo: function(o) {
    var e = this;
    app.getUserInfo(function(o) {
      // console.log(o),
      e.setData({
        userInfo: o
      });
    });
  },

  refresh: function(o) {
    var a = this,
      e = a.data.room_id,
      t = a.data.hotel_id;
    2 == a.data.grade ? (a.setData({
      discount: 1
    }), a.data.z_price) : app.getUserInfo(function(o) {
      var e = o.id;
      //console.log("会员等级为 " + e);
      var t = o.discount;
      null == t && (t = 10),
        //  console.log("会员折扣为 " + t),
        a.setData({
          discount: t / 10
        }), null != a.data.z_price && a.cost();
    });
    var n = wx.getStorageSync("userInfo").id;
    app.util.request({
        url: "entry/wxapp/MyCoupons",
        cachetime: "0",
        data: {
          user_id: n
        },
        success: function(o) {
          //console.log("我的优惠券"),
          // console.log(o),
          a.setData({
            coupons: o.data
          });
        }
      }),
      app.util.request({
        url: "entry/wxapp/RoomDetails",
        cachetime: "0",
        data: {
          room_id: e
        },
        success: function(o) {
          // console.log("RoomDetails", o);
          o.data.price, o.data.yj_cost;
          a.setData({
              room: o.data,
              yj_cost: Number(o.data.yj_cost),
              is_score: o.data.is_score,
            }),
            a.cost();
        }
      }),

      app.util.request({
        url: "entry/wxapp/PjDetails",
        cachetime: "0",
        data: {
          seller_id: t
        },
        success: function(o) {
          //console.log(o),
          a.setData({
            hotel: o.data
          });
        }
      }), app.util.request({
        url: "entry/wxapp/MyHb",
        cachetime: "0",
        data: {
          user_id: n,
          page: 1
        },
        success: function(o) {
          //console.log(o),
          a.setData({
            my_hb: o.data
          });
        }
      });
  },

  // 房间数量判断
  room_num: function(o) {
    var n = this,
      e = wx.getStorageSync("day1"),
      t = wx.getStorageSync("day2"),
      a = n.data.room_id;
    app.util.request({
      url: "entry/wxapp/GetRoomNum",
      data: {
        room_id: a,
        start: e,
        end: t
      },
      success: function(o) {
        //  console.log(o);
        var e = [],
          t = [];
        for (var a in o.data.map(function(o) {
            var e;
            e = Number(o.nums),
              //console.log(e)
              t.push(e);
          }), o.data)
          //  console.log(a)
          o.data[a].nums <= 0 && e.push(o.data[a]);
        var d = t;
        let classindex;
        //  console.log(t)
        for (let i in t) {
          if (t[i] == 0) {
            classindex = t.indexOf(t[i])
          } else {
            classindex = undefined;
          }
        }
        var j = d.sort(app.sort_num_order);
        //console.log(j)
        n.setData({
          room_num: j[0]
        })
        classindex != undefined && 0 < o.data.length && wx.showModal({
          title: "",
          content: o.data[classindex].dateday + "没有房间了",
          success: function(o) {
            o.confirm ? (console.log("用户点击确定"), wx.navigateBack({
              delta: 1
            })) : o.cancel && (console.log("用户点击取消"), wx.navigateBack({
              delta: 1
            }));
          }
        });
      }
    });
  },

  use_res_bag: function(o) {
    wx.navigateTo({
      url: "../coupon/red_bag"
    });
  },

  bindTimeChange: function(o) {
    //  console.log(o),
    //  console.log("picker发送选择改变，携带值为", o.detail.value),
    this.setData({
      time: o.detail.value
    });
  },

  add_num: function(o) {
    var e = this;
    if (e.data.room_num == e.data.num) wx.showModal({
      title: "",
      content: "没有这么多房间啦"
    });
    else {
      var t = e.data.num + 1;
      e.setData({
        num: t
      })
      var p = e.data.z_price;
      e.Dkjb(Number(p) * t);
    }
  },

  reduce_num: function(o) {

    var t = this.data.z_price;
    var e = this.data.num - 1;
    1 <= e && (this.setData({
        num: e
      }),
      this.Dkjb(Number(e) * t));
  },

  see_price: function(o) {
    //  console.log(o);
    var e = this.data.see_price;
    1 == e ? this.setData({
      see_price: !1
    }) : this.setData({
      see_price: !0
    });
  },

  mode1: function(o) {
    this.setData({
        mode1: "success",
        mode2: "clear",
        mode3: "clear",
        refrer_to: "确认支付",
        type: 1
      }),
      this.refresh();
  },

  mode2: function(o) {
    this.setData({
      mode1: "clear",
      mode2: "success",
      mode3: "clear",
      refrer_to: "确认支付",
      yj_cost: 0,
      type: 3
    }), this.cost();
  },


  mode3: function(o) {
    var e = this,
      t = e.data.hotel,
      a = e.data.userInfo;
    //  console.log(a),
    2 == t.ye_open ? e.setData({
      refrer_to: "该酒店不支持余额支付"
    }) : Number(a.balance) < e.data.settlement ? wx.showModal({
      title: "",
      content: "余额不足,请先去充值"
    }) : (e.setData({
      refrer_to: "确认支付",
      type: 2
    }), e.setData({
      mode1: "clear",
      mode2: "clear",
      yj_cost: 0,
      mode3: "success"
    }), e.cost());
  },

  cost: function() {
    var e = this;
    var t, kgd, kg;
    t = e.data.num;
    kg = e.data.kg;
    //console.log(e.data.Change)
    if (e.data.Change && kg) {
      kgd = e.data.kg;
    } else {
      kgd = 0;
    }
    // var t = num,
    var s = e.data.z_price;
    var couponmoney = e.data.couponmoney;
    // console.log(couponmoney)
    //  console.log(kgd)
    if (couponmoney) {} else {
      couponmoney = 0;
    }
    var d = Number(s) * t - Number(kgd) - Number(couponmoney);
    var l = Number(s) * t;
    var g = d.toFixed(2);
    //console.log(l)
    e.setData({
      t: t,
      d: Number(s) * t,
      price: s,
      settlement: g,
    });
  },

  use_coupon: function(o) {
    var e = this.data.discount_price,
      t = this.data.hotel_id;
    wx.navigateTo({
      url: "../coupon/store_coupon?money=" + e + "&hotel_id=" + t
    });
  },



  pay_mode: function(o) {
    var e = this.data.pay_mode;
    var page = this;
    setTimeout(function() {
      page.setData({
        aaa: true
      })
    }, 1000)

    setTimeout(function() {
      page.setData({
        bbb: true
      })
    }, 1500)
    setTimeout(function() {
      page.setData({
        ccc: true
      })
    }, 2000)
    1 == e ? this.setData({
      pay_mode: !1
    }) : this.setData({
      pay_mode: !0
    });
  },

  formSubmit: function(o) {
    var e = this,
      t = e.data.form_d;
    var a = e.data.userInfo,
      n = o.detail.formId,
      s = e.data.hotel,
      c = e.data.room,
      r = o.detail.value.code,
      d = e.data.total_price,
      i = e.data.settlement,
      l = e.data.condition,
      u = e.data.price,
      p = o.detail.value.people,
      g = o.detail.value.tel,
      m = e.data.time,
      _ = s.id,
      f = c.id,
      y = wx.getStorageSync("userInfo").id,
      h = e.data.coupons_id,
      x = s.name,
      w = s.province + s.city + s.district + s.address,
      v = s.coordinates,
      S = e.data.day1,
      b = e.data.day2,
      D = u,
      I = e.data.num,
      T = c.name,
      q = c.size,
      M = e.data.day,
      j = e.data.discount_price,
      z = e.data.yj_cost,
      N = e.data.couponmoney,
      k = c.logo,
      C = e.data.reduction_price,
      F = e.data.red_bag,
      P = e.data.red_bag_id,
      R = e.data.type,
      jb = e.data.jb,
      jb_cost = e.data.jb_cost;

    // console.log("入住人为 " + p),
    // console.log("联系人电话为 " + g),
    //  console.log("房间价格为 " + d),
    //  console.log("选择的到店时间为 " + m), console.log("酒店id " + _), console.log("房间id " + f),
    // console.log("用户id " + y), console.log("优惠券id " + h), console.log("酒店名字 " + x), console.log("酒店地址 " + w),
    // console.log("酒店经纬度 " + v), console.log("到店日期 " + S), console.log("离店日期 " + b), console.log("结算总金额 " + D),
    //  console.log("房间数量 " + I), console.log("房间类型 " + T), console.log("床型 " + q), console.log("入住天数 " + M),
    //console.log("折扣后的价格 " + j), console.log("押金金额 " + z), console.log("优惠券金额 " + N),
    //  console.log("支付方式为 " + R);


    var B = e.data.system,
      L = "";
    if ("" == p) L = "请填写入住人姓名";
    else if ("" == g) L = "请填写联系电话";
    else if ("" == r && 1 == B.is_sfz) L = "请填写您的身份证号";
    else if (2 == B.is_sfz) r = "";
    else 0 == /^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(g) ? L = "请输入正确的手机号" : 0 < N ? l > e.data.discount_price && (L = "不满足优惠券满减条件") : i <= 0 && (i = .01);
    var O = e.data.pay_num;
    "" != L ? (wx.showModal({
      title: "温馨提示",
      content: L
    }), e.setData({
      pay_num: 1
    })) : "" == L && 1 == O && (e.setData({
      pay_num: 0
    }), "" == a.zs_name && 1 == e.data.garde ? wx.showModal({
      content: "您需要注册会员",
      success: function(o) {
        o.confirm && (console.log("用户点击确定"), wx.navigateTo({
          url: "../register/register"
        }));
      }
    }) : app.util.request({
      url: "entry/wxapp/AddOrder",
      data: {
        name: p,
        tel: g,
        price: u,
        dd_time: m,
        seller_id: _,
        room_id: f,
        user_id: y,
        coupons_id: h,
        seller_name: x,
        seller_address: w,
        coordinates: v,
        arrival_time: S,
        departure_time: b,
        num: I,
        room_type: T,
        bed_type: q,
        days: M,
        dis_cost: j,
        yj_cost: z,
        yhq_cost: N,
        total_cost: i,
        room_logo: k,
        yyzk_cost: C,
        hb_id: P,
        hb_cost: F,
        from_id: t,
        classify: 1,
        type: R,
        code: r,
        jb: jb,
        jb_cost: jb_cost,
      },
      success: function(o) {
        // console.log("这是提交订单"),
        //  console.log(o);
        var t = o.data,
          a = o.data;
        if (1 == R) {
          t = void 0 === t ? "undefined" : _typeof(t);
          var e = app.OpenId;
          "string" != t ? app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
              openid: e,
              money: i,
              order_id: a
            },
            success: function(o) {
              wx.requestPayment({
                timeStamp: o.data.timeStamp,
                nonceStr: o.data.nonceStr,
                package: o.data.package,
                signType: o.data.signType,
                paySign: o.data.paySign,
                success: function(o) {
                  //console.log("支付成功"), 
                  // console.log(o),
                  setTimeout(function() {
                    wx.redirectTo({
                      url: "../order/order?activeIndex=0&index=0"
                    });
                  }, 300)
                  var e = wx.getStorageSync("userInfo").openid;
                  // console.log(n),
                  //console.log(e), console.log(t),
                  wx.hideLoading(), app.util.request({
                    url: "entry/wxapp/Message",
                    cachetime: "0",
                    data: {
                      form_id: n,
                      openid: e,
                      order_id: a
                    },
                    success: function(o) {
                      //  console.log("发送模板消息"), 
                      //  console.log(o);
                    }
                  });
                },
                fail: function(o) {
                  //console.log("支付失败"),
                  wx.showToast({
                    title: "支付失败"
                  }), wx.redirectTo({
                    url: "../order/order?activeIndex=1&index=1"
                  });
                }
              });
            }
          }) : wx.showModal({
            content: o.data
          });
        } else if (2 == R) {
          t = void 0 === t ? "undefined" : _typeof(t);
          e = app.OpenId;
          "string" != t ? app.util.request({
            url: "entry/wxapp/YePay",
            cachetime: "0",
            data: {
              order_id: a
            },
            success: function(o) {
              wx.hideLoading(), wx.showToast({
                  title: "支付成功"
                }),
                setTimeout(function() {
                  wx.redirectTo({
                    url: "../order/order?activeIndex=0&index=0"
                  });
                }, 1500);
              var e = wx.getStorageSync("userInfo").openid;
              app.util.request({
                url: "entry/wxapp/Message",
                cachetime: "0",
                data: {
                  form_id: n,
                  openid: e,
                  order_id: a
                },
                success: function(o) {
                  // console.log("发送模板消息"),
                  //  console.log(o);
                }
              });
            }
          }) : wx.showModal({
            content: o.data
          });
        } else 3 == R && (wx.hideLoading(), wx.showToast({
          title: "订单提交成功"
        }), setTimeout(function() {
          wx.redirectTo({
            url: "../order/order?activeIndex=0&index=0"
          });
        }, 1500));
      }
    }));
  },
  onReady: function() {},
  onShow: function() {
    this.userinfo(), -1 != this.data.coupons_id ? this.cost() : "" == this.data.coupons_id && this.cost(),
      0 != this.data.red_bag && this.cost();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});