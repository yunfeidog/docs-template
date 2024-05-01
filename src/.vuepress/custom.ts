export const siteConfig = {
    //config.ts
    base: "/docs-template/",
    title: "网站的标1题",
    description: "网站的描述",

    //theme.ts
    hostname: "https://github.com/yunfeidog",

    // 文章显示的默认作者
    author: {
        name: "网站的作者",
        url: "http://yunfei.plus",
    },
    license: "MIT",
    favicon: "/favicon.svg",
    // 网站图标
    logo: "/site_logo.png",
    // 导航栏上的个人仓库地址
    repo: "https://github.com/yunfeidog",

    // 自定义仓库链接文字-默认从repo中自动推断为"GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "Github",
    // 文章所在仓库
    docsRepo: "https://github.com/yunfeidog/docs-template",
    // 文章所在分支
    docsBranch: "main",
    // 全局设置页脚信息
    footer: "页脚信息-备案信息",


    // 博客配置
    blog: {
        // 头像
        avatar: "/logo.png",
        // 名称
        name: "作者名字",
        // 个人描述
        description: "你干嘛",
        // 社交媒体
        medias: {
            Github: "https://github.com/yunfeidog",
        },
        // 博客的侧边栏设置
        sidebarDisplay: "mobile",
        // 每页展示的文章数量
        articlePerPage: 7,
        timeline: "时间轴",
    },

}
