const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

// custom
// const dotenv = require('dotenv');
const loader = require('./src/loader');
const responseMiddleware = require('./src/middlewares/response');

const appLogger = loader.resolve('logger');

// if (dotenv.config({
//     path: `env/${process.env.NODE_ENV}.env`
//   }).error) {
//   throw new Error(`Verify that .env file exists in the env folder`);
// }

const app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8081);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(responseMiddleware);
app.use((req, res, next) => {
  req.container = loader.cradle;
  next();
});

const apiRouterV1 = express.Router();

loader.resolve('errorHandler');

const routesV1 = loader.resolve('v1Routers');
routesV1.forEach((route) => {
  apiRouterV1.use('/api/v1', route);
});

apiRouterV1.get('/api/v1', (req, res) => res.reply(200, 'Request worked, API OK'));

app.use(apiRouterV1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

appLogger.info(`Server started :) - ${app.get('port')}`);
module.exports = app;
