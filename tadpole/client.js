import { defineClientConfig } from "@vuepress/client";
import Layout from "./layouts/Layout.vue";
import NotFound from "./layouts/NotFound.vue";
import { useRoute, useRouter } from 'vue-router'

export default defineClientConfig({
  enhance({ app }) {
    console.log(app);
  },
  setup() {
    // 获取当前的路由位置
    const route = useRoute()
    console.log(route);
  },
  layouts: {
    Layout,
    NotFound,
  },
});
