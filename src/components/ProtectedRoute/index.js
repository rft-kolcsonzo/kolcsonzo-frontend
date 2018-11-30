import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = true

export default function ProtectedRoute({
  component: Component,
  children,
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
