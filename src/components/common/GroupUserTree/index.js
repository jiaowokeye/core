import React, { Component } from "react"
import { Modal, Button } from 'antd'
import $ from "jquery"
import getParams from "./../../../tool/params"
class GroupUserTree extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible?true:false,
            noModal: this.props.noModal?true:false,
            checkedStr: this.props.checkedStr
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        
        this.setState({
            visible: nextProps.visible,
            checkedStr: nextProps.checkedStr
        });
    }
    showModal(){
        this.setState({
            visible: true
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
        if(!this.state.noModal){
            return (
                <div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        maskClosable={false}
                        width={"1000px"}
                    >
                        <Tree checkedStr={this.state.checkedStr}/>
                    </Modal>
                </div>
            );
        }else{
            return (<div><Tree /></div>)
        }
        
    }
}
GroupUserTree.defaultProps = {
    "visible":false
}
const select = {
    all:false
}

class Tree extends Component{
    constructor(props){
        super(props);
        this.state = {
            "data": [],
            "checkedStr": this.props.checkedStr
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checkedStr: nextProps.checkedStr
        });
    }
    componentDidMount(){
        let obj = {
            member_type: -1,
            group_id: 0,
            ismine: 1,
            isPlat: 1,
            include_type: -1,
            stype: 0,
            comp_id: 0,
        }
        let params = getParams(obj);
        $.post("/core/comp/group.do?getTree", params, (json) => {
            if (json.result == 1) {
                let data = json.data;
                this.setState({
                    data: data
                })
            }
        });
    }
    render(){
        return(<div className="tree">
            <ul>
                {
                    this.state.data.map((e,i)=>{
                        return <GroupControl selectType={this.state.checkedStr.length>0?1:0} key={"root"+i} checkedStr={this.state.checkedStr} data={e} />
                    })
                }
                
            </ul>
        </div>)
    }
}

class GroupControl extends Component{
    constructor(props){
        super(props);
        //自部门
        let children = (this.props.data.children !== null && this.props.data.children.length>0)? this.props.data.children : [];
        //部门的人
        let compUserList = (this.props.data.compUserList !== null && this.props.data.compUserList.length>0)? this.props.data.compUserList : [];
        //部门关联
        let associateObj = {};
        //是否选中
        let selectType = this.props.selectType!==undefined?this.props.selectType:0
        //选中的字符串
        let checkedStr = this.props.checkedStr;
        children.map((e,i)=>{
            associateObj[e.groupId] = false;
        });
        compUserList.map((e,i)=>{
            let checked = checkedStr.indexOf(e.user_id) !== -1?true:false
            associateObj[e.user_id] = checked;
        })
        this.state = {
            checkedStr: this.props.checkedStr,
            associateObj: associateObj,
            selectType: selectType//0 全不选 1-半选 2-全选
        }
    }
    componentWillReceiveProps(nextProps) {
        let associateObj = this.state.associateObj;
        if (nextProps.selectType==0){
            for (var i in associateObj) {
                associateObj[i] = false
            }
        } else if (nextProps.selectType == 2){
            for (var i in associateObj) {
                associateObj[i] = true
            }
        }
        console.log("组件参数更新："+nextProps.selectType);
        this.setState({
            checkedStr: nextProps.checkedStr,
            selectType: nextProps.selectType,
            associateObj: associateObj
        });
    }
    returnClassName = (selectType)=>{
        let classNameStr = "";
        switch (selectType) {
            case 0:
                classNameStr = "";
                break;
            case 1:
                classNameStr = "checkedGroupHalfSpan";
                break;
            case 2:
                classNameStr = "checkedGroupSpan";
                break;
            default:
                break;
        }
        return classNameStr;
    }
    componentDidMount(){
        let selectType = this.returnSelectType();
        let className = this.returnClassName(selectType);
        $(this.refs["groupSpan"]).attr("class",className);
        
    }
   
    returnSelectType = ()=>{
        let associateObj = this.state.associateObj;
        let allTrue = true;
        let allFalse = true;
        let selectType = 0;
        for (var i in associateObj) {
            if (associateObj[i]) {
                allFalse = false;
            } else {
                allTrue = false;
            }
        
        }
        if(allTrue){
            selectType = 2;
        }else if(allFalse){
            selectType = 0
        }else{
            selectType = 1;
        }
        return selectType
    }
    //选中的操作  id（可能是userid也有可能是部门id）   type 1-选中 2-取消
    select = (id)=>{
        let associateObj = this.state.associateObj;
        let selectType = this.returnSelectType();
        associateObj[id] = !associateObj[id];
        this.setState({
            associateObj: associateObj,
            selectType: selectType
        })
    }
    handleClick = ()=>{
        let selectType = this.state.selectType;
        let associateObj = this.state.associateObj;
        if (selectType == 0 || selectType==1){
            selectType = 2;
            for (var i in associateObj){
                associateObj[i] = true;
            }
        }else{
            selectType = 0;
            for (var i in associateObj) {
                associateObj[i] = false;
            }
        }
        this.setState({
            associateObj: associateObj,
            selectType: selectType
        })
    }
    render(){
        let children = typeof (this.props.data.children) == "object" ? this.props.data.children:[];
        let compUserList = typeof (this.props.data.compUserList) == "object" ? this.props.data.compUserList : [];
        if (children.length == 0 && compUserList.length==0){
           return (<i></i>)
        }else{
            let associateObj = this.state.associateObj;
            let className = this.returnClassName(this.state.selectType);
            return (<li className="parent_li">
                <span ref="groupSpan" className={className} onClick={this.handleClick}>{this.props.data.groupname}</span>
                <ul className="children">
                <li className="parent_li">
                    <ul className="children">
                        {
                            compUserList.map((e, i) => {
                                let user_id = e.user_id;
                                let checked = associateObj[user_id];
                                return <PersonControl checked={checked} select={this.select} key={"user_span_" + i} data={e} />
                            })
                        }
                        {
                            children.map((e, i) => {
                                let groupId = e.groupId;
                                let selectType = associateObj[groupId]?(this.state.selectType==2?2:1):0;
                                return <GroupControl checkedStr={this.state.checkedStr} select={this.select} selectType={selectType} key={"parent_li" + i} data={e} />
                            })
                        }
                    </ul>
                    </li></ul></li>)
        }
        
    }
}

class PersonControl extends Component {
    constructor(props){
        super(props);
        let data = this.props.data?this.props.data:{};
        let id = data.user_id?data.user_id:""
        this.state = {
            data: data,
            checked: this.props.checked,
            id: id
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked
        });
    }
    handleClick = ()=>{
        this.props.select(this.state.id);
    }

    render() {
        let className = this.state.checked?"checkedspan":""
        {
            if (this.props.data.name){
                return (
                    <span className={className} onClick={this.handleClick}>{this.state.data.name}</span>
                )
            }
        }
        
    }
}


export default GroupUserTree;