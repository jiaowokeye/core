import React, { Component } from "react"
import { DatePicker } from 'antd'
import { Input, Table, Icon, Modal, Button, Spin } from 'antd'
import moment from 'moment'
import "./notice.less"
import GroupUserTree  from "./../common/GroupUserTree";
import $ from "jquery";
const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
// import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class NoticePage extends Component {
    constructor() {
        super();
        this.state = {
            "showGroupUserTree":false,
        }
        
    }
    componentDidMount(){
        
    }
    showTree = ()=>{
        this.setState({
            "showGroupUserTree": true
        })
    }
    hideTree = ()=>{
        this.setState({
            "showGroupUserTree": false
        })
    }
    render() {
        console.log(this.props);
        return (
            <Page showTree = {this.showTree} hideTree = {this.hideTree} />
        );
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            "searchValue": "",
            "startDate": "2018-01-01",
            "endDate": "2018-01-17"
        }
    }
    showTree = ()=>{
        this.props.showTree();
    }
    hideTree = ()=>{
        this.props.hideTree();
    }
    searchValueChange(ev) {
        var ev = ev || window.event;
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
    initClear() {
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
    render() {
        return (<div>
            <div className="nav">
                <Input className="searchInput" placeholder="请输入标题关键字" value={this.state.searchValue} onChange={this.searchValueChange.bind(this)} />
                <RangePicker onChange={this.dateChange.bind(this)} value={[moment(this.state.startDate, "YYYY-MM-DD"), moment(this.state.endDate, "YYYY-MM-DD")]} />
                <Button className="btn" type="primary">查找</Button>
                <Button className="btn" onClick={this.initClear.bind(this)} type="primary">全部</Button>
                <Button className="btn" onClick={this.showTree.bind(this)} type="primary">显示人员树</Button>
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
                <SendNoticeContent />
            </Modal>
        </div>)
    }
}

class SendNoticeContent extends Component {
    constructor() {
        super();
        this.state = {
            "title": "",
            "content": ""
        }
    }
    titleChange = (ev) => {
        var ev = ev || window.event;
        this.setState({
            "title": ev.target.value,

        })
    }
    contentChange = (ev) => {
        var ev = ev || window.event;
        this.setState({
            "content": ev.target.value,

        })
    }
    render() {
        return (<div className="sendNotice">
            <Input className="noticeTitle" placeholder="公告标题" value={this.state.title} onChange={this.titleChange} />
            <TextArea className="noticeContent" placeholder="公告内容" value={this.state.content} onChange={this.contentChange} />
            <p>{"标题：" + this.state.title + "<br />内容:" + this.state.content}</p>
        </div>)
    }
}

class NoticeList extends Component {
    constructor() {
        super();
        this.state = {
            "list": [],
            "current": 1
        }
    }
    onChange(page) {
        this.setState({
            current: page,
        });
    }
    componentDidMount=()=>{
        let params = {
            rand: Math.random(),
            currentPage: 1,
            pageSize: 999,
            startdate:"",
            title:"",
            enddate:"",
            authid:-17,
            parentAuthId: 0,
            menuid: -17
        }
        $.post("/core/msg/notice.do?find", params,(json)=>{
            if(json.result==1){
                let list = json.data.list.paginationData;
                this.setState({
                    list:list
                })
            }
        });
    }
    render() {
        if(this.state.list.length==0){
            return <div>
                <Spin size="large" />
            </div>
        }else{
            return (<div className="tableDiv">
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
                        key={"user_id" + Math.random()}
                        render={(text, record) => (
                            <span>
                                <a href="#">查看</a>
                            </span>
                        )}
                    />
                    <Column
                        title="操作"
                        key="notice_id"
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
}


export default NoticePage