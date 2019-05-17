import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: "kagaya",
    uid: 0
  },
  mutations: {
    login: function(state, name, uid) {
      state.username = name
      state.uid = uid
    },
    logout: function(state) {
      state.username = ""
      state.uid = -1
    }
  },
  actions: {

  }
})
