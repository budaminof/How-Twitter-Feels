import React, { Component } from 'react';
import WaitingForSearch from './WaitingForSearch';

class Waiting extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="waiting">
        { this.props.show ?
          <h2>Waiting for data...</h2>
         : <WaitingForSearch />
        }
      </div>
    )
  }
}


export default Waiting;
