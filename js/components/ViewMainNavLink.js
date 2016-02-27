import React, { Component } from 'react';

export default class ViewMainNavLink extends Component {

  render() {
    var slug = _.filter(
      this.props.post.url.split('/'),
      function(url) {
        return url !== '' &&
               url !== 'http:' &&
               url !== 'www.example.dev'
      })
      .join('/');
      if( 'home' === slug ) slug = '/';
      if( 'Post' === this.props.post.type_label ) {
        slug = 'blog/' + slug;
      }
      return (
        <li key={this.props.post.id}>
          <Link to={ "/" + slug }>
            { this.props.post.title }
          </Link>
        </li>
      );
  }
}
