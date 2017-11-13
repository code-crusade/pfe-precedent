/**
 * A component to delete users
 */

import React, { PureComponent } from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import PropTypes from 'prop-types';

const propTypes = {
  currentUser: PropTypes.object,
};
class UserDelete extends PureComponent {
  state = { finished: false };

  deleteUsers = file => {
    if (confirm('Êtes-vous sûre de vouloir supprimer les utilisateurs?')) {
      this.setState({ finished: false });
      Meteor.call('deleteUsers', () => {
        this.setState({ finished: true });
      });
    }
  };

  render() {
    const { currentUser } = this.props;
    if (currentUser && currentUser.isAdmin) {
      return (
        <div
          style={{
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #ccc',
          }}
        >
          <button onClick={this.deleteUsers}>Supprimer les utilisateurs</button>
          {this.state.finished && <div>Suppression Terminé!</div>}
        </div>
      );
    }
    return null;
  }
}

UserDelete.propTypes = propTypes;

export default UserDelete;
