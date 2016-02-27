import React, { Component } from 'react';
import ViewMainNavLink from './ViewMainNavLink';
import _ from 'underscore';

const pages = require('../../api/pages.js');
const menuItems = _.map(pages, (page) => {
  page.parent = 0;
  return page;
})

export default class ViewMainNav extends Component {

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
    this.setState({mainMenuItems: menuItems});
    /*
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
    */
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
