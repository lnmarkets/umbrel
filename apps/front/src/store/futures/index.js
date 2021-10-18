import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

const defaultState = () => {
  return {
    positions: [],
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  getters,
  actions,
  mutations,
}
