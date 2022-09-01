const readline = require('readline');
// inquirer
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//     // TODO: Log the answer in a database
//     console.log(`Thank you for your valuable feedback: ${answer}`);
//     //   rl.close();
// });

// rl.on('line', (input) => {
//     console.log(`Received: ${input}`);
// });


const terminalIO = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const instance = {
        close: rl.close.bind(rl),
        on: rl.on.bind(rl),
        rl: rl,
    };

    // 如果输入内容不符合规则，则需要重新提问
    const getAnswer = (resolve, msg, validateFc) => {
        rl.question(msg, async (v) => {
            if (typeof validateFc === 'function') {
                if (await validateFc(v)) {
                    console.log('resolve')
                    resolve(v);
                    return;
                }
                getAnswer(resolve, msg, validateFc);
                return;
            }
            resolve(v);
        })
    };

    instance.question = (msg, validateFc) => {
        return new Promise((resolve, reject) => {
            getAnswer(resolve, msg, validateFc)
        })
    };

    return instance;
};

const validateEmpty = (value) => {
    console.log(value);
    return Boolean(value?.length)
};

const questionOption = [
    {
        type: 'input',
        name: 'name',
        message: '请输入项目名称（全小写，单词间以“-”连接）',
        validate: validateEmpty
    },
];

const getCliInputOptions = async () => {
    const inputOptions = {};
    const terminalIOInstance = terminalIO();
    const length = questionOption.length;
    for (let i = 0; i < length; i++) {
        const option = questionOption[0];
        const { message, validate, name } = option;
        inputOptions[name] = await terminalIOInstance.question(message, validate)
    }
    terminalIOInstance.close();
    return inputOptions
}


const start = async () => {
    const inputOptions = await getCliInputOptions();
    console.log(inputOptions);
    const argv = process.argv.slice(2);
    console.log(argv, '环境变量')

}

start();