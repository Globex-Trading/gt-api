const fs = require('fs');
const { promisify } = require('util');

const fileUnlinkAsync = promisify(fs.unlink);

exports.fileUnlinkAsync = fileUnlinkAsync;