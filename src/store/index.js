import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  mutations: {
    USER_LOGIN (state, data) {
      state.accessToken = data.token
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
