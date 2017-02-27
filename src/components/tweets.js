import React, { Component } from 'react';

class Tweets extends Component {
  constructor(props) {
    super(props);
  }

  listOfTweets() {
    const list = this.props.tweets;
    return list.map(item => {
      <li>item.text</li>
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.listOfTweets()}
        </ul>
      </div>
    )
  }
}


export default Tweets;
