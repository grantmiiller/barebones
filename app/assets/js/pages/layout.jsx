import React from 'react';

export const Layout = React.createClass({
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          {this.props.children}
          <hr />
          <p>
            <a href="/">Home</a> | <a href="/about">About Us</a>
          </p>
          <div id="mount"></div>
          <script src="http://localhost:8080/assets/core.bundle.js"></script>
        </body>
      </html>
    );
  }
});
