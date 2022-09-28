<template>
  <div class="supplier">
    <i-form  ref="queryForm" @search="handleSubmit" :item="formItem" v-model.sync="queryParams">
      <template v-slot:button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="primary"  @click="handleSubmit">搜索</el-button>
        <el-button type="primary" @click="handleRest">重置</el-button>
      </template>
    </i-form>
    <!-- <el-form :inline="true" :model="queryParams" ref="ruleForm" class="demo-form-inline">
  <el-form-item prop="name">
    <el-input v-model="queryParams.name" placeholder="供应商名称"></el-input>
  </el-form-item>
   <el-form-item prop="linkman">
    <el-input v-model="queryParams.linkman" placeholder="联系人"></el-input>
  </el-form-item>
 <el-form-item prop="mobile">
    <el-input v-model="queryParams.mobile" placeholder="联系电话"></el-input>
  </el-form-item>
   
  <el-form-item>
    <el-button type="primary" @click="handleSubmit">查询</el-button>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-button @click="handleRest('ruleForm')">重置</el-button>
  </el-form-item>
</el-form> -->

    <titleTable :data="numberList" :columns="columns">
      <template v-slot:opteration="scope">
        <el-button type="primary" @click="handleAdd(scope.row.id)"
          >编辑</el-button
        >

        <el-button type="danger" @click="handleDel(scope.row.id)"
          >删除</el-button
        >
      </template>
    </titleTable>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  <i-dialog :dialogRules="dialogRules" :dialogConfig="dialogConfig" labelWidth="120px"
			:dialogFormItem="dialogFormItem" :dialogVisible.sync='dialogVisible' v-model.sync="dialogForm"
			@submit="handleDialog">
		</i-dialog>
    <!-- <el-dialog :title="title" :visible.sync="this.dialogVisible" width="30%">
      <el-form
        ref="dialogForm"
        :model="dialogForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkname">
          <el-input v-model="dialogForm.linkname"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="dialogForm.mobile"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="dialogForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="clear">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
import titleTable from '../../components/baseTable.vue'
import supplier from '../../api/supplier'
export default {
  name: "supplier",
  components: {
    titleTable,
    'i-form': () => import('../../components/baseForm.vue'),
    'i-dialog':()=>import('../../components/baseDialog.vue')
  },
  data() {
    return {
      numberList: [],
      total: 0,
      page: 1,
      size: 10,
      queryParams: {
        name: '',
        linkname: '',
        mobile: '',

      },

      dialogVisible: false,
      title: '',
      dialogForm: {
        name: "",
        linkname: "",
        mobile: "",
        remark: ""
      },
      rules: {
        
      },
      	dialogFormItem: [{
						label: '供应商名称',
						type: 'input',
						prop: 'name',
					},
					{
						label: '联系人',
						type: 'input',
						prop: 'linkname'
					},
					{
						label: '联系电话',
						type: 'input',
						prop: 'mobile'
					},
					{
						label: '备注',
						type: 'input',
						prop: 'remark'
					}
				],
      dialogConfig: {
					title: '供应商新增',
					width: '500px',
					formWidth: '400'
				},
      dialogRules: {
					name: [{
						required: true,
						message: '供应商不能为空',
						trigger: 'blur'
					}],
					linkman: [{
						required: true,
						message: '联系人不能为空',
						trigger: 'blur'
					}]
				},
      columns: [
        {
          type: 'index',
          label: '序号',
          width: '100',
          sequence: true
        },
        {
          prop: 'name',
          label: '供应商名称'
        },
        {
          prop: 'linkname',
          label: '联系人'
        },
        {
          prop: 'mobile',
          label: '联系电话'
        },
        {
          prop: 'remark',
          label: '备注'
        },
        {
          type: 'slot',
          label: '操作',
          slot_name: 'opteration'
        },
      ],


      formItem: [
        {
          prop: 'name',
          type: 'input',
          label: '供应商名称',
          placeholder:'供应商名称'

        },
        {
          prop: 'linkname',
          type: 'input',
          label: '联系人',
           placeholder:'联系人'

        },
        {
          prop: 'mobile',
          type: 'input',
          label: '联系电话',
           placeholder:'联系电话'

        },
        {
          type: 'slot',
          slot_name: 'button'

        },

      ],


    }
  },
  methods: {
    async getNumberList() {

      const { rows, total } = await supplier.getSupplier(this.page, this.size, this.queryParams)

      this.numberList = rows
      this.total = total

    },
    //  /**
    //  * 条数切换触发的方法
    //  */
    handleSizeChange(size) {
      // console.log(size);
      this.size = size
      this.getNumberList()
    },
    /**
     * 页码切换触发的方法
     */
    handleCurrentChange(page) {
      // console.log(page);
      this.page = page
      this.getNumberList()
    },
    // // 查询
    handleSubmit() {
      // console.log(this.queryParams)
      this.page = 1;
      this.getNumberList()
    },
    handleDialog() {
			if (this.dialogForm.id) {
					this.handleEide()
				} else {
					this.handleNum()
				}
			},
    // // 表单重置
    handleRest() {
      this.$refs['queryForm'].handleRestForm()
    },
    // 删除？
    handleDel(id) {
      // console.log(id);
      this.$confirm('确认删除这条记录吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.$message.success("删除成功")
        try {
          const del = await supplier.getDelete(id)

        } catch (error) {
          console.log(error.message);
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //     // 打开弹窗
    handleAdd(id) {
      this.dialogVisible = true
      if (typeof id === 'number') {
        this.title = "供应商编辑"
        this.handleOneList(id)
      } else {
        this.title = "供应商新增"
      }
      //       this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
      // this.handleNum()

    },
    addSubmit() {
      this.$refs["dialogForm"].validate(valid => {
        if (!valid) return
        this.dialogVisible = false

        this.dialogForm.id ? this.handleEide() : this.handleNum()
        // this.dialogFormParams.id ? this.handleEditMember() : this.handleAddMember()
      })

      // console.log(this.form);
    },

    //     // 表单新增
    async handleNum() {
      try {
        const add = await supplier.getAddSupplier(this.dialogForm)
        // console.log(add);
        // console.log(add);
        this.$message.success("添加成功")
        this.dialogVisible = false
        this.handleRest("dialogForm")
        this.getNumberList()
      } catch (error) {
        console.log(error.message);
      }
    },
    // 获取单个表单数据
    async handleOneList(id) {
      try {
        const confirm = await supplier.getFirstList(id)
        this.dialogForm = confirm
      } catch (error) {
        console.log(error.message);
      }
    },
    clear() {
      this.dialogVisible = false
    },
    //     // 编辑
    async handleEide() {
      // console.log(666);
      try {
        const edit = await supplier.getEditList(this.dialogForm.id, this.dialogForm)
        this.handleRest('dialogForm')
        this.dialogVisible = false
        this.$message.success("编辑成功")
        this.getNumberList()
      } catch (error) {

      }
    }
  },
  created() {
    this.getNumberList()
  },

}
</script>

<style lang="scss" scoped>
</style>