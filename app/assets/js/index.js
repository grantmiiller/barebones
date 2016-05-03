import React from 'react';
import {render} from 'react-dom';

const Stuff = React.createClass({
  render() {
    return (
      <div>
        <p>Stuff</p>
        <p>Wharble Garble</p>
      </div>
    );
  }
});

React.render(<Stuff />, document.getElementById('mount'));
