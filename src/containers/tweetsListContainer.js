import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { newTweet, newData } from '../actions/index';
import Tweets from '../components/tweets';
import Data from '../containers/dataContainer';

const socket = io.connect();

class TweetsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on('newTweet', (data) => {
      this.props.dispatch(newTweet(data));
    });

    socket.on('newData', (data) => {
      this.props.dispatch(newData(data));
    });
  }

  render() {
    return (
      <div>
        <h2>Tweets:</h2>
        <Tweets
          tweets={this.props.tweets.tweets}
        />
      { this.props.data.data.length > 0 ? <Data /> : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  let tweets = state.tweets;
  let data = state.data;
  return {
    tweets,
    data
  };
}

export default connect(mapStateToProps)(TweetsList);
