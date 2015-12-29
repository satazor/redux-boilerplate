#!/usr/bin/env node

'use strict';

const path = require('path');
const yargs = require('yargs');
const reporter = require('./common/reporter');
const eslint = require('eslint');
const projectDir = path.join(__dirname + '/..');

// ---------------------------------------------------------
// CLI definition
// ---------------------------------------------------------

const argv = yargs
.strict()
.wrap(Math.min(120, yargs.terminalWidth()))
.usage('Usage: ./$0 [options]')
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

function runEsLint(dirs) {
    const cli = new eslint.CLIEngine();
    const formatter = cli.getFormatter();
    const report = cli.executeOnFiles(dirs);

    process.stdout.write(formatter(report.results));

    if (report.errorCount) {
        reporter.fail(new Error('es-lint reported ' + report.errorCount + ' error(s)'));
    } else {
        process.stdout.write('Linting succeeded' + (report.warningCount ? ' but eslint \
reported ' + report.warningCount + ' warning(s).' : '!') + '\n');
    }
}

function runStyleLint() {

}

// ---------------------------------------------------------
// Steps
// ---------------------------------------------------------

// Step - Run es-lint to validate JS source code
reporter.step('Running es-lint in src/ and config/');
runEsLint([projectDir + '/src', projectDir + '/config']);

// Step - Run es-lint to validate scripts JS code
reporter.step('Running es-lint in scripts/');
runEsLint([projectDir + '/scripts']);

// Step - Run stylelint to validate CSS code
reporter.step('Running stylelint');
runStyleLint();
