
import request from '../utils/request'



const getMember=(page,size,data)=>{
    return request({
        url:`/vip/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}
const getDel=(id)=>{
    return request({
        url:`/vip/${id}`,
        method:'DELETE'
    })
}
const addMember=(data)=>{
    return request({
        url:'/vip',
        method:"POST",
        data
    })
}
const oneList=(id)=>{
        return request({
            url:`/vip/${id}`,
            method:"GET"
        })
}
const editList=(id,data)=>{
    return request({
        url:`/vip/${id}`,
        method:"PUT",
        data
    })
}
export default {
    getMember,
    getDel,
    addMember,
    oneList,
    editList
}