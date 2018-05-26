import './less/index.less';
import jsonData from './data.json';

window.onload = function () {
  // 地图
  var container = document.getElementById('chart-map');
  var mapChart = initMapCharts(container);
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
function initMapCharts(container) {
  // 基于准备好的dom，初始化echarts实例
  // echarts.registerMap('zhongguo', zhongguoJson);
  var myChart = echarts.init(container);
  // 指定图表的配置项和数据
  var data = [
    {
      "name": "合肥",
      "value": [117.27, 31.86, 100]
    },
    {
      "name": "武汉",
      "value": [114.31, 30.52, 100]
    }
  ];
  var dataShine = [
    {
      "name": "大庆",
      "value": [125.03, 46.58, 200]
    }
  ];
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
  myChart.setOption(option);
  return myChart;
}