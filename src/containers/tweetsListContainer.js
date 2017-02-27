import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { newTweet } from '../actions/index';
import Tweets from '../components/tweets';

const socket = io.connect();

class TweetsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on('newTweet', (data) => {
      this.props.dispatch(newTweet(data));
      console.log('message: ', data);
    });
  }

  render() {
    return (
      <div>
        <h2>Tweets:</h2>
        <Tweets
          tweets={this.props.tweets}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.tweets;
}

export default connect(mapStateToProps)(TweetsList);
