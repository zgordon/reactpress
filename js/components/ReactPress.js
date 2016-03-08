import React, { Component } from 'react';
import ViewHeader from './ViewHeader';
import ViewMainNav from './ViewMainNav';
import ViewFooter from './ViewFooter';
import Admin from './Admin';
import AdminToggle from './AdminToggle';

export default
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
