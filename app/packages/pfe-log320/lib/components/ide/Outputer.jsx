import React from 'react';
import PropTypes from 'prop-types';

const Outputer = (props) => (
    <div>
        <textarea className="outputer" style={
                { height: 190, width: 800, textAlign: "left", color: props.color, backgroundColor: props.backColor }
            } value={props.result} readOnly />
    </div>
);

Outputer.propTypes = {
    result: PropTypes.string,
    color: PropTypes.string,
    backColor: PropTypes.string,
};

export default Outputer;