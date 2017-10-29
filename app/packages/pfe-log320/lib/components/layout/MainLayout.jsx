import React from 'react';
import PropTypes from 'prop-types';
import {
  Components,
  replaceComponent,
  withCurrentUser,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';

import NavLoggedIn from './NavLoggedIn';
import NavLoggedOut from './NavLoggedOut';

const propTypes = {
  children: PropTypes.element.isRequired,
  currentUser: PropTypes.object,
};

const defaultProps = {
  currentUser: {},
};

const MainLayout = ({ children, currentUser }) => (
  <div className="wrapper" id="wrapper">
    <nav>
      <div className="navWide">
        <div className="wideDiv">
          <Link to="/">Accueil</Link>
          <Link to="/ide">IDE</Link>
          <Components.ShowIf
            check={Users.isAdmin}
            document={currentUser}
            failureComponent={null}
          >
            <Link to="/admin">Administration</Link>
          </Components.ShowIf>
          {currentUser ? (
            <NavLoggedIn currentUser={currentUser} />
          ) : (
            <NavLoggedOut currentUser={currentUser} />
          )}
        </div>
      </div>
      <div className="navNarrow">
        <i className="fa fa-bars fa-2x" />
        <div className="narrowLinks">
          <Link to="/">Accueil</Link>
          <Link to="/ide">IDE</Link>
          <Components.ShowIf
            check={Users.isAdmin}
            document={currentUser}
            failureComponent={null}
          >
            <Link to="/admin">Administration</Link>
          </Components.ShowIf>
          {currentUser ? (
            <NavLoggedIn currentUser={currentUser} />
          ) : (
            <NavLoggedOut currentUser={currentUser} />
          )}
        </div>
      </div>
    </nav>
    <div>{children}</div>
  </div>
);

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

replaceComponent('Layout', withCurrentUser(MainLayout));
