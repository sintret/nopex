var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var io = require('./components/io');

var index = require('./routes/index');
var users = require('./routes/users');
var Emitters = {}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


global.appRoot = path.resolve(__dirname);

app.use(session({
  secret: "kampretmanapaham",
  resave: true,
  saveUninitialized: true,
  // cookie: {maxAge: 24 * 60000}
}))


var initEmitter = function(feed){
  if(!Emitters[feed]){
    Emitters[feed] = new events.EventEmitter().setMaxListeners(0)
  }
  return Emitters[feed]
}

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

//ffmpeg pushed stream in here to make a pipe
app.all('/streamIn/:feed', function (req, res) {
  req.Emitter = initEmitter(req.params.feed)
  //req.params.feed = Feed Number (Pipe Number)
  res.connection.setTimeout(0);
  req.on('data', function(buffer){
    req.Emitter.emit('data',buffer)
    io.to('STREAM_'+req.params.feed).emit('h264',{feed:req.params.feed,buffer:buffer})
  });
  req.on('end',function(){
    console.log('close');
  });
})

//simulate RTSP over HTTP
app.get(['/h264','/h264/:feed'], function (req, res) {
  if(!req.params.feed){req.params.feed='1'}
  req.Emitter = initEmitter(req.params.feed)
  var contentWriter
  var date = new Date();
  res.writeHead(200, {
    'Date': date.toUTCString(),
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Content-Type': 'video/mp4',
    'Server': 'Shinobi H.264 Test Stream',
  });
  req.Emitter.on('data',contentWriter=function(buffer){
    res.write(buffer)
  })
  res.on('close', function () {
    req.Emitter.removeListener('data',contentWriter)
  })
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
