<template>
    <div>
         <i-form  ref="queryForm" @search="search" :item="formItem" v-model.sync="staffQueryForm">
      <template v-slot:button>
        <el-button type="primary" @click="openBox">新增</el-button>
        <el-button type="primary"  @click="search">搜索</el-button>
        <el-button type="primary" @click="handleReset">重置</el-button>
      </template>
    </i-form>
        <!-- form -->
        <!-- <el-form ref="StaffRulesForm" :inline="true" :model="staffQueryForm">
            <el-form-item prop="username">
                <el-input v-model="staffQueryForm.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="staffQueryForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="openBox">新增</el-button>
                <el-button @click="handleReset('StaffRulesForm')">重置</el-button>
            </el-form-item>
        </el-form> -->
            <titleTable :data="staffList" :columns="columns">
        <template v-slot:opteration="scope">
            <el-button type="primary" @click="openBox(scope.row.id)" size="mini">编辑</el-button>
                
            <el-button type="danger" @click="handleDel(scope.row.id)"  size="mini">删除</el-button>
            
        </template>
    </titleTable>
        <!-- table -->
        <!-- <el-table :data="staffList" border height="550" style=" margin-bottom: 20px;width: 100%">
            <el-table-column type="index" label="序号" width="50px">
            </el-table-column>
            <el-table-column prop="username" label="账号">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column prop="salary" label="薪酬">
            </el-table-column>
            <el-table-column prop="entryDate" label="入职时间">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button @click="openBox(scope.row.id)" size="small">编辑</el-button>
                    <el-button @click="handleDel(scope.row.id)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 模态框 -->
         <i-dialog :dialogRules="dialogRules" :dialogConfig="dialogConfig" labelWidth="120px"
			:dialogFormItem="dialogFormItem" :dialogVisible.sync='dialogVisible' v-model.sync="dialogForm"
			@submit="handleDialog">
		</i-dialog>
        <!-- <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">dialogVisible
            <el-form ref="rulesDialogForm" :model="dialogForm" :rules="Rules" style="width: 400px" label-width="100px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="dialogForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="dialogForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="dialogForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="薪酬" prop="salary">
                    <el-input v-model="dialogForm.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="entryDate">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="dialogForm.entryDate" type="date"
                        placeholder="选择日期"></el-date-picker>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancle">取 消</el-button>
                <el-button type="primary" v-if="this.title=='新增员工'" @click="add('rulesDialogForm')">添加</el-button>
                <el-button type="primary" v-else @click="edit">编辑</el-button>

            </div>
        </el-dialog> -->

    </div>
</template>
<script>
import titleTable from '@/components/baseTable.vue'
    import staffApi from "../../api/employees"
    export default {
        components:{
            titleTable,
            'i-form':()=>import('../../components/baseForm.vue'),
            'i-dialog':()=>import('../../components/baseDialog.vue')
        },
        data() {
            return {
                // 数据
                staffList: [],
                // 页数
                page: 1,
                // 条数
                size: 10,
                // 总数
                total: 0,
                // 查询表单
                staffQueryForm: {
                    username: '',
                    name: '',
                },
                title: '',
                dialogVisible: false,
                Rules: {
                  
                },
                dialogForm: {
                    username: '',
                    name: '',
                    age: '',
                    mobile: '',
                    salary: '',
                    entryDate: ''
                },
                id:0,
                columns:[
                    {
                        type:'index',
                        label:'序号',
                        width:'100',
                        sequence:true
                    },
                    {
                        prop:'username',
                        label:'账号'
                    },
                   {
                        prop:'name',
                        label:'姓名'
                    },
                     {
                        prop:'age',
                        label:'年龄'
                    },
                     {
                        prop:'mobile',
                        label:'电话'
                    },
                     {
                        prop:'salary',
                        label:'薪酬'
                    },
                     {
                        prop:'entryDate',
                        label:'入职时间'
                    },
                     {
                       type:'slot',
                        label:'操作',
                        slot_name:'opteration',
                        width:'150'
                    },
                ],
             formItem: [
                {
                prop: 'username',
                type: 'input',
                label: '账号',
                placeholder:'账号'

                },
                {
                prop: 'name',
                type: 'input',
                label: '姓名',
                placeholder:'姓名'

                },
                
                {
                type: 'slot',
                slot_name: 'button'

                },

                 ],
                   	dialogFormItem: [
                      
					{
						label: '账号',
						type: 'input',
						prop: 'username'
					},
                      {
						label: '姓名',
						type: 'input',
						prop: 'name',
					},
					{
						label: '年龄',
						type: 'input',
						prop: 'age'
					},
					{
						label: '电话',
						type: 'input',
						prop: 'mobile'
					},
                    {
						label: '薪酬',
						type: 'input',
						prop: 'salary'
					},
                    {
						label: '入职时间',
						type: 'select',
						prop: 'entryDate'
					}
				],
                dialogConfig: {
					title: '员工新增',
					width: '500px',
					formWidth: '400'
				},
                dialogRules: {
					 name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, ],
                    username: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }, ],
				},



            };
        },
        methods: {
            // 获取数据
            async getStaffList() {
                const {
                    rows,
                    total
                } = await staffApi.getMember(this.page, this.size, this.staffQueryForm)
                this.staffList = rows
                this.total = total
            },
            // 搜索
            search() {
                // console.log(this.staffQueryForm);
                this.page = 1
                this.getStaffList()
            },
            // 页数发生变化触发
            handleSizeChange(size) {
                // console.log(size,'size');
                this.size = size
                this.getStaffList()
            },
            // 页码发生变化触发
            handleCurrentChange(page) {
                // console.log(page,'page');
                this.page = page
                this.getStaffList()
            },
            // 表单重置
            handleReset() {
                 this.$refs['queryForm'].handleRestForm()
            },
            // 打开模态框
            openBox(id) {
                console.log(typeof id);
                this.dialogVisible = true
                if (typeof id == 'number') {
                    this.dialogConfig.title = "编辑员工"
                    this.findOneStaff(id)
                    this.id=id
                    return
                } else {
                    this.dialogConfig.title = "新增员工"
                   
                    return
                }

            },
             handleDialog() {
				if (!this.id=='') {
					this.edit()
				} else {
					this.addok()
				}
			},
            // 添加按钮
            add(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) return
                       this.dialogForm.id ? this.edit() : this.addok()
                })
            },
            // 添加成功
            async addok() {
                // console.log(this.dialogForm);
                try {
                    const res = await staffApi.addMember(this.dialogForm)
                    this.$message.success('添加成功')
                    this.handleReset('rulesDialogForm')
                    this.dialogVisible = false
                    this.getStaffList()
                } catch (error) {
                    console.log(error);

                }
            },
            // 编辑按钮
            async edit() {
                try {
                    const res=await staffApi.editList(this.id,this.dialogForm)
                    this.$message.success('编辑成功')
                    this.dialogVisible=false
                    this.getStaffList()
                } catch (error) {
                    console.log(error);
                    
                }
            },
            // 查询单个员工
            async findOneStaff(id) {
                try {
                    const res = await staffApi.oneList(id)
                    console.log(res);
                    this.dialogForm=res

                } catch (error) {
                    console.log(error);

                }
            },
            // 删除
            handleDel(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        const res = await staffApi.getDel(id)
                        this.$message.success('删除成功')
                        this.getStaffList()
                    } catch (error) {
                        console.log(error);

                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });



            },
            // 取消
            handleCancle() {
                this.dialogVisible = false
                this.handleReset('rulesDialogForm')
            },

        },
        created() {
            this.getStaffList()
        },
    }
</script>
<style scoped lang="scss">

</style>