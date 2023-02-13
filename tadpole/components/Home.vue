<script setup lang="ts">
import { computed } from "vue"
import { usePageFrontmatter } from "@vuepress/client"

const homeData = usePageFrontmatter().value

const bannerBgStyle = computed(() => {
  return { background: `url(${homeData.bannerBg}) center center / cover no-repeat` }
})
</script>

<template>
  <div class="home-wrapper">
    <!-- 顶部背景图 -->
    <div class="banner relative mt-14" :style="bannerBgStyle">
      <header class="relative z-10 text-white pt-40 text-center">
        <h1 class="text-5xl">{{ homeData.heroText }}</h1>
        <p class="text-xl mt-5">{{ homeData.tagline }}</p>
      </header>
    </div>
    <div class="main-wrapper mx-auto mt-6">
      <!-- 左侧 文章-->
      <div class="main-left">
        <div class="post-list"></div>
        <div class="pagination"></div>
      </div>
      <!-- 右侧信息 -->
      <div class="main-right"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  min-height: 450px;
}
</style>
