import Vue from 'vue'
import Router from 'vue-router'
import Registration from '@/components/Registration'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
