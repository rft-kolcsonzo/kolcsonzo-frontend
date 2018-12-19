import React from 'react'

import './style.scss'

function Spinner({ size = 'medium' }) {
  return (
    <div className="spinner-container">
      <div className={`spinner ${size}`} />
    </div>
  )
}

export default React.memo(Spinner)
