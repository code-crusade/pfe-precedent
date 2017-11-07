import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Description = ({ title, description }) => (
  <div className="problem-description">
    <label className="label label-info problem-description-title">
      {title}
    </label>
    <textarea
      className="problem-description-text"
      value={description}
      readOnly
    />
  </div>
);

Description.propTypes = propTypes;

export default Description;
