import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user/index.js'
import futures from './futures/index.js'
import websockets from './websockets/index.js'

import websocket from '@/plugins/websocket.js'
import ModalDisclaimer from '@/modals/Disclaimer.vue'

const defaultState = () => {
  return {
    readDisclaimer: false,
  }
}

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState(), websocket()],
  state: defaultState(),
  actions: {
    showDisclaimer({ state }) {
      if (!state.readDisclaimer) {
        this.$vm.$vfm.show({
          component: ModalDisclaimer,
          bind: {
            name: 'ModalDisclaimer',
          },
          on: {
            close: () => {
              this.$vm.$vfm.hide('ModalDisclaimer')
            },
          },
        })
      }
    },

    error({ rootGetters }, error) {
      const { message, code } = error
      this.$vm.$notify({
        type: 'error',
        message: `${message || code || error}`,
      })

      console.error(error)
    },
  },
  mutations: {
    DISCLAIMER_READ(state) {
      state.readDisclaimer = true
    },
  },
  modules: {
    user,
    futures,
    websockets,
  },
})
