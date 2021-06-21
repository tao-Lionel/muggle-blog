const { createSideBarConfig } = require('./util')
const LINK_PATH = '/blogs/link'

module.exports = {
  [LINK_PATH]: [createSideBarConfig('各种外部链接', LINK_PATH)]
}