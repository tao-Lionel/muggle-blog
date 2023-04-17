import dayjs from "dayjs"

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

/**
 * @description: 类型判断
 * @param {*} o
 */
export function getType(o) {
  const s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

/**
 * @description: 日期格式化(只获取年月日)
 * @param {*} date
 */
export function dateFormat(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`
}
