import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

import reset from './modules/reset'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '概览', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/forget',
    component: () => import('@/views/forget/index'),
    hidden: true
  },
  {
    path: '/resetLogin',
    component: () => import('@/views/resetLogin/index'),
    hidden: true
  },
  {
    path: '/resetLoginSuccess',
    component: () => import('@/views/resetLoginSuccess/index'),
    hidden: true
  },
  reset
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/managener',
    component: Layout,
    redirect: '/managener/acManagener',
    name: 'Managener',
    meta: {
      title: '各平台管理',
      icon: 'example',
      roles: []
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
      },
      {
        path: 'screenModule',
        name: 'ScreenModule',
        component: () =>
                 import('@/views/managener/screenModule/index'),
        meta: { title: '可视化大屏模板管理', icon: 'table' }
      },
      {
        path: 'screenAccount',
        name: 'ScreenAccount',
        component: () =>
                 import('@/views/managener/screenAccount/index'),
        meta: { title: '可视化大屏账号管理', icon: 'table' }
      },
      {
        path: 'acMangentnewPlate',
        name: 'AcMangentnewPlate',
        hidden: true,
        component: () =>
                 import('@/views/managener/acManagener/newPlate/index'),
        meta: {
          title: ' 新增平台',
          icon: 'Rest',
          roles: []
        }
      },
      {
        path: 'acMangentdetail/:id',
        name: 'AcMangentdetail',
        hidden: true,
        component: () =>
                 import('@/views/managener/acManagener/acdetail/index'),
        meta: {
          title: ' 详情',
          icon: 'Rest',
          roles: [],
          noCache: true,
          activeMenu: '/managener/acManagener'
        }
      },
      {
        path: 'acMangentedit/:id',
        name: 'AcMangentedit',
        hidden: true,
        component: () =>
                 import('@/views/managener/acManagener/editplate/index'),
        meta: {
          title: ' 编辑',
          icon: 'Rest',
          roles: [],
          noCache: true,
          activeMenu: '/managener/acManagener'
        }
      },
      {
        path: 'acMangentepeizhi/:id',
        name: 'AcMangentepeizhi',
        hidden: true,
        component: () =>
                 import('@/views/managener/acManagener/peizhi/index'),
        meta: {
          title: ' 配置功能 ',
          icon: 'Rest',
          roles: [],
          noCache: true,
          activeMenu: '/managener/acManagener'
        }
      }
    ]
  },
  //  {
  //    path: "/acMangentnewPlate",
  //    component: Layout,
  //    redirect: "/acMangentnewPlate/index",
  //    name: "AcMangentnewPlate",
  //    hidden: true,
  //    meta: {
  //      title: " 新增平台",
  //      icon: "Rest",
  //      roles: []
  //    },
  //    children: [
  //      {
  //        path: "/acMangentnewPlate/index",
  //        component: () =>import("@/views/managener/acManagener/newPlate/index"),
  //        name: "index"
  //      }
  //    ]
  //  },
  //  {
  //    path: "/acMangentdetail",
  //    component: Layout,
  //    redirect: "/acMangentdetail/index",
  //    name: "AcMangentdetail",
  //    hidden: true,
  //    meta: {
  //      title: "回收系统账套管理 / 详情",
  //      icon: "Rest",
  //      roles: []
  //    },
  //    children: [
  //      {
  //        path: "/acMangentdetail/index",
  //        component: () =>
  //          import("@/views/managener/acManagener/acdetail/index"),
  //        name: "index"
  //      }
  //    ]
  //  },
  //  {
  //    path: "/acMangentedit",
  //    component: Layout,
  //    redirect: "/acMangentedit/index",
  //    name: "AcMangentedit",
  //    hidden: true,
  //    meta: {
  //      title: "回收系统账套管理 / 编辑",
  //      icon: "Rest",
  //      roles: []
  //    },
  //    children: [
  //      {
  //        path: "/acMangentedit/index",
  //        component: () =>
  //          import("@/views/managener/acManagener/editplate/index"),
  //        name: "index"
  //      }
  //    ]
  //  },
  //  {
  //    path: "/acMangentepeizhi",
  //    component: Layout,
  //    redirect: "/acMangentepeizhi/index",
  //    name: "AcMangentepeizhi",
  //    hidden: true,
  //    meta: {
  //      title: "回收系统账套管理 / 配置管理",
  //      icon: "Rest",
  //      roles: []
  //    },
  //    children: [
  //      {
  //        path: "/acMangentepeizhi/index",
  //        component: () =>
  //          import("@/views/managener/acManagener/peizhi/index"),
  //        name: "index"
  //      }
  //    ]
  //  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/rolesManagener',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'example',
      roles: []
    },
    children: [
      {
        path: 'rolesManagener',
        name: 'RolesManagener',
        component: () =>
                 import('@/views/system/rolesManagener/index'),
        meta: { title: '用户权限管理', icon: 'tree' }
      },
      {
        path: 'userManagener',
        name: 'UserManagener',
        component: () =>
                 import('@/views/system/userManagener/index'),
        meta: { title: '用户管理', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
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
