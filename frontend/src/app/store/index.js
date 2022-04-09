import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Auth from './auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: User,
    auth: Auth,
  },
})

export default store
