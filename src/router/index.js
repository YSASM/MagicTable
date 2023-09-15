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
          icon: 'home',
          affix: false,
        },
      },
    ],
  },
  {
    meta: {
      title: '用户管理',
      icon: 'user',
      affix: true,
    },
    contentPage: true,
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/user/list/index'),
        meta: {
          title: '用户列表',
          icon: 'user-friends',
          affix: false,
        },
      },
      {
        path: 'event',
        name: 'event',
        component: () => import('@/views/user/event/index'),
        meta: {
          title: '用户日志',
          icon: 'users',
          affix: false,
        },
      },
    ],
  },
  {
    meta: {
      title: '商品管理',
      icon: 'cube',
      affix: true,
    },
    contentPage: true,
    path: '/goods',
    component: Layout,
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goods/goods/index'),
        meta: {
          title: '商品管理',
          icon: 'cube',
          affix: false,
        },
      }
    ],
  },
  {
    meta: {
      title: '订单管理',
      icon: 'donate',
      affix: true,
    },
    contentPage: true,
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/order/index'),
        meta: {
          title: '订单管理',
          icon: 'donate',
          affix: false,
        },
      }
    ],
  },
  {
    meta: {
      title: '配置管理',
      icon: 'cogs',
      affix: true,
    },
    contentPage: true,
    path: '/config',
    component: Layout,
    children: [
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/config/config/index'),
        meta: {
          title: '配置管理',
          icon: 'cogs',
          affix: false,
        },
      }
    ],
  },
  {
    meta: {
      title: '试卷考试',
      icon: 'cogs',
      affix: true,
    },
    contentPage: true,
    path: '/paper',
    component: Layout,
    children: [
      {
        path: 'question',
        name: 'question',
        component: () => import('@/views/paper/question/index'),
        meta: {
          title: '考题管理',
          icon: 'cogs',
          affix: false,
        },
      },
      {
        path: 'grade',
        name: 'grade',
        component: () => import('@/views/paper/grade/index'),
        meta: {
          title: '试卷栏目',
          icon: 'cogs',
          affix: false,
        },
      },
      {
        path: 'paper',
        name: 'paper',
        component: () => import('@/views/paper/paper/index'),
        meta: {
          title: '试卷管理',
          icon: 'cogs',
          affix: false,
        },
      }
    ],
  },
  // {
  //   meta: {
  //     title: '其他工具',
  //     icon: 'atom',
  //     affix: true,
  //   },
  //   path: '/utils',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'newPage',
  //       name: 'newPage',
  //       component: () => import('@/views/utils/creatNewPage/index'),
  //       meta: {
  //         title: '创建页面',
  //         icon: 'pager',
  //         affix: false,
  //       },
  //     },
  //     {
  //       path: 'ico',
  //       name: 'ico',
  //       component: () => import('@/views/utils/ico/index'),
  //       meta: {
  //         title: '图标',
  //         icon: 'icons',
  //         affix: false,
  //       },
  //     }
  //   ],
  // },
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
