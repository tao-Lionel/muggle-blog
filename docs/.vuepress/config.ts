import { tadpoleTheme } from "../../tadpole";
// import { defineClientConfig } from "@vuepress/client";
import { viteBundler } from "vuepress";

const GIT_HUB = "https://github.com/tao-Lionel"; // github 地址
const NAME = `muggle`; // 博主姓名
const EMAIL = "lionel_tao@163.com";
const BLOG_NAME = "muggle-blog";
const AVATAR = "";
const SLOGAN = "菜鸟前端";

export default {
  // 主题配置 使用本地主题
  theme: tadpoleTheme({
    navbar: [
      {
        text: "首页",
        link: "/",
      },
    ],
  }),

  // 配置打包工具
  bundler: viteBundler({}),
};
