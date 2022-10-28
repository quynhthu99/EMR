import { state } from './state'
import app from './modules/app'
import account from './modules/account'
import subsystem from './modules/subsystem'
import { createStore } from 'vuex'

const store = createStore({
  state,
  mutations: {},
  actions: {},
  modules: {
    app,
    subsystem,
    account: account
  }
})

export default store
