import { tadpoleTheme } from "../../tadpole";
// import { defineClientConfig } from "@vuepress/client";
import { viteBundler } from "vuepress";
// import { defaultTheme } from "vuepress";

const GIT_HUB = "https://github.com/tao-Lionel"; // github 地址
const NAME = `muggle`; // 博主姓名
const EMAIL = "lionel_tao@163.com";
const BLOG_NAME = "muggle-blog";
const AVATAR = "/img/avatar.jpg";
const SLOGAN = "菜鸟前端";

export default {
  // base: '/', // 默认'/'
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Muggle blog",
      description: "web前端技术博客,专注前端学习与总结。包括但不限于分享JavaScript,js,ES6,TypeScript,vue,ts,css3,css,html5,html,Node,git等技术文章。",
    },
  },
  head: [
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }], // 站点统计用
    ["link", { rel: "stylesheet", href: "https://at.alicdn.com/t/font_3077305_pt8umhrn4k9.css" }], // 站点统计用
    ["link", { rel: "icon", href: "/img/favicon.ico" }], //favicons，资源放在public文件夹
    [
      "meta",
      {
        name: "keywords",
        content: "前端博客,个人技术博客,前端,前端开发,前端框架,web前端,前端面试题,技术文档,学习,面试,JavaScript,js,ES6,TypeScript,ts,vue,css3,html5,node.js,Node,git,github,markdown",
      },
    ],
    // ["meta", { name: "theme-color", content: "#11a8cd" }], // 移动浏览器主题颜色
  ],

  // 主题配置 使用本地主题
  theme: tadpoleTheme({
    navbar: [
      {
        text: "首页",
        link: "/",
      },
    ],
    log: "/img/logo.png", // 导航栏logo

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
      name: `${NAME}`, // 必需
      link: `${GIT_HUB}`, // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: `${AVATAR}`,
      name: `${NAME}`,
      slogan: `${SLOGAN}`,
    },

    // 社交图标 (显示于博主信息栏和页脚栏)
    social: {
      iconfontCssFile: "//at.alicdn.com/t/c/font_3621964_68gb2gnj04n.css", // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
      icons: [
        // {
        //   iconClass: "icon-youxiang",
        //   title: "发邮件",
        //   link: `${EMAIL}`,
        // },
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: `${GIT_HUB}`,
        },
        // {
        //   iconClass: "icon-tingge",
        //   title: "听音乐",
        //   link: "https://music.163.com",
        // },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2022, // 博客创建年份
      copyrightInfo: `Lionel tao | <a href=${GIT_HUB}/${BLOG_NAME} target="_blank">MIT License</a>`, // 博客版权信息、备案信息等，支持a标签或换行标签</br>
    },
  }),

  // 配置打包工具
  bundler: viteBundler({}),
};
