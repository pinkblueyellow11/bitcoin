/* global */
import { init } from '@rematch/core'
import createPersistPlugin, { getPersistor } from '@rematch/persist'
import createLoadingPlugin from '@rematch/loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as models from '../model'

let store

// Create plugins
const persistPlugin = createPersistPlugin({
  version: 2,
  storage: AsyncStorage,
  whitelist: [],
  blacklist: [],
})
const loadingPlugin = createLoadingPlugin({})

const configureStore = () => {
  if (!store) {
    store = init({
      models,
      redux: {
        middlewares: [],
      },
      plugins: [persistPlugin, loadingPlugin],
    })
  }
  const persistor = getPersistor()
  const { dispatch } = store

  return { persistor, store, dispatch }
}

export default configureStore
