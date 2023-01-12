<template>
  <heder class="">
    <router-link to="/" class="home-link">
      logo
      <!-- <img class="logo" v-if="$site.themeConfig.logo" :src="$withBase($site.themeConfig.logo)" :alt="$siteTitle" />
      <span ref="siteName" class="site-name" v-if="$siteTitle" :class="{ 'can-hide': $site.themeConfig.logo }">{{ $siteTitle }}</span> -->
    </router-link>
  </heder>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";

export default defineComponent({
  name: "Navbar",
  components: {},
  async setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
