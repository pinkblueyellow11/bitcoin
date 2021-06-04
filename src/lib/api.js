import axios from 'axios'
import Config from '../constant/config'
import { getUniqueId } from 'react-native-device-info'
import { connect, useSelector, useDispatch } from 'react-redux'
//import messages from '../constant/messages'
//import configureStore from '../store/index'
//import RNCrashlytics from './RNCrashlytics'
//const { store } = configureStore()
// redux
/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.apiBaseUrl
// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Device-Code'] = getUniqueId()

// axios.defaults.headers.common['Authorization'] = 'Bearer  ' + token
// console.log('Bearer  ', token)
/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    // Status code isn't a success code - throw error
    if (!`${res.status}`.startsWith('2')) {
      throw res.data
    }

    // Otherwise just return the data
    return res.data
  },
  (error) => {
    // Pass the response from the API, rather than a status code
    if (error && error.response && error.response.data) {
      throw error.response.data
    }
    console.log('[lib/api] error', error)
    throw error
  },
)

export default axios
