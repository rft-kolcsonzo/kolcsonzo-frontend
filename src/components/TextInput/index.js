import React from 'react'
import './style.scss'

export default function TextInput({ className, ...otherProps }) {
  const classNames = ['input', className]

  return <input className={classNames.join(' ').trim()} {...otherProps} />
}
