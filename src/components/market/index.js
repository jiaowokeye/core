import React, { Component } from "react";
import { Tabs } from 'antd';
import { DatePicker, Button, Spin, Row, Col, Table, Icon, Modal } from 'antd';
import MockObj from "./mockData";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
const TabPane = Tabs.TabPane;
const { Column, ColumnGroup } = Table;
function callback(key) {
    console.log(key);
}

class MarketPage extends Component {

    render() {
        return (<div>
            <Tabs defaultActiveKey="1" onChange={callback} size="small">
                <TabPane tab="上报" key="1"><Reported /></TabPane>
                <TabPane tab="对手" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="动向" key="3">Content of Tab Pane 3</TabPane>
                <TabPane tab="传播" key="4"><Spread /></TabPane>
            </Tabs>
        </div>)
    }
}

//上报tab
class Reported extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "loading": true,
            "date": ""
        };
    }
    dataChange = (date, dateString) => {
        console.log(date, dateString);
        this.setState({
            "date": dateString
        })
    }
    changeLoading = () => {
        this.setState({
            "loading": true
        })
        setTimeout(() => {
            this.setState({
                "loading": false
            })
        }, 1000);
    }
    render() {
        return (<div>
            <Row>
                <Col span={20}>
                    <label>上报时间：</label>
                    <DatePicker onChange={this.dataChange} />
                    <Button className="btn" type="primary">上报人</Button>
                    <Button className="btn" type="primary">涉及客户</Button>
                    <Button className="btn" type="primary">涉及对手</Button>
                    <Button onClick={this.changeLoading} className="btn" type="primary">搜索</Button>
                    <Button onClick={this.changeLoading} className="btn" type="primary">全部</Button>
                </Col>
                <Col span={4} align="right">
                    <Button className="btn" type="primary" style={{ "marginRight": "10px" }}>新建</Button>
                </Col>
            </Row>
            <UploadList loading={this.state.loading} changeLoading={this.changeLoading} />
        </div>)
    }
}
// 上报列表
class UploadList extends Component {
    constructor(props) {
        super(props);
        this.props.changeLoading();
    }
    render() {
        if (this.props.loading) {
            return (<div style={{ "textAlign": "center", "paddingTop": "100px" }}>
                <Spin size="large" />
            </div>)
        } else {
            return (<div style={{ "textAlign": "center", "paddingTop": "15px" }}>
                <Table dataSource={this.props.list}>
                    <Column
                        title="标题"
                        dataIndex="title"
                        key="title"
                    />
                    <Column
                        title="上报人"
                        dataIndex="user.name"
                        key="user.name"
                    />
                    <Column
                        title="上报人部门"
                        dataIndex="user.groupsname"
                        key="user.groupsname"
                    />
                    <Column
                        title="上报时间"
                        dataIndex="create_date"
                        key="create_date"
                    />
                    <Column
                        title="涉及地区"
                        dataIndex="provinceName"
                        key="provinceName"
                    />
                    <Column
                        title="互动数"
                        dataIndex="replyCount"
                        key="replyCount"
                    />
                    <Column
                        title="操作"
                        key="up_id"
                        render={(text, record) => (
                            <span>
                                <a href="#"><Icon type="edit" /></a>
                            </span>
                        )}
                    />
                </Table>
            </div>)
        }

    }
}
UploadList.defaultProps = {
    "list": MockObj.uploadList
}


//传播
class Spread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "loading": true,
            "visible": false
        };
    }
    changeLoading = () => {
        this.setState({
            "loading": true
        })
        setTimeout(() => {
            this.setState({
                "loading": false
            })
        }, 1000);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        return (<div style={{ "paddingRight": "15px" }}>
            <Row>
                <Col span={24} align="right">
                    <Button onClick={this.showModal} className="btn" type="primary">创建文章</Button>
                </Col>
            </Row>
            <ArticleList loading={this.state.loading} changeLoading={this.changeLoading} />
            <Modal
                title="创建文章"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
                width={900}
                maskClosable={false}
                style={{ "top": "10px" }}
                mask={false}
                zIndex={4}
            >
                <RichEdit />
            </Modal>
        </div>)
    }
}


//文章列表
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.props.changeLoading();
    }
    render() {
        if (this.props.loading) {
            return (<div style={{ "textAlign": "center", "paddingTop": "100px" }}>
                <Spin size="large" />
            </div>)
        } else {
            return (<div style={{ "textAlign": "center", "paddingTop": "15px" }}>
                <Table dataSource={this.props.list}>
                    <Column
                        title="标题"
                        dataIndex="title"
                        key="title"
                    />
                    <Column
                        title="创建时间"
                        dataIndex="create_date"
                        key="create_date"
                    />
                    <Column
                        title="创建人"
                        dataIndex="user_name"
                        key="user_name"
                    />
                    <Column
                        title="分享朋友"
                        dataIndex="share_1_count"
                        key="share_1_count"
                    />
                    <Column
                        title="分享朋友圈"
                        dataIndex="share_2_count"
                        key="share_2_count"
                    />
                    <Column
                        title="分享微博"
                        dataIndex="share_3_count"
                        key="share_3_count"
                    />
                    <Column
                        title="操作"
                        key="up_id"
                        render={(text, record) => (
                            <span>
                                <a href="#"><Icon type="edit" /></a>
                            </span>
                        )}
                    />
                </Table>
            </div>)
        }

    }
}
ArticleList.defaultProps = {
    "list": MockObj.articleList
}

//富文本
class RichEdit extends React.Component {

    state = {
        htmlContent: ''
    }
    render() {
        const editorProps = {
            placeholder: 'Hello World!',
            initialContent: '',
            onHTMLChange: this.handleHTMLChange,
            viewWrapper: '.demo',
            // 增加自定义预览按钮
            extendControls: [
                {
                    type: 'split',
                },
                {
                    type: 'button',
                    text: '预览',
                    className: 'preview-button',
                    onClick: () => {
                        window.open().document.write(this.state.htmlContent)
                    }
                }, {
                    type: 'dropdown',
                    text: <span>下拉菜单</span>,
                    component: <h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1>
                }, {
                    type: 'modal',
                    text: <span style={{ paddingRight: 10, paddingLeft: 10 }}>弹出菜单</span>,
                    className: 'modal-button',
                    modal: {
                        title: '这是一个弹出框',
                        showClose: true,
                        showCancel: true,
                        showConfirm: true,
                        confirmable: true,
                        onConfirm: () => console.log(1),
                        onCancel: () => console.log(2),
                        onClose: () => console.log(3),
                        children: (
                            <div style={{ width: 480, height: 320, padding: 30 }}>
                                <span>Hello World！</span>
                            </div>
                        )
                    }
                }
            ]
        }

        return (
            <div className="demo">
                <BraftEditor {...editorProps} />
            </div>
        )


        return (
            <div className="demo">
                <BraftEditor {...editorProps} />
            </div>
        )

    }

    handleHTMLChange = (htmlContent) => {
        this.setState({ htmlContent })
    }

}

export default MarketPage;