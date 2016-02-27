import React, { Component } from 'react';

export default class AdminSecondaryNavLink  extends Component {
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
