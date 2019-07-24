<template>
  <div class="app-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref='formInline'>
        <el-form-item prop="name">
          <el-input v-model="formInline.name" placeholder="请输入平台(账套)编号/名称" size='small'></el-input>
        </el-form-item>
        <el-form-item prop="area">
         <el-select v-model="formInline.area" placeholder="请选择所属区域" size='small' @change='areachange'>
           <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value">
           </el-option>
         </el-select>
        </el-form-item>
         <el-form-item prop="status">
           <el-select v-model="formInline.status" placeholder="请选择启用状态" size='small' @change='statuschange'>
             <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size='small' round>查询</el-button>
          <el-button @click="onReset" size='small' round>重置</el-button>
        </el-form-item>
      </el-form>
      <div class='detailContent'>
          <span>详细信息</span>
          <el-button type="text" icon="el-icon-circle-plus-outline" @click='addBtn'>新增平台</el-button>
      </div>
      <el-table ref="singleTable" :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column property="date" label="日期" width="120">
          </el-table-column>
          <el-table-column property="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column property="address" label="地址">
           </el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="text" @click='detailBtn(scope)' size='small'>详情</el-button>
                <el-button type="text" @click='editBtn' size='small'>编辑</el-button>
                <el-button type="text" @click='setBtn' size='small'>配置功能</el-button>
              </template>
           </el-table-column>
      </el-table>
      <!-- 新增平台弹框 -->
      <el-dialog title="新增平台" :visible.sync="dialogTableVisible" :modal-append-to-body='false'>
        <addPlate @closeDia='closeaddDialog'></addPlate>
      </el-dialog>
      <!-- 配置功能弹框  -->
      <el-dialog title="配置功能" :visible.sync="dialogSetTableVisible" :modal-append-to-body='false'>
       
      </el-dialog>
  </div>
</template>

<script>
import addPlate from './newPlate/index'
export default {
  name:'AcManagener',
  components:{
    addPlate
  },
  data() {
    return {
      formInline:{
        name:'',
        area:'',
        status:''
      },
      areaOptions:[
        {
          id:1,
          value:'tj',
          label:'天津'
        },
        {
          id:2,
          value:'bj',
          label:'北京'
        }
      ],
      statusOptions:[
        {
          id:1,
          value:'yqy',
          label:'已启用'
        },
        {
          id:2,
          value:'wqy',
          label:'未启用'
        }
      ],
      areaSelect:'',
      statusSelect:'',
      tableData:[
        {
          date:'1',
          name:'1',
          address:'1'
        }
      ],
      dialogTableVisible:false,
      dialogSetTableVisible:false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    areachange(value){
        let obj = {};
        obj = this.areaOptions.find((item)=>{
        return item.value === value;
        });
        this.areaSelect = obj.label;
    },
    statuschange(value){
        let obj = {};
        obj = this.statusOptions.find((item)=>{
        return item.value === value;
        });
        this.statusSelect = obj.label;
    },
    onSubmit(){},
    onReset(){
      this.$refs.formInline.resetFields()
    },
    addBtn(){
     // this.$router.push({path:'/newPlate'})
     this.dialogTableVisible = true
    
    },
    detailBtn(scope){
      this.dialogTableVisible = true
      console.log(scope);
      
    },
    editBtn(){},
    setBtn(){
        this.dialogSetTableVisible = true
    },
    closeaddDialog(){
      this.dialogTableVisible = false
    
    }
  }
}
</script>
