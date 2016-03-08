import React, { Component, PropTypes } from 'react';
import ViewMainNavLink from './ViewMainNavLink';
import { connect } from 'react-redux';
import { loadMenu } from '../actions/menu';
import _ from 'underscore';


@connect(
  state => ({
    menuItems: state.menu
  }),
  { loadMenu }
)
class ViewMainNav extends Component {
  static propTypes = {
    menuItems: PropTypes.object,
    loadMenu: PropTypes.func.isRequired
  };
  returnSlugs ( url ) {
    if ( url !== '' &&
         url !== 'http:' &&
         url !== 'www.example.dev'
       ) {
        return url
    }

  }

  componentDidMount() {
    if(!this.props.menuItems || this.props.menuItems.length === 0){
      this.props.loadMenu();
    }
  }

  render(){
    const menuItems = this.props.menuItems
      .filter((item) => item.parent === 0)
      .map(( menuItem ) => {
        return (
          <ViewMainNavLink
            parent={menuItem.parent}
            key={menuItem.id}
            post={menuItem}
          />
        );
      }).toArray();
    return (
      <nav id="mainNav">
        <ul>
          {menuItems}
        </ul>
      </nav>
    );
  }

}
export default ViewMainNav;
