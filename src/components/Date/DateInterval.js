import React from 'react'
import { dateComponents } from './helpers'

function DateInterval({ startDate, endDate }) {
  if (startDate instanceof Date && endDate instanceof Date) {
    const {
      sameMonth,
      sameDay,
      startMonth,
      endMonth,
      startDay,
      endDay,
    } = dateComponents(startDate, endDate)
    if (sameDay) {
      return startMonth + ' ' + startDay + '. '
    }

    if (sameMonth) {
      return startMonth + ' ' + startDay + '-' + endDay + '.'
    }

    return startMonth + ' ' + startDay + '. - ' + endMonth + ' ' + endDay + '.'
  }
}

export default React.memo(DateInterval)
