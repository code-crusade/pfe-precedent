import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

const Description = ({ title, description, color, backgroundColor }) => (
  <div>
    <label className="label label-info">{title}</label>
    <textarea
      className="outputer"
      style={{
        height: 190,
        width: 800,
        textAlign: 'left',
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
