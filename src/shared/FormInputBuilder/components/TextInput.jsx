import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = ({ handler, touched, hasError, meta: { label, placeholder } }) => {
    const isValid = touched && hasError('required');
    return (
        <div>
            <TextField
                error={isValid}
                style={{ width: '100%' }}
                label={label}
                placeholder={placeholder}
                helperText={isValid ? `${label} is required` : null}
                {...handler()}
            />
        </div>
    );
};
export default TextInput;
