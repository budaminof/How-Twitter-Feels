import React, { Component } from 'react';
// import Search from './search';
import io from 'socket.io-client';
import TweetsList from '../containers/tweetsListContainer';

const socket = io.connect();
class App extends Component {

  componentWillMount() {
    socket.emit('newSearch', 'trump');
  }

  render() {
    return (
      <main>
        <div className="title">
          <h1>
            Hello <span> World</span>, How Are You <span> Feeling</span> Today ?
          </h1>
        </div>
        {/* <Search /> */}
        <TweetsList />
      </main>
    )
  }
}

export default App;
