import React from 'react'
import { Route } from 'react-router-dom'
import AccessForbiddenPage from '../AccessForbiddenPage'

function AdminRoute({
  component: Component,
  children,
  isAdmin = false,
  ...otherProps
}) {
  return (
    <Route
      {...otherProps}
      render={props =>
        isAdmin ? (
          <Component children={children} {...props} />
        ) : (
          <AccessForbiddenPage />
        )
      }
    />
  )
}

export default React.memo(AdminRoute)
