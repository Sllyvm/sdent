import axios from "axios";
import { Message,Loading } from "element-ui";

import store from '../store'
const loading={
  loadingInstance : null,
  open(){
    if(!this.loadingInstance){
        this.loadingInstance=Loading.service({
          target:'.el-main',
         
          text: '拼命加载中',
         
          background: 'rgba(0, 0, 0, 0.7)'
        })
    }
  },
  close(){
    if(this.loadingInstance!==null){
        this.loadingInstance.close()
        this.loadingInstance=null
    }
  }
}
const exceptionMessage ={
  1000:"用户名或密码不对",

  3000:""
}
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout: 5000,
   
  });
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
 
    const token=store.getters.token
    if(token)config.headers.authorization="Bearer "+token
    loading.open()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    loading.close()
    return Promise.reject(error);
  });
  // 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    loading.close()
    console.log("--",response);
    if(response.status<400){
        if(response.data.data){
          return response.data.data
        }else{
          return response.data.msg
        }
        
    }
    if(response.status===401){
      return 
    }
    _showError(response.data.code,response.data.meassage)
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    loading.close()
    return Promise.reject(error);
  });

  
  const _showError=(errorCode,message)=>{
    let title;
    title=exceptionMessage[errorCode]|| message || "发送生未知错误"
      Message.error(title)
  }
export default  service
