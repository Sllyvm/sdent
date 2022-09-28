
import request from '../utils/request'



const getMember=(page,size,data)=>{
    return request({
        url:`/member/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}
const getDel=(id)=>{
    return request({
        url:`/member/${id}`,
        method:'DELETE'
    })
}
const addMember=(data)=>{
    return request({
        url:'/member',
        method:"POST",
        data
    })
}
const oneList=(id)=>{
        return request({
            url:`/member/${id}`,
            method:"GET"
        })
}
const editList=(id,data)=>{
    return request({
        url:`/member/${id}`,
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