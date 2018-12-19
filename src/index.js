import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { configureStore, configureAPI, APIContext } from './commons'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

const apiClient = configureAPI({
  baseUrl: process.env.REACT_APP_API_BASE_URL || '/',
})
const initialState = {
  app: {
    authenticated: apiClient.isAuthenticated,
    isAdmin: apiClient.isAdmin,
  },
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore(initialState)}>
      <APIContext.Provider value={apiClient}>
        <App />
      </APIContext.Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
