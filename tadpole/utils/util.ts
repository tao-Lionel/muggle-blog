/**
 * @description: 获取时间戳
 * @param {*} date 时间
 */
export function getTimeStamp(post): number {
  const dateStr = post?.frontmatter?.data || new Date()
  const date = +new Date(dateStr)
  return date
}

/**
 * @description: 对比时间
 * @param {*} a 第一个时间
 * @param {*} b 第二个时间
 */
export function compareDate(a, b) {
  return getTimeStamp(a) - getTimeStamp(b)
}
