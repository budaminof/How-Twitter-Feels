import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './tweet';

class App extends Component {

  render() {
    return (
      <main>
        <Tweet />
      </main>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
