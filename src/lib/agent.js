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
    console.log('bot body', body)
    return axios.post('/user', body)
  },
  newRobot: (body) => {
    return axios.post('/user/robots', body)
  },
  getRobot: () => {
    return axios.get('/user/robots')
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
