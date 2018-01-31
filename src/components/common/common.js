import React, { Component } from "react"
import "./common.scss"
import logo from "./../../statics/images/logo.gif"
import mores from "./../../statics/images/mores.png"
import GlobalConfig from "./../../config/globla"
import {Link} from "react-router-dom"
//头部
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
    title: "首页"
}

//内容区域
class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="content">{this.props.children}</div>
    }
}
//左侧
class Left extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "showAllModule": false
        }
    }
    toggleShowAllModule(){
        this.setState({
            "showAllModule": !this.state.showAllModule
        })
    }
    render() {
        return (<div className="left">
            <img src={logo} className="logo" />
            <Collected collected={this.props.collected} toggleShowAllModule={this.toggleShowAllModule.bind(this)} />
            <AllModule showAllModule={this.state.showAllModule} toggleShowAllModule={this.toggleShowAllModule} />
        </div>)
    }
}
Left.defaultProps = {
    collected: GlobalConfig.collected
}

class Collected extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="collected">
                {
                    this.props.collected.map((e, i) => {
                        return (<li key={i}>
                            <Link key={"link" + i} to={e.link} >
                                <img key={"img" + i} className="collectedImg" src={GlobalConfig.bashUrl + "images/" + e.imgRrl} />
                                <p key={"p" + i} className="moduleName">{e.name}</p>
                            </Link>
                        </li>)
                    })
                }
                <li onClick={this.props.toggleShowAllModule}>
                    <img className="collectedImg" src={mores} />
                    <p className="moduleName">更多模块</p>
                </li>
            </ul>
        )
    }
}

class AllModule extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var className = this.props.showAllModule ? "allModule" : "allModule none";
        return (<div id="allModule" className={className} >
            <p className="myAllmodule">我的所有模块：</p>
            <ul id="choose_ul" className="choose_ul">
                {
                    this.props.allModuleData.map(function (e, i) {
                        return (<li key={i}>
                            <Link key={"link" + i} to={e.link ?e.link : ""}>
                                <img key={"img" + i} src={GlobalConfig.bashUrl + "images/" + e.imgUrl} />
                                <p key={"p" + i}>{e.iconName}</p>
                            </Link>
                        </li>)
                    })
                }

            </ul>
        </div>)
    }
}
AllModule.defaultProps = {
    allModuleData: GlobalConfig.allModuleData,
    showAllModule: false
}
class PageLoading extends Component {
    render() {
        return (<div className="pageLoading">
            {this.props.children}
        </div>)
    }
}


const ACTIVE = "{ color: 'red' }";


export { Header, Left, Content, PageLoading } 