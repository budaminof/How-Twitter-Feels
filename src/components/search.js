import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import SearchForm from './searchForm';
import { newSearch } from '../actions/index';

const socket = io.connect();

class Search extends Component {

  handleSubmit = (values) => {
    console.log('SUBMIT',values);
    this.props.dispatch(newSearch());
    socket.emit('stop');
    socket.emit('newSearch', values.term );
  }

  render() {
    return (
      <SearchForm onSubmit={this.handleSubmit} />
    );
  }
}

export default connect(null)(Search);
