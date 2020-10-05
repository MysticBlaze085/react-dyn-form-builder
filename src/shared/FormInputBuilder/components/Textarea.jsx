import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextArea = ({ handler, meta: { label, classes } }) => (
    <TextField style={{ width: '100%' }} className={classes} label={label} multiline {...handler()} />
);

export default TextArea;
