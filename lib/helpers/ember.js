'use strict';

var path      = require('path');
var fs        = require('fs-extra');
var { spawn } = require('child_process');


var ember = (function determineEmber() {
  // Try to use the locally installed ember-cli first
  var localEmber = path.join(process.cwd(), 'client', 'node_modules', 'ember-cli', 'bin',
    (process.platform === 'win32' ? 'ember.cmd' : 'ember'));
  if (fs.existsSync(localEmber)) {
    return localEmber;
  }

  // Windows is a bit special, since it requires an npm-generated .cmd file,
  // and as such, cannot use the local version inside node_modules
  if (process.platform === 'win32') {
    // Spawn an `ember.cmd --version`, just to see if it is installed
    try {
      spawn('ember.cmd', ['version'], { stdio: 'ignore' });
    } catch(err) {
      throw new Error('ember-cli is not installed, please run "npm install -g ember-cli"');
    }
    return 'ember.cmd';
  }

  // Try to resolve a globally installed ember-cli and use that
  try {
    // require.resolve returns `lib/cli/index.js`
    var globalPath = path.join(
      require.resolve('ember-cli')
      .replace(/\/lib\/cli\/index\.js$/, ''),
      'bin',
      'ember');
  } catch(err) {
    throw new Error('ember-cli is not installed, please run "npm install -g ember-cli"');
  }
  return globalPath;
})();

module.exports = ember;
