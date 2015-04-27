/*global exit, target*/

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

require('shelljs/make');
var chalk = require('chalk');
var which = require('npm-which')(process.cwd());
var spawn = require('child_process').spawnSync;


//------------------------------------------------------------------------------
// Data
//------------------------------------------------------------------------------

var NODE = which.sync('node');
var ESLINT = which.sync('eslint');

// var SOURCE_DIR = 'src';
// var BUILD_DIR = 'lib';
var SOURCE_DIR = 'lib';
var TEST_DIR = 'tests';
var SANE_BIN = 'bin/sane';

var TEST_RUNNER = 'tests/runner';
var UNIT_OPT = 'unit';
var ACCEPTANCE_OPT = 'acceptance';


//------------------------------------------------------------------------------
// Tasks
//------------------------------------------------------------------------------

target.lint = function () {
  var lastReturn;
  var errors = 0;

  process.stdout.write('Linting Source Files ');
  lastReturn = spawn(ESLINT, [SOURCE_DIR, SANE_BIN], { stdio: 'inherit' });
  if (lastReturn.status !== 0) {
    errors++;
  } else {
    console.log(chalk.green('OK'));
  }

  process.stdout.write('Linting Test Files ');
  lastReturn = spawn(ESLINT, [TEST_DIR], { stdio: 'inherit' });
  if (lastReturn.status !== 0) {
    errors++;
  } else {
    console.log(chalk.green('OK'));
  }

  if (errors) {
    console.error(chalk.red('ERR!'), 'Linting failed.  See above for details.');
    exit();
  }

};

target.test = function () {
  target.lint();
  var lastReturn;
  var errors = 0;

  console.log('Running Unit Tests');
  lastReturn = spawn(NODE, [TEST_RUNNER, UNIT_OPT], { stdio: 'inherit' });
  errors = errors + lastReturn.status;

  console.log('Running Acceptance Tests');
  lastReturn = spawn(NODE, [TEST_RUNNER, ACCEPTANCE_OPT], { stdio: 'inherit' });
  errors = errors + lastReturn.status;

  if (errors) {
    console.error(chalk.red('ERR!'), errors, 'test(s) failed.  See above for details.');
    exit();
  }

};
