<script lang="ts" setup>
import { defineComponent, reactive, toRefs, ref } from "vue"
import Navbar from "@/components/Navbar.vue"
import Home from "@/components/Home.vue"
</script>

<template>
  <div class="theme-container">
    <Navbar></Navbar>
    <Home></Home>
    <Content></Content>
  </div>
</template>

<style lang="scss" scoped></style>
