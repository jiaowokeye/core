import React from 'react';
import ReactDOM from "react-dom";
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import App from "./app";
//设置日期控件为中文
moment.locale('zh-cn');

const render = ()=>ReactDOM.render((
        <App />
    ), document.getElementById('root')
)
render();
registerServiceWorker();
