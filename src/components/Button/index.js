import React from 'react'
import './style.scss'

function Button({ className, loading, ...otherProps }) {
  const classNames = ['button', loading ? 'loading' : '', className]

  return <button className={classNames.join(' ').trim()} {...otherProps} />
}

export default React.memo(Button)
