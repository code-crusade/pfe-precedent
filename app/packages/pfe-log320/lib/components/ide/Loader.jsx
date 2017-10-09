import React, { Component } from 'react';
import ReactLoading from 'react-loading';

const Loader = () => (
    <div className="loader">
        <ReactLoading type="spinningBubbles" color="#444" />
    </div>
);

export default Loader;