import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { CarsListPage, CarsFormPage } from '../Pages'

export default function Cars({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/create`} component={CarsFormPage} />
      <Route path={`${match.url}/:id`} component={CarsFormPage} />
      <Route component={CarsListPage} />
    </Switch>
  )
}
