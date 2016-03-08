import React, { Component } from 'react';

export default class ViewContentTitle extends Component {
  render() {
    return (
      <h2 id="pageTitle" key="title">
        {this.props.title}
      </h2>
    );
  }
}
