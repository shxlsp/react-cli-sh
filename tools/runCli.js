#!/usr/bin/env node

/**
 * @param {string} packageName name of the package
 * @returns {boolean} is the package installed?
 */
const isInstalled = packageName => {
	if (process.versions.pnp) {
		return true;
	}

	const path = require("path");
	const fs = require("graceful-fs");

	let dir = __dirname;

	do {
		try {
			if (
				fs.statSync(path.join(dir, "node_modules", packageName)).isDirectory()
			) {
				return true;
			}
		} catch (_error) {
			// Nothing
		}
	} while (dir !== (dir = path.dirname(dir)));

	return false;
};

/**
 * @param {CliOption} cli options
 * @returns {void}
 */
const runCli = cli => {
	const path = require("path");
	const pkgPath = require.resolve(`${cli.package}/package.json`);
	// const pkg = require(pkgPath);
	// console.log(pkgPath);
	const runWebpackCLI = require(path.resolve(path.dirname(pkgPath), 'lib/bootstrap'));
	// process.argv.splice(2)
	// process.argv.push(1,2,3)
	console.log(process.argv.slice(2), path.resolve(path.dirname(pkgPath), 'lib/bootstrap'));
	process.argv.push('serve')
	runWebpackCLI(process.argv)
};

/**
 * @typedef {Object} CliOption
 * @property {string} name display name
 * @property {string} package npm package name
 * @property {string} binName name of the executable file
 * @property {boolean} installed currently installed?
 * @property {string} url homepage
 */

/** @type {CliOption} */
const webpack = {
	name: "webpack",
	package: "webpack-cli",
	binName: "webpack",
	installed: isInstalled("webpack") && isInstalled("webpack-cli"),
	url: "https://opencollective.com/webpack"
};



module.exports = () => {
	if (!webpack.installed) {
		console.error(`执行以下命令：npm install --save-dev webpack webpack-cli`)
	} else {
		runCli(webpack);
	}
}


