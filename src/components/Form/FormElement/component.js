import React from 'react'

import './style.scss'

function FormElement({ label, errors, className, children, ...otherProps }) {
  return (
    <div
      className={['form-element', errors.length > 0 ? 'error' : null, className]
        .join(' ')
        .trim()}
    >
      {label ? <div className="label">{label}</div> : null}
      {children}
      <div className="error-container">
        <ul>
          {errors.map(msg => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(FormElement, (prevProps, nextProps) => {
  const { errors: prevErrors, ...otherPrev } = prevProps
  const { errors: nextErrors, ...otherNext } = nextProps

  if (!!prevErrors !== !!nextErrors) {
    return false
  }

  if (prevErrors.length !== nextErrors.length) {
    return false
  }

  if (!prevErrors.every((msg, id) => nextErrors[id] === msg)) {
    return false
  }

  return (
    Object.keys(otherPrev).every(k => otherPrev[k] === otherNext[k]) &&
    Object.keys(otherNext).every(k => otherPrev[k] === otherNext[k])
  )
})
