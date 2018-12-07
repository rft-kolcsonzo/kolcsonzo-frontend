import React from 'react'
import './style.scss'

function FormRow({ className, ...otherProps }) {
  return (
    <div className={['form-row', className].join(' ').trim()} {...otherProps} />
  )
}

export default React.memo(FormRow)
