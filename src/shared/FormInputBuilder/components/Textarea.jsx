import React from 'react';

const TextArea = ({ handler }) => (
    <div>
        <div>
            <label>Notes:</label>
        </div>
        <div>
            <textarea {...handler()} />
        </div>
    </div>
);

export default TextArea;
