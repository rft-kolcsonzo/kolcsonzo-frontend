import React from 'react'

import Checkbox from '../Checkbox'

export default function Header({
  selectable,
  sortable,
  table,
  children,
  ...otherProps
}) {
  function handleSelectAllChange(checked) {
    if (checked) {
      table.selectAllRow()
    } else {
      table.deselectAllRow()
    }
  }

  return (
    <thead {...otherProps}>
      <tr>
        {selectable ? (
          <th>
            <Checkbox
              checked={table.allRowsSelected}
              onChange={handleSelectAllChange}
            />
          </th>
        ) : null}
        {React.Children.toArray(children).map((col, index) => {
          const props = {
            table,
            index,
            direction: table.direction,
          }

          if (typeof table.sorter !== 'undefined') {
            props.sorter = table.sorter === index
          }

          return React.cloneElement(col, props)
        })}
      </tr>
    </thead>
  )
}
