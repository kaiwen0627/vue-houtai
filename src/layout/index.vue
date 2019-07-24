<template>
  <div :class="classObj" class="app-wrapper">
    <div class='headerTitle'>
      <div class='left-menu'>
        <div class='left-menu-icon'>
           <svg-icon icon-class="loop" class='loopIcon' />
           <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
             @toggleClick="toggleSideBar" />
        </div>
         
       
        
      </div>
      <div class="right-menu">
        <div class='right-menu-icon'>
          <p class='right-menu-icon-left'>
               <svg-icon icon-class="person" />
               <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
               <i></i>
          </p>
               
          
          <svg-icon icon-class="Close" @click="logout" />

        </div>
      </div>
    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
  import Hamburger from '@/components/Hamburger'

  import {
    mapGetters
  } from 'vuex'
  import {
    Navbar,
    Sidebar,
    AppMain
  } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      Hamburger
    },

    mixins: [ResizeMixin],
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      fixedHeader() {
        return this.$store.state.settings.fixedHeader
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      },
      ...mapGetters([
        'sidebar',
        'roles'
        // 'avatar'
      ])
    },
    mounted() {
      //this.getusername()
    },
    methods: {
      // 获取cookie
      // getusername() {
      //   this.username = getToken('userName')
      // },
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', {
          withoutAnimation: false
        })
      },

      async logout() {
        await this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user/logout').then(() => {
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          })
        }).catch(() => {})
      },
      toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
      },
     
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .headerTitle {
    height: 50px;
    line-height: 50px;
    background-color: rgb(48, 65, 86);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .left-menu {
    float: left;
    width: 80%;
  }

  .right-menu {
    width: 20%;
    float: right;
    height: 100%;
    line-height: 50px;
      .right-menu-icon{
            text-align: right;
            padding: 0 10% 0 0;
          .right-menu-icon-left{
            display: inline-block;
            margin:0 20px 0 0 ;
            span{
              padding:0 10px;
            }
            i{
              display: inline-block;
              height: 17px;
              border: 1px solid #ccc;
              vertical-align: middle;
            }
          }
      }

    
  }

  .sidebar-container{
    border-top:1px solid #aaa;
  }
  .left-menu-icon{
    overflow: hidden;
      .loopIcon{
        width: 2rem;
        height: 2rem;
        float: left;
        position: relative;
        top: 10px;
        left: 20px;
      }
      .hamburger-container{
        float: left;
        margin-left: 162px;
      }
  }
</style>
