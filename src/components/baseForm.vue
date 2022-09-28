<template>
  <div class="baseForm">
    <el-form :inline="true" ref="form" :model="value" class="demo-form-inline">
      <template v-for="(item, index) in item">
        <el-form-item
          v-if="item.type === 'input'"
        :prop="item.prop"
        >
          <el-input v-model="value[item.prop]"  :placeholder='item.placeholder'></el-input>
        </el-form-item>

        <el-form-item
          v-if="item.type ==='slot'"
            :prop="item.prop"
        >
          <slot :name="item.slot_name"></slot>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => { }
    }
  },
  name: "baseForm",
  data() {
    return {
      // formInline:{
      //     name:"",
      //     linkman:'',
      //     mobile:""
      // }
      handleRestForm(){
        this.$refs['form'].resetFields()
      }
    }
  },
  methods: {},
  created() { },
}
</script>

<style lang="scss" scoped>
</style>