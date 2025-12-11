import App from './App'
import store from './store'
import uviewPlus from '@/uni_modules/uview-plus'

import {initRequest} from './util/request/index'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // 引入请求封装
  initRequest(app)
  app.use(uviewPlus)
  app.use(store)
  return {
    app,
  }
}
// #endif

