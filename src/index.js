import './less/index.less';
import dataJson from './data.json';
var mapChart = null;
window.onload = function () {
  // 地图
  var container = document.getElementById('chart-map');
  loadMapChart(container, dataJson.data.dots, dataJson.data.shine_dots);
  setTimeout(() => {
    var insertDots = [
      {
      "name": "赤峰",
      "value": [118.87, 42.28, 100]
      },
      {
        "name": "上海",
        "value": [121.48,31.22, 100]
      }
    ];
    var insertShineDots = [
      {
        "name": "南京",
        "value": [118.78, 32.04, 200]
      }
    ];
    dynamicLoadMapChart(insertDots, insertShineDots);
  }, 2000);
  window.onresize = function () {
    var resizeTimer = '';
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var windowWidth = window.innerWidth || document.documentElement.clientWidth;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      container.style.width = windowWidth + 'px';
      container.style.height = windowHeight + 'px';
      mapChart.resize();
    }, 500);
  }
}
function dynamicLoadMapChart(data, dataShine) {
  mapChart.appendData(
    {
      seriesIndex: 1,
      data: data
    }
  );
  mapChart.appendData({
    seriesIndex: 2,
    data: dataShine
  });
}
function loadMapChart(container, data, dataShine) {
  // 基于准备好的dom，初始化echarts实例
  // echarts.registerMap('zhongguo', zhongguoJson);
  mapChart = echarts.init(container);
  var option = {
    backgroundColor: {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [{
        offset: 0, color: '#0f2c70' // 0% 处的颜色
      }, {
        offset: 1, color: '#091732' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    geo: {
      zoom: 0.6,
      map: 'china',
      show: true,
      roam: false,
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#091632',
          borderColor: '#1773c3',
          shadowColor: '#1773c3',
          shadowBlur: 20
        }
      }
    },
    series: [
      {
        zoom: 0.6,
        type: 'map',
        map: 'china',
        geoIndex: 1,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: true, // 存在legend时显示
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077',
            borderWidth: 1
          },
          emphasis: {
            areaColor: '#0f2c70'
          }
        }
      },
      {
        name: '不发光',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data,
        symbolSize: function (val) {
          return val[2] / 20;
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        }
      },
      {
        name: '发光',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: dataShine,
        symbolSize: function (val) {
          return val[2] / 20;
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  mapChart.setOption(option);
}