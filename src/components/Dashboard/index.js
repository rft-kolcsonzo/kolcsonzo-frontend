import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import NotFoundPage from '../NotFoundPage'
import Header from '../Header'
import Menu from '../Menu'
import './style.scss'
import AdminRoute from '../AdminRoute'

const Users = lazy(() => import('../Users'))
const DashboardHome = lazy(() => import('../DashboardHome'))
const Cars = lazy(() => import('../Cars'))

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
              <AdminRoute
                path={`${match.url}/users`}
                component={LazyComponent(Users)}
              />
              <Route
                path={`${match.url}/cars`}
                component={LazyComponent(Cars)}
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
