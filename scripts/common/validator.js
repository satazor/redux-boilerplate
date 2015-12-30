'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const reporter = require('./reporter');
const diff = require('diff-json-structure');

const projectDir = __dirname + '/../../';

function validateEnvironment(env) {
    try {
        fs.statSync(projectDir + '/config/config-' + env + '.js');
    } catch (err) {
        if (err.code === 'ENOENT') {
            reporter.fail(new Error('Environment ' + env + ' does not exist'),
                'You must create its configuration file at config/config-' + env + '.js');
        }
    }
}

function validateParameters(parameters) {
    const distParameters = JSON.parse(fs.readFileSync(projectDir + '/config/parameters.json.dist'));
    const diffParts = diff(distParameters, parameters);
    const isDifferent = diffParts.some((part) => part.added || part.removed);

    if (!isDifferent) {
        return;
    }

    const extraErrorMsg = diffParts
    .map((part) => {
        let color;

        if (part.added) {
            color = 'green';
        } else if (part.removed) {
            color = 'red';
        } else {
            color = 'dim';
        }

        return chalk[color](part.value);
    })
    .join('') + '\n\nPlease reconciliate the changes according to the diff above.';

    reporter.fail(new Error('config/parameters.json.dist was modified recently and \
contains differences compared to config/parameters.json'), extraErrorMsg);
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
    validateParameters,
    validateBuild,
};
