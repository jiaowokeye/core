import React, { Component } from 'react';
import {Header,Left,Content} from "./../components/common";
class UserInfo extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Left />
        <Content value="这是用户信息页">{this.props.value}</Content>
      </div>
    );
  }
}

export default UserInfo;
