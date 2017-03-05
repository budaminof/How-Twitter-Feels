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
    window.addEventListener("beforeunload", this.onUnload);

    socket.on('newTweet', (data) => {
      this.props.dispatch(newTweet(data));
    });

    socket.on('newData', (data) => {
      this.props.dispatch(newData(data));
    });
  }

    onUnload(event) {
      // socket.emit('stop');
    }

    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.onUnload);
    }

  render() {

    return (
      <div className="tweetsContainer">
        {
          this.props.showData ? < Data /> :
          < Waiting
            show = { this.props.search }
            />
        }
        <Tweets tweets={ this.props.tweets } />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.tweets;
}

export default connect(mapStateToProps)(TweetsList);
