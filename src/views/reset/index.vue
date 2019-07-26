<template>
  <div class='base_bg_container'>
    <div class='reset-container'>
        <div class='titlebar'>
          <i class='titleleftbar'></i>
          <span>修改密码</span>
        </div>
         <el-form ref="resetForm" :model="resetForm" :rules="resetFormRules" class="reset-form" auto-complete="on"
           label-position="left" label-width='100px'>

           <el-form-item prop="oldpwd" label='原密码'>

             <el-input :key="passwordType0" ref="password1" v-model="resetForm.oldpwd" :type="passwordType0"
               placeholder="请输入原密码" name="password" tabindex="2" auto-complete="on" />
            
           </el-form-item>
           <el-form-item prop="newpwd" label='新密码'>

             <el-input :key="passwordType1" ref="password1" v-model="resetForm.newpwd" :type="passwordType1"
               placeholder="请输入新密码" name="password" tabindex="2" auto-complete="on" />
              <i class='notice'>密码必须由6-20英文字母和数字的字符组成</i>
           </el-form-item>

           <el-form-item prop="renewpwd" label='确认密码'>

             <el-input :key="passwordType2" ref="password2" v-model="resetForm.renewpwd" :type="passwordType2"
               placeholder="请再次输入密码" name="password" tabindex="2" auto-complete="on" />

           </el-form-item>
         </el-form>
         
    </div>
      <div class='btncenter'>
        <el-button type="primary" round @click.native.prevent="handlereset">确定
        </el-button>
        <el-button round @click.native.prevent="handlecancel">取消
        </el-button>
      </div>
  </div>
</template>
<script>
  import { validPassword } from '@/utils/validate'
  export default {
    name: 'Rest',
    data() {
       var validatePassold = (rule, value, callback) => {
          if (!value) {
            callback(new Error('请输入旧密码'));
          } else if (!validPassword(value)) {
            callback(new Error('密码长度为6 - 18个字符'))
          } else {
            callback();
         }
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'));
        } else if (!validPassword(value)) {
          callback(new Error('密码长度为6 - 20个字符'))
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetForm.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
      resetForm: {
          oldpwd:'',
          newpwd: '',
          renewpwd: ''
      },
      passwordType0: 'password',
      passwordType1: 'password',
      passwordType2: 'password',

      resetFormRules: {
         oldpwd: [
         { required: true, validator: validatePassold, trigger: 'blur' }
         ],
          newpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
          ],
          renewpwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
          ]
      },

      }
    },
    methods: {
      handlereset() {
      //请求接口，成功跳转登录页
        this.$router.push({path:'/'})
      },
      handlecancel() {
      //取消，清空表单
      this.$refs.resetForm.resetFields()
      },
    
    }
  }
</script>
<style lang="scss">
  $bg:#283443;
  $light_gray:#aaa;
  $cursor: #aaa;
.el-input {
  display: inline-block;
  height: 47px;
  input {
    background: transparent;
     width:200px;
    -webkit-appearance: none;
     border: 1px solid #ddd;
     border-radius: 5px;
    padding: 0 0 0 10px;
    color: $light_gray;
    height: 47px;
    caret-color: $cursor;
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $bg inset !important;
      -webkit-text-fill-color: $cursor !important;
    }
  }

}
</style>

<style lang="scss" scoped>

  $dark_gray:#889aa4;
  $light_gray:#000;

  .base_bg_container { 
    overflow: hidden; 
    .titlebar{
      padding:10px 0 0 10px;
     
      span{
        color: #333;
        font-size: 15px;
      }
    }
        
    .reset-container{
      background:#fff;
       .reset-form {
        position: relative;
        max-width: 100%;
        padding: 10px 35px;
        overflow: hidden;
       }
       
    }
   .btncenter{
      padding: 20px 0 0 20px;
   }
   .notice{
      font-style: normal;
      position: absolute;
      left: 210px;
      top: 7px;
      color: #f00;
   }
  }
</style>