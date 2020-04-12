import '@/assets/index.scss';

import Vue from 'vue';
import { ToastPlugin, TablePlugin, PaginationPlugin } from 'bootstrap-vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ToastPlugin);
Vue.use(TablePlugin);
Vue.use(PaginationPlugin);
// fix
Vue.prototype.$toastHandle = (title: string, subTitle: string, type = 'success') => {
  ToastPlugin.toast(subTitle, {
    title,
    autoHideDelay: 1000,
    variant: type,
    toaster: 'b-toaster-top-center',
  });
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
