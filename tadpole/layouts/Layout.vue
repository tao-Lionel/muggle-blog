<script lang="ts" setup>
import { defineComponent, reactive, toRefs, ref } from "vue"
import Navbar from "@/components/Navbar.vue"
import Home from "@/components/Home.vue"
import Page from "@/components/Page.vue"
import { usePageFrontmatter } from "@vuepress/client"

console.log("11111111111111", usePageFrontmatter().value)

const pageFrontmatter = usePageFrontmatter().value
</script>

<template>
  <div class="theme-container">
    <Navbar></Navbar>
    <!-- 首页 -->
    <Home v-if="pageFrontmatter?.home"></Home>
    <!-- 文章详情页 -->
    <Page v-else></Page>
  </div>
</template>

<style lang="scss" scoped></style>
