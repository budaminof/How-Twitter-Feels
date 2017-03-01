const app = require('./app.babel');
const Twitter = require('twitter');
const config = require('./_config');
const watson = require('watson-developer-cloud');
const server = app.listen(process.env.PORT || 3000);
const io = require('socket.io')(server);

const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

const tone_analyzer = watson.tone_analyzer({
  username: config.username,
  password: config.password,
  version: config.version,
  version_date: config.version_date
});

let hashtags;
let stream;

io.on('connection', (socket) => {

  socket.on('newSearch', (newSearchWord) => {
    hashtags = `#${newSearchWord}`;
    if (hashtags) {
      stream = client.stream('statuses/filter', {track: hashtags});

      stream.on('data', (tweet) => {
        io.emit('newTweet', tweet);
        tone_analyzer.tone({ text: tweet.text },
          function(err, tone) {
            if (err) console.log(err);
            else {
              io.emit('newData',
              tone.document_tone.tone_categories[0]);
            }
        });
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
