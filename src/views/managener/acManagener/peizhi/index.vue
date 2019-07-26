<template>
  <div class='base_bg_container'>
    <div class="editPlate-container">
      <div class="detailContent">
        <p><i class='titleleftbar'></i><span>配置功能</span></p>        
      </div>      
      <div class='houduan'>
          <div class='qianduanTop'>
            <span class='bggrey'>
              <el-checkbox v-model="hdchecked" @change="hdcheckedAll" /> 前端功能(app功能)
            </span>
            <div>
              <el-button type="primary" round size="mini" @click="hdcommit">确定</el-button>
              <el-button round size="mini" @click="hdcancel">取消</el-button>
            </div>
          </div>
          <el-tree :data="hddata" show-checkbox node-key="id" :default-expanded-keys="[1,2]" :default-checked-keys="[3]"
            :props="hddefaultProps" ref="vuetreeh" @node-click="hdnodeclick">
          </el-tree>
      </div>
    </div>
    <div class='btngroup'>
      <el-button type="primary" round size="mini" @click="commit">确定</el-button>
      <el-button round size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AcMangentdpeizhi',
    data() {
      return {   
        hdchecked:false,
          hddata:[
            {
              id: 1,
              label: '一级 1',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }
          ],
        hddefaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    mounted() {

    },
    methods: {
      
      hdcheckedAll(){
        if (this.hdchecked) {
        //全选
        this.$refs.vuetreeh.setCheckedNodes(this.hddata);
        }else{
        //取消选中
        this.$refs.vuetreeh.setCheckedKeys([]);
        }
      },
      hdcommit(){},
      hdcancel(){},
      hdnodeclick(date, node, slef){},
      commit(){},
      cancel(){}

  },
  }
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
  .editPlate-container {
    background: #fff;
    padding-bottom:20px;
    .detailContent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;

      span {
        padding: 0 0 0 10px;
      }
    }
    .qianduan,.houduan{
      border:1px solid #eee;
      padding:0 0 10px 0;
      margin:20px 40px;
      .qianduanTop{
        display: flex;
        justify-content: space-between;
        padding:0 20px;
        background:#efefef;
        height:40px;
        line-height:40px;
      }
    }


  }
  .btngroup{
    margin:30px 0 0 0;
  }
</style>