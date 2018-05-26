import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullScreen from 'utils/fullscreen.js';
// 数据
import dataJson from './data.json';
import ChinaMap from './ChinaMap';

export default class Home extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
    // 进入和退出全屏
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        FullScreen.toggle();
      }
    }, false);
  }
  render() {
    return (
      <div>
        {dataJson.data && <ChinaMap dots={dataJson.data.dots} shineDots={dataJson.data.shine_dots}/>}
      </div>
    )
  }
}
