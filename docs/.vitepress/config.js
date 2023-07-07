

import { defineConfig } from 'vitepress';
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

const GIT_HUB = "https://github.com/tao-Lionel"; // github 地址
const NAME = `muggle`; // 博主姓名
const EMAIL = "lionel_tao@163.com";
const BLOG_NAME = "muggle-blog";

export default defineConfig({
    base: '/',
    title: "Muggle",
    lang: "zh-CN",
    description: "web前端技术博客,专注前端学习与总结。包括但不限于分享JavaScript,js,ES6,TypeScript,vue,ts,css3,css,html5,html,Node,git等技术文章。",
    lastUpdated: true,
    head: [
        [
          'script',
          { src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js', type:'' }
        ],
    ],
    themeConfig: {
        nav: [
            {
                text: '博客', link:'/blog/index', activeMatch: '/blog',
            },
            {
                text: '笔记',link:'/note/index', activeMatch: '/note'
            },
            { text: '收藏夹', link: '/collect/index', },
            { text: '关于', link: '/me/index', activeMatch: '/me' },
        ],

        // sidebar: {
        //     '/blog': [
        //       {
        //         text: 'Guide',
        //         items: [
        //           { text: 'Index', link: '/guide/' }, // /guide/index.md
        //           { text: 'One', link: '/guide/one' }, // /guide/one.md
        //           { text: 'Two', link: '/guide/two' } // /guide/two.md
        //         ]
        //       }
        //     ]
        //   }

        search:{
            provider:'local'
        },

        footer: {
            message: '',
            copyright: `${new Date().getFullYear()} Lionel tao | <a href=${GIT_HUB}/${BLOG_NAME} target="_blank">MIT License</a>`, // 博客版权信息、备案信息等，支持a标签或换行标签</br>
          }
    },
    
    vite: {
        plugins: [
            AutoSidebar({
                deletePrefix : /[0-9][0-9]\./, 
                collapsed: true,
                ignoreIndexItem :true,
                beforeCreateSideBarItems: (data)=>{
                    console.log(data);
                },
                sideBarItemsResolved: (data)=>{
                    // console.log(data);
                },
                sideBarResolved :(data)=>{
                    // console.log(data)
                }
            })
        ]
    }

});
