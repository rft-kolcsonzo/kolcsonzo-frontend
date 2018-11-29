import React, { Component } from 'react'
import LoginPage from '../LoginPage'
import './style.scss'

class App extends Component {
  render() {
    return (
      <div className="fill-window app">
        <LoginPage />
      </div>
    )
  }
}

export default App
