import Vue from 'vue'
import Router from 'vue-router'

import notFound from '@/app/NotFound/index'
import Root from '@/app/Root'
import ErTest from '@/app/Module/ErTest'
import koalaPassage from '@/app/Module/koalaPassage'
import ladderPassage from '@/app/Module/ladderpassage'
import ErTestNew from '@/app/Module/ErTestNew'
import Login from '@/app/Account/Login'
import LoginInput from '@/app/Input/Login'
import Info from '@/app/Exam/Info'
import Test from '@/app/Exam/Test'
import InfoInput from '@/app/Input/Info'
import TestInput from '@/app/Input/Test'
import inputCard from '@/app/Input/inputCard'
import inputCardTest from '@/app/Input/inputCardTest'
import TestResult from '@/app/Module/TestResult'

import store from '../store'

import axios from '../http'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/er-collect/' : '',
  routes: [{
    path: '/',
    component: Root,
    redirect: '/info',
    children: [{
      path: 'info',
      name: 'Info',
      component: Info
    }, {
      path: 'Test',
      name: 'Test',
      component: Test
    }]
  },
  {
    path: '/input',
    component: Root,
    redirect: '/InfoInput',
    children: [{
      path: '/InfoInput',
      name: 'InfoInput',
      component: InfoInput,
      meta: {
        input: true
      }
    }, {
      path: '/TestInput',
      name: 'TestInput',
      component: TestInput,
      meta: {
        input: true
      }
    }]
  },
  {
    path: '/ErTest',
    name: 'ErTest',
    component: ErTest,
    meta: {
      public: true
    }
  },
  {
    path: '/koalaPassage',
    name: 'koalaPassage',
    component: koalaPassage,
    meta: {
      public: true
    }
  },
  {
    path: '/ladderPassage',
    name: 'ladderPassage',
    component: ladderPassage,
    meta: {
      public: true
    }
  },
  {
    path: '/ErTestNew',
    name: 'ErTestNew',
    component: ErTestNew,
    meta: {
      public: true
    }
  },
  {
    path: '/inputCardxykj',
    name: 'inputCard',
    component: inputCard,
    meta: {
      public: true
    }
  },
  {
    path: '/inputCardxykjTest',
    name: 'inputCardTest',
    component: inputCardTest,
    meta: {
      public: true
    }
  },
  {
    path: '/TestResult',
    name: 'TestResult',
    component: TestResult,
    meta: {
      public: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true
    }
  },
  {
    path: '/xykjinput666',
    name: 'LoginInput',
    component: LoginInput,
    meta: {
      public: true
    }
  },
  {
    path: '*',
    component: notFound
  }]
})

router.beforeEach((to, from, next) => {
  console.log('to path = ', to)
  if (to.meta.public || to.path.indexOf('ErTest') > 0) {
    next()
  } else {
    axios.get(`/users/web/user/current`)
      .then(res => {
        if (res.data.id) {
          store.commit('login', res.data)
          next()
        } else {
          next('/login')
        }
      })
      .catch(error => {
        console.log(error)
        next('/login')
      })
  }
})

export default router
