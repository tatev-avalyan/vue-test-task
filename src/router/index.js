import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login'
import Users from '@/views/Users'
import Home from '@/views/Home'
import UserDetails from '@/views/UserDetails'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.accessToken

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ path: '/login' })
    }
  }
  if (to.matched.some(record => !record.meta.requiresAuth)) {
    if (isLoggedIn && to.path !== '/') {
      next({ path: '/' })
    }
  }
  next()
})

export default router
