/**
 * Convert time string in locale language
 * @param timeString - time string
 * @returns localized time
 */
export const convertTimeFormat = (timeString?: string) => {
  if (!timeString) {
    return
  }

  return new Date(timeString).toLocaleString('zh-cn', { month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai'})
}

const SITE_TITLE = '无敌筋斗雷'

/**
 * Set title
 * @param title - title
 */
export const setTitle = (title: string) => {
  if (typeof document.title === 'undefined') {
    return
  }

  document.title = title.includes(SITE_TITLE) ? title : `${title} | ${SITE_TITLE}`
}

let lastId = 0

/**
 * Generate a unique ID
 * @param prefix - prefix of id
 * @returns UID
 */
export const generateUID = (prefix?: string) => {
  lastId++
  return `${prefix}${lastId}`
}