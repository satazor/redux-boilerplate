'use strict';

const chalk = require('chalk');

function renderLabel(label, color) {
    let str;

    str = '\n';
    str += chalk.inverse[color](' ' + label + ' ') + '\n';
    str += chalk[color]('\u2594'.repeat(80)) + '\n';

    return str;
}

const steps = {
    count: 0,
    running: false,
};

function step(msg) {
    endStep();

    steps.count += 1;
    steps.running = true;

    process.stdout.write(renderLabel(steps.count + '. ' + msg, 'white'));
}

function endStep(msg) {
    if (!steps.running) {
        return;
    }

    steps.running = false;
    process.stdout.write(chalk.green('\u2713 ') + (msg || 'Ok') + '\n');
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


// Attach process hooks
process.on('uncaughtException', fatal);
process.on('unhandledRejection', fatal);
process.on('beforeExit', (code) => {
    !code && endStep();
});

module.exports = {
    step,
    endStep,
    fail,
    fatal,
};
