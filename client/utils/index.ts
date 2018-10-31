/**
 * Convert time string in locale language
 * @param timeString - time string
 * @returns localized time
 */
export const convertTimeFormat = (timeString: string) => {
  return new Date(`${timeString}.000Z`).toLocaleString(
    'zh-cn',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Shanghai'
    }
  )
}

const SITE_TITLE = '无敌筋斗雷'

/**
 * Set title
 * @param title - title
 */
export const setTitle = (title: string) => {
  document.title = title.includes(SITE_TITLE) ? title : `${title} | ${SITE_TITLE}`
}

let lastId = 0
const timestamp = +(new Date())

/**
 * Generate a unique ID
 * @param prefix - prefix of id
 * @returns UID
 */
export const generateUID = (prefix: string = 'dogrod') => {
  lastId++
  return `${prefix}-${lastId}-${timestamp}`
}

let timer: number | null = null

/**
 * Throttle function
 */
export const throttle = function(
  this: any,
  callback: () => void,
  delay?: number
) {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(
    () => {
      callback.apply(this, arguments)
    },
    delay
  )
}