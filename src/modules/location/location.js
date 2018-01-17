import React, { Component } from "react";
import ReactDOM from 'react-dom';

import { Header, Left, Content } from "./../../components/common";

class LocationPage extends Component {
    render() {
        return (
            <div className="App">
                <Header title="定位"/>
                <Left />
                <Content>
                    <div>定位页面</div>
                </Content>
            </div>
        );
    }
}
export default LocationPage