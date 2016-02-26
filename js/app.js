import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import marked from 'marked';
import ReactQuill from 'react-quill';
import _ from 'underscore';
import $ from 'jquery';

window.onload = function () {

class ViewHeader extends Component {
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

class ViewMainNavLink extends Component {

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

class ViewMainNav extends Component {

  constructor () {
    super();
    this.state = {
      mainMenuItems: []
    };
  }

  returnSlugs ( url ) {
    if ( url !== '' &&
         url !== 'http:' &&
         url !== 'www.example.dev'
       ) {
        return url
    }

  }

  loadMenuFromAPI () {
    $.ajax({
      url: 'http://www.example.dev/wp-json/wp-api-menus/v2/menus/2',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({mainMenuItems: data.items});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.loadMenuFromAPI();
  }

  render(){
    // assign this.props to variables before running through loop
    var menuItems = this.state.mainMenuItems.filter( function( menuItem ) {
      return menuItem.parent === 0;
    });
    menuItems = menuItems.map( function( menuItem ) {
      return (
        <ViewMainNavLink
          parent={menuItem.parent}
          key={menuItem.id}
          post={menuItem}
        />
      );
    });
    return (
      <nav id="mainNav">
        <ul>
          {menuItems}
        </ul>
      </nav>
    );
  }

}

class ViewSidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h3>Hi!</h3>
        <p>
          I'm Zac, a WordPress developer learning JavaScript.
        </p>
      </div>
    );
  }
};

class ViewContent extends Component {

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

class ViewBlogPostExcerpt extends Component {
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

class ViewBlogPosts extends Component {
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

class ViewContentContent extends Component {
  render() {
    return (
      <div
        id="pageContent"
        dangerouslySetInnerHTML={{ __html: this.props.content }}
      />
    );
  }
}

class ViewContentTitle extends Component {
  render() {
    return (
      <h2 id="pageTitle" key="title">
        {this.props.title}
      </h2>
    );
  }
}

class ViewFooter extends Component {
  render() {
    return (
      <div className="footer">
        <p>Made with JavaScript &hearts;</p>
      </div>
    );
  }
}

class AdminNewPostBtn  extends Component {
  render() {
    return (
      <span id="addNew">
        <a href="#">+</a>
      </span>
    );
  }
}

class AdminListingLink  extends Component {
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

class AdminSecondaryNavLink  extends Component {
  render() {
    if( this.props.currentMenu === 'edit' ) {
      return (
        <span>
          <a href="#" onClick="">
            Title
          </a>
        </span>
      );

    } else {
      return (
        <span>Title</span>
      );
    }
  }
}

class AdminHomeLink extends Component {
  render() {
    return (
      <Link to='/' className="go-home">
        Admin
      </Link>
    );
  }
}

class AdminMenu extends Component {
  render() {
    return (
      <h3>
        <AdminHomeLink />
        { ' / ' }
        <AdminSecondaryNavLink currentMenu={this.props.currentMenu} />
      </h3>
    );
  }
}

class AdminDeletePost  extends Component {
  render() {
    return (
      <p id="deletePost">
        <a
          href="#"
          onClick=""
        >Delete Post</a>
      </p>
    );
  }
}

class AdminNavView extends Component {
  updateText () {

  }
  render() {
    if( this.props.currentMenu === 'edit' ) {
      return (
        <form>
          <ul>
            <li>
              <label htmlFor="editTitle">Title</label>
              {/*<input
                type="text"
                className="editTitle"
                id="editTitle"
                value={this.props.currentPost.title.rendered}
              />*/}
            </li>
            <li>
              <label htmlFor="editContent">Content</label>
              {/*<ReactQuill
                name="editContent"
                id="editContent"
                value={this.props.currentPost.content.rendered}
                onChange="{this.updateText}"
              />*/}
            </li>
            <li>
                <button
                  id="editUpdateBtn"
                  type="submit"
                  value="Update"
                  className="btn primary">
                  Update
                </button>
            </li>
          </ul>
        </form>
      );
    } else if ( this.props.currentMenu === 'secondary' ) {
      var postList = this.props.data.map( function( post ) {
        return (
          <AdminListingLink
            key={post.id}
            post={post}
          />
        );
      });
      return (
        <ul className="accordion">
          {postList}
        </ul>
      );
    } else {
      return (
        <ul className="accordion">
          <li>
            <Link to="/">
              Where am I?
            </Link>
          </li>
        </ul>
      );
    }
  }
}


class Admin  extends Component {
  constructor () {
    super();
    this.state = {
      currentMenu: 'edit'
    };
  }
  render() {
    return (
      <section id="editor" className={this.props.isHidden ? "hidden" : ""}>
        <h1>ReactPress</h1>
        <nav id={this.state.currentMenu} className="active">
          <AdminMenu
            currentMenu={this.state.currentMenu}
          />
          <AdminNewPostBtn
            currentMenu={this.state.currentMenu}
          />
          <AdminNavView
            currentPost={this.props.currentPost}
            currentMenu={this.state.currentMenu}
            data={this.props.posts}
          />
        </nav>
        {/*<AdminView data={this.props.data} currentMenu={this.props.currentMenu} />*/}
      </section>
    );
  }
}

class AdminToggle extends Component {

  render() {
    return (
      <div id="editorToggle" className={this.props.isHidden ? "hidden" :""}>
        <a
          href="#"
          onClick={this.props.onClick}
        >
          <span className="arrow"></span>
          <label>Hide Editor</label>
        </a>
      </div>
    );
  }
}

class ReactPress  extends Component {
  constructor () {
    super();
    this.state = {
        hidden: true
    };
  }

  componentDidMount() {
    // var slug = this.props.params.slug;
    // this.loadPostsFromAPI();
    // this.loadPagesFromAPI();
    // this.loadMenuFromAPI();
    // this.setCurrentPost( slug );
    // setInterval(
    //   this.loadPostsFromAPI,
    //   this.props.pollInterval
    // );
  }

  componentDidUpdate() {
    // var newSlug = this.props.params.slug;
    //
    // if ( !_.isEmpty( this.state.currentPost ) ) {
    //   this.setCurrentPost( newSlug );
    // }
  }

  handleMainNavClick( event ) {
    event.preventDefault();
    this.refs.userInput.getDOMNode().value = '';
    this.context.router.transitionTo('/');
    this.setCurrentPost( newSlug );
  }


  handleAdminToggle() {
      this.setState( { hidden : !this.state.hidden } );
  }

  render() {

      // <Admin
      //   posts={this.state.posts}
      //   pages={this.state.pages}
      //   isHidden={this.state.hidden}
      //   currentPost={currentPost[0]}
      // />

      return (
        <section id="wrapper">

          <Admin
            isHidden={this.state.hidden}
          />

          <section id="view">
            <div className="container">
              <ViewHeader />
              <ViewMainNav />
              {this.props.children}
              <ViewFooter />
            </div>
          </section>

          <AdminToggle
            isHidden={this.state.hidden}
            onClick={this.handleAdminToggle}
          />

        </section>
      );

  }

}

ReactDOM.render(
  <Router >
    <Route path="/" component={ReactPress}>
      <IndexRoute component={ViewContent}/>
      <Route path="blog/:slug" component={ViewContent} />
      <Route path=":slug" component={ViewContent} />
    </Route>
  </Router>,
  document.getElementById('reactpress')
);


}
