'use strict';

const chalk = require('chalk');

let nrSteps = 0;

function fail(err, extraMsg) {
    process.stderr.write('\n');
    process.stderr.write(chalk.underline.bold.red('ERROR') + ':\n');
    process.stderr.write(err.message + '\n');

    if (extraMsg) {
        process.stderr.write('\n');
        process.stderr.write(extraMsg + '\n');
    }

    process.exit(1);
}

function fatal(err) {
    process.stderr.write('\n');
    process.stderr.write(chalk.underline.bold.red('ERROR') + ':\n');
    process.stderr.write(err.message + '\n');

    process.stderr.write('\n');
    process.stderr.write(chalk.underline.bold.white('STACK') + ':\n');
    process.stderr.write(err.stack + '\n');

    process.exit(1);
}

function step(msg) {
    nrSteps += 1;
    process.stdout.write(chalk.cyan(nrSteps + '.') + ' ' + msg + '\n');
}

process.on('uncaughtException', fatal);
process.on('unhandledRejection', fatal);


module.exports = {
    step,
    fail,
};
