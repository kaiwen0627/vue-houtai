<template>
  <div class='base_bg_container'>
    <div class="editPlate-container">
      <div class="detailContent">
        <p><i class='titleleftbar'></i><span>平台基本信息</span></p>
        <div>
                <!-- <el-button type="primary" round size="mini" @click="edit">编辑</el-button> -->
                <!-- <el-button type="primary" plain size="mini" @click="back">返回</el-button> -->
                <router-link :to="'/managener/acMangentedit/'+this.$route.params.id" class='cblue'>
                   <el-button type="primary" round size="mini">编辑</el-button>
                   </el-button>
                </router-link>
          </div>
       
      </div>
      <ul class='detailList'>
        <li>
          <span>分管账号名称:</span><span class='textgrey'></span>
        </li>
        <li>
          <span>平台名称:</span><span class='textgrey'></span>
        </li>
        <li>
          <span>所属区域:</span><span class='textgrey'></span>
        </li>
        <li>
          <span>使用周期:</span><span class='textgrey'></span>
        </li>
        <li>
          <span>启用状态:</span><span class='textgrey'></span>
        </li>
        <li>
          <span>管理员姓名:</span><span class='textgrey'></span>
        </li>
        <li>
          <span>建立时间:</span><span class='textgrey'></span>
        </li>
        <li>
          <span>备注说明:</span><span class='textgrey'></span>
        </li>
      </ul>
    </div>  

    <div class="editPlate-container-history">
      <div class="detailContent">
        <p><i class='titleleftbar'></i><span>修改历史记录</span></p>
        
      </div>
      <el-table ref="singleTable" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="date" label="操作时间" />
        <el-table-column prop="date" label="变更类型" />
        <el-table-column prop="date" label="变更前信息" />
        <el-table-column prop="date" label="变更后信息" />
        <el-table-column prop="date" label="操作账号" />
        
     
    
      </el-table>
      <!-- 分页 -->
      <div class="pageBox">
        <el-pagination :current-page="currentPage" :page-sizes="sizes" :page-size="size"
          layout="total, sizes, prev, pager, next, jumper" :total="count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange"  size='small'/>
      </div>
      
    </div>
  </div>
</template>
<script>
  export default {
    name:'AcMangentdetail',
    data(){
      return{
            currentPage: 1,
            size: 10, // 每页的条数
            sizes: [5, 10, 15, 20],
            count: 0 ,// 总页码
            tableData:[
              {
                data:'1'
              }
            ]
      }
    },
    mounted() {
    // this.aaaa()
    },
    methods: {
      // aaaa(){
      //     //console.log(this.$route.params.id)
      // },
      // edit(){
      //   this.$router.push({path:'/acMangentedit'})
      // },
        // 分页功能
      handleCurrentChange(val) {
        this.currentPage = val
        // var currentPage = {
        // 'current': val,
        // 'size': this.size
      // }
      },
      handleSizeChange(){

      },
      // back(){
      //   this.$router.go(-1)
      // }
    }
  }
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.editPlate-container,.editPlate-container-history{
  background: #fff;
  .detailContent{
    display:flex;
    justify-content:space-between;
    align-items:center;
    height: 50px;
    line-height:50px;
    padding:0 10px;
    span{
      padding:0 0 0 10px;
    }
  }
  .detailList{  
    margin:0 0 0 50px;      
  }
}
.editPlate-container-history{
  margin:20px 0 0 0;
}
.pageBox{
  padding:20px 0 10px 0;
  text-align: right;
}
</style>