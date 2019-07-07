import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import storage from 'redux-persist/lib/storage';

import reducer from '../reducer';
import {InitialState} from '../state';

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['blog','payment'] // place to select which state you want to persist
}
const persistedReducer = persistReducer(persistConfig, reducer)

export function initializeStore (initialState = InitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}