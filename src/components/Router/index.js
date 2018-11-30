import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

import Dashboard from '../Dashboard'
import LoginPage from '../LoginPage'

const Home = () => <div>Home</div>

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <ProtectedRoute path="/" component={Dashboard}>
          <Route exact path="/" component={Home} />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  )
}
