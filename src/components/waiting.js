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
          <h1>Waiting for data...</h1>
         : <WaitingForSearch />
        }
      </div>
    )
  }
}


export default Waiting;
