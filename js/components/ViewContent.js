import React, { Component } from 'react';
import ViewContentTitle from './ViewContentTitle';
import ViewContentContent from './ViewContentContent';
import ViewSidebar from './ViewSidebar';
import $ from 'jquery';

export default class ViewContent extends Component {

  constructor () {
    super();
    this.state = {
      posts: [],
      pages: [],
      currentPost: {
        title: {
          rendered: 'Loading'
        },
        content: {
          rendered: 'Content..'
        }
      }
    };
  }


  loadContentFromAPI() {

    const postsUrl = 'http://www.example.dev/wp-json/wp/v2/posts',
          pagesUrl = 'http://www.example.dev/wp-json/wp/v2/pages';

    let   slug = this.props.params.slug;

    this.serverRequest = $.get(postsUrl, function (result) {
      const posts = result;
      let   filteredPosts;

      this.setState( { posts: posts } );
      filteredPosts = _.filter( posts, p => p.slug === slug );
      if ( !_.isUndefined( filteredPosts[0] ) ) {
        this.setState( { currentPost : filteredPosts[0] } );
      }

    }.bind(this));

    this.serverRequest = $.get(pagesUrl, function (result) {
      const pages = result;
      let   filteredPages;

      this.setState( { pages: pages } );
      filteredPages = _.filter( pages, p => p.slug === slug );
      if ( !_.isUndefined( filteredPages[0] ) ) {
        this.setState( { currentPost : filteredPages[0] } );
      }

    }.bind(this));

  }

  setCurrentPost ( slug ) {
    let newPost = {};

    if ( _.isEmpty( slug ) ) {
      slug = "home";
    }

    if ( this.state.currentPost.slug === slug ) {
      return null;
    }

    newPost = _.filter( this.state.pages, p => {
      return p.slug === slug;
    });
    if( _.isEmpty( newPost ) ) {
      newPost = _.filter( this.state.posts, function( post ) {
          return post.slug === slug;
      });
    }
    if( !_.isEmpty( newPost[0] ) ) {
      this.setState( { currentPost : newPost[0] } );
    }
  }

  componentDidMount () {
    this.loadContentFromAPI();
  }

  componentDidUpdate () {
    this.setCurrentPost( this.props.params.slug );
  }

  render () {
    var postMarkup = null,
        posts = this.state.posts;

    if( this.state.currentPost.slug === 'blog' ) {
        postMarkup = <ViewBlogPosts posts={posts} />;
    }

    return (
      <div className="content">
        <div className="primary">
          <ViewContentTitle
            title={this.state.currentPost.title.rendered}
          />
          <ViewContentContent
            content={this.state.currentPost.content.rendered}
          />
          {postMarkup}
        </div>
        <ViewSidebar />
      </div>
    );
  }
}
