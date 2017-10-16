import React, { Component } from 'react';
import ReactLoading from 'react-loading';

const Loader = (props) => (
    <div className="loader">
        <ReactLoading type="spinningBubbles" color={props.theme === 'vs' ? '#FFF' : '#000' } />
    </div>
);

export default Loader;