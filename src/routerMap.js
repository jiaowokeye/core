import React, { Component } from 'react'
import { Route, HashRouter, Switch} from 'react-router-dom'
import asyncComponent from './components/common/AsyncComponent'
import { createStore } from 'redux'

import { Header, Content, Left } from "./components/common/common";

// const commondata = document.getElementById("data").value
const NotMatch = asyncComponent(() => import("./components/nofind/404.js"))

//登录
const LoginPage = asyncComponent(() => import('./components/login/index'))
//公告
const NoticePage = asyncComponent(() => import('./components/notice/index'))
//定位
const LocationPage = asyncComponent(() => import('./components/location/index'))
//考勤
const ClockPage = asyncComponent(() => import('./components/clock/index'))
//市场
const MarketPage = asyncComponent(() => import("./components/market/index"))


class Module extends Component{
    render(){
        return <HashRouter basename='/module/'>
            <div>
                <Header />
                <Left />
                <Content>
                    <Switch>
                        <Route exact path='/notice' component={NoticePage} />
                        <Route exact path='/location' component={LocationPage} />
                        <Route exact path='/clock' component={ClockPage} />
                        <Route exact path='/market' component={MarketPage} />
                    </Switch>
                </Content>
            </div>
        </HashRouter>
    }
}

class LoginRoute extends Component{
    render(){
        return <HashRouter basename='/login'>
            <Switch>
                <Route exact path='/' component={LoginPage} />
            </Switch>
        </HashRouter>
    }
}

class RouteMain extends Component {
    render() {
        return (<div>
            <HashRouter>
                <Switch>
                    <Route path='/module' component={Module} />
                    <Route path='/login' component={LoginRoute} />
                    <Route component={NotMatch}/>
                </Switch>
            </HashRouter>
        </div>)
    }
}
export default RouteMain;