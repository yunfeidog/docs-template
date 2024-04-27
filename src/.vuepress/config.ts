import {defineUserConfig} from "vuepress";
import {searchPlugin} from "@vuepress/plugin-search";
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import {getDirname, path} from "@vuepress/utils";
import theme from "./theme.js";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

//自定义用户配置
export default defineUserConfig({
    base: "/docs-template/",

    // 多语言设置
    locales: {
        "/": {
            lang: "zh-CN",
            title: "网站的标题",
            description: "网站的描述",
            // 设置favicon
            head: [["link", {rel: "icon", href: "/favicon.svg"}]],
        },
    },
    // 主题设置
    theme,
    plugins: [
        // 注册全局组件的插件
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, "./components"),
        }),
    ],

    shouldPrefetch: false,
});
