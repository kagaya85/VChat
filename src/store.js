import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: "",
    uid: '0',
    token: null
  },
  mutations: {
    login: function(state, name, uid) {
      state.username = name
      state.uid = uid
    },
    logout: function(state) {
      state.username = ""
      state.uid = '0'
    }
  },
  actions: {

  }
})
