import React, { Component } from "react"
import "./index.less"
import $ from "jquery"
import { message } from 'antd';
class LoginPage extends Component{
    constructor(){
        super();
    }
    loginIn = ()=>{
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let url = "/core/comp/user.do?login";
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: {
                "username": username,
                "password": password,
                "rand": Math.random()
            },
            success: function (json) {
                if(json.result==3){
                    let firstActionUrlPath = json.data.firstActionUrl;
                    let cookieString = "firstUrl" + "=" + escape(firstActionUrlPath);
                    document.cookie = cookieString;
                    message.success(json.message);
                    let url = window.location.origin + window.location.pathname + "#/module/"
                    window.location.href = url;
                }else{
                    message.error(json.message);
                }
                
            }
        });		
    }
    render(){
        return (<div className="loginPage"><ul className="login-list">
            <li>
                <input ref="username" type="text" className="text-bar" />
            </li>
            <li>
                <input ref="password" type="password" className="text-bar" />
            </li>
            <li>
                <button className="login-in" onClick={this.loginIn}>登录</button>
            </li>
        </ul></div>)
    }
}

export default LoginPage