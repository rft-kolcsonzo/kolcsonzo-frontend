import React from 'react'
import { dateComponents } from './helpers'

function DateInterval({ startDate, endDate }) {
  if (startDate instanceof Date && !isNaN(startDate)) {
    const {
      sameMonth,
      sameDay,
      startMonthName,
      endMonthName,
      startDay,
      endDay,
    } = dateComponents(
      startDate,
      endDate && !isNaN(endDate) ? endDate : startDate
    )
    if (sameDay) {
      if (endDate && !isNaN(endDate)) {
        return startMonthName + ' ' + startDay + '. '
      } else {
        return startMonthName + ' ' + startDay + '. -'
      }
    }

    if (sameMonth) {
      return startMonthName + ' ' + startDay + '-' + endDay + '.'
    }

    return (
      startMonthName +
      ' ' +
      startDay +
      '. - ' +
      endMonthName +
      ' ' +
      endDay +
      '.'
    )
  }
}

export default React.memo(DateInterval)
