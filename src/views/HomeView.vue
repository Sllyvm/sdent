<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

// import request from '../utils/request'
import TestApi from '../api/test'
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
        page:1,
        size:10
    }
  },
  created() {
    TestApi.getLogin(this.page,this.size).then(res=>{
      console.log(res);
    }).catch(error=>{
      console.log(error);
    })
    // http://ceshi5.dishait.cn/admin/login
    // TestApi.getNew()
    // console.log(TestApi.getNew());
    // TestApi.getNew().then(res=>{
    //     console.log(res);
    // }).cath(error=>{
    //   console.log(error);
    // })
  //  request({
  //     url: process.env.VUE_APP_BASE_API + "/",
  //     method: 'GET'
  //   }).then(response => {
  //     console.log(response);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  //   request({
  //     url: process.env.VUE_APP_BASE_API_v1 + "/",
  //     method: 'GET'
  //   }).then(response => {
  //     console.log(response);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  },
};
</script>
