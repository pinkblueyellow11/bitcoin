import React from 'react';
import Root from './src/index';
import configureStore from './src/redux/store/index';

const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
