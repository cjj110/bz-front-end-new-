var app = getApp();

Page({
    data: {
        page: 1,
        unreceive: []
    },
    onLoad: function(e) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        }), this.reload(), this.setData({
            color: wx.getStorageSync("platform").color
        });
    },
    reload: function(e) {
        var a = this, o = a.data.page, n = a.data.unreceive, t = wx.getStorageSync("userInfo").id;
        t = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/GetSponsorCoupon",
            cachetime: "0",
            data: {
                page: o,
                user_id: t
            },
            success: function(e) {
                if (console.log(e), 0 < e.data.length) {
                    for (var t in a.setData({
                        page: o + 1
                    }), n = n.concat(e.data), e.data) e.data[t].end_time = e.data[t].end_time.slice(0, 10), 
                    e.data[t].start_time = e.data[t].start_time.slice(0, 10), e.data[t].cost = Number(e.data[t].cost).toFixed(0);
                    a.setData({
                        unreceive: n
                    });
                }
            }
        });
    },
    receive: function(e) {
        console.log(e);
        var t = this, a = e.currentTarget.id;
        console.log(a);
        var o = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/ReceiveCoupons",
            cachetime: "0",
            data: {
                user_id: o,
                coupons_id: a
            },
            success: function(e) {
                console.log("领取优惠券"), console.log(e), 1 != e.data ? wx.showToast({
                    mask: !0,
                    title: e.data
                }) : (t.setData({
                    page: 1,
                    unreceive: []
                }), t.reload(), wx.showToast({
                    title: "领取成功"
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            unreceive: []
        }), this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.reload();
    },
    onShareAppMessage: function() {}
});