<template>
  <div class="bg-black">
    <Navbar></Navbar>
    <Content></Content>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import Navbar from "../components/Navbar.vue";

export default defineComponent({
  name: "Layout",
  components: { Navbar },
  async setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
