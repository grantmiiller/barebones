import React from 'react';
import {Layout} from './layout';

const Home = React.createClass({
  render() {
    return (
      <Layout title="Home Page">
        <h1>Welcome to the plot device.</h1>
      </Layout>
    );
  }
});

export {Home as default};
