import React from 'react'
import './style.scss'

export default function IconButton({ src, className, ...otherProps }) {
  const classNames = ['icon-button', className].join(' ').trim()

  return (
    <button className={classNames} {...otherProps}>
      <img src={src} alt="" />
    </button>
  )
}
