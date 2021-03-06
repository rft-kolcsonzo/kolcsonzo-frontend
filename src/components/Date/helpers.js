import { MonthNames } from './constants'

export const dateComponents = (startDate, endDate) => {
  const startDay = startDate.getDate()
  const endDay = endDate && !isNaN(endDate) ? endDate.getDate() : -1
  const startMonth = startDate.getMonth()
  const endMonth = endDate && !isNaN(endDate) ? endDate.getMonth() : -1
  const sameMonth = startMonth === endMonth
  const sameDay = sameMonth && startDay === endDay
  const startMonthName = MonthNames[startDate.getMonth()]
  const endMonthName = MonthNames[endDate.getMonth()]

  return {
    sameMonth,
    sameDay,
    startMonth,
    endMonth,
    startMonthName,
    endMonthName,
    startDay,
    endDay,
  }
}

export const dayDiff = (a, b) =>
  Math.floor(
    (new Date(dashedDate(a)).getTime() - new Date(dashedDate(b)).getTime()) /
      (24 * 60 * 60 * 1000)
  )

export const dashedDate = date => {
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  return `${yyyy}-${mm}-${dd}`
}
