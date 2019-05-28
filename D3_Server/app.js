var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sankeyRouter = require('./routes/sankey');
var conceptRouter = require('./routes/concept');
var bubbleRouter = require('./routes/bubble');
var timeRouter = require('./routes/time');
var testRouter = require('./routes/test');
var naviRouter = require('./routes/last');
var petRouter = require('./routes/pet');
var helpRouter = require('./routes/help');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sankey',sankeyRouter);
app.use('/concept',conceptRouter);
app.use('/bubble',bubbleRouter);
app.use('/time',timeRouter);
app.use('/test',testRouter);
app.use('/last',naviRouter);
app.use('/pet',petRouter);
app.use('/help',helpRouter);

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
