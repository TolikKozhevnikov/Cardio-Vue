import Vue from 'vue'
import VueRouter from 'vue-router'
import Xnet from '../views/Xnet.vue'
import Auth from '../views/Auth.vue'
import SignUp from '../views/SignUp.vue'
import UserPage from '../views/UserPage.vue'
import HomePage from '../views/HomePage.vue'
import Profile from '../views/Profile.vue'
import AdminPage from '../views/AdminPage.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/UserPage',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/Xnet',
    name: 'Xnet',
    component: Xnet
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
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/AdminPage',
    name: 'AdminPage',
    component: AdminPage
  },
  { path: "*", component: PageNotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router
