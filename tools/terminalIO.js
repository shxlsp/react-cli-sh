const readline = require('readline');

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

const getCliInputOptions = async (options) => {
    const inputOptions = {};
    const terminalIOInstance = terminalIO();
    const length = options.length;
    for (let i = 0; i < length; i++) {
        const option = options[i];
        const { message, validate, name } = option;
        inputOptions[name] = await terminalIOInstance.question(message, validate)
    }
    terminalIOInstance.close();
    return inputOptions
}

module.exports = getCliInputOptions