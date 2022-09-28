<template>
    <div>
        <i-form  ref="goodsForm" @search="searchGoods" :item="formItem" v-model.sync="goodsQueryParams">
      <template v-slot:button>
        <el-button type="primary" @click="openBox">新增</el-button>
        <el-button type="primary"  @click="searchGoods">搜索</el-button>
        <el-button type="primary" @click="FormReset">重置</el-button>
      </template>
    </i-form>
        <!-- form -->
        <!-- <el-form ref='searchForm' :inline="true" :model="goodsQueryParams" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="goodsQueryParams.name" placeholder="商品名称"></el-input>
            </el-form-item>

            <el-form-item prop="code">
                <el-input v-model="goodsQueryParams.code" placeholder="商品编号"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <el-input v-model="goodsQueryParams.supplierName" placeholder="选择供应商"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchGoods">查询</el-button>
                <el-button type="primary" @click="openBox">新增</el-button>
                <el-button @click="FormReset('searchForm')">重置</el-button>

            </el-form-item>
        </el-form> -->
            <titleTable :data="goodsList" :columns="columns">
        <template v-slot:opteration="scope">
            <el-button type="primary" @click="openBox(scope.row.id)" size="mini">编辑</el-button>
                
            <el-button type="danger" @click="handleDel(scope.row.id)"  size="mini">删除</el-button>
            
        </template>
    </titleTable>
        <!-- table -->
        <!-- <el-table :data="goodsList" border style="width: 100% " height="550">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="name" label="商品名称">
            </el-table-column>
            <el-table-column prop="code" label="商品编码">
            </el-table-column>
            <el-table-column prop="spec" label="商品规格">
            </el-table-column>
            <el-table-column prop="retailPrice" label="零售价">
            </el-table-column>
            <el-table-column prop="purchasePrice" label="进货价">
            </el-table-column>
            <el-table-column prop="storageNum" label="库存数量">
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="openBox(scope.row.id)" size="small">编辑</el-button>
                    <el-button @click=handleDel(scope.row.id) type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

         <i-dialog :dialogRules="dialogRules" :dialogConfig="dialogConfig" labelWidth="120px"
			:dialogFormItem="dialogFormItem" :dialogVisible.sync='dialogFormVisible' v-model.sync="goodsform"
			@submit="handleDialog">
		</i-dialog>
        <!-- 模态框
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
            <el-form ref="rulesGoodsForm" :rules="rules" :model="goodsform" label-width='120px'>
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="goodsform.name"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="goodsform.code"></el-input>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="goodsform.spec"></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="goodsform.retailPrice"></el-input>
                </el-form-item>
                <el-form-item label="进货价">
                    <el-input v-model="goodsform.purchasePrice"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="goodsform.storageNum"></el-input>
                </el-form-item>
                <el-form-item label="供应商">
                    <el-input v-model="goodsform.supplierName" placeholder="供应商"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="this.title=='添加商品'" @click="add('rulesGoodsForm')">确定添加</el-button>
                <el-button type="primary" v-else @click="editok">确定编辑</el-button>

            </div>
        </el-dialog> -->

    </div>
</template>
<script>
import titleTable from '@/components/baseTable.vue'
    import goodsApi from "../../api/goods"
    export default {
        components:{
            titleTable,
            'i-form':()=>import('../../components/baseForm.vue'),
            'i-dialog':()=>import('../../components/baseDialog.vue')
        },
        data() {
            return {
                    id:0,
                // 数据
                goodsList: [],
                page: 1,
                size: 10,
                total: 0,
                goodsQueryParams: {
                    name: '',
                    code: '',
                    supplierName: ''
                },
                title: '',
                dialogFormVisible: false,
                goodsform: {
                    name: '',
                    code: "",
                    spec: '',
                    retailPrice: 0,
                    purchasePrice: 0,
                    storageNum: 0,
                    supplierName: '',
                },
                rules: {
                   
                },
                columns:[
                    {
                        type:'index',
                        label:'序号',
                        width:'100',
                        sequence:true
                    },
                    {
                        prop:'name',
                        label:'商品名称'
                    },
                     {
                        prop:'code',
                        label:'商品编码'
                    },
                     {
                        prop:'spec',
                        label:'商品规格'
                    },
                     {
                        prop:'retailPrice',
                        label:'零售价'
                    },
                     {
                        prop:'purchasePrice',
                        label:'进货价'
                    },
                     {
                        prop:'storageNum',
                        label:'库存数量'
                    },
                     {
                        prop:'supplierName',
                        label:'供应商'
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
                prop: 'name',
                type: 'input',
                label: '商品名称',
                placeholder:'商品名称'

                },
                {
                prop: 'code',
                type: 'input',
                label: '商品编号',
                placeholder:'商品编号'

                },
                {
                prop: 'supplierName',
                type: 'input',
                label: '选择供应商',
                placeholder:'选择供应商'

                },
                {
                type: 'slot',
                slot_name: 'button'

                },

                 ],
                 	dialogFormItem: [{
						label: '商品名称',
						type: 'input',
						prop: 'name',
					},
					{
						label: '商品编码',
						type: 'input',
						prop: 'code'
					},
					{
						label: '商品规格',
						type: 'input',
						prop: 'spec'
					},
					{
						label: '零售价',
						type: 'input',
						prop: 'retailPrice'
					},
                    {
						label: '进货价',
						type: 'input',
						prop: 'purchasePrice'
					},
                    {
						label: '库存数量',
						type: 'input',
						prop: 'storageNum'
					},{
                        prop:'supplierName',
                        type: 'input',
                        label: '供应商',
                    }
				],
                dialogConfig: {
					title: '商品新增',
					width: '500px',
					formWidth: '400'
				},
                dialogRules: {
					 name: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    }, ],
                    code: [{
                        required: true,
                        message: '请输入商品编码',
                        trigger: 'blur'
                    }, ],
                    retailPrice: [{
                        required: true,
                        message: '请输入零售价',
                        trigger: 'blur'
                    }, ],
				},

            };
        },
        methods: {
            // 获取数据
            async getGoodsList() {
                try {
                    const {
                        count,
                        rows
                    } = await goodsApi.getMember(this.page, this.size, this.goodsQueryParams)
                    this.total = count
                    this.goodsList = rows
                } catch (error) {
                    console.log(error);

                }
            },
            // 条数发生变化触发
            handleSizeChange(size) {
                this.size = size
                this.getGoodsList()
            },
            // 页码发生变化触发
            handleCurrentChange(page) {
                this.page = page
                this.getGoodsList()
            },
            // 表单查询
            searchGoods() {
                // console.log(this.goodsQueryParams);
                this.page = 1
                this.getGoodsList()
            },
              handleDialog() {
				if (!this.id=='') {
					this.editok()
				} else {
					this.addok()
				}
			},
            // 打开模态框
            openBox(id) {
                console.log(typeof id);
                this.dialogFormVisible = true
                if (typeof id === 'number') {
                    this.dialogConfig.title = '编辑商品'
                    this.findOneGoods(id)
                    return
                } else {
                    this.dialogConfig.title='添加商品'
                }

            },
            add(formName){
                this.$refs[formName].validate((valid) => {
                    if(!valid) return
                     this.goodsform.id ? this.editok() : this.addok()
                })
            },
            // 确定按钮
            async addok() {
                //  console.log(this.goodsform,'goodsform');
                try {
                    const res = await goodsApi.addMember(this.goodsform)
                    this.$message.success('新增成功')
                    this.getGoodsList()
                    this.dialogFormVisible = false
                } catch (error) {
                    console.log(error);
                }

            },
            // 查询单个商品
            async findOneGoods(id) {
                try {
                    const res = await goodsApi.oneList(id)
                    // console.log(res);
                    this.goodsform = res
                    this.id=id
                    
                } catch (error) {
                    console.log(error);
                }
            },
            // 确定编辑
            async editok() {
                try {
                    const res=await goodsApi.editList(this.goodsform.id,this.goodsform)
                    this.$message.success('编辑成功')
                    this.dialogFormVisible=false
                    this.getGoodsList()
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
                        this.page=1
                        this.FormReset()
                        const res = await goodsApi.getDel(id)
                        this.$message.success('删除成功')
                        this.getGoodsList()
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
            // 表单重置
            FormReset() {
                this.$refs['goodsForm'].handleRestForm()
            }

        },
        created() {
            this.getGoodsList()
        },

    }
</script>
<style scoped lang="scss">

</style>