import React, { Component } from "react"
import { DatePicker } from 'antd'
import { Input, Table, Icon, Modal, Button, Spin } from 'antd'
import moment from 'moment'
import "./index.less"
import GroupUserTree from "./../common/GroupUserTree/index"
import $ from "jquery"
import { NoticeAction } from "./actions"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NOTICE_TREESHOW } from "./types"
import { Treevisible } from "./action"
import getParams from "./../../tool/params"
let AJAX = null;
const { Column, ColumnGroup } = Table
const { RangePicker } = DatePicker
const { TextArea } = Input
// import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class NoticePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "visible": false,
            "checkedStr": "12244,12459,41208,41209,41210,41211,12246,12247,48012,48013,48014,48015,48016,48017,48018,48019,48020,48021,48022,48023,48024,48025,48026,48027,48028,48029,48030,48031,48032,48033,48034,48035,48036,48037,48038,48039,48040,12291,12300,12245,47988,47989,47990,48041,48042,48043,48044,48045,48046,48047,48048,48049,48050,48051,48052,48053,48054,48055,48056,48057,48058,48059,48060,48061,48062,48063,48064,48065,48066,47991,47992,47993,48067,48068,48069,48070,48071,48072,48073,48074,48075,48076,48077,48078,48079,48080,48081,48082,48083,48084,48085,48086,48087,48088,48089,48090,48091,48092,47994,47995,47996,48093,48094,48095,48096,48097,48098,48099,48100,48101,48102,48103,48104,48105,48106,48107,48108,48109,48110,48111,48112,48113,48114,48115,48116,48117,48118,47997,47998,47999,48000,48001,48002,48003,48004,48005,48006,48007,48008,48009,48010,48011,12284,12285,12286,12287,12288,48119,12489,12549"
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props);
        this.setState({
            "visible": nextProps.visible
        })
    }
    showTree = () => {
        this.setState({
            "visible": true
        })
    }
    hideTree = () => {
        this.setState({
            "visible": false
        })
    }
    render() {
        return (
            <div>
                <GroupUserTree visible={this.state.visible} checkedStr={this.state.checkedStr} />
                <Page showTree={this.showTree} hideTree={this.hideTree} />
            </div>

        );
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            startDate:"",
            endData:"",
            title:"",
            find:false
        }
    }
    showTree = () => {
        this.props.showTree();
    }
    hideTree = () => {
        this.props.hideTree();
    }
    titleOnchange(ev){
        var  ev = ev||window.event;
        this.setState({
            title:ev.target.value
        })
    }
    changeDate = (date, dateString)=>{
        console.log(dateString);
        this.setState({
            startDate : dateString[0],
            endData : dateString[1]
        })
    }
    //初始化nav选项
    initClear = ()=>{
       this.setState({
           startDate: "",
           endData: "",
           title: "",
           find: true
       })
    }
    handleCancel = () => {
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
    search = ()=>{
        this.setState({
            find: true
        })
    }
    stopSearch = ()=>{
        this.setState({
            find: false
        })
    }
    render() {
        return (<div>
            <div className="nav">
                <Input ref="searchInput" className="searchInput" value={this.state.title} onChange={this.titleOnchange.bind(this)} placeholder="请输入标题关键字"/>
                <RangePicker ref="RangePicker" onChange={this.changeDate}/>
                <Button className="btn" type="primary" onClick={this.search}>查找</Button>
                <Button className="btn" onClick={this.initClear} type="primary">全部</Button>
                <Button className="btn" onClick={this.showTree.bind(this)} type="primary">显示人员树</Button>
                <Button className="sendNotice" onClick={this.showModal.bind(this)} type="default" icon="edit">发公告</Button>
            </div>
            <NoticeList
                cond = {this.state}
                stopSearch={this.stopSearch}
            ></NoticeList>
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
    constructor(props) {
        super(props);
        this.state = {
            "list": [],
            "current": 1,
            "cond":this.props.cond,
            "loading":true
        }
    }
    onChange(page) {
        this.setState({
            current: page,
        });
    }
    componentDidMount = () => {
        this.getNoticeList(this.state);
    }
    componentWillReceiveProps(newProps){
        if(newProps.cond.find){
            this.getNoticeList(newProps);
        }
    }
    getNoticeList = (props) => {
        let obj = {
            currentPage: 1,
            pageSize: 20,
            startdate: props.cond.startDate,
            title: props.cond.title,
            enddate: props.cond.endDate,
        }
        let params = getParams(obj);
        if(AJAX!==null){
            AJAX.abort();
        }
        AJAX = $.post("/core/msg/notice.do?find", params, (json) => {
            if (json.result == 1) {
                let list = json.data.list.paginationData;
                this.setState({
                    list: list
                })
            }
            this.setState({
                "loading":false
            })
            this.props.stopSearch();
        });
        
    }
    render() {
        if (this.state.loading) {
            return <div>
                <Spin size="large" />
            </div>
        } else {
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
const mapStateToProps = (state) => {
    return {
        "visible": state.noticeTreeVisible
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ Treevisible }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NoticePage); 