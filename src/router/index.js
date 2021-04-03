import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Student from '@/components/Student'
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
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/student/:studentID',
      name: 'student',
      props: (route) => {
        return {
          studentID: route.params.studentID
        }
      },
      component: Student
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
