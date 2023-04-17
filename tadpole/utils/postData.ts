import { compareDate, getType } from "./util"

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
export function groupPosts(posts) {
  const categoriesObj = {}
  const tagsObj = {}

  for (let i = 0; i < posts.length; i++) {
    const {
      frontmatter: { categories, tags }
    } = posts[i]
    if (getType(categories) === "array") {
      categories.forEach((item) => {
        if (item) {
          // 分类值是有效的
          if (!categoriesObj[item]) {
            categoriesObj[item] = []
          }
          categoriesObj[item].push(posts[i])
        }
      })
    }
    if (getType(tags) === "array") {
      tags.forEach((item) => {
        if (item) {
          // 标签值是有效的
          if (!tagsObj[item]) {
            tagsObj[item] = []
          }
          tagsObj[item].push(posts[i])
        }
      })
    }
  }
  return {
    categories: categoriesObj,
    tags: tagsObj
  }
}

/**
 * @description: 获取所有分类和标签
 * @param {*} groupPosts 按分类和标签分组之后的文章数据
 */
export function categoriesAndTags(groupPosts) {
  const categoriesArr = []
  const tagsArr = []

  for (let key in groupPosts.categories) {
    categoriesArr.push({
      key,
      length: groupPosts.categories[key].length
    })
  }

  for (let key in groupPosts.tags) {
    tagsArr.push({
      key,
      length: groupPosts.tags[key].length
    })
  }
  return {
    categories: categoriesArr,
    tags: tagsArr
  }
}
