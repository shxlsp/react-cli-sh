#!/usr/bin/env node

const { argv } = require('process');
const { runCli, runPlop } = require('../tools/index');
const paramArr = argv.slice(2);
console.log(paramArr);
switch (paramArr[0]) {
    case 'create':
        argv.splice(2, 1);
        // 返回执行命令的目录
        // process.cwd()
        runPlop();
        break;
    case 'dev':
        runCli();
        break;
    case 'build':

        break;
    default:
        console.log('请输入正确的指令，例create，dev，build')
        break;
}
