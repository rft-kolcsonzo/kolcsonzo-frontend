import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

import Dashboard from '../Dashboard'
import DashboardHome from '../DashboardHome'
import LoginPage from '../LoginPage'
import NotFoundPage from '../NotFoundPage'

const Home = () => <Redirect to="/dashboard" />

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={Home} />

        <ProtectedRoute path="/dashboard" component={Dashboard}>
          <Switch>
            <Route exact path="/dashboard" component={DashboardHome} />
            <Route component={NotFoundPage} />
          </Switch>
        </ProtectedRoute>

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}
