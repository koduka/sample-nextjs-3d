const LAST_ACCESS_DATE_KEY = 'last_access_date'

export function isAccessedAtToday() {
  const last = localStorage.getItem(LAST_ACCESS_DATE_KEY)
  return last === new Date().toDateString()
}

export function saveAccessDate() {
  localStorage.setItem(LAST_ACCESS_DATE_KEY, new Date().toDateString())
}
