import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import SearchForm from './searchForm';
import { newSearch } from '../actions/index';
import WaitingForSearch from './WaitingForSearch';

const socket = io.connect();

class Search extends Component {

  handleSubmit = (values) => {
    this.props.dispatch(newSearch());
    socket.emit('stop');
    socket.emit('newSearch', values.term );
  }

  render() {
    return (
      <div>
        <SearchForm onSubmit={this.handleSubmit} />
        {
          this.props.newSearch ?
          null :
          <WaitingForSearch />
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.data;
}
export default connect(mapStateToProps)(Search);
