import React, { Component } from 'react'
import { Spin } from 'antd';
import { PageLoading } from "./common";
export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props)

            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent()

            this.setState({
                component: component
            })
        }

        render() {
            const C = this.state.component

            return C ? <C {...this.props} /> : <PageLoading ><Spin size="large" /><br />内容正在加载，请稍后...</PageLoading>
        }
    }

    return AsyncComponent
}