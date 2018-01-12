import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route , Link , Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

// 自定义组件
//加载个首页吧
import IndexPage from "./index/index"

// 帮助模块
import ProviideHelp from "./help/provideHelp";

//订单模块

import OrderList from "./order/orderList";

//用户模块

import UserInfo from "./user/userInfo";

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/user" component={UserInfo} />
            <Route path="/order" component={OrderList} />
            <Route path="/help" component={ProviideHelp} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
