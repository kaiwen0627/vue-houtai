<template>
  <div class="app-container">
    <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item prop="name">
        <el-input v-model="formInline.name" placeholder="请输入平台(账套)编号/名称" size="small" />
      </el-form-item>
      <el-form-item prop="area">
        <el-select v-model="formInline.area" placeholder="请选择所属区域" size="small" @change="areachange">
          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
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
      <span>详细信息</span>
      <el-button type="primary" icon="el-icon-circle-plus-outline" round size="small" @click="addBtn">新增平台</el-button>
    </div>
    <el-table ref="singleTable" :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column property="date" label="日期" width="120" />
      <el-table-column property="name" label="姓名" width="120" />
      <el-table-column property="address" label="地址" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailBtn(scope)">详情</el-button>
          <el-button type="text" size="small" @click="editBtn">编辑</el-button>
          <el-button type="text" size="small" @click="setBtn">配置功能</el-button>
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
</template>

<script>

export default {
  name: 'AcManagener',
  data() {
    return {
      formInline: {
        name: '',
        area: '',
        status: ''
      },
      areaOptions: [
        {
          id: 1,
          value: 'tj',
          label: '天津'
        },
        {
          id: 2,
          value: 'bj',
          label: '北京'
        }
      ],
      statusOptions: [
        {
          id: 1,
          value: 'yqy',
          label: '已启用'
        },
        {
          id: 2,
          value: 'wqy',
          label: '未启用'
        }
      ],
      areaSelect: '',
      statusSelect: '',
      tableData: [
        {
          date: '1',
          name: '1',
          address: '1'
        }
      ],
      currentPage: 1,
      size: 10, // 每页的条数
      sizes: [5, 10, 15, 20],
      count: 0 // 总页码
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
      var currentPage = {
        'current': val,
        'size': this.size
      }
    },
    handleSizeChange(val) {
      console.log(val)
    }
  }
}

</script>
<style lang="scss" scoped>
  .detailContent{
    overflow: hidden;
    span{
      float: left;
    }
    button{
      float:right;
    }

  }
</style>
