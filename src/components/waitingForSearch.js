import React, { Component } from 'react';

class WaitingForSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="waitingSearch">
         <h2>Type in the <span>word</span> you want to search for</h2>
      </div>
    )
  }
}


export default WaitingForSearch;
