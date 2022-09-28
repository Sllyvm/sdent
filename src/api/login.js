
import  request  from "../utils/request";
export const login =(data={})=>{
    return request({
        url:"/admin/login",
        method:'POST',
        data
    })
}
export const getUser=()=>{
    return request({
        url:"/admin/getUserInfo",
        method:"GET",
        
    })
}
export const getOut=()=>{
    return request({
        url:"/admin/logout",
        method:"POST"
    })
}