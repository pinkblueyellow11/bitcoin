import initialState from '../store/auth'
import agent from '../../lib/agent'

export default {
  namespace: 'auth',

  /** Initial state */
  state: initialState,

  /** Effects/Actions */
  effects: (dispatch) => ({
    async refreshToken(oldToken) {
      const body = {
        refresh_token: oldToken,
      }
      try {
        const result = await agent.Auth.refreshToken(body)
        const { data } = result
        console.log('refreshToken:',result)
        if(result){
          dispatch.register.setToken(result.token)
          dispatch.register.setRefreshToken(result.refresh_token)
        }
      } catch (error) {
        console.log('[redux/model/auth] refreshToken error', error)
      }
    },
  }),

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

    clear() {
      return initialState
    },
  },
}
