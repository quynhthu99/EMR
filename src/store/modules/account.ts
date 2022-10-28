import ls from '@/utils/Storage'
import { User } from '@/utils/types'
import { USER_INFO } from '@/store/mutation-types'
interface state {
  info: User
}
const account = {
  state: {
    info: ls.get(USER_INFO) || null
  },
  mutations: {
    SET_USER: (state: state, user: User): void => {
      ls.setObj(USER_INFO, user)
      state.info = user
    }
  },
  actions: {
    setUser: ({ commit }, user: User): void => {
      commit('SET_USER', user)
    }
  }
}

export default account
