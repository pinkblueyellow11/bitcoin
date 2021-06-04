import axios from './api'
import config from '../constant/config'

//const queryString = require('query-string')

export const clearAxiosTokens = () => {
  axios.defaults.headers.common.token = null
}

export const setAxiosTokens = (token) => {
  console.log('token', token)
  axios.defaults.headers.common.Authorization = 'Bearer ' + token
}
const Auth = {
  register: (body) => axios.post('/register', body),
  registerVerifyEmail: (body) => axios.post('/register/send-register-code', body),
  logIn: (body) => axios.post('/auth/login', body),
  forgetPasswordEmail: (body) => axios.post('/reset-pwd/send-reset-pwdcode', body),
  rePassword: (body) => axios.post('/reset-pwd/change-pwd', body),
  refreshToken: (body) => axios.post('/auth/refresh-token', body),
  getAppVersion: () => {
    return axios.get('/app-versions')
  },
}

const Wallet = {
  getWalletAddress: () => {
    return axios.get('/wallets/address')
  },
  getWalletBalances: () => {
    return axios.get('/wallets/balances')
  },
  walletTransactions: (body) => {
    return axios.post('/wallets/transactions', body)
  },
  getwalletCurrencyInfo: () => {
    return axios.get('/wallets/currency-info')
  },
  getEasierHistory: (currency_code, start, end) => {
    return axios.get('/wallets/history/' + currency_code + '?start_date=' + start + '&end_date=' + end)
  },
  walletDiggin: (body) => {
    return axios.post('/wallets/digging', body)
  },
}

const Account = {
  getUser: () => {
    return axios.get('/user')
  },
  getRecommended: () => {
    return axios.get('/user/recommended-members')
  },
}

export default {
  Auth,
  Wallet,
  Account,
}
