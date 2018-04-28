/**
 * set document.title
 * @param {string} title target title
 */
export default (title = '无敌筋斗雷 x 不唠嗑') => {
  if (title === document.title) return

  document.title = title
}