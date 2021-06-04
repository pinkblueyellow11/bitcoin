import { Platform } from 'react-native'
import { RELEASE_ENV } from '@env'

//const semver = require('semver')

const isDevEnv = process.env.NODE_ENV === 'development'
const isReleaseStagingEnv = RELEASE_ENV === 'staging'

export default {
  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // API
  apiBaseUrl: isDevEnv ? 'https://st-dev.shentong.app/api' : 'https://st-dev.shentong.app/api',

  // Async Storage Token
  ASYNC_STORAGE: {
    LOGIN_INFO: 'login_info',
  },

  // 手機驗證碼位數
  VERIFICATION_CODE_CELL_COUNT: 6,
}
