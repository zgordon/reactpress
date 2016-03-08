import React, { Component } from 'react';
import AdminHomeLink from './AdminHomeLink';
import AdminSecondaryNavLink from './AdminSecondaryNavLink';

export default class AdminMenu extends Component {
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
