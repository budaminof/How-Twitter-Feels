import React, { Component } from 'react';
import Search from './search';
import TweetsList from '../containers/tweetsListContainer';

class App extends Component {

  render() {
    return (
      <main>
        <h1>Hello <span>World</span>, How Are You <span>Feeling</span> Today ?</h1>
          <Search />
          <TweetsList />
      </main>
    )
  }
}

export default App;
