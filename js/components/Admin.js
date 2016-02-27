import React, { Component } from 'react';
import AdminMenu from './AdminMenu';
import AdminNewPostBtn from './AdminNewPostBtn';
import AdminNavView from './AdminNavView';

export default class Admin  extends Component {
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
