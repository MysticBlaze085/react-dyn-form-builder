import React from 'react';

const TextInput = ({ handler, meta: { label, placeholder } }) => (
    <div>
        <label>{label}:</label>
        <input placeholder={placeholder} {...handler()} />
    </div>
);
export default TextInput;
