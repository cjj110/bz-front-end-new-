var app = getApp();

Page({
    data: {
        page: 1,
        statistics: []
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        }), this.refresh();
    },
    refresh: function(t) {
        var o = this, n = o.data.statistics, e = o.data.page, a = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/Yjlist",
            data: {
                user_id: a,
                page: e
            },
            success: function(t) {
                if (console.log(t), 0 < t.data.length) {
                    for (var a in n = n.concat(t.data), t.data) t.data[a].time = app.ormatDate(t.data[a].time);
                    o.setData({
                        statistics: n,
                        page: e + 1
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.refresh();
    }
});