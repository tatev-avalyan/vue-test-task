import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Products from '@/views/Products'
import Home from '@/views/Home'

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
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
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
  console.log(to.path)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ path: '/login' })
    }
    if (!isLoggedIn && to.path !== '/register') {
      next({ path: '/login' })
    }
  }
  if (to.matched.some((record) => !record.meta.requiresAuth)) {
    if (isLoggedIn && to.path !== '/') {
      next({ path: '/' })
    }
  }
  next()
})

export default router
