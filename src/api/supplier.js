import request from '../utils/request'
// 获取供应商列表
const getSupplier=(page,size,data)=>{
    return request({
        url:`/shop/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}
// 添加接口
const getAddSupplier=(data)=>{
    return request({
        url:`/shop`,
        method:'POST',
        data
    })
}
// 单个数据接口
const getFirstList=(id)=>{
    return request({
        url:`/shop/${id}`,
        method:"GET"
    })
}
// 编辑接口
const getEditList=(id,data)=>{
        return request({
            url:`/shop/${id}`,
            method:"PUT",
            data

        })
}
// 删除接口
const getDelete=(id)=>{
    return request({
        url:`/shop/${id}`,
        method:"DELETE"
    })
}

export default {
    getSupplier,
    getAddSupplier,
    getFirstList,
    getEditList,
    getDelete
}