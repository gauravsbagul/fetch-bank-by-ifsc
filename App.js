/* eslint-disable comma-dangle */
import AsyncStorage from '@react-native-community/async-storage';
import Flatted from 'flatted';
import { StyleProvider, Root as NativeBaseRoot } from 'native-base';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import thunk from 'redux-thunk';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import Root from './src/Navigation';
import rootReducer from './src/Redux/store/';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState),
);

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bank'],
  transforms: [transformCircular],
};
const args = __DEV__ ? [thunk, logger] : [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...args));
const persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleProvider style={getTheme(material)}>
          <NativeBaseRoot>
            <Root />
          </NativeBaseRoot>
        </StyleProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
