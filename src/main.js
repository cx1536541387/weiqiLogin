import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
// 上方提示框只显示一个
import { message } from './common/resetMessage'
import axios from 'axios'
Vue.prototype.$axios = axios
import qs from 'qs'
Vue.prototype.$qs = qs;

Vue.config.productionTip = false
Vue.use(element)

Vue.prototype.$message = message;

// 路由跳转拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    const data = sessionStorage.getItem('isLogin')
    if (JSON.parse(data)) {
      next()
    } else {
      next('home')
    }
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')