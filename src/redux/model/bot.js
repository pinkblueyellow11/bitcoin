import initialState from '../store/bot'
import agent from '../../lib/agent'

export default {
  namespace: 'wallet',

  /** Initial state */
  state: initialState,

  /** Effects/Actions */
  effects: (dispatch) => ({}),

  /** Reducers */
  reducers: {
    /**
     * @param {obj} state
     * @param {obj} payload
     */
    setRefreshBot(state, payload) {
      return { ...state, refreshBot: payload }
    },

    /**
 * @param {obj} state
 * @param {obj} payload
 */
    setCoinCurrentPrice(state, payload) {
      return { ...state, coinCurrentPrice: payload }
    },


    clear() {
      return initialState
    },
  },
}
