import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route , Link , Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
// 自定义组件
//加载个首页吧
import IndexPage from "./index/index"
//公告
import NoticePage from "./modules/notice/notice";
//定位
import LocationPage from "./modules/location/location";
//考勤
import ClockPage from "./modules/clock/clock";
//日期组件设置为中文
moment.locale('zh-cn');

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/notice" component={NoticePage} />
            <Route exact path="/location" component={LocationPage} />
            <Route exact path="/clock" component={ClockPage} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
