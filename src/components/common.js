import React, { Component } from "react";
import "./../scss/common.scss"
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import logo from "./../statics/images/logo.gif";
import mores from "./../statics/images/mores.png";
import GlobalConfig from "./../config/globla";
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
    title: "公告"
}

//页面主体
class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="content">{this.props.children}</div>
    }
}
//左侧菜单栏
class Left extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "showAllModule" : false
        }
    }
    toggleShowAllModule(){
        this.setState({
            "showAllModule": !this.state.showAllModule
        })
    }
    render() {
        return (<div className="left">
            <img src={logo} className="logo"/> 
            <Collected collected={this.props.collected} toggleShowAllModule={this.toggleShowAllModule.bind(this)} />
            <AllModule showAllModule={this.state.showAllModule} toggleShowAllModule={this.toggleShowAllModule.bind(this)}/>
        </div>)
    }
}
Left.defaultProps = {
    collected: GlobalConfig.collected
}

class Collected extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ul className="collected">
                {
                    this.props.collected.map((e, i) => {
                        return (<li key={i}>
                            <Link to={e.link} >
                            <img className="collectedImg" src={GlobalConfig.bashUrl + "images/" + e.imgRrl} />
                            <p className="moduleName">{e.name}</p>
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

class AllModule extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var className = this.props.showAllModule ? "allModule" :"allModule none";
        return (<div id="allModule" className={className} >
            <p className="myAllmodule">我的所有模块：</p>
            <ul id="choose_ul" className="choose_ul">
            {
                    this.props.allModuleData.map(function (e,i) { 
                        return (<li key={i}>
                            <Link to={e.link?e.link:""}>
                            <img src={GlobalConfig.bashUrl + "images/" + e.imgUrl}/>
                            <p>{e.iconName}</p>
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
    showAllModule:false
}
const ACTIVE = "{ color: 'red' }";


export { Header, Left, Content } 