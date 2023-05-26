<script setup lang="ts">
import { useThemeData } from "@/composables"

const themeData = useThemeData().value

const blogger = themeData.blogger
const social = themeData.social

console.log("blogger==========", blogger)
</script>

<template>
  <div class="flex flex-row justify-between items-center">
    <div class="flex flex-col items-center">
      <span class="fs-1.1">123</span>
      <span class="mt-0.5 fs-0.75 c-font-gray">博客文章</span>
    </div>
    <div class="split"></div>
    <div class="flex flex-col items-center">
      <span class="fs-1.1">12</span>
      <span class="mt-0.5 fs-0.75 c-font-gray">本月更新</span>
    </div>
    <div class="split"></div>
    <div class="flex flex-col items-center">
      <span class="fs-1.1">23</span>
      <span class="mt-0.5 fs-0.75 c-font-gray">本周更新</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.split {
  width: 1px;
  opacity: 0.8;
  height: 10px;
  background-color: #4e5969;
}
</style>
