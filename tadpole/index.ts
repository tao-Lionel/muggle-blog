import { chalk, path } from "@vuepress/utils"
import { themeDataPlugin } from "@vuepress/plugin-theme-data"
// import { App } from "@vuepress/core"
// const __dirname = fs.getDirname(import.meta.url);

export const tadpoleTheme = (options) => {
  console.log(options)
  console.log(__dirname)

  // 返回主题对象
  return {
    name: "vurpress-theme-tadpole",

    // 定义路径别名
    alias: {
      "@": path.resolve(__dirname, "./")
    },

    // 主题的客户端配置文件的路径
    clientConfigFile: path.resolve(__dirname, "client.js"),

    // 设置自定义 dev / build 模板
    // 如果没有指定模板，将会使用 `@vuepress/client` 提供的默认模板
    templateBuild: path.resolve(__dirname, "templates/build.html"),
    templateDev: path.resolve(__dirname, "templates/dev.html"),

    // VuePress App 初始化后被立即调用
    onInitialized: async (app) => {
      console.log(app.pages)
      // 写入临时文件
      await app.writeTemp("pages.js", `export const pages = ${JSON.stringify(app.pages)}`)
    },

    // 使用插件
    plugins: [
      themeDataPlugin({
        // 配置项
        themeData: options
      })
    ]
  }
}
