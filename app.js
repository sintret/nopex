var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var events = require('events');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


global.appRoot = path.resolve(__dirname);
global.webSocketClients = {};

app.use(session({
  secret: "kampretmanapaham",
  resave: true,
  saveUninitialized: true,
  // cookie: {maxAge: 24 * 60000}
}))


// default params here
app.use(function (req, res, next) {
// set locals, only providing error in development
  res.locals.renderHead = "";
  res.locals.renderBody = "";
  res.locals.renderEnd = "";
  res.locals.titleApp = "Video Streaming";
  res.locals.decriptiotion = "Nopex Video Streaming";
  next();
});



app.use('/', index);
app.use('/users', users);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
