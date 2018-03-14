import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: null,
    user: null
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      state.user = data
    },
    [types.LOGOUT]: (state) => {
      state.user = null
    }
  }
})
