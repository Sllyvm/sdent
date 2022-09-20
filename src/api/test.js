import request from "../utils/request"

// http://ceshi5.dishait.cn/admin/login
// 3000端口号
// const getNew=()=>{
//     return  request({
//         url:'/',
//         method: 'get'
//     }).then(res=>{
//         console.log(res);
//     })
// }
// // 4000端口号
// const getList=()=>{

// }
const getLogin=(page=1,size=10,data={})=>{
       return request({
        url:`/member/list/search/${page}/${size}`,
        method:'POST',
        data
       })
}
export default {
  
    getLogin
}