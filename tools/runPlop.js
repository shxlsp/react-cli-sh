const {
    isWindows
} = require('./confirmSystem');
// const runPlop = () => {
//     const path = require("path");
//     const pkgPath = require.resolve(`plop/package.json`);
//     const pkg = require(pkgPath);
//     // console.log(pkg, path.resolve(path.dirname(pkgPath), pkg.bin.plop))
//     // console.log(pkgPath);
//     // console.log(__dirname);
//     // console.log(process.cwd());
//     console.log(pkgPath);
//     getPath = () => {
//         const prefix = isWindows() ? 'file://' : '';
//         return `${prefix}${path.resolve(path.dirname(pkgPath), pkg.bin.plop)}`
//     }
//     import(getPath());
// };

const runPlopv2 = async () => {
    const path = require('path');
    const pkgPath = require.resolve(`plop/package.json`);
    const pkg = require(pkgPath);

    getPath = () => {
        const prefix = isWindows() ? 'file://' : '';
        return `${prefix}${path.resolve(path.dirname(pkgPath), pkg.main)}`
    }

    const {
        Plop,
        run
    } = await import(getPath());

    Plop.prepare({
        cwd: undefined,
        configPath: path.join(__dirname, '../plopfile.js'),
        preload: [],
        completion: undefined
    }, env => Plop.execute(env, run));
}
module.exports = runPlopv2