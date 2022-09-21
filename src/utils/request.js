import axios from "axios";
import { Message } from "element-ui";
import store from '../store'
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
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("--",response);
    if(response.status<400){
    
        return response.data.data
    }
    if(response.status===401){
      return 
    }
    _showError(response.data.code,response.data.meassage)
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  
  const _showError=(errorCode,message)=>{
    let title;
    title=exceptionMessage[errorCode]|| message || "发送生未知错误"
      Message.error(title)
  }
export default  service
