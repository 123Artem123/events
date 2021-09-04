const { inject, errorHandler } = require('express-custom-error');

inject();

require('mandatoryenv').load([
  'DB_HOST',
  'DB_DATABASE',
  'DB_USER',
  'DB_PASSWORD',
  'PORT',
]);

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const logger = require('./util/logger');
const headersHandler = require('./middleware/headersHandler');
const schemaErrorHandler = require('./middleware/schemaErrorHandler');

const { PORT } = process.env;

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(logger);
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use('*', headersHandler);
app.use('/', routes);
app.use(schemaErrorHandler);
app.use(errorHandler());
app.use('*', (req, res) => res.status(404).json({ message: 'Not Found' }));
app.listen(PORT, () => console.info('Server listening on port ', PORT));
