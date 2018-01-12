import React, { Component } from 'react';
import {Header,Left,Content} from "./../components/common";

class ProviideHelp extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Left />
        <Content value="这是提供帮助页">{this.props.value}</Content>
      </div>
    );
  }
}

export default ProviideHelp;
