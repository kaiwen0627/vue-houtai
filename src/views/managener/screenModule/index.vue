<template>
  <div class="base_bg_container">
    <div class="app-container">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item prop="name" label="模板名称：">
          <el-input v-model="formInline.name" placeholder="请输入平台(账套)编号/名称" size="small" />
        </el-form-item>
        <el-form-item prop="status" label="启用状态：">
          <el-select v-model="formInline.status" placeholder="请选择启用状态" size="small" @change="statuschange">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" round @click="onSearch">搜索</el-button>
          <el-button size="mini" round @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="detailContent">
        <p><i class="titleleftbar"></i><span>详细数据</span></p>
        <el-button type="primary" icon="el-icon-circle-plus-outline" round size="mini" @click="addBtn" class='addplat'>
          新增模板</el-button>
      </div>
      <el-table ref="singleTable" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="date" label="模板名称" />        
        <el-table-column prop="name" label="启用状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.name" active-color="#13ce66" inactive-color="#ff4949" />
          </template>
        </el-table-column>
        
        <el-table-column prop="name" label="建立时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
          
            <el-button type="text" size="mini" @click="editBtn(scope)">编辑</el-button>
         
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pageBox">
        <el-pagination :current-page="currentPage" :page-sizes="sizes" :page-size="size"
          layout="total, sizes, prev, pager, next, jumper" :total="count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>

    </div>

    <!-- 新增模板 -->
    <el-dialog title="新增 / 编辑 模板" :visible.sync="dialogTableVisible" :append-to-body=true>
       <el-form ref="form" :model="form" label-width="150px" :rules="formRules" class='addplate'>
         <el-form-item label="分管账套名称" prop="name">
           <el-input v-model="form.name" size="small" /><i class="notice">模板名字不能重复，且不能超过20个汉字</i>
         </el-form-item>       
         <el-form-item label="备注说明" prop="desc">
           <el-input v-model="form.desc" type="textarea" size="small" />
         </el-form-item>
        </el-form>
        <div class='btngroup'>
          <el-button type="primary" round size='mini' @click='commit'>确定</el-button>
          <el-button round size='mini' @click='cancel'>取消</el-button>
        </div>
    </el-dialog>


  </div>
</template>

<script>
 
  export default {
    name: 'AcManagener',
    data() {
      const checkName = (rule, value, callback) => {
        if(/^[\u4e00-\u9fa5]{1,20}$/.test(value)){
          callback(new Error('请输入模板名字，且不能超过20个汉字'))
        }
      }
      return {
        formInline: {
          name: '',
          status: ''
        },
        areaOptions: [],
        statusOptions: [],
        areaSelect: '',
        statusSelect: '',
        tableData: [{
            date: '1',
            name1: '1222',
           
          }
        ],
        currentPage: 1,
        size: 10, // 每页的条数
        sizes: [5, 10, 15, 20],
        count: 0 ,// 总页码
        dialogTableVisible:false,
     
        form:{
          name:'',
          desc:''
        },

        formRules:{
          name:[{required: true,  trigger: 'blur' ,validator: checkName}],
          desc:[{required: true,message:'请输入链接地址', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        // this.listLoading = true
        // let obj = {
        //   pageNum:'1',
        //   type:'1'

        // }
        // gettableDate(obj).then(response => {
        //   console.log(response)
        // })
      },
     
      statuschange(value) {
        let obj = {}
        obj = this.statusOptions.find((item) => {
          return item.value === value
        })
        this.statusSelect = obj.label
      },
      onSearch() {},
      onReset() {
        this.$refs.formInline.resetFields()
      },
      addBtn() {
        this.dialogTableVisible = true
      },
   
      editBtn(scope) {
        this.dialogTableVisible = true
      },
      // 分页功能
      handleCurrentChange(val) {
        this.currentPage = val
        // var currentPage = {
        //   'current': val,
        //   'size': this.size
        // }
      },
      handleSizeChange(val) {
        console.log(val)
      },
      commit(){
        this.dialogTableVisible = false
      },
      cancel(){
        this.dialogTableVisible = false
      }
    }
  }
</script>
<style lang="scss">
  .el-form-item {
    margin-bottom: 0;
  }

  .el-form-item__content {
    vertical-align: middle !important;
  }

  .el-input__inner {
    border-radius: 5px !important;
  }

  .btn-prev,
  .btn-next {
    margin: 0 3px !important;
    border-radius: 5px !important;
  }

  .el-pager {
    li {
      margin: 0 3px !important;
      border-radius: 5px !important;
    }
  }
</style>
<style lang="scss" scoped>
  .detailContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin: 20px 0 0 0;
    padding: 0 0 0 20px;
    border-bottom: 1px solid #eee;

    span {
      padding: 0 0 0 10px;
    }

  }

  .app-container {
    padding: 0;

    .demo-form-inline {
      background: #fff;
      padding: 0 20px;

      height: 60px;
      line-height: 60px;

    }
  }

  .el-pagination {
    text-align: right;
    padding: 10px 0 0 0;
  }


  .addplat {
    margin: 0 20px 0 0;
  }

  .notice{
   font-style: normal;
   position: absolute;
   left: 210px;
   top: 7px;
   color: #f00;
  }
  .addplate{
      .el-input {
          width:37%;
      }
  }
  
  .el-textarea{
    width:50%;
  }
  .btngroup{
    margin:20px 0 0 0;
    text-align: center;
  }
</style>
