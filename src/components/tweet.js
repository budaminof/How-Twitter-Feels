import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { newTweet, newSearch } from '../actions/index';

const socket = io.connect();

class Tweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: '',
    }
  }

  componentDidMount() {
    socket.on('newTweet', (data) => {
      this.props.dispatch(newTweet(data));
      console.log('message: ', data);
    });

    socket.on('error', (err) => {
      console.log("##############");
      console.log(err);
    })
  }

  onInputChange(event) {
    event.preventDefault();
    this.props.dispatch(newSearch());
    socket.emit('stop');
    console.log("submit", this.state.tweet );
    socket.emit('newSearch', this.state.tweet);
  }

  changeTweet(event) {
    this.setState({ tweet: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <form onSubmit={ (event) => this.onInputChange(event) } >
          <input type="text" onChange={ (event) => this.changeTweet(event) }/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tweets } = state;
  console.log("map:", state);
  return { tweets };
}

export default connect(mapStateToProps)(Tweet);
