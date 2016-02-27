import React, { Component } from 'react';

export default class ViewBlogPostExcerpt extends Component {
  render() {
    return (
      <article>
        <h3>
          <Link to={'/blog/' + this.props.post.slug}>
          {this.props.post.title.rendered}
          </Link>
        </h3>
        <div
          dangerouslySetInnerHTML={{ __html: this.props.post.excerpt.rendered }}
        />
      </article>
    );
  }
}
