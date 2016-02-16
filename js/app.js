import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import marked from 'marked';
import ReactQuill from 'react-quill';
import _ from 'underscore';
import $ from 'jquery';

window.onload = function () {

var View = React.createClass({
  // Get the this.props.params (get the router)
  //
  componentDidMount: function() {

    // Get the current post and set
  },
  componentDidUpdate: function() {
    // May need to call here as well
  },
  render: function() {
    return (
      <section id="view">
      <div className="container">
          <ViewHeader
          currentPost={this.props.currentPost}
        />
        <ViewMainNav
          mainMenuItems={this.props.mainMenu}
        />
        <ViewContent
          currentPost={this.props.currentPost}
        />
        <ViewFooter />
      </div>
    </section>
    );
  }
});

var ViewHeader = React.createClass({
  render: function() {
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
});

var ViewMainNavLink = React.createClass({

  render: function() {
    var slug = _.filter(
      this.props.post.url.split('/'),
      function(url) {
        return url !== '' &&
               url !== 'http:' &&
               url !== 'www.example.dev'
      })
      .join('/');
      if( slug === 'home' ) slug = '/';
      return (
        <li key={this.props.post.id}>
          <Link to={slug}>
            {this.props.post.title}
          </Link>
        </li>
      );
  }
});

var ViewMainNav = React.createClass({
  returnSlugs: function( url ) {
    if ( url !== '' &&
         url !== 'http:' &&
         url !== 'www.example.dev'
       ) {
        return url
    }

  },
  render: function(){
    // assign this.props to variables before running through loop
    var menuItems = this.props.mainMenuItems.filter( function( menuItem ) {
      return menuItem.parent === 0;
    });
    menuItems = this.props.mainMenuItems.map( function( menuItem ) {
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
          <li>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    );
    // return (
    //   <nav id="mainNav">
    //     <ul>
    //       {menuItems}
    //     </ul>
    //   </nav>
    // );
  }
});

var ViewSidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <h3>Hi!</h3>
        <p>
          I'm Zac, a WordPress developer learning JavaScript.
        </p>
      </div>
    );
  }
});

var ViewContent = React.createClass({
  //{/*{this.props.currentPost.title.rendered}*/}
  //   {/*<div
  //     id="pageContent"
  //     dangerouslySetInnerHTML={{ __html: this.props.currentPost.content.rendered}}
  //   />
  //   </div>*/}
  render: function() {
    return (
      <div className="content">
        <div className="primary">
          <h2 id="pageTitle" key="title">
            Title
          </h2>
            <div id="pageContent">
              Content
            </div>
        </div>
        <ViewSidebar />
      </div>
    );
  }
});

var ViewFooter = React.createClass({
  render: function() {
    return (
      <div className="footer">
        <p>Made with JavaScript &hearts;</p>
      </div>
    );
  }
});

var AdminNewPostBtn = React.createClass({
  render: function() {
    return (
      <span id="addNew">
        <a href="#">+</a>
      </span>
    );
  }
});

var AdminListingLink = React.createClass({
  render: function() {
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
});

var AdminSecondaryNavLink = React.createClass({
  render: function() {
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
});

var AdminHomeLink = React.createClass({
  render: function() {
    return (
      <Link to='/' className="go-home">
        Admin
      </Link>
    );
  }
});

var AdminMenu = React.createClass({
  render: function() {
    return (
      <h3>
        <AdminHomeLink />
        { ' / ' }
        <AdminSecondaryNavLink currentMenu={this.props.currentMenu} />
      </h3>
    );
  }
});

var AdminDeletePost = React.createClass({
  render: function() {
    return (
      <p id="deletePost">
        <a
          href="#"
          onClick=""
        >Delete Post</a>
      </p>
    );
  }
});

var AdminNavView = React.createClass({
  updateText: function() {

  },
  render: function() {
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
});


var Admin = React.createClass({
  getInitialState: function() {
    return (
        {currentMenu: 'edit'}
    );
  },
  render: function() {
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
});

var AdminToggle = React.createClass({

  render: function() {
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
});

var ReactPress = React.createClass({

  loadMenuFromAPI: function() {
    $.ajax({
      url: 'http://www.example.dev/wp-json/wp-api-menus/v2/menus/2',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({mainMenu: data.items});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadPagesFromAPI: function() {
    $.ajax({
      url: 'http://www.example.dev/wp-json/wp/v2/pages',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({pages: data});
        var currentSlug = this.props.params.slug;
        if ( _.isUndefined( currentSlug ) ) currentSlug = 'home';
        var currentPost = _.filter( data, function( page ) {
            return page.slug == currentSlug;
        });
        if ( !_.isEmpty( currentPost[0] ) ) {
          this.setState( { currentPost: currentPost } );
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadPostsFromAPI: function() {
    $.ajax({
      url: 'http://www.example.dev/wp-json/wp/v2/posts',
      dataType: 'json',
      cache: false,
      success: function(posts) {
        this.setState({posts: posts});
        var currentSlug = this.props.params.slug;
        var currentPost = _.filter( posts, function( post ) {
            return post.slug == currentSlug;
        });
        if ( !_.isEmpty( currentPost ) ) {
          this.setState({currentPost: currentPost})
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  setCurrentPost: function( slug ) {
    if ( _.isUndefined( slug )  ) slug = "home";
    var newPost = {};
    newPost = _.filter( this.state.pages, function( post ) {
      return post.slug === slug;
    });
    //this.setState( { currentPost : newPost } );
    if( _.isEmpty( newPost ) ) {
      newPost = _.filter( this.state.posts, function( post ) {
          return post.slug === slug;
      });
    }
  },

  getInitialState: function() {
    return {
      posts: [],
      pages: [],
      mainMenu: [],
      hidden: true,
      currentPost: {}
    };
  },

  componentDidMount: function() {
    var slug = this.props.params.slug;
    this.loadPostsFromAPI();
    this.loadPagesFromAPI();
    this.loadMenuFromAPI();
    this.setCurrentPost( slug );
    // setInterval(
    //   this.loadPostsFromAPI,
    //   this.props.pollInterval
    // );
  },

  componentDidUpdate: function() {
    var newSlug = this.props.params.slug;

    if ( !_.isEmpty( this.state.currentPost ) ) {
      this.setCurrentPost( newSlug );
    }
  },

  handleMainNavClick: function( event ) {
    event.preventDefault();
    this.refs.userInput.getDOMNode().value = '';
    this.context.router.transitionTo('/');
    this.setCurrentPost( newSlug );
  },


  handleAdminToggle: function() {
      this.setState( { hidden : !this.state.hidden } );
  },

  render: function() {
    let currentPost = this.state.currentPost,
        mainMenu = this.state.mainMenu;
    if ( !_.isUndefined( currentPost[0] )  ) {
      let childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          currentPost: currentPost[0],
          mainMenu: mainMenu,
          setNewPost: this.setCurrentPost
        });
      });
      return (
        <section id="wrapper">
          <Admin
            posts={this.state.posts}
            pages={this.state.pages}
            isHidden={this.state.hidden}
            currentPost={currentPost[0]}
          />

          <section id="view">
          <div className="container">
              <ViewHeader
              currentPost={currentPost[0]}
            />
            <ViewMainNav
              mainMenuItems={this.state.mainMenu}
            />
            {this.props.children}
            <ViewFooter />
          </div>
        </section>

          {/*{childrenWithProps}*/}
          <AdminToggle
            isHidden={this.state.hidden}
            onClick={this.handleAdminToggle}
          />
        </section>
      );
    } else {
      return null;
    }
  }

});
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
