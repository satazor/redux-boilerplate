'use strict';

const fs = require('fs');
const path = require('path');
const reporter = require('./reporter');

const projectDir = __dirname + '/../../';

function validateEnvironment(env) {
    const configFile = projectDir + '/config/config-' + env + '.js';

    try {
        fs.statSync(configFile);
    } catch (err) {
        if (err.code === 'ENOENT') {
            reporter.fail(new Error('Environment ' + env + ' does not exist'),
                'You must create its configuration file at ' + path.relative(process.cwd(), configFile));
        }
    }
}

function validateFaultyParameters() {

}

function validateBuild() {
    try {
        fs.statSync(projectDir + '/web/build');
        fs.statSync(projectDir + '/web/index.html');
    } catch (err) {
        if (err.code === 'ENOENT') {
            reporter.fail(new Error('No build was found in ' + path.relative(process.cwd(), projectDir + '/web')),
                'Please build the project before');
        }
    }
}

module.exports = {
    validateEnvironment,
    validateFaultyParameters,
    validateBuild,
};
