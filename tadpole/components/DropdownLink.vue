<script setup lang="ts">
import { ref } from "vue"
import DropdownTransition from "./DropdownTransition.vue"

const props = defineProps(["item"])

let open = ref(true)

const toggle = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="ml-5 nav-items">
    <div class="flex flex-row relative items-center fs-0.9" type="button" @click="toggle">
      <router-link v-if="item.link" :to="item.link" class="c-black">{{ item.text }}</router-link>
      <!-- <span class="" v-show="!item.link">{{ item.text }}</span> -->
      <span class="ml-2" :class="open ? 'down-arrow' : 'right-arrow'"></span>
    </div>

    <DropdownTransition>
      <ul class="absolute inset hidden nav-dropdown px-2 py-2" v-show="open">
        <li class="" :key="subItem.link || index" v-for="(subItem, index) in item.items">
          <template v-if="subItem.type === 'links'">
            <h4>{{ subItem.text }}</h4>
            <ul class="">
              <li class="" :key="childSubItem.link" v-for="childSubItem in subItem.items">
                <router-link class="" :to="subItem.link">{{ item.text }}</router-link>
              </li>
            </ul>
          </template>
          <router-link v-else :to="item.link" class="">{{ item.text }}</router-link>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<style scoped lang="scss">
.nav-items:hover {
  .nav-dropdown {
    display: block;
  }
}
</style>
