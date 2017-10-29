import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const propTypes = {
  theme: PropTypes.string.isRequired,
};

const Loader = props => (
  <div className="loader">
    <ReactLoading
      type="spinningBubbles"
      color={props.theme === 'vs' ? '#000' : '#FFF'}
    />
  </div>
);

Loader.propTypes = propTypes;

export default Loader;
