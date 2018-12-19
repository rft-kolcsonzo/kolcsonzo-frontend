import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { Map } from 'immutable'

const middlewares = [thunk]
const storeEnhancers = []

if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    storeEnhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }
}

const middlewareEnhancers = applyMiddleware(...middlewares)
const prepareInitialState = state => {
  const prepared = {}

  Object.keys(state).forEach(key => (prepared[key] = Map(state[key])))

  return prepared
}

storeEnhancers.unshift(middlewareEnhancers)

export const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    prepareInitialState(initialState),
    compose(...storeEnhancers)
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(module.require('../reducers').default)
      )
    }
  }

  return store
}
