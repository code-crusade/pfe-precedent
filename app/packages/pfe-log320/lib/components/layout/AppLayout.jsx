import React, { Component } from 'react';

const AppLayout = () => (
    <nav>
        <div className="navWide">
            <div className="wideDiv">
                <a href="/">Accueil</a>
                <a href="/ide">IDE</a>
            </div>
        </div>
        <div className="navNarrow">
            <i className="fa fa-bars fa-2x"></i>
            <div className="narrowLinks">
                <a href="/">Accueil</a>
                <a href="/ide">IDE</a>
            </div>
        </div>
    </nav>
);

export default AppLayout;