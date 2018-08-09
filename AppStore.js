import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import AppReducers from './AppReducers'
import ApiMiddleware from './ApiMiddleware'

const middleware = [ApiMiddleware]

if (__DEV__) {
  const logger = createLogger({
    // stateTransformer: (state) => {
    //   return {
    //     ...state,
    //     type: String(state.type),
    //   }
    // },
    actionTransformer: (action) => {
      return {
        ...action,
        type: String(action.type),
      }
    },
  })

  middleware.push(logger)
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(combineReducers(AppReducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch(async (dispatch, getState) => {

  }
)

let _store = null

export default function configureStore() {
  _store = store
  return _store
}

export function getStore() {
  return _store
}
