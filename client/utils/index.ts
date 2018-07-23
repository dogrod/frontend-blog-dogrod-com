// Convert time string in locale language
export const convertTimeFormat = (timeString: string) => {
  return new Date(timeString).toLocaleString('zh-cn', { month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai'})
}