import { Platform } from 'react-native'
import { RELEASE_ENV } from '@env'

//const semver = require('semver')

const isDevEnv = process.env.NODE_ENV === 'development'
const isReleaseStagingEnv = RELEASE_ENV === 'staging'

export default {
  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // API
  apiBaseUrl: isDevEnv ? 'https://app.shentong.app/api' : 'https://app.shentong.app/api',
  // 正式：app.shentong.app
  // 測試：st-dev.shentong.app
  // Async Storage Token
  ASYNC_STORAGE: {
    LOGIN_INFO: 'login_info',
  },

  // 手機驗證碼位數
  VERIFICATION_CODE_CELL_COUNT: 6,
  // 手機驗證碼冷卻時間
  VERIFICATION_COUNTDOWN_TIME: 180,
}
