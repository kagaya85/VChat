import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    uid: '',
    token: ''
  },
  mutations: {
    login: function(state, info) {
      state.username = info.username
      state.uid = info.uid
      state.token = info.token
    },
    logout: function(state) {
      state.username = ''
      state.uid = ''
      state.token = ''
    }
  },
  actions: {

  }
})
