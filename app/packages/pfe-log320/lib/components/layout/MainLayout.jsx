import React from 'react';
import PropTypes from 'prop-types';
import {
  Components,
  replaceComponent,
  withCurrentUser,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

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
    <Helmet>
      <link
        name="bootstrap"
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"
      />
      <link
        name="font-awesome"
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link
        name="devicon"
        rel="stylesheet"
        type="text/css"
        href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css"
      />
    </Helmet>
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
