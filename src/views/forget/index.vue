<template>
  <div class="login-container">
    <div class='login-inner-container'>
      <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" class="forget-form" auto-complete="on"
        label-position="left">
        <div class="title-container">
          <span class="title">找回密码</span>
        </div>
        <el-form-item prop="phoneNum">
          <span class="svg-container">
            <svg-icon icon-class="phonegreen" />
          </span>
          <el-input ref="phoneNum" v-model="forgetForm.phoneNum" placeholder="请输入手机号" tabindex="2" />
        </el-form-item>

        <el-form-item prop="yanzhengma">
          <el-row>
            <el-col :span="13">
              <span class="svg-container">
                <svg-icon icon-class="dunpaigreen" />
              </span>
              <el-input ref="yanzhengma" v-model="forgetForm.yanzhengma" placeholder="请输入验证码" tabindex="2" />
            </el-col>
            <el-col :span="11" class='rowright'>
              <el-button plain @click='postMess' v-show="sendAuthCode" size='mini' type='primary'>发送短信验证码</el-button>
              <el-button plain @click='postMess' v-show="!sendAuthCode" size='mini' type='primary'>{{auth_time}}秒之后重新发验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>

        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handlecommit">提交
        </el-button>
        <el-button style="width:100%;margin-bottom:30px;margin-left:0" @click.native.prevent="handlecancel" >取消
        </el-button>
      </el-form>
    </div>
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
      this.$router.push('/login')
    },
    //短信验证码
    postMess(){
      const verification =this.forgetForm.phoneNum;
      //get请求数据

      this.sendAuthCode = false;

      //设置倒计时秒
      this.auth_time = 60;
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
    background:#fff !important;
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
 .el-button--medium{
   border-radius: 17px !important;
 }
</style>

<style lang="scss" scoped>

.login-container {
    min-height: 100%;
    width: 100%;
  .login-inner-container{
    position: relative;
    .forget-form {
      width: 35%;
      position: absolute;
      top:30%;
      right:10%;
    }
  }
}
.el-form-item{
  border-bottom:1px solid #ddd;
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
