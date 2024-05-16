## 1.项目介绍

本项目是为了快速构建应用程序的说明文档而创建的，使用了VuePress theme hope主题进行了修改

+ 开发者只需要专注于编写文档，不需要关心文档的样式和布局。
+ 顶部的导航栏和侧边栏需要自己配置，参考已有的代码即可。

项目构建后的结果：[https://yunfeidog.github.io/docs-template/](https://yunfeidog.github.io/docs-template/)

## 2.如何安装

1. 使用npm安装(推荐)

```shell
npm install yunfei-docs-template-npm -g
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

## 3.如何运行

安装依赖：

```shell
pnpm install
```

运行：

```shell
pnpm run docs:dev
```

## 4.配置说明

+ 网站的信息只需要在`src/.vuepress/custom.ts`文件中修改即可，一些配置一定要修改为自己的。

如果你想要把改项目作为一个项目的文档，只需要放在根目录下面，然后使用`.github/workflows/deploy-docs2.yml.bak`
中的配置，在这个配置文件中修改`WORK_DIR: docs-template #todo: 修改为你的项目文档目录`

同时需要删除`.github/workflows/deploy-docs.yml`文件

## todo

| 任务              | 状态 |
|-----------------|----|
| 自动部署Github Page | ✅  |
| 发布到npm仓库        | ✅  |
| 终端配置用户信息        | ❌  |
| 搜索插件            | ✅  |
| 支持直接放在docs目录下   | ✅  |


