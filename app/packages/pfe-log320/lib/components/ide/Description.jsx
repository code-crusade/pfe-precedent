import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

const Description = ({ title, description, color, backgroundColor }) => (
  <div
    style={{
      height: "100%",
      minWidth: 400,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <label
      className="label label-info"
      style={{ position: "relative", flex: "0 0 auto" }}
    >
      {title}
    </label>
    <textarea
      style={{
        position: "relative",
        flex: "1 1 auto",
        color,
        backgroundColor,
      }}
      value={description}
      readOnly
    />
  </div>
);

Description.propTypes = propTypes;

export default Description;
