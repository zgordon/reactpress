import React, { Component } from 'react';

export default class ViewBlogPosts extends Component {
  render () {
    var postMarkup;

    postMarkup = _.map( this.props.posts, function( post ) {
      return (
        <ViewBlogPostExcerpt
          key={post.id}
          post={post}
        />
      );
    });

    return (
        <section id="blogPosts">
          {postMarkup}
        </section>
    );
  }
}
