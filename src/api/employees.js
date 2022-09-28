
import request from '../utils/request'



const getMember=(page,size,data)=>{
    return request({
        url:`/staff/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}
const getDel=(id)=>{
    return request({
        url:`/staff/${id}`,
        method:'DELETE'
    })
}
const addMember=(data)=>{
    return request({
        url:'/staff',
        method:"POST",
        data
    })
}
const oneList=(id)=>{
        return request({
            url:`/staff/${id}`,
            method:"GET"
        })
}
const editList=(id,data)=>{
    return request({
        url:`/staff/${id}`,
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
