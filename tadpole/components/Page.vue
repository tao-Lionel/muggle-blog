<script setup lang="ts">
import RightDirectory from "@/components/RightDirectory.vue"
import leftAside from "@/components/leftAside.vue"
import { usePageFrontmatter } from "@vuepress/client"

console.log(usePageFrontmatter().value)

const title = usePageFrontmatter().value.title
</script>

<template>
  <div class="page">
    <!-- 左侧 -->
    <leftAside></leftAside>

    <!-- 内容 -->
    <div class="content">
      <h1>{{ title }}</h1>
      <Content></Content>
    </div>

    <!-- 右侧目录 -->
    <RightDirectory />
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  padding-top: 3.6rem;
  margin: 0 auto;
  .content {
    min-width: 640px;
    margin: 0 auto;
    padding: 32px;
  }
}
</style>
