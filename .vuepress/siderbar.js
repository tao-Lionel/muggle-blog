const { createSideBarConfig } = require('./util')
const LINK_PATH = '/blogs/link'
const JS_PATH = '/blogs/JS'

module.exports = {
  [LINK_PATH]: [createSideBarConfig('各种外部链接', LINK_PATH)],
  [JS_PATH]: [
    createSideBarConfig('JS-数组', JS_PATH + '/js-array'),
    createSideBarConfig('JS-基础', JS_PATH + '/js-base')
  ]
}