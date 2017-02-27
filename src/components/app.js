import React, { Component } from 'react';
import Search from './search';
import TweetsList from '../containers/tweetsListContainer';
import Data from '../containers/dataContainer';

class App extends Component {

  render() {
    return (
      <main>
        <Search />
        <TweetsList />
        <Data />
      </main>
    )
  }
}

export default App;
