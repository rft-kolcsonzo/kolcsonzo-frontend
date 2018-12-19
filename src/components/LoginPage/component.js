import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginBox from '../LoginBox'
import './style.scss'

function LoginPage({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-page">
      <LoginBox />
    </div>
  )
}

export default React.memo(LoginPage)
