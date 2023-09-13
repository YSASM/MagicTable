/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
          affix: false,
        },
      },
    ],
  },
  {
    meta: {
      title: '用户管理',
      icon: 'el-icon-user',
      affix: true,
    },
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/user/list/index'),
        meta: {
          title: '用户列表',
          icon: 'el-icon-user-solid',
          affix: false,
        },
      },
      {
        path: 'event',
        name: 'event',
        component: () => import('@/views/user/event/index'),
        meta: {
          title: '用户日志',
          icon: 'el-icon-date',
          affix: false,
        },
      },
    ],
  },
  {
    meta: {
      title: '商品管理',
      icon: 'el-icon-goods',
      affix: true,
    },
    path: '/goods',
    component: Layout,
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goods/goods/index'),
        meta: {
          title: '商品管理',
          icon: 'el-icon-goods',
          affix: false,
        },
      }
    ],
  },
  {
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-order',
      affix: true,
    },
    path: '/bill',
    component: Layout,
    children: [
      {
        path: 'bill',
        name: 'bill',
        component: () => import('@/views/bill/bill/index'),
        meta: {
          title: '订单管理',
          icon: 'el-icon-s-order',
          affix: false,
        },
      }
    ],
  },
  {
    meta: {
      title: '配置管理',
      icon: 'el-icon-setting',
      affix: true,
    },
    path: '/config',
    component: Layout,
    children: [
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/config/config/index'),
        meta: {
          title: '配置管理',
          icon: 'el-icon-setting',
          affix: false,
        },
      }
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

export function resetRouter() {
  location.reload()
}

export default router
