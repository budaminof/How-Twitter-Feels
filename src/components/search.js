import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { newSearch } from '../actions/index';

const socket = io.connect();

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: '',
    }
  }

  submitNewTweet(event) {
    event.preventDefault();
    this.props.dispatch(newSearch());
    socket.emit('stop');
    socket.emit('newSearch', this.state.tweet);
  }

  onInputChange(event) {
    this.setState({ tweet: event.target.value });
  }

  render() {
    return (
      <div>
        <h2>Hello World How Are You Feeling Today?</h2>
        <form onSubmit={ (event) => this.submitNewTweet(event) } >
          <input type="text" onChange={ (event) => this.onInputChange(event) }/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Search;
