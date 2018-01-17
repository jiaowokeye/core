import React, { Component } from "react";
import "./../scss/common.scss"
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="header">
            <div className="sysName">{this.props.title}</div>
        </div>)
    }
}
Header.defaultProps = {
    title: "财富"
}

class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="content">{this.props.value}</div>
    }
}
class Left extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "selectOne": this.props.selectOne,
            "selectSub": this.props.selectSub
        }
    }
    render() {
        return (<div className="left">
            {
                this.props.listData.map((ele, i) => {
                    return (<div>
                        <p key={i}>{ele.value}</p>
                        <LeftSub list={ele.children} />
                    </div>)
                })
            }
        </div>)
    }
}
Left.defaultProps = {
    listData: [
        {
            "value": "帮助",
            "children": [
                { "value": "获取帮助", "link": "/help" },
                { "value": "提供帮助", "link": "/help" }
            ]
        },
        {
            "value": "订单",
            "children": [
                { "value": "订单列表", "link": "/order" },
                { "value": "订单内容", "link": "/order" }
            ]
        },
        {
            "value": "用户管理",
            "children": [
                { "value": "解封用户", "link": "/user" },
                { "value": "激活用户", "link": "/user" },
                { "value": "开户", "link": "/user" }
            ]
        }
    ],
    selectOne: 0,
    selectOne: 0
}
const ACTIVE = "{ color: 'red' }";
class LeftSub extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (<div>
            {
                this.props.list.map((e, i) => {
                    return (<p>
                        <Link to={e.link} activeStyle={ACTIVE}>{e.value}</Link>
                    </p>)
                })
            }
        </div>)
    }
}
LeftSub.defaultProps = {
    list: []
}
export { Header, Left, Content } 