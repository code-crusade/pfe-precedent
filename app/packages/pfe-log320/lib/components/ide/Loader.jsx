import React, { Component } from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

const Loader = props => (
  <div className="loader">
    <ReactLoading
      type="spinningBubbles"
      color={props.theme === "vs" ? "#000" : "#FFF"}
    />
  </div>
);

Loader.propTypes = {
  theme: PropTypes.string,
};

export default Loader;
