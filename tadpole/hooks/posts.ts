import {
  filterPosts as _filterPosts,
  sortPosts as _sortPosts,
  groupPosts as _groupPosts,
  categoriesAndTags as _categoriesAndTags
} from "../utils/postData"
import { pages } from "@temp/pages"

// 页面数据相关
export function usePosts() {
  console.log(pages)

  // 过滤非文章页和首页的文章数据
  function filterPosts() {
    return _filterPosts(pages)
  }

  // 按置顶和时间顺序排序的文章数据
  function sortPosts() {
    return _sortPosts(filterPosts())
  }

  // 按分类和标签分组的文章数据
  function groupPosts() {
    return _groupPosts(sortPosts())
  }

  // 所有分类和标签数据
  function categoriesAndTags() {
    return _categoriesAndTags(groupPosts())
  }

  return { filterPosts, sortPosts, groupPosts, categoriesAndTags }
}
