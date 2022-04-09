import axios from '@/api/api'

const state = {
  isLoading: false,
  isAuth: false,
  user: null,
  error: '',
  to: '',
  lastLoginUser: null,
}
const getters = {
  isLoading(state) {
    return state.isLoading
  },
  isAuth(state) {
    return state.isAuth
  },
  user(state) {
    return state.user
  },
  error(state) {
    return state.error
  },
  to(state) {
    return state.from
  },
}
const mutations = {
  setIsLoading: (state, value) => {
    state.isLoading = value
  },
  setIsAuth: (state, value) => {
    state.isAuth = value
  },
  setUser: (state, value) => {
    state.user = value
  },
  setError: (state, value) => {
    state.error = value
  },
  setTo: (state, value) => {
    state.to = value
  },
  setLastLoginUser: (state, value) => {
    state.lastLoginUser = value
  },
}
const actions = {
  async login({ commit, state }, form) {
    await axios.csrf('/sanctum/csrf-cookie')
    await axios
      .auth('auth/login', form)
      .then(response => {
        commit('setIsAuth', true)
        commit('setUser', response.data.user)
      })
      .catch(error => {
        commit('setIsAuth', false)
        commit('setError', error.data.message)
        commit('setUser', null)
      })
  },
  async me({ commit, state }) {
    await axios
      .me('user/me')
      .then(response => {
        commit('setIsAuth', true)
        commit('setUser', response.data)
      })
      .catch(error => {
        commit('setIsAuth', false)
        commit('setUser', null)
      })
  },
  async logout({ commit, state }) {
    await axios.post('auth/logout')
    commit('setIsAuth', false)
    commit('setUser', null)
  },
  async lastLogin({ commit, state }) {
    await commit('setLastLoginUser', state.user)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
