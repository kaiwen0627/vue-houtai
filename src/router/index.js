import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

import reset from './modules/reset'

export const constantRoutes = [
         {
           path: "/redirect",
           component: Layout,
           hidden: true,
           children: [
             {
               path: "/redirect/:path*",
               component: () => import("@/views/redirect/index")
             }
           ]
         },
         {
           path: "/login",
           component: () => import("@/views/login/index"),
           hidden: true
         },
         {
           path: "/auth-redirect",
           component: () => import("@/views/login/auth-redirect"),
           hidden: true
         },
         {
           path: "/404",
           component: () => import("@/views/error-page/404"),
           hidden: true
         },
         {
           path: "/401",
           component: () => import("@/views/error-page/401"),
           hidden: true
         },
         {
           path: "/",
           component: Layout,
           redirect: "/dashboard",
           children: [
             {
               path: "dashboard",
               component: () => import("@/views/dashboard/index"),
               name: "Dashboard",
               meta: { title: "概览", icon: "home", affix: true }
             }
           ]
         },
         {
           path: "/forget",
           component: () => import("@/views/forget/index"),
           hidden: true
         },
         {
           path: "/resetLogin",
           component: () => import("@/views/resetLogin/index"),
           hidden: true
         },
         {
           path: "/resetLoginSuccess",
           component: () => import("@/views/resetLoginSuccess/index"),
           hidden: true
         },
         reset
       ];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/managener',
    component: Layout,
    redirect: '/managener/funManagener',
    name: 'Managener',
    meta: {
      title: '各平台管理',
      icon: 'example',
      roles: ['admin']
    },
    children: [
      {
        path: 'funManagener',
        name: 'FunManagener',
        component: () =>
                 import('@/views/managener/funManagener/index'),
        meta: { title: '回收系统功能管理', icon: 'tree' }
      },
      {
        path: 'acManagener',
        name: 'AcManagener',
        component: () =>
                 import('@/views/managener/acManagener/index'),
        meta: { title: '回收系统账套管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/acMangentnewPlate',
    component: Layout,
    redirect: '/acMangentnewPlate/index',
    name: 'AcMangentnewPlate',
    hidden: true,
    meta: {
      title: '回收系统账套管理 / 新增平台',
      icon: 'Rest'
    },
    children: [
      {
        path: '/acMangentnewPlate/index',
        component: () => import('@/views/managener/acManagener/newPlate/index'),
        name: 'index'
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
