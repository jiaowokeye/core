import React, { Component } from 'react';
import {Header,Left,Content} from "./../components/common";

class OrderList extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Left />
        <Content value="这是订单页">{this.props.value}</Content>
      </div>
    );
  }
}

export default OrderList;
