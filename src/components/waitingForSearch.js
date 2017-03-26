import React, { Component } from 'react';

class WaitingForSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="waitingSearch">
         <h2>Type in a <span className="extra">word</span></h2>
      </div>
    )
  }
}


export default WaitingForSearch;
