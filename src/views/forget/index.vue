<template>
  <div class="login-container">
   <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" class="forget-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">找回密码</h3>
      </div>
      <el-form-item prop="phoneNum">
        <span class="svg-container">
          <svg-icon icon-class="iPhone" />
        </span>
        <el-input ref="phoneNum" v-model="forgetForm.phoneNum" placeholder="请输入手机号" tabindex="2" />
      </el-form-item>

      <el-form-item prop="yanzhengma">
       <el-row>
         <el-col :span="13">
           <span class="svg-container">
             <svg-icon icon-class="key" />
           </span>
           <el-input ref="yanzhengma" v-model="forgetForm.yanzhengma" placeholder="请验证码" tabindex="2" />
         </el-col>
         <el-col :span="11" class='rowright'>
           <el-button plain @click='postMess' v-show="sendAuthCode">发送短信验证码</el-button>
           <el-button plain @click='postMess' v-show="!sendAuthCode">{{auth_time}}秒之后重新发验证码</el-button>
         </el-col>
       </el-row>
       
      </el-form-item>
      
      <el-button type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handlecommit">提交</el-button>
      <el-button style="width:100%;margin-bottom:30px;margin-left:0"
          @click.native.prevent="handlecancel">取消</el-button>
    </el-form>

  </div>
</template>
<script>
export default {
  name:'Forget',
  data(){
   const validatephone = (rule, value, callback) => {     
      if (!value) {
        callback(new Error('请输入手机号'))
      }else if(!(/^1[345789]\d{9}$/.test(value))){
        callback(new Error('请输入正确手机号'))
      }else {
        callback()
      }
   }
    const validateyanzhengma = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入验证码'))
    }else {
      callback()
    }
    }
    return{
      forgetForm:{
        phoneNum:'',
        yanzhengma:''
      },
      forgetRules:{
       phoneNum:[{required: true, trigger: 'blur', validator: validatephone }],
       yanzhengma:[{required: true, trigger: 'blur', validator: validateyanzhengma }]
      },
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
      auth_time: 0, /*倒计时 计数器*/
    }
  },
  methods:{
    handlecommit(){
      //发送请求。成功跳转密码重置页面
      this.$router.push({path:'/resetLogin'})
    },
    handlecancel(){
      //取消清空表单
      this.$refs.forgetForm.resetFields()
    },
    //短信验证码
    postMess(){
      const verification =this.forgetForm.phoneNum;
      //get请求数据

      this.sendAuthCode = false;

      //设置倒计时秒
      this.auth_time = 10;
      var auth_timetimer = setInterval(()=>{
      this.auth_time--;
      if(this.auth_time<=0){ 
        this.sendAuthCode=true; 
        clearInterval(auth_timetimer);
       } 
      }, 1000);
    }
    
  }
}
</script>
<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
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
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
     .el-form-item__content{
        font-size:20px;
     }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .forget-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .forgetMi {
      display: block;
      text-align: right;
      color: #fff;
      margin: 0 0 10px 0;
    }
    .rowright{
      text-align: right;
      line-height: 54px;
    }
  }
 
</style>
