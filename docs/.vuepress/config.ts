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
