<template>
 <div class="login-container">
   <div class='login-inner-container'>
      <el-form ref="forgetForm" :model="forgetForm" :rules="resetFormRules" class="forget-form" auto-complete="on"
        label-position="left">
        <div class="title-container">
          <span class="title">重置密码</span>
        </div>
        <el-form-item prop="newpwd">
          <span class="svg-container">
            <svg-icon icon-class="passwardgreen" />
          </span>
          <el-input :key="passwordType1" ref="password1" v-model="forgetForm.newpwd" :type="passwordType1"
            placeholder="请输入新密码" name="password" tabindex="2" auto-complete="on"  />
        
        </el-form-item>

        <el-form-item prop="renewpwd">
          <span class="svg-container">
            <svg-icon icon-class="passwardgreen" />
          </span>
          <el-input :key="passwordType2" ref="password2" v-model="forgetForm.renewpwd" :type="passwordType2"
            placeholder="请再次输入密码" name="password" tabindex="2" auto-complete="on"  />
          
        </el-form-item>

        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handlereset">重置
        </el-button>
        <el-button style="width:100%;margin-bottom:30px;margin-left:0" @click.native.prevent="handlecancel">取消</el-button>
      </el-form>
    </div>  
  </div>
</template>
<script>
  import { validPassword } from '@/utils/validate'
  export default {
    name: 'ResetLogin',
    data() {
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
        } else if (value !== this.forgetForm.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        forgetForm: {
          newpwd: '',
          renewpwd: ''
        },

        passwordType1: 'password',
        passwordType2: 'password',

        resetFormRules: {
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
        this.$router.push({path:'/resetLoginSuccess'})
      },
      handlecancel() {
        //取消，清空表单
        this.$refs.forgetForm.resetFields()
      },
      showPwd1() {
        if (this.passwordType1 === 'password') {
          this.passwordType1 = ''
        } else {
          this.passwordType1 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password1.focus()
        })
      },
      showPwd2() {
        if (this.passwordType2 === 'password') {
          this.passwordType2 = ''
        } else {
          this.passwordType2 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password2.focus()
        })
      }
  

    }
  }
</script>
<style lang="scss">
  $cursor: #333;
  $panGreen: #1ccab5;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $cursor !important;
      height: 47px;
      caret-color: $cursor !important;

    }


    .el-form-item {
      background: #fff !important;
      border-radius: 5px;
      color: #000;
    }
  }

  .svg-icon {
    width: 1.5rem !important;
    height: 1.5rem !important;
    vertical-align: middle !important;
  }

  .el-button--mini {
    border-radius: 30px !important;

  }

  .el-button--medium {
    border-radius: 17px !important;
  }
</style>

<style lang="scss" scoped>
  .login-container {
    min-height: 100%;
    width: 100%;

    .login-inner-container {
      position: relative;

      .forget-form {
        width: 35%;
        position: absolute;
        top: 30%;
        right: 10%;
      }
    }
  }

  .el-form-item {
    border-bottom: 1px solid #ddd;
  }
  .title-container {
    margin:0 0 20px 0 ;
    .title {
    font-size: 1.5rem;
    color: #333;
    margin: 0px auto 40px auto;
    text-align: center;

    }
  }
</style>

