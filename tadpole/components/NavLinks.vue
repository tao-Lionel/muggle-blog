<script setup lang="ts">
import DropdownLink from "./DropdownLink.vue"

const userLinks = [
  { link: "/", text: "首页" },
  { link: "/abc", text: "首页2" },
  {
    link: "/bbc",
    text: "首页3",
    items: [
      {
        link: "",
        text: "首页333",
        type: "links",
        items: [
          {
            link: "/",
            text: "首页444"
          }
        ]
      },
      {
        link: "/bbc",
        text: "首页345"
      }
    ]
  }
]
</script>

<template>
  <nav class="flex flex-row justify-evenly">
    <div v-for="item in userLinks" :key="item.link">
      <DropdownLink :item="item" />
      <!-- <router-link class="nav-link" :to="link" @focusout.native="focusoutAction" v-if="!isExternal(link)" :exact="exact">{{ item.text }}</router-link> -->
    </div>
  </nav>
</template>

<style scoped lang="scss"></style>
