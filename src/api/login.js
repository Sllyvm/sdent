
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