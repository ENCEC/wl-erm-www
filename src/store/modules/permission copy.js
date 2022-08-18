// import { asyncRoutes, constantRoutes } from '@/router'
import { queryResource } from '@/api/user'
import store from '@/store'
import Layout from '@/layout'
const _import = require('@/router/_import') // 获取组件的方法

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

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 遍历后台传来的路由字符串，转换为组件对象
export function filterAsyncRoutes(routes, level = 1) {
  const res = []
  // TODO:小图标
  const icon = level === 1 ? 'icon_staff' : ''// 图标
  routes.forEach(routeItem => {
    let tmp = {}
    // 父级菜单没有子菜单
    if (level === 1 && !(routeItem.childrenResourceList && routeItem.childrenResourceList.length)) {
      console.log('【 routeItem 】-31', routeItem)
      tmp = {
        path: '/',
        component: Layout,
        redirect: routeItem.resourceUrl,
        children: [
          {
            path: routeItem.resourceUrl,
            component: _import(routeItem.component),
            name: routeItem.resourceTitle,
            meta: { title: routeItem.resourceTitle, icon, affix: true }
          }
        ]
      }
    } else {
      tmp = {
      // ...routeItem,
        path: routeItem.resourceUrl,
        name: routeItem.resourceTitle,
        meta: { title: routeItem.resourceTitle, icon },
        children: routeItem.childrenResourceList
      }
      // 加载路由页面
      if (routeItem.component) {
        if (routeItem.component === 'Layout') { // Layout组件特殊处理
          tmp.component = Layout
        } else {
          tmp.component = _import(routeItem.component)
        }
      }
      // 子菜单
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, level + 1)
      }
    }
    res.push(tmp)
  })
  return res
}

export function formatData(map) {
  const newList = []
  const DEFAULT_CION = ''
  const indexArray = []
  let index1 = 0
  map.forEach(function(value, key) {
    // console.log("test1-----",value)
    value.forEach(function(data, index) {
      if (index === '0') {
        if (data.resourceUrl !== '' && data.resourceUrl !== 'null') {
          if (data.childrenResourceList === null) {
            newList.push({
              'path': '/',
              'component': 'Layout',
              'redirect': data.resourceUrl,
              'children': [{
                'path': '',
                'name': data.resourceUrl,
                'component': data.component,
                'meta': {
                  affix: true,
                  'title': data.resourceTitle,
                  'icon': data.resourceLogo || DEFAULT_CION
                }
              }]
            })
          } else {
            const children = []
            for (const j in data.childrenResourceList) {
              children.push({
                'path': j.index === '0' ? '' : j.resourceUrl,
                'name': j.resourceUrl,
                'component': j.component,
                'meta': {
                  'title': j.resourceTitle,
                  'icon': j.resourceLogo || DEFAULT_CION
                }
              })
            }
            newList.push({
              'path': '/',
              'name': data.resourceUrl,
              'component': 'Layout',
              'meta': {
                'title': data.resourceTitle,
                'icon': data.resourceLogo || DEFAULT_CION
              },
              'children': children
            })
          }
        }
      } else {
        if (data.resourceUrl !== '' && data.resourceUrl !== 'null') {
          if (data.childrenResourceList === null) {
            newList.push({
              'path': '/' + data.resourceUrl,
              'component': 'Layout',
              'redirect': data.resourceUrl,
              'children': [{
                'path': 'index',
                'name': data.resourceUrl,
                'component': data.component,
                'meta': {
                  'title': data.resourceTitle,
                  'icon': data.resourceLogo || DEFAULT_CION
                }
              }]
            })
          } else {
            const children = []
            for (const j of data.childrenResourceList) {
              if (index1 < 12) {
                // 排除http连接
                if (j.resourceUrl.startsWith('http')) {
                  continue
                }
                indexArray.push({
                  'path': j.resourceUrl,
                  'component': j.component,
                  'name': j.resourceTitle
                })
                index1 = index1 + 1
              }
              j.component && children.push({
                'path': j.resourceUrl,
                'name': j.resourceUrl,
                'component': j.component,
                'meta': {
                  'title': j.resourceTitle,
                  'icon': j.resourceLogo || DEFAULT_CION
                }
              })
            }
            newList.push({
              'path': '/' + data.resourceUrl,
              'name': data.resourceUrl,
              'component': 'Layout',
              'meta': {
                'title': data.resourceTitle,
                'icon': data.resourceLogo || DEFAULT_CION
              },
              'children': children
            })
          }
        }
      }
      // console.log("test ------",data)
    })
  })
  return newList
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      queryResource({
        clientId: process.env.VUE_APP_CLIENT_ID,
        uemUserId: store.getters.userId
      }).then(res => {
        const routes = res.data
        // const map = new Map(Object.entries(routes))
        // const newList = formatData(map)
        const accessedRoutes = filterAsyncRoutes(routes)
        console.log('【 ==== accessedRoutes ===== 】-117', accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
