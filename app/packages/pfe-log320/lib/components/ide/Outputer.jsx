import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  result: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

const Outputer = ({ result, color, backgroundColor }) => (
  <div>
    <textarea
      className="outputer"
      style={{
        height: 190,
        width: 800,
        textAlign: 'left',
        color,
        backgroundColor,
      }}
      value={result}
      readOnly
    />
  </div>
);

Outputer.propTypes = propTypes;

export default Outputer;
