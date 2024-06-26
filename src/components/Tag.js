import React from 'react';

const Tag = ({ value, onRemove }) => (
    <span>
        {value}
        <button onClick={onRemove}>x</button>
    </span>
);

export default Tag;
