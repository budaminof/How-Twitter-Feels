import React, { Component } from 'react';

class Waiting extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div className="waiting">
          { this.props.show ? <h2>Waiting for tweets...</h2> : null }
        </div>

        <div className="error">
        { this.props.error ?
          <h2>Sorry, we are experiencing some overflow,
            please try again in a few minutes</h2>
          : null }
        </div>
      </div>
    )
  }
}


export default Waiting;
