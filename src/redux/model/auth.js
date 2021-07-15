import initialState from '../store/auth'
import agent from '../../lib/agent'

export default {
  namespace: 'auth',

  /** Initial state */
  state: initialState,

  /** Effects/Actions */
  effects: (dispatch) => ({
    async getUser() {
      try {
        const result = await agent.Account.getUser()
        const { data } = result
        if (!result.message) {
          console.log('getUser data', data)
          dispatch.auth.setUserValue({ name: 'account', value: data.account })
          dispatch.auth.setUserValue({ name: 'account_prefix', value: data.account_prefix })
          dispatch.auth.setUserValue({ name: 'api_key_setted', value: data.api_key_setted })
          dispatch.auth.setUserValue({ name: 'recommend_code', value: data.recommend_code })
          dispatch.auth.setUserValue({ name: 'usdt_amount', value: data.usdt_amount })
        }
      } catch (error) {
        console.log('[redux/model/auth] getUser error', error)
      }
    },
    async refreshToken(oldToken) {
      const body = {
        refresh_token: oldToken,
      }
      try {
        const result = await agent.Auth.refreshToken(body)
        const { data } = result
        console.log('refreshToken:', result)
        if (result) {
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

    /**
     * handle input change
     * @param {obj} state
     * @param {obj} payload
     */
    setUserValue(state, payload) {
      const { name, value } = payload
      return { ...state, [name]: value }
    },

    clear() {
      return initialState
    },
  },
}
