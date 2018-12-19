import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AdminRoute from '../AdminRoute'
import { UsersListPage, UsersFormPage } from '../Pages'

export default function Users({ match }) {
  return (
    <Switch>
      <AdminRoute path={`${match.url}/create`} component={UsersFormPage} />
      <AdminRoute path={`${match.url}/:id`} component={UsersFormPage} />
      <Route component={UsersListPage} />
    </Switch>
  )
}
