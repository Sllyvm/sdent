<template>

<div class="members">
    <el-form :inline="true" :model="queryParams" ref="ruleForm" class="demo-form-inline">
  <el-form-item prop="cardNum">
    <el-input v-model="queryParams.cardNum" placeholder="会员卡号"></el-input>
  </el-form-item>
   <el-form-item prop="name">
    <el-input v-model="queryParams.name" placeholder="会员名字"></el-input>
  </el-form-item>
  <el-form-item prop="payType">
    <el-select v-model="queryParams.payType" placeholder="支付类型">
      <el-option v-for="(item,index) in this.payType" :key="index" :label="item.name" :value="item.type"></el-option>
     
    </el-select>
  </el-form-item>
   <el-form-item prop="birthday">
    <el-col :span="11">
      <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="出生日期" v-model="queryParams.birthday" style="width: 150px;"></el-date-picker>
    </el-col>
    
    
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleSubmit">查询</el-button>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-button @click="handleRest('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>

      <el-table
    :data="numberList"
    border
    max-height="500px"
    style="width: 100%">
    <el-table-column
      fixed
        type="index"
      label="序号"
      >
    </el-table-column>
    <el-table-column
      prop="cardNum"
      label="会员卡号"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号码"
      >
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="会员生日"
     >
    </el-table-column>
    <el-table-column
      prop="integral"
      label="可用积分"
      >
    </el-table-column>
     <el-table-column
      prop="money"
      label="开卡金额"
      >
    </el-table-column>
     <el-table-column
      prop="payType"
      label="支付类型"
      >
      <template v-slot="scope">
    
            {{scope.row.payType|filterMem}}
        
      </template>
    </el-table-column>
     <el-table-column
      prop="address"
      label="会员地址"
      
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button   size="small" @click="handleDel(scope.row.id )">删除</el-button>
        <el-button  size="small" @click="handleAdd(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
        :title="title"
        :visible.sync="this.dialogVisible"
        width="30%"
        >
        <el-form ref="dialogForm" :model="dialogForm" :rules="rules" label-width="80px">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="dialogForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>

        <el-form-item label="会员生日">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="出生日期" v-model="dialogForm.birthday" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
          <el-form-item label="手机号码">
          <el-input v-model="dialogForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额">
          <el-input v-model="dialogForm.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="dialogForm.integral"></el-input>
        </el-form-item>
            <el-form-item label="支付类型" prop="payType">
          <el-select v-model="dialogForm.payType" placeholder="请选择支付方式">
            <el-option v-for="(item,index) in this.payType" :key="index" :label="item.name" :value="item.type"></el-option>
          
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址">
          <el-input type="textarea" v-model="dialogForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="clear">取消</el-button>
        </el-form-item>
      </el-form>



 
</el-dialog>
</div>
</template>

<script>
import memberSo from "@/api/members"
import memJse from '@/enum/member'
export default {
name: "members",
data() {
return {
    numberList:[],
    total:0,
    page:1,
    size:10,
    queryParams:{
        cardNum:'',
        name:'',
        payType:'',
        birthday:""
    },
    payType:memJse.platy,
    dialogVisible:false,
    title:'',
    dialogForm:{
        name:"",
        cardNum:"",
        integral:0,
        money:0,
        payType:'',
        birthday:"",
        address:""
    },
    rules:{
       name: [
            { required: true, message: '请输入会员名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         cardNum: [
            { required: true, message: '请输入会员卡号', trigger: 'blur' },
            { min: 13, max:105, message: '长度在 13 到 105 个字符', trigger: 'blur' }
          ],
           payType: [
            { required: true, message: '请输入支付放松', trigger: 'change' },
          
          ],
    }
    
    
}
},
 methods: {
    async getNumberList(){
    
            const {rows,total}=await  memberSo.getMember(this.page,this.size,this.queryParams)
        
            this.numberList=rows
                this.total=total
       
    },
     /**
     * 条数切换触发的方法
     */
    handleSizeChange(size){
            // console.log(size);
            this.size=size
            this.getNumberList()
    },
    /**
     * 页码切换触发的方法
     */
    handleCurrentChange(page){
            // console.log(page);
            this.page=page
            this.getNumberList()
    },
    // 查询
    handleSubmit(){
        // console.log(this.queryParams)
        this.page=1;
        this.getNumberList()
    },
    // 表单重置
    handleRest(ruleForm){
            this.$refs[ruleForm].resetFields()
    },
    // 删除？
    handleDel(id){
        console.log(id);
             this.$confirm('确认删除这条记录吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
           try {
             const del=await memberSo.getDel(id)
             this.$message.success('删除成功')
            // console.log(del);
           } catch (error) {
            // console.log(error.message);
           }
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 打开弹窗
    handleAdd(id){
       this.dialogVisible=true
        if(typeof id ==='number'){
          this.title="会员编辑"
          this.handleOneList(id)
        }else{
          this.title="会员新增"
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
    addSubmit(){
         this.$refs["dialogForm"].validate(valid=>{
        if(!valid) return
         this.dialogVisible=false
         
         this.dialogForm.id ? this.handleEide() :this.handleNum() 
        // this.dialogFormParams.id ? this.handleEditMember() : this.handleAddMember()
      })
           
            // console.log(this.form);
    },
  
    // 表单新增
  async  handleNum(){
        try {
            const add =await memberSo.addMember(this.dialogForm)
            // console.log(add);
            // console.log(add);
            this.$message.success("添加成功")
            this.dialogVisible=false
            this.handleRest("dialogForm")
            this.getNumberList()
        } catch (error) {
            console.log(error.message);
        }
    },
    // 获取单个表单数据
    async handleOneList(id){
      try {
        const confirm=await memberSo.oneList(id)
        this.dialogForm=confirm
      } catch (error) {
        console.log(error.message);
      }
    },
    clear(){
      this.dialogVisible=false
    },
    // 编辑
    async handleEide(){
        // console.log(666);
      try {
        const edit =await memberSo.editList(this.dialogForm.id,this.dialogForm)
        this.handleRest('dialogForm')
        this.dialogVisible=false
        this.$message.success("编辑成功")
        this.getNumberList()
      } catch (error) {
        
      }
    }
 },
created() {
    this.getNumberList()
},
filters:{
    filterMem(value){
        // console.log(value);
        // return memJs.platy[value]
        const data =memJse.platy.find((item,index)=>{
            // console.log(item,index);
            return  item.type===value
        })
        return data? data.name:""
    }
}
}
</script>

<style lang="scss" scoped>

</style>