import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import NotFoundPage from '../NotFoundPage'
import Header from '../Header'
import Menu from '../Menu'
import './style.scss'
import AdminRoute from '../AdminRoute'
import ErrorBoundary from '../ErrorBoundary'
import ErrorPage from '../ErrorPage'
import Spinner from '../Spinner'

const Users = lazy(() => import('../Users'))
const DashboardHome = lazy(() => import('../DashboardHome'))
const Cars = lazy(() => import('../Cars'))
const Orders = lazy(() => import('../Orders'))

function LazyComponent(Component) {
  return props => <Component {...props} />
}

export default function Dashboard({ match, location }) {
  return (
    <div className="fill-window dashboard">
      <div className="content-container">
        <Header />
        <div className="content">
          <Suspense fallback={<Spinner size="big" />}>
            <ErrorBoundary fallback={errors => <ErrorPage errors={errors} />}>
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
                  component={LazyComponent(Orders)}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
      <Menu location={location} />
    </div>
  )
}
