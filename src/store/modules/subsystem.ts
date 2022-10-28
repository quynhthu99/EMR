import { SET_SUBSYSTEM } from '@/store/mutation-types'
import ls from '@/utils/Storage'

function cache(o) {
  ls.setObj(SET_SUBSYSTEM, o)
}
const subsystem = {
  state: {
    subsystem: 'index'
  },
  mutations: {
    [SET_SUBSYSTEM]: (state, nameSubsystem) => {
      state.subsystem = nameSubsystem
      cache({ [SET_SUBSYSTEM]: nameSubsystem })
    }
  }
}

export default subsystem
