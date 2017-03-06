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
        io.emit('error');
      });

    // }
    // const a = {
    //   text: 'how is this possible????how is this possible????'
    // }
    // const b = {
    //   text: 'gsffffffffffffffffffffffffffffffffffffffffffffffff'
    // }
    // const c = {
    //   text: 'how is this posdkjbv;kdjb;gsjnb;lkfsgmblkmfglkbm?'
    // }
    // const d = {
    //   text: 'h777777777777777777777777777777s this possible????'
    // }
    // const e = {
    //   text: 'how i98798798798779798789789797878789787ible????'
    // }
    //
    // tone_analyzer.tone({ text: 'how is this possible????' },
    //       function(err, tone) {
    //         if (err) console.log(err);
    //         else {
    //           io.emit('newTweet', a);
    //           io.emit('newTweet', b);
    //           io.emit('newTweet', c);
    //           io.emit('newTweet', d);
    //           io.emit('newTweet', e);
    //           io.emit('newData',
    //           tone.document_tone.tone_categories[0]);
    //         }
    //     });

  });

  socket.on('stop', () => {
    if (stream) stream.destroy();
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});
