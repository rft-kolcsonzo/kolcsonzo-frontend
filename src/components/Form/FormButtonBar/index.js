import React from 'react'

import './style.scss'

function FormButtonBar({ className, ...otherProps }) {
  return (
    <div
      className={['form-button-bar', className].join(' ').trim()}
      {...otherProps}
    />
  )
}

export default React.memo(FormButtonBar)
