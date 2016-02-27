import React, { Component } from 'react';

export default class ViewContentContent extends Component {
  render() {
    return (
      <div
        id="pageContent"
        dangerouslySetInnerHTML={{ __html: this.props.content }}
      />
    );
  }
}
