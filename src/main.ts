import '@/assets/index.scss';

import Vue from 'vue';
import { ToastPlugin, TablePlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ToastPlugin);
Vue.use(TablePlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
