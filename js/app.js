window.onload = function () {

var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var marked = require( 'marked' );
var $ = require( 'jquery' );


var ViewHeader = React.createClass({
  render: function() {
    return (
      <header className="page-header">
        <h1 id="siteName"><a href="/">{this.props.title}</a></h1>
        <h2 id="siteDesription">{this.props.description}</h2>
      </header>
    );
  }
});

var ViewMainNavLink = React.createClass({
  render: function() {
    return (
      <li>
        <a href="{this.props.slug}">
          {this.props.title}
        </a>
      </li>
    );
  }
});

var ViewMainNav = React.createClass({
  render: function(){
    return (
      <nav id="mainNav">
        <ul>
          <ViewMainNavLink title="{this.props.title}" slug="{this.props.slug}" />
        </ul>
      </nav>
    );
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
  render: function() {
    return (
      <div className="content">

        <div className="primary">
          <h2 id="pageTitle">Page Title</h2>
          <div id="pageContent">
            <p>Reprehenderit sit sunt nisi excepteur deserunt officia ipsum eu reprehenderits deserunt aliqua incididunt cillum dolore.</p>
            <p>Dolor sit amet, consectetur adipisicing elit. Makingsum Lorem look coolsum. Sit temporibus sunt doloremque enim alias pariatur debitis dolorum excepturi fugiat assumenda at, totam delectus, possimus reprehenderit earum aliquid nihil, esse voluptatem.</p>
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
    return (
      <li>
        <a href={this.props.slug}>
          {this.props.title}
        </a>
      </li>
    );
  }
});

var AdminListingNav = React.createClass({
  render: function() {
    var postList = this.props.data.map( function( post ) {
      console.log( post );
      return (
        <AdminListingLink id={post.id} slug={post.slug} title={post.title.rendered} />
      );
    });
    return (
      <nav id="secondary" className="active">
        <h3>
          <a className="go-home" href="#">Admin</a> /
          <span>Title</span>
        </h3>
        <AdminNewPostBtn />
        <ul className="accordion">
          {postList}
        </ul>
      </nav>
    );
  }
});

var AdminEditor = React.createClass({
  render: function() {
    return (
      <section id="editor">
        <h1>ReactPress</h1>
        <AdminListingNav data={this.props.data} />
      </section>
    );
  }
});

var ReactPress = React.createClass({

  loadPostsFromAPI: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log( data );
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    this.loadPostsFromAPI();
    setInterval(
      this.loadPostsFromAPI,
      this.props.pollInterval
    );
  },

  render: function() {

    return (
      <section id="wrapper">
        <AdminEditor data={this.state.data} />
        <section id="view">
          <div className="container">
            <ViewHeader data={this.state.data} />
            <ViewMainNav data={this.state.data} />
            <ViewContent data={this.state.data} />
            <ViewFooter />
          </div>
        </section>
      </section>
    );
  }

});
ReactDOM.render(
  <ReactPress url="http://www.example.dev/wp-json/wp/v2/posts" pollInterval={2000} />,
  document.getElementById('reactpress')
);


}
