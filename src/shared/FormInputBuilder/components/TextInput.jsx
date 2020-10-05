import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = ({ handler, meta: { label, placeholder } }) => (
    <TextField id="standard-basic" label={label} placeholder={placeholder} {...handler()} />
);
export default TextInput;
