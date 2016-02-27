import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ViewHeader extends Component {
  render() {
    return (
      <header className="page-header">
        <h1 id="siteName">
          <Link to="/">
            ReactPress
          </Link>
        </h1>
        <h2 id="siteDesription">A Decoupled JS and WP Site</h2>
      </header>
    );
  }
}
