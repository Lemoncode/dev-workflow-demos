import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import {organizationReducer} from './pods/organization'
import * as thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
  const middlewares = [
    thunk    
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    createReducer(),
    composeEnhancers(...enhancers),
  );
  
  return store;
}

function createReducer() {
  return combineReducers({
    organization : organizationReducer,
  });
}