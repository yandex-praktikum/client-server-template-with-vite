export const convertISOtoTimeDateMonth = (date: string): string => {
  const targetDate = new Date(date)
  const hours = targetDate.getHours().toString()
  const minutes = targetDate.getMinutes().toString()
  const month = targetDate.getMonth().toString()
  const day = targetDate.getDay().toString()

  return `${hours}:${minutes.padStart(2, '0')} ${day.padStart(
    2,
    '0'
  )}.${month.padStart(2, '0')}`
}
