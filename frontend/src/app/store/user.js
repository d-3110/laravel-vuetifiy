import axios from '@/api/api'

const state = {
  user: {},
}
const getters = {
  user: state => state.user,
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
