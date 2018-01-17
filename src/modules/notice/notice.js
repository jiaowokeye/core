import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import { Header, Left, Content } from "./../../components/common";
import { Input } from 'antd';
import { Table, Icon, Divider } from 'antd';
import { Pagination } from 'antd';
import { Modal, Button } from 'antd';
import moment from 'moment';
import "./../../scss/notice.scss";
import noticeDataObj from "./noticeData";
const { Column, ColumnGroup } = Table;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;
// import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class NoticePage extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div className="App">
                <Header title="公告"/>
                <Left />
                <Content>
                    <Page />
                </Content>
            </div>
        );
    }
}

class Page extends Component{
    constructor(){
        super();
        this.state = {
            "searchValue": "",
            "startDate": "2018-01-01",
            "endDate": "2018-01-17"
        }
    }
    searchValueChange(ev){
        var ev = ev||window.event;
        this.setState({
            "searchValue": ev.target.value
        });
    }
    dateChange(date, dateString) {
        this.setState({
            "startDate": dateString[0],
            "endDate": dateString[1],
        });
    }
    //初始化nav选项
    initClear(){
        this.setState({
            "searchValue": "",
            "startDate": "2018-01-01",
            "endDate": "2018-01-17",
            "ModalText": 'Content of the modal',
            "visible": false,
            "confirmLoading": false,
        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    render(){
        return(<div>
            <div className="nav">
                <Input className="searchInput" placeholder="请输入标题关键字" value={this.state.searchValue} onChange={this.searchValueChange.bind(this)}/>
                <RangePicker onChange={this.dateChange.bind(this)} value={[moment(this.state.startDate, "YYYY-MM-DD"), moment(this.state.endDate, "YYYY-MM-DD")]} />
                <Button className="btn" type="primary">查找</Button>
                <Button className="btn" onClick={this.initClear.bind(this)} type="primary">全部</Button>
                <Button className="sendNotice" onClick={this.showModal.bind(this)} type="default" icon="edit">发公告</Button>
            </div>
            <div>{"要搜索的关键字是" + this.state.searchValue}{"    日期区间为" + this.state.startDate + " 到 " + this.state.endDate}</div>
            <NoticeList />
            <Modal title="发公告"
                visible={this.state.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
            >
                <SendNoticeContent/>
            </Modal>
        </div>)
    }
}

class SendNoticeContent extends Component{
    constructor(){
        super();
        this.state = {
            "title":"",
            "content":""
        }
    }
    titleChange = (ev)=>{
        var ev = ev||window.event;
        this.setState({
            "title":ev.target.value,

        })
    }
    contentChange = (ev) => {
        var ev = ev || window.event;
        this.setState({
            "content": ev.target.value,

        })
    }
    render(){
        return (<div className="sendNotice">
            <Input className="noticeTitle" placeholder="公告标题" value={this.state.title} onChange={this.titleChange} />
            <TextArea  className="noticeContent" placeholder="公告内容" value={this.state.content} onChange={this.contentChange} />
        </div>)
    }
}

class NoticeList extends Component{
    constructor(){
        super();
        this.state = {
            "list": noticeDataObj.listData,
            "current":1
        }
    }
    onChange (page){
        this.setState({
            current: page,
        });
    }
    render(){
        return (<div>
            <Table dataSource={this.state.list}>
                <Column title="Name"
                    title="公告名称"
                    dataIndex="title"
                    key="title"
                />
                <Column
                    title="发布者"
                    dataIndex="username"
                    key="username"
                />
                <Column
                    title="发布时间"
                    dataIndex="notice_date"
                    key="notice_date"
                />
                <Column
                    title="接收人"
                    key="isread"
                    render={(text, record) => (
                        <span>
                            <a href="#">查看</a>
                            <Divider type="vertical" />
                        </span>
                    )}
                />
                <Column
                    title="操作"
                    key="user_id"
                    render={(text, record) => (
                        <span>
                            <a href="#"><Icon type="to-top" /></a>
                            <a className="marginL" href="#"><Icon type="delete" /></a>
                        </span>
                    )}
                />
            </Table>
        </div>)
    }
}


export default NoticePage