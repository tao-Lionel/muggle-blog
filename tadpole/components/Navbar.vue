<script lang="ts" setup>
import { defineComponent, reactive, toRefs, ref } from "vue"
import { useSiteLocaleData, usePageHeadTitle, usePageHead, useRouteLocale } from "@vuepress/client"
import { useThemeData } from "@/composables"
import NavLinks from "./NavLinks.vue"

const themeData = useThemeData().value
console.log(themeData)

const title = usePageHeadTitle().value
</script>

<template>
  <heder class="flex flex-row justify-between items-center fixed inset-0 h-3.6 p-0.7-1.5 c-black">
    <div v-if="false"></div>

    <router-link to="/" class="flex flex-row items-center">
      <img class="min-w-2.2 h-2.2 mr-0.8" v-if="themeData.log" :src="themeData.log" :alt="title" />
      <span class="fs-1.3 fw-600" v-if="title">{{ title }}</span>
    </router-link>

    <NavLinks></NavLinks>
  </heder>
</template>

<style scoped></style>
rgba(30,30,34,0.8)
