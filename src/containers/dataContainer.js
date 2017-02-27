import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { newSearch, newData } from '../actions/index';

const socket = io.connect();

class Data extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on('newData', (data) => {
      this.props.dispatch(newData(data));
      console.log('Data: ', data);
    });
  }

  render() {
    return (
      <div>
        <h2>Data:</h2>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.data;
}

export default connect(mapStateToProps)(Data);
