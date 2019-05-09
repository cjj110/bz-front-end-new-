var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp();

Page({
    data: {
        time: "06:00",
        pay_num: 1
    },
    onLoad: function(t) {
        console.log(t), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        });
        var e = this, o = app.hours_time(app.util.time() + " " + e.data.time, t.rz_time);
        console.log(o), e.setData({
            color: wx.getStorageSync("platform").color,
            start: app.util.time(),
            end_time: o,
            form_d: t.form_d,
            room_id: t.room_id,
            hotel_id: t.hotel_id,
            end: app.util.addDate(app.util.time(), 28),
            cost: Number(t.cost).toFixed(2),
            system: wx.getStorageSync("platform"),
            rz_time: t.rz_time
        }), e.refresh();
    },
    refresh: function(t) {
        var e = this, o = e.data.room_id, a = e.data.hotel_id;
        app.util.request({
            url: "entry/wxapp/RoomDetails",
            cachetime: "0",
            data: {
                room_id: o
            },
            success: function(t) {
                e.setData({
                    room: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    hotel: t.data
                });
            }
        });
    },
    bindTimeChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value);
        var e = t.detail.value, o = this.data.start + " " + e, a = this.data.rz_time, i = app.hours_time(o, a);
        console.log(app.hours_time(o, a)), this.setData({
            time: t.detail.value,
            end_time: i
        });
    },
    formSubmit: function(t) {
        var e = this, o = e.data.form_d;
        var i = t.detail.formId, a = e.data.hotel, r = t.detail.value.code, n = e.data.room, d = e.data.cost, s = e.data.cost, l = (e.data.cost, 
        t.detail.value.name), c = t.detail.value.tel, u = e.data.time, p = e.data.end_time, m = a.id, f = n.id, _ = wx.getStorageSync("userInfo").id, y = a.name, g = a.address, h = a.coordinates, S = e.data.start + " " + u, w = p, x = (e.data.cost, 
        n.name), v = n.size, b = e.data.cost, D = n.logo, z = e.data.reduction_price, q = e.data.system, I = "";
        if ("" == l) I = "请填写入住人姓名"; else if ("" == c) I = "请填写联系电话"; else if ("" == r && 1 == q.is_sfz) I = "请填写您的身份证号"; else if (2 == q.is_sfz) r = "";
        var T = e.data.pay_num;
        "" != I ? (wx.showModal({
            title: "",
            content: I
        }), e.setData({
            pay_num: 1
        })) : "" == I && 1 == T && (e.setData({
            pay_num: 0
        }), app.util.request({
            url: "entry/wxapp/AddOrder",
            data: {
                name: l,
                tel: c,
                price: d,
                dd_time: u,
                seller_id: m,
                room_id: f,
                user_id: _,
                coupons_id: 0,
                seller_name: y,
                seller_address: g,
                coordinates: h,
                arrival_time: S,
                departure_time: w,
                num: 1,
                room_type: x,
                bed_type: v,
                days: 1,
                dis_cost: b,
                yj_cost: 0,
                yhq_cost: 0,
                total_cost: s,
                room_logo: D,
                yyzk_cost: z,
                hb_id: 0,
                hb_cost: 0,
                from_id: o,
                classify: 2,
                type: 1,
                code: r
            },
            success: function(t) {
                console.log("这是提交订单"), console.log(t);
                var e = t.data, o = t.data;
                e = void 0 === e ? "undefined" : _typeof(e);
                var a = app.OpenId;
                "string" != e ? app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: a,
                        money: s,
                        order_id: o
                    },
                    success: function(t) {
                        wx.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: t.data.signType,
                            paySign: t.data.paySign,
                            success: function(t) {
                                console.log("支付成功"), console.log(t), wx.redirectTo({
                                    url: "../order/order?activeIndex=0&index=0"
                                });
                                var e = wx.getStorageSync("userInfo").openid;
                                app.util.request({
                                    url: "entry/wxapp/Message",
                                    cachetime: "0",
                                    data: {
                                        form_id: i,
                                        openid: e,
                                        order_id: o
                                    },
                                    success: function(t) {
                                        console.log("发送模板消息"), console.log(t);
                                    }
                                });
                            },
                            fail: function(t) {
                                console.log("支付失败"), wx.showToast({
                                    title: "支付失败"
                                }), wx.redirectTo({
                                    url: "../order/order?activeIndex=1&index=1"
                                });
                            }
                        });
                    }
                }) : wx.showModal({
                    content: t.data
                });
            }
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});