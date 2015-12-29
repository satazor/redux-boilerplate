'use strict';

const chalk = require('chalk');

let nrSteps = 0;

function fail(err, extraMsg) {
    process.stderr.write('\n');
    process.stderr.write(chalk.underline.bold.red('ERROR') + ':\n');
    process.stderr.write(err.stack + '\n');

    if (extraMsg) {
        process.stderr.write('\n');
        process.stderr.write(chalk.underline.bold.white('EXTRA') + ':\n');
        process.stderr.write(extraMsg + '\n');
    }

    process.exit(1);
}

function step(msg) {
    nrSteps += 1;
    process.stdout.write(chalk.cyan(nrSteps + '.') + ' ' + msg + '\n');
}

process.on('uncaughtException', fail);
process.on('unhandledRejection', fail);


module.exports = {
    step,
    fail,
};
