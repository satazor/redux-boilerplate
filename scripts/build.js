#!/usr/bin/env node

'use strict';

const webpack = require('webpack');
const path = require('path');
const yargs = require('yargs');
const reporter = require('./common/reporter');
const validator = require('./common/validator');
const web = require('./common/web');
const webpackConfig = require('../config/webpack.config.js');
const parameters = require('../config/parameters.json');

const projectDir = path.join(__dirname + '/..');

// ---------------------------------------------------------
// CLI definition
// ---------------------------------------------------------

const argv = yargs
.strict()
.wrap(Math.min(120, yargs.terminalWidth()))
.usage('Usage: ./$0 [options]')
.option('env', {
    alias: 'e',
    type: 'string',
    default: 'prod',
    describe: 'The environment',
})
.option('minify', {
    alias: 'm',
    type: 'boolean',
    default: true,
    describe: 'Whether to minify or assets (including index.html)',
})
.option('help', {
    alias: 'h',
    type: 'boolean',
    describe: 'Show the help',
})
.example('$0 --env staging', 'Builds the application for the staging environment')
.example('$0 --no-minify', 'Builds the application for the production environment but do not minify')
.argv;

if (argv.help) {
    yargs.showHelp('log');
    process.exit(0);
}

// ---------------------------------------------------------
// Functions
// ---------------------------------------------------------

function runWebpack() {
    return new Promise((resolve) => {
        const config = webpackConfig({ env: argv.env, minify: argv.minify });
        const extraErrorMsg = 'You can replicate the issue by running \
' + path.relative(process.cwd(), projectDir + '/node_modules/.bin/webpack') + ' --config \
' + path.relative(process.cwd(), projectDir + '/config/webpack.config.js') + ' --env ' + argv.env;

        webpack(config, (err, stats) => {
            if (err) {
                return reporter.fail(err, extraErrorMsg);
            }

            const options = {
                chunks: false,
                children: false,
                modules: false,
            };

            const json = stats.toJson(options);
            const string = stats.toString(Object.assign({ colors: true }, options));

            if (json.errors.length) {
                return reporter.fail(new Error('Webpack build failed'), string + '\n\n' + extraErrorMsg);
            }

            process.stdout.write(string + '\n');

            resolve({
                env: argv.env,
                hash: json.hash,
                parameters,
            });
        });
    });
}

// ---------------------------------------------------------
// Steps
// ---------------------------------------------------------

// Step - Validate environment
reporter.step('Validating "' + argv.env + '" environment');
argv.env === 'dev' && reporter.fail(new Error('The ' + argv.env + ' environment can\'t be built'));
validator.validateEnvironment(argv.env);

// Step - Validate parameters
reporter.step('Validating config/parameters.json');
validator.validateParameters(parameters);

// Step - Remove previous build folder
reporter.step('Remove previous build');
web.cleanBuild();

// Step - Run webpack
reporter.step('Bundle with webpack');
runWebpack()

// Step - Generate the index HTML file
.then((data) => {
    reporter.step('Generate index HTML page');
    web.generateIndex(data, argv.minify);
}, reporter.fail);
