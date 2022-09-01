
const runPlop = () => {
    const path = require("path");
    const pkgPath = require.resolve(`plop/package.json`);
    const pkg = require(pkgPath);
    // console.log(pkg, path.resolve(path.dirname(pkgPath), pkg.bin.plop))
    // console.log(pkgPath);
    // console.log(__dirname);
    // console.log(process.cwd());
    import(path.resolve(path.dirname(pkgPath), pkg.bin.plop));
};

module.exports = runPlop

// import path from "node:path";
// import minimist from "minimist";
// import { Plop, run } from "plop";

// const args = process.argv.slice(2);
// const argv = minimist(args);

// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// Plop.prepare({
//   cwd: argv.cwd,
//   configPath: path.join(__dirname, 'plopfile.js'),
//   preload: argv.preload || [],
//   completion: argv.completion
// }, env => Plop.execute(env, run));