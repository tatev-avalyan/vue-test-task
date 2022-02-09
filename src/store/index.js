import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import service from '../services/ApiService.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    user: null
  },
  getters: {
    accessToken (state) {
      return state.accessToken
    },
    user (state) {
      return state.user
    }
  },
  actions: {
    async login ({ commit }, data) {
      const res = await service.auth.login(data)
      commit('USER_LOGIN', res.data)
    }
  },
  mutations: {
    USER_LOGIN (state, data) {
      state.accessToken = data.token
      state.user = data.user
    },
    USER_LOGOUT (state) {
      state.accessToken = null
    }
  },

  modules: {},
  plugins: [createPersistedState()]
})
