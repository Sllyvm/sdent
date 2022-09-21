import Vue from "vue";
import Vuex from "vuex";
import {setToken,getToken,setUserInfo,getUserInfo}  from '../utils/auth'
import {login,getUser} from '@/api/login'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:getToken() || "",
    userInfo:getUserInfo() || ""
  },
  getters: {
    token(state){
      return state.token
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
        } catch (error) {
          console.log(error.meassage);
        }
    },
    async handleUserInfo({commit}){
        try {
            const user=await getUser()
            commit("SET_INFO",user)
        } catch (error) {
          console.log(error.meassage);
          
        }
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
