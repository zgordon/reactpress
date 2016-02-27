import React, { Component } from 'react';

export default class AdminListingLink  extends Component {
  render() {
    if ( this.props.post.type === 'post' ) {
      return (
        <li>
          <Link to={'blog/' + this.props.post.slug} key={this.props.post.id}>
            {this.props.post.title.rendered}
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to={this.props.post.slug} key={this.props.post.id}>
            {this.props.post.title.rendered}
          </Link>
        </li>
      );
    }
  }
}
