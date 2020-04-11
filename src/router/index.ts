import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }, {
    path: '/',
    name: 'UserList',
    component: () => import('../views/UserList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
