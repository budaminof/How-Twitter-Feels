const app = require('./app.babel');
const Twitter = require('twitter');
const config = require('./_config');
import watson from 'watson-developer-cloud';

const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

const server = app.listen(process.env.PORT || 3000);
const io = require('socket.io')(server);
let hashtags;
let stream;

io.on('connection', (socket) => {

  socket.on('newSearch', (newSearchWord) => {
    hashtags = `#${newSearchWord}`;
    if (hashtags) {
      stream = client.stream('statuses/filter', {track: hashtags});

      stream.on('data', (tweet) => {
        io.emit('newTweet', tweet);
      });

      stream.on('error', (error) => {
        console.log('ERROR:', error);
      });
    }
  });

  socket.on('stop', () => {
    if (stream) stream.destroy();
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});
