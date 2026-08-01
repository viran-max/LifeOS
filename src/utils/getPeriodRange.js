import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'

export function getPeriodRange(type, referenceDate = new Date()) {
  if (type === 'weekly') {
    return {
      start: startOfWeek(referenceDate, { weekStartsOn: 1 }),
      end: endOfWeek(referenceDate, { weekStartsOn: 1 }),
    }
  }
  return {
    start: startOfMonth(referenceDate),
    end: endOfMonth(referenceDate),
  }
}