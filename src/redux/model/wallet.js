import initialState from '../store/wallet'
import agent from '../../lib/agent'

export default {
  namespace: 'wallet',

  /** Initial state */
  state: initialState,

  /** Effects/Actions */
  effects: (dispatch) => ({
    async getWalletAddress() {
      try {
        const result = await agent.Wallet.getWalletAddress()
        const { data } = result
        if (result) {
          dispatch.wallet.setWalletAddress(data)
        }
      } catch (error) {
        console.log('[redux/model/wallet] getWalletAddress error', error)
      }
    },
    async getWalletBalances() {
      try {
        const result = await agent.Wallet.getWalletBalances()
        const { data } = result
        if (result) {
          dispatch.wallet.setWalletMoney(data)
          console.log('getWalletBalances data:', data)
        }
      } catch (error) {
        console.log('[redux/model/wallet] getWalletBalances error', error)
      }
    },
    async getwalletCurrencyInfo() {
      try {
        const result = await agent.Wallet.getwalletCurrencyInfo()
        const { data } = result
        if (result) {
          dispatch.wallet.setWalletCurrencyInfo(data)
          console.log('getwalletCurrencyInfo data:', data)
        }
      } catch (error) {
        console.log('[redux/model/wallet] getWalletBalances error', error)
      }
    },
    async getwalletHistoryToday() {
      try {
        const currTime = new Date().toISOString().slice(0, 10)
        const result = await agent.Wallet.getEasierHistory('', currTime, currTime)
        const { data } = result
        if (result) {
          dispatch.wallet.setHistoryToday(data)
        }
      } catch (error) {
        console.log('[redux/model/wallet] getwalletHistoryToday error', error)
      }
    },
    async getwalletHistoryWeek() {
      try {
        const currTime = new Date().toISOString().slice(0, 10)
        const aWeekAgo = new Date().setDate(new Date().getDate() - 7)
        console.log('aWeekAgo', aWeekAgo)
        const aWeekAgoFromat = new Date(aWeekAgo).toISOString().slice(0, 10)
        const result = await agent.Wallet.getEasierHistory('', aWeekAgoFromat, currTime)
        const { data } = result
        if (result) {
          dispatch.wallet.setHistoryWeek(data)
        }
      } catch (error) {
        console.log('[redux/model/wallet] getwalletHistoryWeek error', error)
      }
    },
    async getwalletHistoryMonth() {
      try {
        const currTime = new Date().toISOString().slice(0, 10)
        const aMonthAgo = new Date().setMonth(new Date().getMonth() - 1)
        const aMonthAgoFromat = new Date(aMonthAgo).toISOString().slice(0, 10)
        console.log('aMonthAgo', aMonthAgo)
        console.log('aMonthAgoFromat', aMonthAgoFromat)
        const result = await agent.Wallet.getEasierHistory('', aMonthAgoFromat, currTime)
        const { data } = result
        if (result) {
          console.log('getwalletHistoryMonth', data)
          dispatch.wallet.setHistoryMonth(data)
        }
      } catch (error) {
        console.log('[redux/model/wallet] getwalletHistoryMonth error', error)
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
     * @param {obj} state
     * @param {obj} payload
     */
    setWalletAddress(state, payload) {
      return { ...state, address: payload }
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     */
    setWalletMoney(state, payload) {
      return { ...state, walletMoney: payload }
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     */
    setWalletCurrencyInfo(state, payload) {
      return { ...state, currencyInfo: payload }
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     */
    setHistoryToday(state, payload) {
      return { ...state, historyToday: payload }
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     */
    setHistoryWeek(state, payload) {
      return { ...state, historyWeek: payload }
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     */
    setHistoryMonth(state, payload) {
      return { ...state, historyMonth: payload }
    },

    clear() {
      return initialState
    },
  },
}
