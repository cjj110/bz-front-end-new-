import * as echarts from '../ec-canvas/echarts';

const app = getApp();

let chart = null; //拿出来作为全局变量
var XList = [];
var YList = [];

var option = {
  color: ["#ffffff", "#ffffff", "#ffffff"],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
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
          '#febfb9',
        ]
      },
    },
    //保留网格区域
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
    boundaryGap: ["10%", "10%", "1%"],
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
          color: "#fff"
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'white'
          }
        }

      },
    },
    data: YList,
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

  },
  data: {
    ec: {
      onInit: initChart
    },
  },

  onReady() {},
  onLoad: function() {
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });

    app.util.request({
      url: "entry/wxapp/WaScoreLog",
      data: {
        user_id: wx.getStorageSync("userInfo").id
      },
      success: function(res) {
        console.log(res);
        // jiabei
        var jiabei = res.data.jiabei;
        // var arr = [];   //先定义空数组;
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


        setTimeout(function() {
          chart.setOption(option);
        }, 10);
        XList = [];
        YList = [];
        page.setData({
          user: res.data.user,
          mylog: res.data.mylog,
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });

  },



  go() {
    wx.redirectTo({
      url: '../../zh_jdgjb/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


});