#!/usr/bin/env node

const {program} = require('commander')
const figlet = require("figlet");

const path = require('path')
const fs = require("node:fs");
const inquirer = require("inquirer");
const gitClone = require('git-clone')
const ora = require("ora");
const chalk = require("chalk");
//首行提示
program.name('test-cxk').usage('<command> [options]')

//版本号
program.version(`v${require('../package.json').version}`)

const gitUrl = 'git@github.com:yunfeidog/docs-template.git'

//命令 创建项目的命令
program
    .command('create <project-name>')
    .description('根据模版创建一个博客项目(文档项目)')
    .action(async (name) => {
            //创建项目的逻辑
            //拼接出要创建的文件夹的路径
            const targetPath = path.join(process.cwd(), name)
            if (fs.existsSync(targetPath)) {
                console.log('文件夹已经存在')
                //是否要覆盖
                const answer = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'overwrite',
                        message: '文件夹已经存在，是否要覆盖?',
                        default: true
                    }
                ])
                if (answer.overwrite) {
                    //删除文件夹
                    fs.rm(targetPath, () => {
                        console.log('文件夹删除成功')
                    })
                } else {
                    console.log('取消创建')
                    return
                }
            }
            //创建文件夹
            const spinner = ora('正在下载模板...').start()

            //下载模板
            gitClone(gitUrl, targetPath, null, function (err) {
                if (err) {
                    spinner.fail('下载失败')
                } else {
                    spinner.succeed('下载成功')
                    //删除.git文件
                    fs.rm(path.join(targetPath, '.git'), () => {
                    })
                    //如果有 yunfei-docs-template-npm文件夹，则删除
                    fs.rm(path.join(targetPath, 'yunfei-docs-template-npm'), () => {
                    })
                    console.log("Download success,now run(pnpm for example): ")
                    console.log(chalk.cyan(`cd ${name}`))
                    console.log(chalk.cyan('pnpm install'))
                    console.log(chalk.cyan('pnpm run serve'))
                }
            })
        }
    )


//给help添加信息提示
program.on('--help', () => {
    console.log(
        figlet.textSync("cxk!", {
            font: "Ghost",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
        })
    );
})


program.parse(process.argv)
