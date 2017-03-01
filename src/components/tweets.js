import React, { Component } from 'react';

class Tweets extends Component {
  constructor(props) {
    super(props);
  }

  listOfTweets() {
    let allTweets = this.props.tweets
    let list = allTweets.slice(Math.max(allTweets.length - 10, 1));
    return list.map(item => <li key={item.id_str}>{item.text}</li> );
  }

  render() {
    return (
      <div className="tweets">
        <ul>
          { this.listOfTweets() }
        </ul>
      </div>
    )
  }
}


export default Tweets;
