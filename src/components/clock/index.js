import React, { Component } from "react"
import "./index.less"
import { DatePicker } from 'antd'
import moment from 'moment'
import { Button } from 'antd'
import { Row, Col } from 'antd'
import { Table, Icon, Divider } from 'antd'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
import $ from "jquery"
const { MonthPicker } = DatePicker;
const { Column, ColumnGroup } = Table;


class ClockPage extends Component {
    render() {
        return (<div>
            <Page />
        </div>);
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            "dateMonth": "2018-01"
        }
    }
    onChange = (date, dateString) => {
        this.setState({
            "dateMonth": dateString
        })
    }
    render() {
        return (<div className="nav">
            <Row>
                <Col span={12}><span>{this.state.dateMonth} 月考勤情况</span></Col>
                <Col span={12} align={"right"}><MonthPicker className="dateMonth" size={"default"} onChange={this.onChange} placeholder="选择日期" value={moment(this.state.dateMonth, "YYYY-MM")} /></Col>
            </Row>
            <AttendInfo/>
        </div>)

    }
}

class AttendInfo extends Component {
    constructor() {
        super();
        this.state = {
            "showTable": true,
            "showMap": false
        }
    }
    changeLabel = () => {
        this.setState({
            "showTable": !this.state.showTable,
            "showMap": !this.state.showMap
        })
    }
    render() {
        let modeButton1Class = this.state.showTable ? "modeButton" : "modeButton hide";
        let modeButton2Class = this.state.showMap ? "modeButton" : "modeButton hide";
        return (<div className="attendInfo">
            <Row>
                <Col span={12}>
                    <span>请假：<font color="#e64f4f">0</font> 天<span className="secant">|</span>迟到：<font color="#e64f4f">0</font> 次<span className="secant">|</span>早退：<font color="#e64f4f">0</font> 次<span className="secant">|</span>上班异常：<font color="#e64f4f">0</font> 次<span className="secant">|</span>下班异常：<font color="#e64f4f">0</font> 次<span className="secant">|</span>上班未打卡：<font color="#e64f4f">17</font> 次<span className="secant">|</span>下班未打卡：<font color="#e64f4f">17</font> 次</span>
                </Col>
                <Col span={12} align="right">
                    <Button onClick={this.changeLabel} className={modeButton1Class} type="primary" icon="environment-o">查看打卡位置</Button>
                    <Button onClick={this.changeLabel} className={modeButton2Class} type="primary" icon="bars">查看打卡明细</Button>
                </Col>
            </Row>
            <AttendList show={this.state.showTable} />
            <MapLocation show={this.state.showMap} />
        </div>)
    }
}

class AttendList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            username: '',
            lastGistUrl: ''
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
        let params = {
            "rand": Math.random(),
            "date": "2018-01",
            "userId": "10278",
            "web": 1,
            "authid": -1,
            "parentAuthId": 0,
            "menuid": -1
        };

        $.post("/core/comp/user/attend.do?list", params,(json)=>{
            console.log(json);
            if(json.result==1){
                let list = json.data.list;
                this.setState({
                    "list": list
                })
            }
        })
    }
    render() {
        let className = this.props.show ? "attendList" : "attendList hide";
        return (<div className={className}>
            <Table dataSource={this.state.list}>
                <Column title="Name"
                    title="日期"
                    dataIndex="att_date"
                    key="att_date"
                />
                <Column title="Name"
                    title="	周几"
                    dataIndex="week"
                    key="week"
                />
                <Column title="Name"
                    title="上班"
                    dataIndex="on_time"
                    key="on_time"
                />
                <Column title="Name"
                    title="下班"
                    dataIndex="off_time"
                    key="off_time"
                />
                <Column title="Name"
                    title="工作时长"
                    dataIndex="worktime"
                    key="worktime"
                />
                <Column title="Name"
                    title="备注"
                    dataIndex="workDesc"
                    key="workDesc"
                />
            </Table>
        </div>)
    }
}

class MapLocation extends Component {
    render() {
        let className = this.props.show ? "map" : "map hide";
        return (<div className={className}>
            <Map center={{ lng: 116.402544, lat: 39.928216 }} zoom="12">
                <Marker position={{ lng: 116.402544, lat: 39.928216 }} />
                <NavigationControl />
                <InfoWindow position={{ lng: 116.402544, lat: 39.928216 }} text="内容" title="标题" />
            </Map>
        </div>)
    }
}

export default ClockPage