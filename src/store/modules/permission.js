// import { asyncRouterMap, constantRouterMap } from '@/router'
import { constantRouterMap, LayoutComponent, _import_ } from '@/router'

/**
 * 通过递归的方式处理后端返回的路由列表
 * @param roles
 */
function filterRouter(roles) {
  roles.forEach(route => {
    route.meta = { title: route.name, icon: route.icon }
    if (route.children !== null && route.children.length > 0) {
      if (route.component === null) {
        route.componentName = 'LayoutComponent'
        route.component = LayoutComponent
        route.redirect = '/sys/admin/test/test1'
      } else {
        route.componentName = route.component
        route.component = _import_(route.component)
        route.redirect = '/sys/admin/test/test1'
      }
      filterRouter(route.children)
    } else {
      route.component = _import_(route.component)
    }
  })
  return roles
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const consoleRoles = filterRouter(roles)
        commit('SET_ROUTERS', consoleRoles)
        resolve()
      })
    }
  }
}

export default permission
