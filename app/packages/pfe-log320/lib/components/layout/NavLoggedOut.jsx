import { Components } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';

const NavLoggedOut = () => (
  <span className="login">
    <Components.ModalTrigger label="Enregistrer/Connecter" size="small">
      <Components.AccountsLoginForm />
    </Components.ModalTrigger>
  </span>
);

export default NavLoggedOut;
