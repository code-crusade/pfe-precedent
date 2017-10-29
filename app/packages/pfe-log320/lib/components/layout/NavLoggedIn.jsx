import React from 'react';
import PropTypes from 'prop-types';
import { Components } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
};

const NavLoggedIn = ({ currentUser }) => (
  <div className="login">
    <Components.ModalTrigger
      className="header-accounts"
      label={Users.getDisplayName(currentUser)}
      size="small"
    >
      <div>
        {Users.isAdmin(currentUser) ? <p>Admin</p> : null}
        <Components.AccountsLoginForm />
      </div>
    </Components.ModalTrigger>
  </div>
);

NavLoggedIn.propTypes = propTypes;

export default NavLoggedIn;
