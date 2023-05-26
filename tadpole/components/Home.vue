<script setup lang="ts">
import { computed } from "vue"
import { usePageFrontmatter } from "@vuepress/client"
import PostList from "./PostList.vue"
import BloggerBar from "./BloggerBar.vue"

const homeData = usePageFrontmatter().value

const bannerBgStyle = computed(() => {
  return { background: `url(${homeData.bannerBg}) center center / cover no-repeat` }
})
</script>

<template>
  <div class="">
    <!-- 顶部背景图 -->
    <div class="banner relative mt-3.6">
      <header class="relative z-10 text-white pt-3 pb-3 text-center">
        <div class="c-font">
          <h1 class="fs-3.2">{{ homeData.heroText }}</h1>
          <p class="fs-1.1 m-1.5">{{ homeData.tagline }}</p>
        </div>
      </header>
    </div>
    <div class="max-w-1100 flex mx-auto mt-2">
      <!-- 左侧 文章-->
      <div class="flex-1">
        <!-- 文章列表 -->
        <PostList></PostList>
        <!-- 分页器 -->
        <div class="pagination"></div>
      </div>
      <!-- 右侧信息 -->
      <div class="main-right">
        <BloggerBar class="card"></BloggerBar>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  width: 100%;
  // min-height: 450px;
}

.main-right {
  width: 300px;
  min-width: 240px;
  margin-left: 16px;
  .card {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    margin: 0 auto 10px;
  }
}
</style>
