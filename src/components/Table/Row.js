import React from 'react'

import Checkbox from '../Checkbox'

function Row({
  children,
  index,
  table,
  selected = false,
  selectable = false,
  sortable = false,
  ...otherProps
}) {
  function handleSelectedChange(checked) {
    if (checked) {
      table.selectRow(index)
    } else {
      table.deselectRow(index)
    }
  }

  return (
    <tr {...otherProps}>
      {selectable ? (
        <td>
          <Checkbox onChange={handleSelectedChange} checked={selected} />
        </td>
      ) : null}
      {children}
    </tr>
  )
}

export default React.memo(Row)
