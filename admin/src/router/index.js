import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/console',
    component: () => import('../views/Console.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/Overview.vue')
      },
      {
        path: 'files',
        component: () => import('../components/Files.vue')
      },
      {
        path: 'create/:name',
        component: () => import('../views/Create.vue')
      },
      {
        path: 'tables/:table',
        component: () => import('../components/TableDetails.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
