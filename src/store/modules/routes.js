/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
// import { getRouterList } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'

import store from "@/store"

const state = () => ({
  routes: [],
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  },
}
const actions = {
  async setRoutes({ commit }, permissions) {
    //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions)
    let routes = []
    let baseUrl = localStorage.getItem('baseURL')
    finallyAsyncRoutes.forEach(r => {
      if (r.meta && r.meta.range) {
        if (r.meta.range.includes(baseUrl)) {
          routes.push(r)
        }
      }
      else {
        routes.push(r)
      }
    });
    commit('setRoutes', routes)
    return routes
  },
  async setAllRoutes({ commit }) {
    let { data } = await getRouterList()
    data.push({ path: '*', redirect: '/404', hidden: true })
    let accessRoutes = convertRouter(data)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  },
}
export default { state, getters, mutations, actions }
