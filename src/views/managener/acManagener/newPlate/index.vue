<template>
  <div class='newPlate-container'>    
    <el-form ref="form" :model="form" label-width="150px" :rules="formRules">
      <el-form-item label="分管账套名称" prop='name'>
        <el-input v-model="form.name" size='small'></el-input>
      </el-form-item>
      <el-form-item label='平台名称' prop='pname'>
        <el-input v-model="form.pname" size='small'></el-input>
      </el-form-item>
      <el-form-item label='所在区域' prop='city'>
        <sanji :fillData='filldataArr' @ssqchange='changesanji' v-model='form.city' ></sanji>
      </el-form-item>
      <el-form-item label="使用周期" prop='data'>
        <el-col :span="5">
          <el-date-picker type="date" ref = 'date1' placeholder="选择开始日期" v-model="form.data.date1" style="width: 100%;" size='small'
            format=' yyyy-MM-dd'>
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
        <el-col :span="5">
          <el-date-picker type="date" ref = 'date2' placeholder="选择截止日期" v-model="form.data.date2" style="width: 100%;" size='small'
            format=' yyyy-MM-dd'>
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="禁用状态" prop='delivery' required >
        <el-switch v-model="form.delivery" active-color="#13ce66" inactive-color="#ddd"></el-switch>
      </el-form-item>     
        <el-form-item label="管理员姓名" prop='glname'>
          <el-input v-model="form.glname" size='small'></el-input>
        </el-form-item>
        <el-form-item label='管理员账号' prop='glacNum'>
          <el-input v-model="form.glacNum" size='small'></el-input>
        </el-form-item>
      <el-form-item label="备注" prop='desc'>
        <el-input type="textarea" v-model="form.desc" size='small'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size='small'>确定</el-button>
        <el-button type="primary" @click="onSave" size='small'>保存</el-button>
        <el-button @click='onCancel' size='small'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import sanji from '@/components/sanjiliandong'
  export default {
  name:'NewPlate',
  components:{
    sanji
  },
  data(){
    var checkData=(rule, value, callback)=>{     
      if(value.date1!=='' && value.date2==''){
        callback(new Error('请选择截止日期'));
      }else if(value.date1=='' && value.date2==''){
      callback(new Error('请选择使用周期'));
      }else{
         callback();
      }
    }
    var checkCity=(rule, value, callback)=>{
      if(value==''){
        callback(new Error('请选择所在区域'));
      }else{
        callback();
      }
    }
    return{
      filldataArr:[], //三级联动数据回填
      sanjidata:'',
      form:{
        name:'',
        pname:'',
        city:'',
        data:{
            date1:'',
            date2:'',
        },
        delivery:false,
        glname:'',
        glacNum:'',
        desc:''
      },
      formRules:{
        name: [{ required: true, message: '请输入分管账套名称', trigger: 'blur' }],
        pname:[{ required: true, message: '请输入平台名称', trigger: 'blur' }],
        glname:[{ required: true, message: '请输入管理员名称', trigger: 'blur' }],
        glacNum:[{ required: true, message: '请输入管理员账号', trigger: 'blur' }],
        data:[{ required: true, message: '请选择使用周期', trigger: ['blur','change'], validator: checkData}],
        city:[{ required: true, message: '请选择所在区域', trigger: ['blur','change'], validator: checkCity}],
       
      }
    }
    
  },
  methods:{
    changesanji(data){
      console.log(data)
      this.form.city = data
      this.sanjidata = data      
    },
    onSubmit(){
      this.$refs.form.validate((valid) => {
      if (valid) {
        //提交表单请求数据
      console.log('submit!');
      this.$refs.form.resetFields()
      this.form.data.date1=''
      this.form.data.date2=''
      this.$emit('closeDia')
      } else {     
      return false;
      }
      });
    },
    onSave(){},
    onCancel(){            
      this.$refs.form.resetFields()
      this.form.data.date1=''
      this.form.data.date2=''
    }
  }
}
</script>
<style lang="scss">
  .el-input{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width:200px;
  }
  .el-textarea {
    display: inline-block;
    width: 400px;
    vertical-align: bottom;
    font-size: 14px;
  }
</style>
<style lang="scss" scoped>

</style>