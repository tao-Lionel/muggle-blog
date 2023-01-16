<script lang="ts" setup>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { useThemeLocaleData, useThemeData } from "@/composables";
const themeData = useThemeData();
console.log(themeData.value);
console.log(useThemeLocaleData().value);
</script>

<template>
  <heder>
    {{ themeData }}
    <!-- <router-link to="/" class="home-link">
      <img class="logo" v-if="$site.themeConfig.logo" :src="$withBase($site.themeConfig.logo)" :alt="$siteTitle" />
      <span ref="siteName" class="site-name" v-if="$siteTitle" :class="{ 'can-hide': $site.themeConfig.logo }">{{ $siteTitle }}</span>
    </router-link> -->
  </heder>
</template>

<style scoped></style>
