import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AdminHomeLink extends Component {
  render() {
    return (
      <Link to='/' className="go-home">
        Admin
      </Link>
    );
  }
}
