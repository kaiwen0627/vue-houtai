<template>
  <div class='base_bg_container'>
      <div class="app-container">
        <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item prop="name" label='平台(账套)编号/名称：'>
            <el-input v-model="formInline.name" placeholder="请输入平台(账套)编号/名称" size="small" />
          </el-form-item>     
          <el-form-item prop="status" label='启用状态：'>
            <el-select v-model="formInline.status" placeholder="请选择启用状态" size="small" @change="statuschange">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" round @click="onSubmit">查询</el-button>
            <el-button size="small" round @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="detailContent">
          <p><i class='titleleftbar'></i><span>详细信息</span></p>
          <el-button type="primary" icon="el-icon-circle-plus-outline" round size="small" @click="addBtn">新增平台</el-button>
        </div>
        <el-table ref="singleTable" :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column prop="date" label="分管账套组织名称" />
          <el-table-column prop="address" label="所属地区" />
          <el-table-column prop="address" label="平台名称" width="120" />
          <el-table-column prop="name1" label="管理员姓名" />
          <el-table-column prop="name" label="启用状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.name" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>   
          <el-table-column prop="name" label="使用周期" />
          <el-table-column prop="name" label="建立时间" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detailBtn(scope)">详情</el-button>
              <el-button type="text" size="small" @click="editBtn(scope)">编辑</el-button>
              <el-button type="text" size="small" @click="setBtn(scope)">配置功能</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pageBox">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="sizes"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

      </div>
  </div>
</template>

<script>
//import {gettableDate} from '@/api/acmanagener'
export default {
  name: 'AcManagener',
  data() {
    return {
      formInline: {
        name: '',        
        status: ''
      },
      areaOptions: [],
      statusOptions: [],
      areaSelect: '',
      statusSelect: '',
      tableData: [
        {
          date: '1',
          name1: '1222',
          address: '1'
        },
       
      ],
      currentPage: 1,
      size: 10, // 每页的条数
      sizes: [5, 10, 15, 20],
      count: 0 // 总页码
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
    areachange(value) {
      let obj = {}
      obj = this.areaOptions.find((item) => {
        return item.value === value
      })
      this.areaSelect = obj.label
    },
    statuschange(value) {
      let obj = {}
      obj = this.statusOptions.find((item) => {
        return item.value === value
      })
      this.statusSelect = obj.label
    },
    onSubmit() {},
    onReset() {
      this.$refs.formInline.resetFields()
    },
    addBtn() {
      this.$router.push({ path: '/acMangentnewPlate' })
    },
    detailBtn(scope) {
      this.dialogTableVisible = true
      console.log(scope)
    },
    editBtn() {},
    setBtn() {

    },
    closeaddDialog() {

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
    }
  }
}

</script>
<style lang="scss">
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__content{
    vertical-align: middle !important;
  }
  .el-input__inner{
    border-radius:5px !important;
  }
  .btn-prev,.btn-next{
    margin:0 3px !important;
    border-radius: 5px !important;
  }
  .el-pager{
    li{
      margin:0 3px !important;
      border-radius: 5px !important;
    }
  }
  .el-table{
    border-bottom-left-radius: 5px !important; 
     border-bottom-right-radius: 5px !important;
  }
</style>
<style lang="scss" scoped>
  .detailContent{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background: #fff;
    margin: 20px 0 0 0;
    padding: 0 0 0 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom:1px solid #eee;
    span{
      padding:0 0 0 10px;
    }
    button{
      margin:0 20px 0 0;
    }
  }
  .app-container{
    padding:0;
    .demo-form-inline{
      background: #fff;
      padding:0 20px;
      border-radius:5px;
      height:60px;
      line-height:60px;
      
    }
  }
 
  .el-pagination{
    text-align: right;
    padding:10px 0 0 0 ;
    
  }
</style>
