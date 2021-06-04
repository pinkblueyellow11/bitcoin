import initialState from '../store/register'

export default {
  namespace: 'register',

  /** Initial state */
  state: initialState,

  /** Effects/Actions */
  effects: () => ({}),

  /** Reducers */
  reducers: {
    /**
     * handle input change
     * @param {obj} state
     * @param {obj} payload
     * @param {string} payload.name
     * @param {*} payload.value
     */
    setInputValue(state, payload) {
      const { name, value } = payload
      return { ...state, [name]: value }
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     */
    setToken(state, payload) {
      return { ...state, token: payload }
    },

     /**
     * @param {obj} state
     * @param {obj} payload
     */
    setRefreshToken(state, payload) {
        return { ...state, refresh_token: payload }
      },

    clear() {
      return initialState
    },
  },
}
