import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Root, StyleProvider } from 'native-base'
import { PersistGate } from 'redux-persist/es/integration/react'
import getTheme from '../native-base-theme/components'
import theme from '../native-base-theme/variables/commonColor'
import Navigation from './navigation'

export default function App(props) {
  const { store, persistor } = props

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
  }, [])

  return (
    <Root>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StyleProvider style={getTheme(theme)}>
            <Navigation />
          </StyleProvider>
        </PersistGate>
      </Provider>
    </Root>
  )
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
}
