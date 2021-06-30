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

const bot = {
  setApiKey: (body) => {
    return axios.post('/user', body)
  },
  newRobot: (body) => {
    return axios.post('/user/robots', body)
  },
  getRobot: () => {
    return axios.get('/user/robots')
  },
  getRobotDetail: (robot_id) => {
    const params = { robot_id: robot_id }
    return axios.get('/user/robots/' + robot_id)
  },
  getCoinCost: () => {
    return axios.get('/coin-cost')
  },
  upReceipt: (body) => {
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    return axios.post('/usdt/add-value', body)
  },
  drawCoin: (body) => {
    return axios.post('/usdt/withdraw', body)
  },
  closeRobot: (robot_id, body) => {
    return axios.post('/user/robots/' + robot_id, body)
  },
  closeRobotPurchase: (robot_id, body) => {
    return axios.post('/user/robots/' + robot_id + '/purchase', body)
  },
  manualPurchase: (robot_id, body) => {
    return axios.post('/user/robots/' + robot_id + '/manual-purchase', body)
  },
  outOfWarehouse: (robot_id) => {
    return axios.post('/user/robots/' + robot_id + '/manual-sell')
  },
  getWalletHistory: () => {
    return axios.get('/usdt/wallet-history')
  },
  getUsdtTrans: () => {
    return axios.get('/usdt/usdt-trans')
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
  bot,
  Account,
}
