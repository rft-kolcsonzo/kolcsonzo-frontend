import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import NotFoundPage from '../NotFoundPage'
import Header from '../Header'
import Menu from '../Menu'
import './style.scss'

const Users = lazy(() => import('../Users'))
const DashboardHome = lazy(() => import('../DashboardHome'))

function LazyComponent(Component) {
  return props => <Component {...props} />
}

export default function Dashboard({ children, match, location }) {
  return (
    <div className="fill-window dashboard">
      <div className="content-container">
        <Header />
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                exact
                path={match.url}
                component={LazyComponent(DashboardHome)}
              />
              <Route
                path={`${match.url}/users`}
                component={LazyComponent(Users)}
              />
              <Route
                path={`${match.url}/cars`}
                component={() => <div>hi</div>}
              />
              <Route
                path={`${match.url}/orders`}
                component={() => <div>hi</div>}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </div>
      </div>
      <Menu location={location} />
    </div>
  )
}
