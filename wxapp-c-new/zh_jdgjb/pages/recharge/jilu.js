var app = getApp();

Page({
    data: {
        page: 1,
        score_detail: []
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        });
        var a = wx.getStorageSync("userInfo").id;
        this.setData({
            user_id: a
        }), this.refresh();
    },
    refresh: function(t) {
        var e = this, a = e.data.user_id, o = e.data.score_detail, n = e.data.page;
        app.util.request({
            url: "entry/wxapp/Yelist",
            data: {
                user_id: a,
                page: n
            },
            success: function(t) {
                if (console.log(t), 0 < t.data.length) {
                    for (var a in o = o.concat(t.data), t.data) t.data[a].time = app.ormatDate(t.data[a].time).slice(0, 16);
                    e.setData({
                        page: n + 1,
                        score_detail: o
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            score_detail: [],
            page: 1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    }
});