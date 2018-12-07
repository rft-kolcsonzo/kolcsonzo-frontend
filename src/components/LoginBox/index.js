import React, { Component } from 'react'
import './style.scss'
import TextInput from '../TextInput'
import Button from '../Button'

export default class LoginBox extends Component {
  state = {
    loading: false,
  }

  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.setState({ loading: true })

    setTimeout(() => this.setState({ loading: false }), 2000)
  }

  render() {
    const { loading } = this.state
    return (
      <div className="login-box">
        <h1>Bejelentkezés</h1>

        <div className="content">
          <TextInput
            type="text"
            placeholder="e-mail"
            name="email"
            className="field"
          />
          <TextInput
            type="password"
            placeholder="jelszó"
            name="password"
            className="field"
          />
        </div>

        <Button loading={loading} onClick={this.handleLogin}>
          Bejelentkezés
        </Button>
      </div>
    )
  }
}
