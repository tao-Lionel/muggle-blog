<script setup lang="ts">
import { ref } from "vue"
import DropdownTransition from "./DropdownTransition.vue"

const props = defineProps(["item"])
console.log(props)

let open = ref(true)

const toggle = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="ml-5">
    <button class="flex flex-row items-center text-sm" type="button" @click="toggle">
      <router-link v-if="item.link" :to="item.link" class="hover:nav-link">{{ item.text }}</router-link>
      <!-- <span class="" v-show="!item.link">{{ item.text }}</span> -->
      <span class="ml-2" :class="open ? 'down-arrow' : 'right-arrow'"></span>
    </button>

    <DropdownTransition>
      <ul class="nav-dropdown" v-show="open">
        <li class="dropdown-item" :key="subItem.link || index" v-for="(subItem, index) in item.items">
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>
          <ul class="dropdown-subitem-wrapper" v-if="subItem.type === 'links'">
            <li class="dropdown-subitem" :key="childSubItem.link" v-for="childSubItem in subItem.items">
              <router-link class="nav-link" :to="subItem.link">{{ item.text }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<style scoped lang="scss"></style>
