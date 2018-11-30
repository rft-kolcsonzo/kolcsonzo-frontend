import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Router from '../Router'
import './style.scss'
import { configureStore } from '../../commons'

class App extends Component {
  render() {
    return (
      <div className="fill-window app">
        <Provider store={configureStore()}>
          <Router />
        </Provider>
      </div>
    )
  }
}

export default App
