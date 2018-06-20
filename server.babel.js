const app = require('./app.babel');
const dotenv = require('dotenv');
dotenv.load();
const Twitter = require('twitter');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const server = app.listen(process.env.PORT || 3000);
const io = require('socket.io')(server);

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var tone_analyzer = new ToneAnalyzerV3({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version_date: process.env.VERSION_DATE
});

let hashtags = "#trump";
let stream;

io.on('connection', (socket) => {

  socket.on('newSearch', () => {
    stream = client.stream('statuses/filter', { track: hashtags });

    stream.on('data', (tweet) => {
      console.log('steam on..');
      io.emit('newTweet', tweet);
      tone_analyzer.tone({ text: tweet.text },
        function (err, tone) {
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
  });

  socket.on('stop', () => {
    if (stream) stream.destroy();
    console.log('stream destroy');
  })

  socket.on('disconnect', () => {
    if (stream) stream.destroy();
    console.log('user disconnected');
  });

});
