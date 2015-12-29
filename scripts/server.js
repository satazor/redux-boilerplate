#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const reporter = require('./common/reporter');
const validator = require('./common/validator');
const web = require('./common/web');
const webpackConfig = require('../config/webpack.config.js');
const parameters = require('../config/parameters.json');

// ---------------------------------------------------------
// CLI definition
// ---------------------------------------------------------

const argv = yargs
.strict()
.wrap(Math.min(100, yargs.terminalWidth()))
.usage('Usage: ./$0 [options]')
.option('env', {
    alias: 'e',
    type: 'string',
    default: 'dev',
    describe: 'The build environment',
})
.option('address', {
    alias: 'a',
    type: 'number',
    default: 'localhost',
})
.option('port', {
    alias: 'p',
    type: 'number',
    default: 8080,
})
.option('help', {
    alias: 'h',
    type: 'boolean',
    describe: 'Show the help',
})
.argv;

if (argv.help) {
    yargs.showHelp('log');
    process.exit(0);
}

// ---------------------------------------------------------
// Functions
// ---------------------------------------------------------

function prepareWeb() {
    if (argv.env === 'dev') {
        web.cleanBuild();
        web.generateIndex({
            env: argv.env,
            hash: null,
            parameters,
        });
    } else {
        validator.validateBuild();
    }
}

function runServer() {
    const config = webpackConfig({ env: argv.env });
    const server = new WebpackDevServer(webpack(config), config.devServer);

    server.listen(argv.port, argv.address, (err) => {
        if (err) {
            return reporter.fail(err);
        }

        process.stdout.write('Listening at http://' + argv.address + ':' + argv.port + '\n');
    });
}

// ---------------------------------------------------------
// Steps
// ---------------------------------------------------------

// Step - Validate environment
reporter.step('Validating "' + argv.env + '" environment');
validator.validateEnvironment(argv.env);

// Step - Prepare (ensure build or clean build & setup if dev)
reporter.step('Prepare web directory');
prepareWeb();

// Step - Run server
reporter.step('Run server');
runServer();
