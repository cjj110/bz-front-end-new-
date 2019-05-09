import * as echarts from '../ec-canvas/echarts';

const app = getApp();


let chart = null; //拿出来作为全局变量
var XList = [];
var YList = [];

var option = {
  // color: ["#f1f1f1", "#ec6464", "#ec6464"],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#f1f1f1'
      },
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    containLabel: true,
    x: 0,
    x2: 20,
    y: 20,
    y2: 20,
  },
  xAxis: {
    splitLine: {
      show: false
    },
    //去除网格线
    type: 'category',
    splitArea: {
      show: true,
      areaStyle: {
        color: [
          '#f6f7f9',
        ]
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#ec6464'
      }
    },
    //设置轴线的属性
    axisLine: {
      lineStyle: {
        color: '#f6f7f9',
      }
    },
    boundaryGap: true,
    data: XList,
  },
  yAxis: {
    x: 'center',
    type: 'value',
    //设置轴线的属性
    axisLine: {
      lineStyle: {
        color: '#f6f7f9',
      }
    },
  },
  series: [{
    show: true,
    type: 'line',
    smooth: false,
    itemStyle: {
      normal: {
        lineStyle: { // 系列级个性化折线样式  
          width: '1',
          type: 'solid',
          color: "#ec6464"
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#ec6464'
          }
        }
      },
    },
    data: YList,
    clickable: false,
  }]
};

function initChart(canvas, width, height, ) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  console.log(option)
  var option1 = option;
  chart.setOption(option1);
  return chart;
}
Page({
  onShareAppMessage: function(res) {
    return {
      title: '',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  index() {
    wx.redirectTo({
      url: '/zh_jdgjb/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function() {
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    var id = wx.getStorageSync("userInfo").id
    console.log(id)
    app.util.request({
      url: "entry/wxapp/GetWallets",
      data: {
        user_id: wx.getStorageSync("userInfo").id
      },
      success: function(res) {
        console.log(res);
        // jiabei
        var jiabei = res.data.jiabei;
        console.log("88")
        for (var i = jiabei.length - 1; i >= 0; i--) {
          console.log("99")
          var json = {
            'day': [jiabei[i].day]
          }
          var jsons = {
            'd_score': [jiabei[i].d_score]
          }

          XList.push(json.day[0]);
          YList.push(jsons.d_score[0]);
          console.log(XList)
          console.log(YList)
        }

        // var arr_nb = [];   //先定义空数组;
        // for (var j = 0; j < jiabei.length; j++) {
        //   var jsons = {
        //     'd_score': [jiabei[j].d_score]
        //   }
        //   YList.push(jsons.d_score[0]);
        // }

        setTimeout(function() {
          // console.log(XList);
          chart.setOption(option); //赋值后再设置一次option
        }, 1000);

        XList = [];
        YList = [];

        page.setData({
          user: res.data.user,
        })


      },
      complete: function(res) {
        wx.hideLoading();
      },
    });
  },

  profit_cz: function(e) {
    wx.navigateTo({
      url: '../profit_cz/profit_cz',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  profit_transfer: function(e) {
    wx.navigateTo({
      url: '../profit_transfer/profit_transfer',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onReady() {},


});