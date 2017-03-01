import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { newTweet, newData } from '../actions/index';
import Tweets from '../components/tweets';
import Waiting from '../components/waiting';
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
      <div className="tweetsContainer">
        <Tweets
          tweets={this.props.tweets}
        />
      { this.props.showData ? < Data /> : < Waiting /> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.tweets;
}

export default connect(mapStateToProps)(TweetsList);
