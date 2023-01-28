<script setup lang="ts">
const onEnter = (el) => {
  console.log(el)
}
</script>

<template>
  <Transition @enter="onEnter">
    <slot></slot>
  </Transition>
</template>

<style scoped lang="scss"></style>
