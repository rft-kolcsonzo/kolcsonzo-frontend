import React from 'react'

function Column({ children, ...otherProps }) {
  return <td {...otherProps}>{children}</td>
}

export default React.memo(Column)
