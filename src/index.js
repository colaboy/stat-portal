import 'core-js/es6/map'; // 兼容es6的Map类
import 'core-js/es6/set'; // 兼容es6的Set类
// import 'raf/polyfill'; // 兼容requestAnimationFrame动画
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {Home} from 'containers';

window.addEventListener('load', function() {
  ReactDOM.render(
    <Home />,
    document.getElementById('root')
  )
}, false);
