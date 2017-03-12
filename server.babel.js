const app = require('./app.babel');
const dotenv = require('dotenv');
dotenv.load();
const Twitter = require('twitter');
const watson = require('watson-developer-cloud');
const server = app.listen(process.env.PORT || 3000);
const io = require('socket.io')(server, { forceNew: true });

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const tone_analyzer = watson.tone_analyzer({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version: process.env.VERSION,
  version_date: process.env.VERSION_DATE
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
        io.emit('error');
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
