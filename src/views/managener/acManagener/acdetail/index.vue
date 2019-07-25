<template>
  <div class='base_bg_container'>
    <div class="editPlate-container">
      <div class="detailContent">
        <p><i class='titleleftbar'></i><span>平台基本信息</span></p>
        <el-button type="primary" round size="small" @click="edit">编辑</el-button>
      </div>
    </div>  
  </div>
</template>
<script>
  export default {
    name:'AcMangentdetail',
    data(){
      return{

      }
    },
    mounted() {
     
    },
    methods: {
      edit(){

      }
    },
  }
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.editPlate-container{
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
}
</style>