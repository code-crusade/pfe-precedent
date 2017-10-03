import React from 'react';

const Outputer = (props) => (
    <div>
        <textarea style={{ height: 80, width: 800 }} value={props.result} readOnly />
    </div>
);

export default Outputer;