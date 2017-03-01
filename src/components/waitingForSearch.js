import React, { Component } from 'react';

class WaitingForSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="waiting">
         <h1>Please type in your search</h1>
      </div>
    )
  }
}


export default WaitingForSearch;
