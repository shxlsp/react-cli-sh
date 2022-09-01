const path = require('path')
const pubPath = path.dirname(__filename);
const validateEmpty = (value) => {
    return value.length > 0;
}
module.exports = function (plop) {
    plop.setActionType('install', function (answers, config, plop) {
        // 返回执行命令的目录
        // process.cwd()
        const child_process = require('child_process')
        const command = 'yarn';
        const args = ['install']
        const cwd = path.join(process.cwd(), answers.name)
        const task = child_process.spawn(command, args, { cwd });
        task.on('close', () => {
            console.log('依赖安装完成');
            console.log(`执行: cd ${answers.name}，进入目录`);
            console.log(`进入目录后，执行 yarn dev，启动项目`);
        });
        task.stdout.on('data', data => {
            console.log(`${data}`);
        });
    });
    const res = plop.setGenerator('component', {
        description: '新建项目',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称',
                validate: validateEmpty
            },
            {
                type: 'input',
                name: 'description',
                default: '',
                message: '请输入组件描述（可选）'
            },
            {
                type: 'input',
                name: 'version',
                default: '1.0.0',
                message: '请输入组件版本号'
            },
            {
                type: 'input',
                name: 'author',
                message: '请输入开发者姓名',
            },
            {
                type: 'confirm',
                name: 'hasLess',
                default: true,
                message: '是否创建less文件?'
            },
        ],
        actions: ({ hasLess }) => {
            const actions = [];
            // 添加package.json
            actions.push({
                type: 'add',
                path: `${pubPath}/{{name}}/package.json`,
                templateFile: 'template/package.json.hbs'
            })

            // gitignore
            actions.push({
                type: 'add',
                path: `${pubPath}/{{name}}/.gitignore`,
                templateFile: 'template/.gitignore.hbs'
            })

            // tsconfig.json
            actions.push({
                type: 'add',
                path: `${pubPath}/{{name}}/tsconfig.json`,
                templateFile: 'template/tsconfig.json.hbs'
            })
            // webpack.config
            actions.push({
                type: 'add',
                path: `${pubPath}/{{name}}/webpack.config.js`,
                templateFile: 'template/webpack.config.js.hbs'
            })

            // index.html
            actions.push({
                type: 'add',
                path: `${pubPath}/{{name}}/src/index.html`,
                templateFile: 'template/src/index.html.hbs'
            })

            // index.tsx
            actions.push({
                type: 'add',
                path: `${pubPath}/{{name}}/src/index.tsx`,
                templateFile: 'template/src/index.tsx.hbs'
            })

            if (hasLess) {
                // index.less
                actions.push({
                    type: 'add',
                    path: `${pubPath}/{{name}}/src/index.less`,
                    templateFile: 'template/src/index.less.hbs'
                })
            }

            actions.push({
                type: 'install',
            })

            return actions;
        }
    });

    // console.log(plop, res)
};
