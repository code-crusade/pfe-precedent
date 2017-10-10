import React from 'react';
import PropTypes from 'prop-types';

const Outputer = (props) => (
    <div>
        <textarea className="form-control" style={{ height: 190, width: 800 }} value={props.result} readOnly />
    </div>
);

Outputer.propTypes = {
    result: PropTypes.string
};

export default Outputer;