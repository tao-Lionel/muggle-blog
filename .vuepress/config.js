const sidebar = require('./siderbar.js');
export default {
  // "base": '/tao-Lionel.github.io/',
  "base": "/",
  "title": "麻瓜博客",
  "description": "欢迎来到麻瓜的世界",
  "dest": "dist",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "plugins": ["@vuepress-reco/vuepress-plugin-comments", "vuepress-plugin-meting"],
  "theme": "reco",
  "themeConfig": {
    "mode": 'light',
    "subSidebar": 'auto',
    "valineConfig": {
      "appId": 'h6i7vXvVEK37fFFwb1DtMJ6W-gzGzoHsz',
      "appKey": 'cYI3hypnGAI00CPuzhNfeY8Q',
    },
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "联系我",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/tao-Lionel",
            "icon": "reco-github"
          }
        ]
      }
    ],
    sidebar,
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "目录索引"
      },
      "tag": {
        "location": 3,
        "text": "标签索引"
      }
    },
    "friendLink": [
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      },
      {
        "title": "进军的王小二",
        "desc": "灵感来源",
        "avatar": "https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/d4519d73542e34814aec3a776f41fda0~300x300.image",
        "link": "https://juejin.cn/post/6959403986495471647#heading-1"
      },
      {
        "title": "裂泉",
        "desc": "部署帮助",
        "avatar": "https://user-gold-cdn.xitu.io/2019/9/26/16d6c94c4cda41e5?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1",
        "link": "https://juejin.cn/post/6844903999129436174#comment"
      },
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10, // 搜索框显示的搜索结果数量
    "lastUpdated": "Last Updated",
    "author": "wangtao",
    "authorAvatar": "/avatar.jpg",
    "record": "github",
    "startYear": "2021",
    "smoothScroll": true, // 启用页面滚动效果
  },
  "markdown": {
    "lineNumbers": true
  }
}