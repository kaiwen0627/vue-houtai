// Just a mock data

export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    name: 'Managener',
    meta: {
      title: '各平台管理',
      icon: 'example',
      roles: ['admin']
    },
    children: [
      {
        name: 'FunManagener',
        meta: { title: '回收系统功能管理', icon: 'tree' }
      },
      {
        name: 'AcManagener',
        meta: { title: '回收系统账套管理', icon: 'table' }
      }
    ]
  },
  {
    name: 'AcMangentnewPlate',
    meta: {
      title: '回收系统账套管理 / 新增平台',
      icon: 'Rest',
      role: ['admin']
    },
    children: [
      {
        name: 'index'
      }
    ]
  },
  {
    name: 'AcMangentdetail',
    meta: {
      title: '回收系统账套管理 / 详情',
      icon: 'Rest',
      role: ['admin']
    },
    children: [
      {
        name: 'index'
      }
    ]
  },
  {
    name: 'AcMangentedit',
    meta: {
      title: '回收系统账套管理 / 编辑',
      icon: 'Rest',
      role: ['admin']
    },
    children: [
      {
        name: 'index'
      }
    ]
  },
  {
    name: 'AcMangentepeizhi',
    meta: {
      title: '回收系统账套管理 / 编辑',
      icon: 'Rest',
      role: ['admin']
    },
    children: [
      {
        name: 'index'
      }
    ]
  },
  {
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'example',
      roles: ['admin']
    },
    children: [
      {
        name: 'RolesManagener',
        meta: { title: '用户权限管理', icon: 'tree' }
      },
      {
        name: 'UserManagener',
        meta: { title: '用户管理', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
