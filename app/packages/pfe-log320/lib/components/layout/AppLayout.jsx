import React, { Component } from 'react';
import { Link } from 'react-router';

const AppLayout = () => (
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
);

export default AppLayout;