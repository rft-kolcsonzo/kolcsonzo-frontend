import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div>
        <h1>
          <span className="big">404</span>Not found
        </h1>

        <div className="content">
          Ezen az URL-en nem érhető el tartalom,{' '}
          <Link to="/">vissza a főoldalra</Link>.
        </div>
      </div>
    </div>
  )
}
