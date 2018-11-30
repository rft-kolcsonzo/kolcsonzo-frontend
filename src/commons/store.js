import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const storeEnhancers = []

if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    storeEnhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }
}

const middlewareEnhancers = applyMiddleware(...middlewares)

storeEnhancers.unshift(middlewareEnhancers)

export const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
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
