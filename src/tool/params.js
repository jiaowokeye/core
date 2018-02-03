
export default function getParams(param){
    let params = {
        "authid": window.CommonResource.GlobalAuthId,
        "parentAuthId": window.CommonResource.GlobalAuthParentId,
        "menuid": window.CommonResource.GlobalMenuId,
        "rand": Math.random()
    }
    if (typeof (param) =="object"){
        for (let i in param) {
            params[i] = param[i];
        }
        return params
    }else{
        console.log("请确认传入参数是否是一个对象。");
        return params;
    }
    
}