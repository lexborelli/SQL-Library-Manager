var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//create a Sequelize instance & testing the connection with async IIFE
const { sequelize } = require('./models');

(async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection to the database successfully.');
    await sequelize.sync(); 
  } catch (error) {
  console.log('Error connecting to the database: ', error);
  }
}) ();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("err");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.status === 404) {
    // set a user-friendy message for 404, render the error template, passed the {err} as the second parameter in render method. 
    err.message = "Sorry! We couldn't find the page you were looking for.";
    res.status(404).render('page-not-found', { err });
  } else {
  // render the error page
    err.message = err.message || `Something went wrong with the server.`;
    res.status(err.status || 500).render('error', {err});
    console.log(err.status, err.message);
  }
});

module.exports = app;
