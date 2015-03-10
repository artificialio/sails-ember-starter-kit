var path = require('path');

var ember = (path.join(process.cwd(), 'client', 'node_modules', '.bin', process.platform === 'win32' ? 'ember.cmd' : 'ember'));

module.exports = ember;
