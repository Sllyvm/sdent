<template>
<div class="AddHeader">
    <div class="left-title">
        <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="">
        <span>积云会员管理系统</span>
    </div>
    <div class="right-title">
             <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
            {{this.$store.getters.userInfo.name ||""}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" command="changePass">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-fold" command="userOut">退出登录</el-dropdown-item>
           
        </el-dropdown-menu>
        </el-dropdown>
    </div>
</div>
</template>

<script>
export default {
name: "AddHeader",
data() {
return {}
},
 methods: {
      handleCommand(command) {
        switch (command) {
            case "changePass":
                    this.handleEid()
                break;
        
            case  "userOut":
                    this.handleInfo()
                break;
        }
      },
      handleEid(){
        this.$message.success("修改密码")
      },
     async handleInfo(){
        this.$message.info("退出登录")
        try {
          const response= await  this.$store.dispatch("handleOut")
           
               this.$router.push("/login")
          
        } catch (error) {
          
        }

     
      }
 },
created() {},
}
</script>

<style lang="scss" scoped>
.AddHeader{
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
   
}
 img{
        
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }
 .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>