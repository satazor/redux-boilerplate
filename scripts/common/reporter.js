'use strict';

const chalk = require('chalk');

let nrSteps = 0;

function renderLabel(label, color) {
    let str = '\n' + chalk.inverse[color](' ' + label + ' ') + '\n';

    for (let x = 0; x < 8; x += 1) {
        str += chalk[color]('\u2594\u2594\u2594\u2594\u2594\u2594\u2594\u2594\u2594\u2594');
    }

    str += '\n';

    return str;
}

function fail(err, extraMsg) {
    process.stderr.write(renderLabel('ERROR', 'red'));
    process.stderr.write(err.message + '\n');

    if (extraMsg) {
        process.stderr.write('\n');
        process.stderr.write(extraMsg + '\n');
    }

    process.exit(1);
}

function fatal(err) {
    process.stderr.write(renderLabel('FATAL', 'red'));
    process.stderr.write(err.message + '\n');

    process.stderr.write('\n');
    process.stderr.write(renderLabel('STACK', 'yellow'));
    process.stderr.write(err.stack + '\n');

    process.exit(1);
}

function step(msg) {
    nrSteps += 1;
    process.stdout.write(renderLabel(nrSteps + '. ' + msg, 'white'));
}

process.on('uncaughtException', fatal);
process.on('unhandledRejection', fatal);

module.exports = {
    step,
    fail,
};
