import React from 'react'
import './style.scss'

export default function Input({ className, ...otherProps }) {
  const classNames = ['input', className]

  return <input className={classNames.join(' ').trim()} {...otherProps} />
}
