import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChinaMap extends Component {
  static propTypes = {
    dots: PropTypes.array,
    shineDots: PropTypes.array
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      mapChart: null,
      mapContainer: null
    }
  }
  componentDidMount = () => {
    const {dosts, shineDots} = this.props;
    // 渲染地图
    this.setState({
      mapContainer: document.getElementById('chart-map')
    }, () => {
      this.loadMapChart(this.state.mapContainer, dosts, shineDots);
    });
    // 自适应宽高
    window.onresize = this.resizeMapChart;
    // 测试片断加载
    this.testSnippetLoadMapChart();
  }
  // 加载地图
  loadMapChart = (container, data, dataShine) => {
    // 基于准备好的dom，初始化echarts实例
    // echarts.registerMap('zhongguo', zhongguoJson);
    const mapChart = echarts.init(container); // eslint-disable-line
    const option = {
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
    }
    // 使用刚指定的配置项和数据显示图表。
    mapChart.setOption(option);
    
    this.setState({
      mapChart
    });
  }
  // 片断加载
  snippetLoadMapChart = (data, dataShine) => {
    const {mapChart} = this.state;
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
  // 测试片断加载
  testSnippetLoadMapChart = () => {
    setTimeout(() => {
      var insertDots = [
        {
          "name": "赤峰",
          "value": [118.87, 42.28, 100]
        },
        {
          "name": "上海",
          "value": [121.48, 31.22, 100]
        }
      ];
      var insertShineDots = [
        {
          "name": "南京",
          "value": [118.78, 32.04, 200]
        }
      ];
      this.snippetLoadMapChart(insertDots, insertShineDots);
    }, 2000);
  }
  // 自适应宽高
  resizeMapChart = () => {
    const {mapContainer, mapChart} = this.state;
    var resizeTimer = '';
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var windowWidth = window.innerWidth || document.documentElement.clientWidth;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      mapContainer.style.width = windowWidth + 'px';
      mapContainer.style.height = windowHeight + 'px';
      mapChart.resize();
    }, 500);
  }
  render() {
    return (
      <div id="chart-map"></div>
    )
  }
}
