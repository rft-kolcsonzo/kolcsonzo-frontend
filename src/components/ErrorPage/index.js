import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

function ErrorPage({ error }) {
  return (
    <div className="error-page">
      <div>
        <h1>
          <span className="big">Ooops...</span>Something went wrong
        </h1>

        <div className="content">
          A következő hiba miatt az alkalmazás működése leállt:
          {(error && error.message) || error}
          <Link to="/">vissza a főoldalra</Link>.
        </div>
      </div>
    </div>
  )
}

export default React.memo(ErrorPage)
