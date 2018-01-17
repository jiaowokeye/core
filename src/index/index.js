import React, { Component } from 'react';
import {Header,Left,Content} from "./../components/common";

class IndexPage extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Left />
        <Content>
          <div>主页啊</div>
        </Content>
      </div>
    );
  }
}


export default IndexPage;
