import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import Alumni from '@/components/Alumni'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about-us',
      name: 'aboutUs',
      component: AboutUs
    },
    {
      path: '/contact-us',
      name: 'contactUs',
      component: ContactUs
    },
    {
      path: '/alumni',
      name: 'alumni',
      component: Alumni
    },
    ]
})
