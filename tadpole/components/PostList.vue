<script setup lang="ts">
import { usePosts } from "@/hooks/posts"
import { dateFormat } from "@/utils/util"

// 获取首页文章列表
const postsList = usePosts().filterPosts()

console.log(postsList)
</script>

<template>
  <div v-for="item in postsList" :key="item.key" class="rounded-md shadow-sm p-1-1.5 bg-white mb-0.8">
    <h2 class="mt-0.5 mb-0.5 fs-1.4">
      <router-link :to="item.path" class="c-black">
        {{ item.title }}
      </router-link>
    </h2>
    <div class="text-comText opacity-70 fs-0.8">
      <a
        title="作者"
        class="iconfont icon-touxiang mr-1"
        target="_blank"
        v-if="item.frontmatter.author && item.frontmatter.author.link"
        :href="item.frontmatter.author.link"
      >
        <span class="ml-0.3 fs-0.8 c-black">{{ item.frontmatter.author.name }}</span>
      </a>
      <span title="创建时间" class="iconfont icon-riqi mr-1" v-if="item.frontmatter.date">
        <span class="ml-0.3 fs-0.8 c-black"> {{ item.date }}</span>
      </span>
      <span title="分类" class="iconfont icon-wenjian mr-1" v-if="item.frontmatter.categories">
        <router-link
          v-for="(c, index) in item.frontmatter.categories"
          :key="index"
          :to="`/categories/?category=${encodeURIComponent(c)}`"
        >
          <span class="ml-0.3 fs-0.8 c-black"> {{ c }}</span>
        </router-link>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
