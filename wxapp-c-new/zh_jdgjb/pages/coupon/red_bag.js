var app = getApp();

Page({
    data: {
        page: 1,
        red_bag: []
    },
    onLoad: function(a) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        });
        var e = wx.getStorageSync("userInfo").id;
        this.setData({
            user_id: e
        }), this.refresh();
    },
    refresh: function(a) {
        var t = this, e = t.data.user_id, o = t.data.page, n = t.data.red_bag;
        app.util.request({
            url: "entry/wxapp/MyHb",
            data: {
                user_id: e,
                page: o
            },
            success: function(a) {
                if (console.log(a), 0 < a.data.length) {
                    for (var e in n = n.concat(a.data), a.data) a.data[e].money = Number(a.data[e].money).toFixed(0);
                    t.setData({
                        red_bag: n,
                        page: o + 1
                    });
                }
            }
        });
    },
    receive_coupon: function(a) {
        console.log(a);
        var e = a.currentTarget.dataset.money, t = a.currentTarget.id, o = getCurrentPages();
        o[o.length - 1];
        o[o.length - 2].setData({
            red_bag: e,
            red_bag_id: t
        }), wx.navigateBack({
            delta: 1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            red_bag: [],
            page: 1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    }
});