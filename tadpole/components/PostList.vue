<script setup lang="ts">
import { usePosts } from "@/hooks/posts"
import { dateFormat } from "@/utils/util"

// 获取首页文章列表
const postsList = usePosts().filterPosts()

console.log(postsList)
</script>

<template>
  <div v-for="item in postsList" :key="item.key" class="rounded-md shadow-sm py-4 px-6 bg-white mb-3">
    <div class="text-2xl my-2 font-medium text-comText">
      <router-link :to="item.path">
        {{ item.title }}
      </router-link>
    </div>
    <div class="text-comText opacity-70">
      <a
        title="作者"
        class="iconfont icon-touxiang mr-4 text-sm"
        target="_blank"
        v-if="item.frontmatter.author && item.frontmatter.author.link"
        :href="item.frontmatter.author.link"
      >
        <span class="ml-1">{{ item.frontmatter.author.name }}</span>
      </a>
      <span title="创建时间" class="iconfont icon-riqi mr-4 text-sm" v-if="item.frontmatter.date">
        <span class="ml-1"> {{ item.date }}</span>
      </span>
      <span title="分类" class="iconfont icon-wenjian mr-4 text-sm" v-if="item.frontmatter.categories">
        <router-link
          v-for="(c, index) in item.frontmatter.categories"
          :key="index"
          :to="`/categories/?category=${encodeURIComponent(c)}`"
        >
          <span class="ml-1"> {{ c }}</span>
        </router-link>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
