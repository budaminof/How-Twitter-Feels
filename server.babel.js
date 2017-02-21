import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import Twitter from 'twitter';
import path from 'path';
import config from './_config';
// import io from 'socket.io';

const app = express();
const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', express.static('public'));

const server = app.listen(process.env.PORT || 3000);
const io = require('socket.io')(server);
let hashtags;
let stream;

io.on('connection', function(socket) {

  socket.on('newSearch', function(newSearchWord) {
    hashtags = `#${newSearchWord}`;
    if (hashtags) {
      stream = client.stream('statuses/filter', {track: hashtags});

      stream.on('data', function(tweet) {
        io.emit('newTweet', tweet);
      });

      stream.on('error', function(error) {
        console.log('ERROR:', error);
      });
    }
  });

  socket.on('stop', function() {
    if (stream) stream.destroy();
    console.log("stream stopped");
  })

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/*', (req, res, next) => {
  res.sendFile('index.html', {root: __dirname + '/public/'});
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
