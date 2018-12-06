import React from 'react'

import SorterIcon from '../../assets/img/sorter.svg'

function HeaderColumn({
  children,
  sortable = false,
  sorter = false,
  direction = 'desc',
  index,
  className,
  table,
  ...otherProps
}) {
  function handleSorterClick() {
    if (direction === 'desc') {
      table.sortBy(index, 'asc')
    } else {
      table.sortBy(index, 'desc')
    }
  }

  const classNames = [
    className,
    sortable ? 'sortable' : '',
    sorter ? 'sorter' : '',
    sorter ? direction : '',
  ]
    .join(' ')
    .trim()

  if (sortable && table.sorter === undefined && sorter) {
    table.sortBy(index, direction)
  }

  return (
    <th
      {...otherProps}
      className={classNames}
      onClick={sortable ? handleSorterClick : undefined}
    >
      {children}
      {sortable && <img src={SorterIcon} className="sorter-direction" alt="" />}
    </th>
  )
}

export default React.memo(HeaderColumn)
