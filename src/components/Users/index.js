import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { UsersListPage, UsersFormPage } from '../Pages'

export default function Users({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/create`} component={UsersFormPage} />
      <Route path={`${match.url}/:id`} component={UsersFormPage} />
      <Route component={UsersListPage} />
    </Switch>
  )
}
