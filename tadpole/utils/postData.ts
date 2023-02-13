import { compareDate } from "./util"

/**
 * @description: 过滤非文章页
 * @param {*} posts 所有文章页
 */
export function filterPosts(posts) {
  return posts.filter((item) => {
    const {
      frontmatter: { pageComponent, article, home }
    } = item
    // 存在页面组件、article字段为false、首页
    return !(pageComponent || article === false || home === true)
  })
}

/**
 * @description: 根据置顶和时间排序
 * @param {*} posts 过滤非文章页后的文章数据
 */
export function sortPosts(posts) {
  posts.sort((prev, next) => {
    const prevSticky = prev.frontmatter.sticky
    const nextSticky = next.frontmatter.sticky

    if (prevSticky && nextSticky) {
      return prevSticky === nextSticky ? compareDate(prev, next) : prevSticky - nextSticky
    } else if (prevSticky && !nextSticky) {
      return -1
    } else if (!prevSticky && nextSticky) {
      return 1
    }
    return compareDate(prev, next)
  })

  return posts
}

/**
 * @description: 按分类和标签分组的文章数据
 * @param {*} posts 按置顶和时间排序过得文章数据
 */
export function groupPosts(posts) {}
