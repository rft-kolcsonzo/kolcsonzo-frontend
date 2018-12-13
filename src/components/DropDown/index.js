import React from 'react'

import ArrowIcon from '../../assets/img/arrow_down.svg'
import './style.scss'

export { default as Value } from './value'

function DropDown({ className, disabled, children, ...otherProps }) {
  return (
    <span
      className={['drop-down', disabled ? 'disabled' : '', className]
        .join(' ')
        .trim()}
    >
      <select disabled={disabled} {...otherProps}>
        {children}
      </select>
      <img src={ArrowIcon} className="arrow" alt="" />
    </span>
  )
}

export default React.memo(DropDown)
