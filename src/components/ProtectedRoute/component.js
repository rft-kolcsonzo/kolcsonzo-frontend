import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({
  component: Component,
  children,
  isAuthenticated = false,
  ...otherProps
}) {
  return (
    <Route
      {...otherProps}
      render={props =>
        isAuthenticated ? (
          <Component children={children} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default React.memo(ProtectedRoute)
