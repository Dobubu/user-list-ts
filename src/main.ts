import '@/assets/index.scss';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ToastPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(ToastPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
