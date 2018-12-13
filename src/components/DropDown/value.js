import React from 'react'

function Value({ value, children: label, ...otherProps }) {
  return (
    <option value={value} {...otherProps}>
      {label}
    </option>
  )
}

export default React.memo(Value)
