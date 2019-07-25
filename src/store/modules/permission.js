import { asyncRoutes, constantRoutes } from '@/router'
import { getAsyncRoutes } from '../../api/role'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function makePermissionRouters(serverArr) {
  // console.log(asyncRoutes)
  // console.log(serverArr)
  asyncRoutes.map((v, i) => {
    // console.log(v)

    const v_name = v.name || ''
    console.log(v_name)

    if (v.children && v.children.length > 0) {
      // makePermissionRouters(v)
    } else {
      // 没有子菜单
      if (v.meta && v.meta.role) {
        console.log(11111)

        serverArr.forEach(currentItem => {
          console.log(currentItem)

          if (currentItem.name === v_name) {
            console.log(currentItem.meta.role)

            v.meta.role = currentItem.meta.roles
          }
        })
      }
    }
  })
  console.log(asyncRoutes)
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    getAsyncRoutes().then(res => {
      const data = res.data
      // console.log(data)
      makePermissionRouters(data)
    })

    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
