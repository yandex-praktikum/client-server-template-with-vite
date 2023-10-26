export const convertISOtoTimeDateMonth = (date: string) => {
  const targetDate = new Date(date)
  const hours = targetDate.getHours()
  const minutes = targetDate.getMinutes()
  const month = targetDate.getMonth()
  const day = targetDate.getDay()

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${
    day < 10 ? `0${day}` : day
  }.${month < 10 ? `0${month}` : month}`
}
