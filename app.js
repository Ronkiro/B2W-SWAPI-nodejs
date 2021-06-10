var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// custom
// const dotenv = require('dotenv');
const loader = require('./src/loader')
const responseMiddleware = require('./src/middlewares/response')


// if (dotenv.config({
//     path: `env/${process.env.NODE_ENV}.env`
//   }).error) {
//   throw new Error(`Verify that .env file exists in the env folder`);
// }

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(responseMiddleware);
app.use((req, res, next) => {
  req.container = loader.cradle;
  next()
});

const apiRouterV1 = express.Router();

const routesV1 = loader.resolve('v1Routers') 
routesV1.forEach(route => {
  apiRouterV1.use('/api/v1', route)
});

apiRouterV1.get('/api/v1', (req, res, next) => {
  return res.reply(200, "Request worked, API OK")
})

app.use(apiRouterV1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;