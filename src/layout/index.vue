<template>

<el-container>
  <el-header>
        <AddHeader/>
  </el-header>
  <el-container>
    <el-aside width="250px">
        <AddAside/>
    </el-aside>
    <el-main><AddMain/></el-main>
  </el-container>
</el-container>

</template>

<script>
import AddHeader  from './AddHeader'
import AddAside  from './AddAside'
import AddMain   from './AddMain'
export default {
name: "Layout",
components:{
    AddHeader,
    AddAside,
    AddMain
},
data() {
return {}
},
 methods: {},
created() {},
}
</script>

<style lang="scss" scoped>
 .el-header{
    background-color: #2d3a4b;
    color: #fff;
   
    line-height: 60px;

  }
  
  .el-aside {
    background-color: #545c64;
    color: #fff;
   
    line-height: 200px;
    height: 100vh;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
 
    
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>