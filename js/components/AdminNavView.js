import React, { Component } from 'react';

export default class AdminNavView extends Component {
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
