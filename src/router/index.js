import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import SignUp from '../views/SignUp.vue'
import UserPage from '../views/UserPage.vue'
import HomePage from '../views/HomePage.vue'

import AdminPage from '../views/AdminPage.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/HomePage',
    component: HomePage
  },
  {
    path: '/UserPage',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/Auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/AdminPage',
    name: 'AdminPage',
    component: AdminPage,
    meta: {auth: true}
  },
  { path: "*", component: PageNotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let CurrentUser = false

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token") != null) {
    CurrentUser = true;
  } else {
    CurrentUser = false;
  }
  const requireAuth = to.matched.some(AdminPage => AdminPage.meta.auth)
  if (!CurrentUser && requireAuth) {
    next('/Auth')
  } else {
    next()
  }
})

export default router
