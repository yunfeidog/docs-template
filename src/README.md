---
home: true
icon: home
title: 个人主页
heroImage: /logo.png
heroText: VuePress文档快速构建
tagline: ✨在这里填写副标题✨
actions:
  - text: 【博客主页】
    link: /blog/
    type: primary
  - text: 【自定义左侧目录】
    link: /docs/
  - text: 【左侧目录】
    link: /autodir/
  - text: 【vue自定义组件】
    link: /vuecomponent/
features:
  - title: Github
    icon: /iconfont/github.svg
    details: iKunのGithub
    link: https://www.github.com/yunfeidog
    
  - title: CSDN
    icon: /iconfont/csdn.svg
    details: iKunのCSDN
    link: https://blog.csdn.net/m0_74085417?type=blog
    
  - title: 力扣
    icon: /iconfont/leetcode.svg
    details: iKunの力扣
    link: https://leetcode.cn/u/yunfeidog/
    
  - title: Codeforces
    icon: /iconfont/codeforces.svg
    details: iKunのCodeforces
    link: https://codeforces.com/profile/Houyunfei
    

  - title: 洛谷
    icon: /iconfont/luogu.svg
    details: iKunの洛谷
    link: https://www.luogu.com.cn/user/749836
    
  - title: Linux.do
    icon: /iconfont/linux.svg
    details: iKunのLinux.do
    link: https://www.linux.do

  - title: Vuepress
    icon: /iconfont/vuepress.svg
    details: Vuepress官网
    link: https://vuepress.vuejs.org/zh/

  - title: hope主题
    icon: /iconfont/vuepress.svg
    details: Vuepress-theme-hope
    link: https://theme-hope.vuejs.press/zh/
---




## 如何安装

1. 使用npm安装(推荐)

```shell
pnpm install yunfei-docs-template-npm -g
````

然后在项目根目录执行以下命令(app是项目名称，可以自定义)

```shell
yunfei-docs-template-npm create app
```

2. 使用git安装

```shell
git clone git@github.com:yunfeidog/docs-template.git
```

然后删除 `yunfei-docs-template-npm`文件夹

## 如何运行

安装依赖：

```shell
npm i vuepress-theme-hope-docs-template
```

运行：

```shell
pnpm run docs:dev
```
