import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import utils from './utils/index.js'
import './plugins'
import '@/layouts/export'
import { baseURL } from '@/config'
/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */
// 引入样式
import "@/styles/vue-easytable/libs/theme-default/index.css";
import zhCN from "vue-easytable/libs/locale/lang/zh-CN";
// 引入组件库
import VueEasytable from "vue-easytable";

import VueClipBoard from 'vue-clipboard2' // copyText

Vue.use(VueClipBoard)

VueEasytable.VeLocale.use(zhCN);
Vue.use(VueEasytable);

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

Vue.config.productionTip = false

let vue = new Vue({
  router,
  store,
  render: (h) => h(App),
})

// 设置默认baseURL
if (!localStorage.getItem('baseURL')) {
  localStorage.setItem('baseURL', baseURL)
}

// 存储一些全局函数
vue.methods = {}
// 存储一些全局变量
vue.globa = {}
// 存储一些函数，在页面创建时会运行这些函数
vue.launchFuns = {}
// 存储与表格进行交互的信息修改tableData，页面中的变量也会跟着改变
vue.tableData = {}
// 设置globa初始值，在data.js中必须使用这个函数实现，否则只能拿到空信息{}
vue.setDefaultGloba = () => { return {} }
// 设置methodds初始值，其他同上
vue.setDefaultMethods = () => { return {} }
// 设置launchFuns初始值，其他同上
vue.setDefaultLaunchFuns = () => { return {} }
// tableData会直接引入组件，所以不需要这样设置

// 获取当页数据缓存
vue.checkInfo = (PageId) => {
  return vue['Info' + PageId]
}

vue.getPageInfo = (PageId) => {
  vue.globa = utils.deepClone(vue['Info' + PageId].globa)
  vue.methods = utils.deepClone(vue['Info' + PageId].methods)
  vue.launchFuns = utils.deepClone(vue['Info' + PageId].launchFuns)
  vue.tableData = utils.deepClone(vue['Info' + PageId].tableData)
}

vue.savePageInfo = (PageId) => {
  vue['Info' + PageId] = {
    globa: utils.deepClone(vue.globa),
    methods: utils.deepClone(vue.methods),
    launchFuns: utils.deepClone(vue.launchFuns),
    tableData: utils.deepClone(vue.tableData)
  }
}

vue.updatePageInfo = (PageId) => {
  vue.globa = vue.setDefaultGloba()
  vue.methods = vue.setDefaultMethods()
  vue.launchFuns = vue.setDefaultLaunchFuns()
  // 用后重置
  vue.setDefaultGloba = () => { return {} }
  vue.setDefaultMethods = () => { return {} }
  vue.setDefaultLaunchFuns = () => { return {} }
  vue.savePageInfo(PageId)
}
// 挂载dom
vue.$mount('#app')

export default vue
