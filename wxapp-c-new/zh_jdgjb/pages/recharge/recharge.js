var app = getApp();

Page({
    data: {
        msgList: [ {
            url: "url",
            title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代"
        }, {
            url: "url",
            title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱"
        }, {
            url: "url",
            title: "公告：你想和一群有志青年一起过生日嘛？"
        } ]
    },
    onLoad: function(t) {
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        }), app.getUserInfo(function(t) {
            console.log(t), a.setData({
                userInfo: t,
                color: wx.getStorageSync("platform").color
            });
        }), app.util.request({
            url: "entry/wxapp/attachurl",
            cachetime: "0",
            success: function(t) {
                console.log(t), wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/getad",
            cachetime: "0",
            data: {
                type: 3
            },
            success: function(t) {
                console.log(t);
                a.data.rande;
                0 < t.data.length && a.setData({
                    getad: t.data,
                    bomb: !0
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Czhd",
            cachetime: "0",
            success: function(t) {
                console.log("平台充值活动"), console.log(t), a.setData({
                    Czhd: t.data
                });
            }
        });
    },
    money: function(t) {
        this.setData({
            money: t.detail.value
        });
    },
    chongzhi: function(t) {
        var e = this.data.money, a = "";
        if (null != e && 0 != e || (a = "请输入充值金额"), "" != a) wx.showModal({
            content: a
        }); else {
            var n = this.data.Czhd, o = [];
            for (var u in n) e >= Number(n[u].full) && o.push(Number(n[u].full));
            if (console.log(o), 0 < o.length) {
                var c = app.max(o);
                for (var r in n) if (c == n[r].full) var l = n[r].reduction;
            } else l = 0;
            var i = wx.getStorageSync("userInfo").id, s = app.OpenId;
            app.util.request({
                url: "entry/wxapp/SaveRecharge",
                data: {
                    user_id: i,
                    cz_money: e,
                    zs_money: l
                },
                success: function(t) {
                    var a = t.data;
                    app.util.request({
                        url: "entry/wxapp/Pay2",
                        cachetime: "0",
                        data: {
                            openid: s,
                            money: e,
                            cz_id: a
                        },
                        success: function(t) {
                            wx.requestPayment({
                                timeStamp: t.data.timeStamp,
                                nonceStr: t.data.nonceStr,
                                package: t.data.package,
                                signType: t.data.signType,
                                paySign: t.data.paySign,
                                success: function(t) {
                                    wx.showToast({
                                        title: "支付成功"
                                    }), setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1500);
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    jilu: function(t) {
        wx.navigateTo({
            url: "jilu"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});