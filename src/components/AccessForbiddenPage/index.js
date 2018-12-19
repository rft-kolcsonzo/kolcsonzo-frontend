import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

function AccessForbiddenPage() {
  return (
    <div className="access-forbidden-page">
      <div>
        <h1>
          <span className="big">403</span>Nem engedélyezett
        </h1>

        <div className="content">
          Ehhez a funkcióhoz nem rendelkezik hozzáféréssel!{' '}
          <Link to="/">vissza a főoldalra</Link>.
        </div>
      </div>
    </div>
  )
}

export default React.memo(AccessForbiddenPage)
