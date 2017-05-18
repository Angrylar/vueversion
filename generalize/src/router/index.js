import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import turnplate from '@/components/turnplate/turnplate'
import test from '@/components/test/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/turnplate',
      name: 'turnplate',
      component: turnplate
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
