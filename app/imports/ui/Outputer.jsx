import React from 'react';
import PropTypes from 'prop-types';

const Outputer = (props) => (
    <div>
        <textarea style={{ height: 400, width: 800 }} value={props.result} readOnly />
    </div>
);

Outputer.propTypes = {
    result: PropTypes.string
};

export default Outputer;