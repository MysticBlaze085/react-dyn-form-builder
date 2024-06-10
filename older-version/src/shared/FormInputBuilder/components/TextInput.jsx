import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = ({ handler, touched, hasError, meta: { label, placeholder, classes } }) => {
    const isValid = touched && hasError('required');
    return (
        <TextField
            error={isValid}
            style={{ width: '100%' }}
            className={classes}
            label={label}
            placeholder={placeholder}
            helperText={isValid ? `${label} is required` : null}
            {...handler()}
        />
    );
};
export default TextInput;
