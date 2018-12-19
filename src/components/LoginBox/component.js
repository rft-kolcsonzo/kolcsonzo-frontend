import React, { PureComponent } from 'react'

import './style.scss'
import TextInput from '../TextInput'
import Button from '../Button'
import { APIContext } from '../../commons'
import Form from '../Form'

export default class LoginBox extends PureComponent {
  state = {
    loading: false,
    error: undefined,
    email: '',
    password: '',
  }

  static contextType = APIContext

  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  async handleLogin(e) {
    const { email, password } = this.state
    const { setAuthState } = this.props

    e.preventDefault()
    this.setState({ loading: true })

    const resp = await this.context.login(email, password)

    this.setState({ loading: false, error: null })

    if (resp === true) {
      setAuthState(true)
    } else {
      this.setState({ error: resp.message })
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    const { loading, email, password, error } = this.state

    return (
      <div className="login-box">
        <Form onSubmit={this.handleLogin}>
          <h1>Bejelentkezés</h1>

          {<div className="error">{error}</div>}

          <div className="content">
            <TextInput
              type="text"
              placeholder="e-mail"
              name="email"
              className="field"
              value={email}
              onChange={this.handleEmailChange}
            />
            <TextInput
              type="password"
              placeholder="jelszó"
              name="password"
              className="field"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </div>

          <Button loading={loading}>Bejelentkezés</Button>
        </Form>
      </div>
    )
  }
}
