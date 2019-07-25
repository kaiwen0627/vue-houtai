<template>
 <div class="login-container">
   <div class='login-inner-container'>
      <el-form ref="forgetForm"  class="forget-form" auto-complete="on"
        label-position="left">
          <div class="title-container">
            <span class="title">重置成功</span>
          </div>
          <span class="svg-container">
            <svg-icon icon-class="successgreen" />
          </span>
          <p class='text'>
            密码设置完成, <span>{{auth_time}}s</span> 后即将跳转到登录页面
          </p>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handlerlogin">立即登录
          </el-button>
      </el-form>
   </div>
  </div>
</template>
<script>
export default {
  name:'ResetLoginSuccess',
  data(){
    return{
      auth_time:5
    }
  },
  mounted() {
    this.postMess()
  },
  methods:{
    handlerlogin(){
      this.$router.push({path:'/login'})
    },
    postMess(){
      //设置倒计时秒      
      var auth_timetimer = setInterval(()=>{
      this.auth_time--;
        if(this.auth_time<=0){ 
          this.$router.push({path:'/login'})
          clearInterval(auth_timetimer); 
        } 
      }, 1000); 
    }
  }
}
</script>
<style lang="scss">
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
  .title-container {
    margin:0 0 20px 0 ;
    .title {
    font-size: 1.5rem;
    color: #333;
    margin: 0px auto 40px auto;
    text-align: center;

    }
  }
  .svg-container{
    display: flex;
    justify-content: center;
    .svg-icon{
      width: 5rem !important;
      height: 5rem !important;
    }
  }
  .text{
    text-align: center;
    span{
      color:#1ccab5;
    }
  }
</style>