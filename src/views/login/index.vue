<template>
  <div class="login-container">
    <div class='login-inner-container'>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
          label-position="left">

          <div class="title-container">
            <h3 class="title">
              <svg-icon icon-class="loopgreen" />
              <span>城市废弃物回收系统总后</span>
            </h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="usergreen" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text"
              tabindex="1" autocomplete="on" />
          </el-form-item>

         
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="passwardgreen" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
              placeholder="请输入密码" name="password" tabindex="2" autocomplete="on" />              
          </el-form-item>

         <el-form-item prop="yanzhengma" class='yangzhengma'>
         
              <span class="svg-container">
                <svg-icon icon-class="dunpaigreen" />               
              </span>
              <el-input ref="yanzhengma" v-model="loginForm.yanzhengma" placeholder="请输入短信验证码" tabindex="2"
                  type="text" class='yangzhengmaIpt'/>
            
             <span class='rowright'>
               <el-button plain @click='postMess' v-show="sendAuthCode" size='mini' type='primary'>发送短信验证码</el-button>
               <el-button plain @click='postMess' v-show="!sendAuthCode" size='mini' type='primary'>{{auth_time}}秒之后重新发验证码</el-button>
            </span>

         </el-form-item>
     

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin">
            立即登录
          </el-button>         

          <div class='btngroups'>
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
            <router-link to='/forget' replace class='forgetMi'>忘记密码？</router-link>
          </div>
        </el-form>
        

    </div>   
  </div>
</template>

<script>
import { validUsername ,validPassword} from '@/utils/validate'


export default {
  name: 'Login',
 
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('请输入6-20数组字母组成的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        yanzhengma:'',
        remember:''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,      
      redirect: undefined,
      otherQuery: {},
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
      auth_time: 0, /*倒计时 计数器*/
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
       // debugger;
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    //短信验证码
    postMess(){
      const verification =this.loginForm.username;
      //get请求数据

      this.sendAuthCode = false;

      //设置倒计时秒
      this.auth_time = 60;
      var auth_timetimer = setInterval(()=>{
        this.auth_time--;
        if(this.auth_time<=0){ this.sendAuthCode=true; clearInterval(auth_timetimer); } }, 1000); 
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



</style>

<style lang="scss" scoped>

$dark_gray:#889aa4;
$light_gray:#333;

.login-container {
  min-height: 100%;
  width: 100%;
  .login-inner-container{
    position: relative;
    .login-form {
      width: 35%;
      position: absolute;
      top:30%;
      right:10%;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 1.5rem;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: normal !important;
    }
  }
  .btngroups{
    display: flex;
    justify-content: space-between;
    .forgetMi{
      display: block;
      text-align: right;
      color: $dark_gray;
      margin:0 0 10px 0;
    }
  }
  

  .rowright{
    text-align: right;
  }
}
.el-form-item{
  border-bottom:1px solid #ddd;
}
.yangzhengmaIpt{
  width: 40%;
}

</style>
