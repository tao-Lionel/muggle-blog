<script setup lang="ts">
import { usePageFrontmatter } from "@vuepress/client"

const homeData = usePageFrontmatter().value
console.log(homeData)

const bannerBgStyle = () => {
  return `background: url(${homeData.bannerBg}) center center / cover no-repeat`
}
</script>

<template>
  <div class="home-wrapper">
    <div class="banner" :style="bannerBgStyle">
      <header>
        <h1>{{ homeData.heroText }}</h1>
        <p>{{ homeData.tagline }}</p>
      </header>
    </div>
    <div class="main-wrapper"></div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss"></style>
