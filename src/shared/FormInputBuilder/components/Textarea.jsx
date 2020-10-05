import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextArea = ({ handler, meta: { label } }) => (
    <div>
        <TextField style={{ width: '100%' }} label={label} multiline {...handler()} />
    </div>
);

export default TextArea;
