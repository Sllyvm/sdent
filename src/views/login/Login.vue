<template>
<div class="login">
        <div class="login-form">
           
                <h3>积云会员管理系统</h3>
                <el-form ref="form" :model="form" :rules="rules" label-width="60px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="form.username" style="width:72%;color:#fff"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"  style="width:72%;color:#fff"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                </el-form>
        </div>
</div>
</template>

<script>
import {Message} from  'element-ui'
export default {
name: "login",
data() {
return {
    form:{
        username:"",
        password:''
    },
    rules:{
        username:[
            {    required:true,message:'账号不能为空',trigger:'blur'},
            {  min:3,max:8 ,message:'请输入3~8位'  ,trigger:'blur'}
        ],
        password:[
              {    required:true,message:'密码不能为空',trigger:'blur'},
        ]
    }
}
},
 methods: {
    onSubmit(){
        this.$refs['form'].validate((valid)=>{
                if(!valid) return
                this.handleLogin()
        })
    },
    async handleLogin(){
        const token=await this.$store.dispatch("logins",this.form)
        if(!token) return
        const userInfo=await this.$store.dispatch("handleUserInfo")
        if(!userInfo) return
        Message.success("登录成功")
        this.$router.push("/")
    }
    // // async handleLogin(){
    // //     try {
    // //         const response=await login(this.form)
    // //         this.$store.dispatch("DIS_SET_TOKEN",response.token)
    // //         const userInfo=await getUser()
    // //         console.log(userInfo);
    // //         this.$store.dispatch("DIS_SET_INFO",userInfo)
    // //         this.$router.push('/index')
    // //     } catch (error) {
    // //         console.log(error.meassage);
    // //     }
        
    // }
 },
created() {},
}
</script>

<style lang="scss" scoped>
.login{
    width:100%;
    height: 100%;
    background-image: url('http://vue.mengxuegu.com/img/login.b665435f.jpg');
    background-size: 100% 100%;
    position: relative;
}
.login-form{
    width: 500px;
    
    background-color: rgba(255, 255, 255,.4);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    text-align: center;
    color: #fff;
    h3{
        line-height: 60px;
    }
}
.el-form-item__label{
    color: #fff;
}
</style>