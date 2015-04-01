'use strict';

var path = require('path');
var fs   = require('fs-extra');

var localEmber = path.join(process.cwd(), 'client', 'node_modules', 'ember-cli', 'bin', (process.platform === 'win32' ? 'ember.cmd' : 'ember'));
var ember;

// Try to use the locally installed ember-cli first
if (fs.existsSync(localEmber)) {
  ember = localEmber;
} else {
  // Try to resolve a globally installed ember-cli and use that
  try {
    var globalCliPath = require.resolve('ember-cli');
    var globalPath = globalCliPath.replace(/\/lib\/cli\/index\.js$/, '');
  } catch(err) {
    throw new Error('global ember-cli not installed, please run "npm install -g ember-cli"');
  }
  ember = path.join(globalPath, 'bin', (process.platform === 'win32' ? 'ember.cmd' : 'ember'));
}

module.exports = ember;
