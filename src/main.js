import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
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

import mtable from "@/components/MigicTable/index"

Vue.component(mtable.name, mtable);

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

Vue.config.productionTip = false

Vue.config.warnHandler = function (error, vm, info) {
  if (error.includes('type check failed')) {
    console.warn('Global Error Handler:', error, vm, info);
  }
  else {
    console.error('Global Error Handler:', error, vm, info);
  }
};

let vue = new Vue({
  el: '#vue-admin-beautiful',
  router,
  store,
  render: (h) => h(App),
})
export default vue
