<template>
<div class="AddMain">
  
    <Link/>
    <router-view></router-view>
</div>
</template>

<script>

import Link from './Link.vue'
export default {
name: "AddMain",
components:{
     Link,

},
data() {
return {}
},
computed:{
   
},
 methods: {},
created() {},
}
</script>

<style lang="scss" scoped>

</style>