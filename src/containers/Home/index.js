import React, { Component } from 'react';
import FullScreen from 'utils/fullscreen.js';
import ChinaMap from './ChinaMap';

export default class Home extends Component {
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
        <ChinaMap/>
      </div>
    )
  }
}
