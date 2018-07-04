import Vue from 'vue'
import Router from 'vue-router'
import Registration from '@/components/Registration'
import Main from '@/components/Main'
import Auth from '@/components/Auth'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/id:id',
      name: 'Profile',
      component: Profile,
    }
  ]
})
