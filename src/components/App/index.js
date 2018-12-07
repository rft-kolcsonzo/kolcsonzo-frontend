import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './style.scss'

import ProtectedRoute from '../ProtectedRoute'

import Dashboard from '../Dashboard'
import LoginPage from '../LoginPage'
import NotFoundPage from '../NotFoundPage'

function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />

      <ProtectedRoute path="/-" component={Dashboard} />
      <Redirect exact from="/" to="/-" />

      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default App
