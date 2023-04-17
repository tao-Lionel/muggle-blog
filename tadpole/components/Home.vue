<script setup lang="ts">
import { computed } from "vue"
import { usePageFrontmatter } from "@vuepress/client"
import PostList from "./PostList.vue"

const homeData = usePageFrontmatter().value

const bannerBgStyle = computed(() => {
  return { background: `url(${homeData.bannerBg}) center center / cover no-repeat` }
})
</script>

<template>
  <div class="">
    <!-- 顶部背景图 -->
    <div class="banner relative mt-14" :style="bannerBgStyle">
      <header class="relative z-10 text-white pt-40 text-center">
        <h1 class="text-5xl">{{ homeData.heroText }}</h1>
        <p class="text-xl mt-5">{{ homeData.tagline }}</p>
      </header>
    </div>
    <div class="max-w-1100 flex mx-auto mt-6">
      <!-- 左侧 文章-->
      <div class="flex-1">
        <!-- 文章列表 -->
        <PostList></PostList>
        <!-- 分页器 -->
        <div class="pagination"></div>
      </div>
      <!-- 右侧信息 -->
      <div class="main-right w-32 h-32 bg-black"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  min-height: 450px;
}
</style>
