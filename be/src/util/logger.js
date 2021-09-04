const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const fs = require('fs');

/* istanbul ignore else */
if (process.env.NODE_ENV === 'production') {
  const logDirectory = path.resolve(__dirname, '../../log');

  // eslint-disable-next-line no-unused-expressions
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory,
  });
  module.exports = morgan('combined', { stream: accessLogStream });
} else {
  module.exports = morgan('dev');
}
