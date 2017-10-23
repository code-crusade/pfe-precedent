import { Components, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import '../userImport/UserImport';

const MainLayout = ({children, currentUser}) =>(
    <div className="wrapper" id="wrapper">
        <nav>
            <div className="navWide">
                <div className="wideDiv">
                    <Link to="/">Accueil</Link>
                    <Link to="/ide">IDE</Link>
                    <Components.ShowIf check={Users.isAdmin} document={currentUser} failureComponent={null}>
                        <Link to="/admin">Administration</Link>
                    </Components.ShowIf>
                    {currentUser ? 
                        <NavLoggedIn currentUser={currentUser}/> : 
                        <NavLoggedOut currentUser={currentUser}/>
                    }
                </div>
            </div>
            <div className="navNarrow">
                <i className="fa fa-bars fa-2x"></i>
                <div className="narrowLinks">
                    <Link to="/">Accueil</Link>
                    <Link to="/ide">IDE</Link>
                    <Components.ShowIf check={Users.isAdmin} document={currentUser} failureComponent={null}>
                        <Link to="/admin">Administration</Link>
                    </Components.ShowIf>
                </div>
            </div>
        </nav>
        <div>
            {children}
        </div>
    </div>
);

const NavLoggedIn = ({currentUser}) =>
    <div className="login">
        <Components.ModalTrigger className="header-accounts" label={Users.getDisplayName(currentUser)} size="small">
            <div>
                {Users.isAdmin(currentUser) ? <p>Admin</p> : null}
                <Components.AccountsLoginForm />
            </div>
        </Components.ModalTrigger>
    </div>
const NavLoggedOut = ({currentUser}) =>
    <span className="login">
        <Components.ModalTrigger label="Enregistrer/Connecter" size="small">
            <Components.AccountsLoginForm />
        </Components.ModalTrigger>
    </span>

MainLayout.propTypes = {
    children: PropTypes.element,
    currentUser: PropTypes.object.isRequired,
};

NavLoggedIn.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

NavLoggedOut.propTypes = {
    currentUser: PropTypes.object,
};

replaceComponent('Layout', withCurrentUser(MainLayout));