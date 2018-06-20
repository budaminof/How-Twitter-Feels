import React, { Component } from 'react';
import Search from './search';
import TweetsList from '../containers/tweetsListContainer';

class App extends Component {

  render() {
    return (
      <main>
        <div className="title">
          <h1>
            Hello <span> World</span>, How Are You <span> Feeling</span> Today ?
          </h1>
        </div>
        <Search />
        <TweetsList />
      </main>
    )
  }
}

export default App;
