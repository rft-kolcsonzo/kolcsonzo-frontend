import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { OrdersListPage, OrdersFormPage } from '../Pages'

export default function Users({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/create`} component={OrdersFormPage} />
      <Route path={`${match.url}/:id`} component={OrdersFormPage} />
      <Route component={OrdersListPage} />
    </Switch>
  )
}
