import React, { Component } from 'react';
import Search from './search';
import TweetsList from '../containers/tweetsListContainer';

class App extends Component {

  render() {
    return (
      <main>
        <Search />
        <TweetsList />
      </main>
    )
  }
}

export default App;
