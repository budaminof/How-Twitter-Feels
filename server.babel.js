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
  username: '64d804ba-fb66-46cb-aa11-5c7f5d765877',
  password: '7YPoxIjCIqI5',
  version: 'v3',
  version_date: '2016-05-19 '
});

let hashtags;
let stream;

io.on('connection', (socket) => {

  socket.on('newSearch', (newSearchWord) => {
    hashtags = `#${newSearchWord}`;
    if (hashtags) {
      stream = client.stream('statuses/filter', {track: hashtags});

      stream.on('data', (tweet) => {
        tone_analyzer.tone({ text: tweet.text },
          function(err, tone) {
            if (err) console.log(err);
            else {
              io.emit('newTweet',
              JSON.stringify(tone.document_tone.tone_categories[0], null, 2));
            }
        });
        // console.log(JSON.stringify(tone, null, 2));
        // io.emit('newTweet', tweet);
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
