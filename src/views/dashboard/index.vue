<template>
  <div class="base_bg_container">
    <div class=" clearfix">
     
      <div class='content'>      
        <p class='nameCar'>名片</p>
        <svg-icon icon-class="personGrey" class='iconPerson'/>
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
        <p class="display_name">{{ name }}</p>
        <p>上次登录：</p>
        <router-link to='reset'>修改登录密码</router-link>
      </div>
     
  
    </div>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardEditor',

  data() {
    return {
     
    }
  },
 
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
  $greenMin:#1acab5;
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .base_bg_container {
   
    .pan-info-roles {
      font-size: 18px;
      font-weight:normal;
      color: #333;
      display: block;
    }
  
    .display_name {
      font-size: 15px;     
      color: #aaa;
      margin:0;
     
    }
    
  }
  .content{
    background: #fff;    
    padding:50px 50px 50px 130px;
    position: relative;
    .nameCar{
      margin:0;
      position: absolute;
      top:15px;
      left: 0;
      background:$greenMin;
      color: #fff;
      width: 65px;
      height: 25px;    
      line-height: 25px;
      text-align:center;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    }
    a{
      height: 30px;
      line-height: 20px;
      color: #fff;
      background: #1acab5;
      padding: 5px 10px;
      font-size: 14px;
      border-radius: 17px;
      position: absolute;
      top: 90px;
      left: 300px;
    }
    .iconPerson{
      width: 4rem;
      height: 4rem;
      position: absolute;
      left: 45px;
      top: 55px;
    }
  }

</style>
