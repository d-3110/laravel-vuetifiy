import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from '@/api/api'
import Base from '@/components/pages/Base'
import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import UserIndex from '@/components/pages/user/Index'
import UserShow from '@/components/pages/user/Show'
import UserRegister from '@/components/pages/user/Register'
import utils from '@/mixins/utils'
import store from '@/app/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'ログイン', isAuth: false },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'ホーム', isAuth: true },
  },
  {
    path: '/user',
    component: Base,
    children: [
      {
        path: '',
        component: UserIndex,
        meta: { title: 'Users', isAuth: true },
      },
      {
        path: 'create',
        component: UserShow,
        meta: { title: 'Create User', isAuth: true },
      },
      {
        path: ':id',
        component: UserShow,
        meta: { title: 'Show User', isAuth: true },
      },
    ],
  },

  // Error Laravelのエラー画面へ
  {
    path: '/500',
    name: 'ServerError',
    beforeEnter() {
      window.location = '/500'
    },
  },
  {
    path: '*',
    name: 'NotFound',
    beforeEnter() {
      window.location = '/404'
    },
  },
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior,
})

function isLoggedIn() {
  return store.state.auth.isAuth
}
function isLoginAgain() {
  if (store.state.auth.lastLoginUser === null) {
    return false
  }
  return store.state.auth.user.userId === store.state.auth.lastLoginUser.userId
}

// ログインチェック
router.beforeEach(async (to, from, next) => {
  if (to.name === 'NotFound') {
    next()
  }
  store.commit('auth/setIsLoading', true)
  await store.dispatch('auth/me')
  if (to.matched.some(record => record.meta.isAuth)) {
    if (!isLoggedIn()) {
      next({ name: 'Login' })
      // ログイン中に表示していた画面URLをstoreに保存
      store.commit('auth/setTo', to.path)
    } else {
      if (from.path === '/login' && store.state.auth.to !== '' && isLoginAgain()) {
        // セッションが切れたページへ遷移
        router.push({ path: store.state.auth.to })
        store.commit('auth/setTo', '')
      } else {
        next()
      }
    }
  } else {
    // ログイン画面
    if (isLoggedIn()) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
})
router.afterEach(async (to, from) => {
  if (isLoggedIn()) {
    // セッションが切れた時用にログインユーザを保存
    await store.dispatch('auth/lastLogin')
  }
  store.commit('auth/setIsLoading', false)
})

export default router
