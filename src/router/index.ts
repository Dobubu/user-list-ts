import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Login',
    component: async () => import('../views/Login.vue'),
  },
  {
    path: '/userList',
    name: 'UserList',
    component: async () => import('../views/UserList.vue'),
  },
  {
    path: '/draw',
    name: 'Draw',
    component: async () => import('../views/draw.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = JSON.parse(localStorage.getItem('authInfo') || '{}');
  if (to.name === 'Login' && isAuth.account) {
    next('/userList');
  } else {
    next();
  }
});

export default router;
