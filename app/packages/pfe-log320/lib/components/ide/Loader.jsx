import React, { Component } from 'react';
import ReactLoading from 'react-loading';

const Loader = () => (
    <div className="loader">
        <ReactLoading type="spinningBubbles" color="#FFF" />
    </div>
);

export default Loader;