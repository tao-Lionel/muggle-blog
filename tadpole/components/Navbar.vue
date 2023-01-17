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
  <heder class="flex flex-row justify-between items-center fixed inset-0 h-14 py-3 px-6 text-comText dark:bg-dBg">
    <div v-if="false"></div>

    <router-link to="/" class="flex flex-row items-center">
      <img class="w-8 h-8 mr-3" v-if="themeData.log" :src="themeData.log" :alt="title" />
      <span class="text-xl dark:text-dText" v-if="title">{{ title }}</span>
    </router-link>

    <NavLinks></NavLinks>
  </heder>
</template>

<style scoped></style>
rgba(30,30,34,0.8)
