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
    <div class="banner relative mt-16" :style="bannerBgStyle">
      <header class="hero relative z-10 text-white mx-auto">
        <h1>{{ homeData.heroText }}</h1>
        <p>{{ homeData.tagline }}</p>
      </header>
    </div>
    <div class="main-wrapper"></div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  min-height: 450px;
}
</style>
