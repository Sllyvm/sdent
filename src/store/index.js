import Vue from "vue";
import Vuex from "vuex";
import {setToken,getToken,setUserInfo,getUserInfo}  from '../utils/auth'
import {login,getUser,getOut} from '@/api/login'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:getToken() || "",
    userInfo:getUserInfo() || ""
  },
  getters: {
    token(state){
      return state.token
    },
    userInfo(state){
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state,token){
        state.token=token
        setToken(token)
    },
    SET_INFO(state,user){
      state.userInfo=user
      setUserInfo(user)
    }
  },
  actions: {
    async logins({commit},loginForm){
        try {
          const response = await login(loginForm)
             commit("SET_TOKEN",response.token)
             return response.token
        } catch (error) {
          console.log(error.meassage);
        }
    },
    async handleUserInfo({commit}){
        try {
            const user=await getUser()
            commit("SET_INFO",user)
            return user
        } catch (error) {
          console.log(error.meassage);
          
        }
    },
   async handleOut({commit}){
     
        const out=await  getOut()
        console.log(out);
        commit("SET_TOKEN","")
        commit("SET_INFO","")
        return out
    }
    // DIS_SET_TOKEN({commit},token){
    //   commit("SET_TOKEN",token)
    // },
    // DIS_SET_INFO({commit},user){
    //   commit("SET_INFO",user)
    // }
  },
  modules: {},
});
