import React from 'react'
import { Link } from 'react-router-dom'

function NavButton({ className, ...otherProps }) {
  return (
    <Link className={['button', className].join(' ').trim()} {...otherProps} />
  )
}

export default React.memo(NavButton)
