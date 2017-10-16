import { Components, replaceComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const MainLayout = ({children}) =>(
    <div className="wrapper" id="wrapper">
        <nav>
            <div className="navWide">
                <div className="wideDiv">
                    <Link to="/">Accueil</Link>
                    <Link to="/ide">IDE</Link>
                </div>
            </div>
            <div className="navNarrow">
                <i className="fa fa-bars fa-2x"></i>
                <div className="narrowLinks">
                    <Link to="/">Accueil</Link>
                    <Link to="/ide">IDE</Link>
                </div>
            </div>
        </nav>
        <div>
            {children}
        </div>
    </div>
);

replaceComponent('Layout', MainLayout);