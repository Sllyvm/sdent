<template>
<div class="Link"  v-if="RoutingHidden">
     <el-breadcrumb separator="/">
        <el-breadcrumb-item class="item">
                {{getRoute}}
        </el-breadcrumb-item>
  
    </el-breadcrumb>
</div>
</template>

<script>
export default {
name: "Link",
data() {
return {}
},
computed:{
    getRoute(){
        return this.$route.meta?.title
    },
     RoutingHidden(){
        return !(this.$route.path==="/index")
    }
},
 methods: {},
created() {},
}
</script>

<style lang="scss" scoped>
.Link{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    padding-left: 20px;
    padding-top: 15px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    margin-bottom: 10px;
    box-sizing: border-box;
}
.item{
    border-left: 3px solid red;
    padding-left: 10px;
}
</style>