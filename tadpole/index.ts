import { chalk, path } from "@vuepress/utils";

// const __dirname = fs.getDirname(import.meta.url);

export const tadpoleTheme = options => {
  console.log(options);

  // 返回主题对象
  return {
    name: "vurpress-theme-tadpole",

    // 主题的客户端配置文件的路径
    clientConfigFile: path.resolve(__dirname, "client.js"),

    // 设置自定义 dev / build 模板
    // 如果没有指定模板，将会使用 `@vuepress/client` 提供的默认模板
    templateBuild: path.resolve(__dirname, "templates/build.html"),
    templateDev: path.resolve(__dirname, "templates/dev.html"),

    // 使用插件
    plugins: [],
  };
};
