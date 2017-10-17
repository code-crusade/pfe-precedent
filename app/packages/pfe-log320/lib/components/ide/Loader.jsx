import React, { Component } from "react";
import ReactLoading from "react-loading";

const Loader = props => (
  <div className="loader">
    <ReactLoading
      type="spinningBubbles"
      color={props.theme === "vs" ? "#000" : "#FFF"}
    />
  </div>
);

export default Loader;
